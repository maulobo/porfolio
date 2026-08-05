import { useCallback, useEffect, useRef, useState } from "react";

export type SnakeStatus = "idle" | "playing" | "paused" | "over";
export type Direction = "up" | "down" | "left" | "right";

type Point = { x: number; y: number };

/** Grilla del LCD. El canvas mide COLS*CELL x ROWS*CELL y se escala por CSS. */
const COLS = 22;
const ROWS = 16;
const CELL = 8;

const HIGH_SCORE_KEY = "scland:snake:high-score";

const LCD_BG = "#9ec87c";
const LCD_INK = "#1b2a12";
const LCD_DIM = "rgba(27, 42, 18, 0.22)";

const START_STEP_MS = 170;
const MIN_STEP_MS = 75;

const VECTORS: Record<Direction, Point> = {
  up: { x: 0, y: -1 },
  down: { x: 0, y: 1 },
  left: { x: -1, y: 0 },
  right: { x: 1, y: 0 },
};

const OPPOSITES: Record<Direction, Direction> = {
  up: "down",
  down: "up",
  left: "right",
  right: "left",
};

const initialSnake = (): Point[] => {
  const y = Math.floor(ROWS / 2);
  const x = Math.floor(COLS / 3);
  return [
    { x: x + 2, y },
    { x: x + 1, y },
    { x, y },
    { x: x - 1, y },
  ];
};

const readHighScore = () => {
  try {
    return Number(window.localStorage.getItem(HIGH_SCORE_KEY)) || 0;
  } catch {
    return 0;
  }
};

const writeHighScore = (value: number) => {
  try {
    window.localStorage.setItem(HIGH_SCORE_KEY, String(value));
  } catch {
    // Modo privado o storage bloqueado: el juego funciona igual, sin récord.
  }
};

/** Velocidad creciente: cada fruta acorta el intervalo entre pasos. */
const stepDurationFor = (score: number) => Math.max(MIN_STEP_MS, START_STEP_MS - score * 4);

export const useSnakeGame = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const snakeRef = useRef<Point[]>(initialSnake());
  const foodRef = useRef<Point>({ x: Math.floor(COLS * 0.75), y: Math.floor(ROWS / 2) });
  const directionRef = useRef<Direction>("right");
  /** Cola de giros: permite encadenar dos teclas rápidas sin perder la segunda. */
  const turnQueueRef = useRef<Direction[]>([]);
  const scoreRef = useRef(0);
  const statusRef = useRef<SnakeStatus>("idle");
  const frameRef = useRef<number | null>(null);
  const lastStepRef = useRef(0);

  const [status, setStatus] = useState<SnakeStatus>("idle");
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);

  useEffect(() => {
    setHighScore(readHighScore());
  }, []);

  const updateStatus = useCallback((next: SnakeStatus) => {
    statusRef.current = next;
    setStatus(next);
  }, []);

  const placeFood = useCallback(() => {
    const occupied = new Set(snakeRef.current.map((part) => `${part.x}:${part.y}`));
    const free: Point[] = [];

    for (let y = 0; y < ROWS; y += 1) {
      for (let x = 0; x < COLS; x += 1) {
        if (!occupied.has(`${x}:${y}`)) free.push({ x, y });
      }
    }

    if (free.length === 0) return;
    foodRef.current = free[Math.floor(Math.random() * free.length)];
  }, []);

  const draw = useCallback(() => {
    const context = canvasRef.current?.getContext("2d");
    if (!context) return;

    const width = COLS * CELL;
    const height = ROWS * CELL;

    context.fillStyle = LCD_BG;
    context.fillRect(0, 0, width, height);

    // Marco: choca contra el borde y perdés, así que tiene que verse.
    context.strokeStyle = LCD_DIM;
    context.lineWidth = 2;
    context.strokeRect(1, 1, width - 2, height - 2);

    const food = foodRef.current;
    context.fillStyle = LCD_INK;
    context.beginPath();
    context.arc(
      food.x * CELL + CELL / 2,
      food.y * CELL + CELL / 2,
      CELL / 2 - 1,
      0,
      Math.PI * 2,
    );
    context.fill();

    snakeRef.current.forEach((part, index) => {
      const isHead = index === 0;
      const inset = isHead ? 0.5 : 1;
      context.fillStyle = LCD_INK;
      context.fillRect(
        part.x * CELL + inset,
        part.y * CELL + inset,
        CELL - inset * 2,
        CELL - inset * 2,
      );
    });
  }, []);

  const reset = useCallback(() => {
    snakeRef.current = initialSnake();
    directionRef.current = "right";
    turnQueueRef.current = [];
    scoreRef.current = 0;
    setScore(0);
    placeFood();
    draw();
  }, [draw, placeFood]);

  const endGame = useCallback(() => {
    updateStatus("over");
    setHighScore((current) => {
      if (scoreRef.current <= current) return current;
      writeHighScore(scoreRef.current);
      return scoreRef.current;
    });
  }, [updateStatus]);

  const step = useCallback(() => {
    const nextDirection = turnQueueRef.current.shift() ?? directionRef.current;
    directionRef.current = nextDirection;

    const snake = snakeRef.current;
    const vector = VECTORS[nextDirection];
    const head = { x: snake[0].x + vector.x, y: snake[0].y + vector.y };

    if (head.x < 0 || head.y < 0 || head.x >= COLS || head.y >= ROWS) {
      endGame();
      return;
    }

    const eats = head.x === foodRef.current.x && head.y === foodRef.current.y;
    // Sin comer, la cola libera su celda en este mismo paso: no cuenta como choque.
    const body = eats ? snake : snake.slice(0, -1);

    if (body.some((part) => part.x === head.x && part.y === head.y)) {
      endGame();
      return;
    }

    const nextSnake = [head, ...snake];
    if (!eats) {
      nextSnake.pop();
    } else {
      scoreRef.current += 1;
      setScore(scoreRef.current);
    }

    snakeRef.current = nextSnake;
    if (eats) placeFood();

    draw();
  }, [draw, endGame, placeFood]);

  // Loop con acumulador: rAF marca el ritmo, el intervalo define la velocidad.
  useEffect(() => {
    if (status !== "playing") return;

    lastStepRef.current = 0;

    const tick = (time: number) => {
      frameRef.current = window.requestAnimationFrame(tick);

      if (lastStepRef.current === 0) {
        lastStepRef.current = time;
        return;
      }

      if (time - lastStepRef.current < stepDurationFor(scoreRef.current)) return;

      lastStepRef.current = time;
      step();
    };

    frameRef.current = window.requestAnimationFrame(tick);

    return () => {
      if (frameRef.current !== null) {
        window.cancelAnimationFrame(frameRef.current);
        frameRef.current = null;
      }
    };
  }, [status, step]);

  // Pestaña oculta o ventana sin foco: se pausa en vez de seguir corriendo.
  useEffect(() => {
    const pauseIfPlaying = () => {
      if (statusRef.current === "playing") updateStatus("paused");
    };

    const handleVisibility = () => {
      if (document.hidden) pauseIfPlaying();
    };

    window.addEventListener("blur", pauseIfPlaying);
    document.addEventListener("visibilitychange", handleVisibility);
    return () => {
      window.removeEventListener("blur", pauseIfPlaying);
      document.removeEventListener("visibilitychange", handleVisibility);
    };
  }, [updateStatus]);

  useEffect(() => {
    draw();
  }, [draw]);

  const start = useCallback(() => {
    reset();
    updateStatus("playing");
  }, [reset, updateStatus]);

  /** Único punto de entrada del botón/tecla de acción según el estado actual. */
  const toggle = useCallback(() => {
    switch (statusRef.current) {
      case "idle":
      case "over":
        start();
        break;
      case "playing":
        updateStatus("paused");
        break;
      case "paused":
        updateStatus("playing");
        break;
    }
  }, [start, updateStatus]);

  const turn = useCallback(
    (direction: Direction) => {
      if (statusRef.current === "paused") {
        updateStatus("playing");
      } else if (statusRef.current !== "playing") {
        return;
      }

      const queue = turnQueueRef.current;
      const previous = queue.at(-1) ?? directionRef.current;
      if (direction === previous || direction === OPPOSITES[previous]) return;
      if (queue.length >= 2) return;

      queue.push(direction);
    },
    [updateStatus],
  );

  return {
    canvasRef,
    cols: COLS,
    rows: ROWS,
    cell: CELL,
    status,
    score,
    highScore,
    start,
    toggle,
    turn,
  };
};
