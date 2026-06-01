import { useEffect, useRef, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Bot, X, RotateCcw } from "lucide-react";
import { chatbotFlow, type ChatOption } from "./chatbotFlow";
import ChatbotBubble from "./ChatbotBubble";
import ChatbotOptions from "./ChatbotOptions";
import BoomAnimation from "./BoomAnimation";

type HistoryItem = { type: "bot" | "user"; text: string; detail?: string };

const TypingBubble = () => (
  <div className="mb-4 flex items-start gap-2">
    <div className="mt-1 flex h-7 w-7 shrink-0 items-center justify-center border-2 border-black bg-white shadow-[2px_2px_0_#111111]">
      <span className="font-mono text-[10px] font-black uppercase text-black">B</span>
    </div>
    <div className="relative max-w-[85%] border-2 border-black bg-white p-3 shadow-[3px_3px_0_#111111]">
      <span
        style={{
          position: "absolute",
          left: "-10px",
          top: "10px",
          width: 0,
          height: 0,
          borderTop: "7px solid transparent",
          borderBottom: "7px solid transparent",
          borderRight: "10px solid #111111",
        }}
      />
      <span
        style={{
          position: "absolute",
          left: "-6px",
          top: "10px",
          width: 0,
          height: 0,
          borderTop: "7px solid transparent",
          borderBottom: "7px solid transparent",
          borderRight: "10px solid white",
        }}
      />
      <div className="flex gap-1.5 px-1">
        <span className="h-2 w-2 animate-bounce rounded-full bg-black" style={{ animationDelay: "0ms" }} />
        <span className="h-2 w-2 animate-bounce rounded-full bg-black" style={{ animationDelay: "150ms" }} />
        <span className="h-2 w-2 animate-bounce rounded-full bg-black" style={{ animationDelay: "300ms" }} />
      </div>
    </div>
  </div>
);

const buildSummary = (history: HistoryItem[]): string => {
  const lines: string[] = ["Resumen de la conversación:"];
  for (let i = 0; i < history.length; i++) {
    const item = history[i];
    if (item.type === "user") {
      lines.push(`- Elegió: ${item.text}`);
    }
  }
  return lines.join("%0A");
};

const ChatbotPanel = ({
  onClose,
  showBoom,
  onBoomComplete,
}: {
  onClose: () => void;
  showBoom: boolean;
  onBoomComplete: () => void;
}) => {
  const [currentNodeId, setCurrentNodeId] = useState("start");
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [isTyping, setIsTyping] = useState(true);
  const [showOptions, setShowOptions] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  const currentNode = chatbotFlow[currentNodeId];

  const scrollToBottom = useCallback(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [history, isTyping, showOptions, scrollToBottom]);

  const revealOptions = () => {
    setIsTyping(false);
    setTimeout(() => setShowOptions(true), 900);
  };

  const sendBotMessages = (node: (typeof chatbotFlow)[string], onDone: () => void) => {
    const t1 = setTimeout(() => {
      setHistory((prev) => [...prev, { type: "bot", text: node.message }]);
      if (node.detail) {
        const t2 = setTimeout(() => {
          setHistory((prev) => [...prev, { type: "bot", text: node.detail! }]);
          onDone();
        }, 900 + Math.random() * 300);
        return () => clearTimeout(t2);
      } else {
        onDone();
      }
    }, 900 + Math.random() * 400);
    return () => clearTimeout(t1);
  };

  // Initial greeting
  useEffect(() => {
    const cleanup = sendBotMessages(chatbotFlow.start, revealOptions);
    return cleanup;
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSelect = (option: ChatOption) => {
    const nextNode = chatbotFlow[option.nextId];
    setHistory((prev) => [...prev, { type: "user", text: option.label }]);
    setIsTyping(true);
    setShowOptions(false);
    setCurrentNodeId(option.nextId);
    sendBotMessages(nextNode, revealOptions);
  };

  const handleReset = () => {
    setCurrentNodeId("start");
    setHistory([]);
    setIsTyping(true);
    setShowOptions(false);
    sendBotMessages(chatbotFlow.start, revealOptions);
  };

  // Build CTA href with summary
  const getCtaHref = (): string => {
    if (!currentNode.cta) return "";
    const summary = buildSummary(history);
    const base = currentNode.cta.href;

    if (base.startsWith("https://wa.me")) {
      const text = `Hola SmartCloud, vengo del chat y quiero avanzar.%0A%0A${summary}`;
      return `${base}?text=${text}`;
    }

    if (base.startsWith("mailto:")) {
      const subject = "Nuevo contacto desde el chatbot";
      const body = `Hola SmartCloud,%0A%0AVengo del chatbot del sitio. Este es el resumen de mi conversación:%0A%0A${summary}%0A%0AGracias.`;
      return `${base}?subject=${encodeURIComponent(subject)}&body=${body}`;
    }

    return base;
  };

  const isTerminal =
    showOptions && currentNode.options.length === 0 && !currentNode.cta;

  return (
    <motion.div
      initial={{ opacity: 0, y: 16, scale: 0.97 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 16, scale: 0.97 }}
      transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
      className="relative flex flex-col overflow-hidden border-2 border-black bg-white text-[#111111] shadow-[10px_10px_0_#111111]"
      style={{ width: "400px", maxWidth: "calc(100vw - 2rem)", maxHeight: "75vh", height: "640px" }}
    >
      {showBoom && <BoomAnimation onComplete={onBoomComplete} />}

      {/* Header */}
      <div className="flex shrink-0 items-center justify-between border-b-2 border-black bg-[#d7ff4f] px-4 py-3.5">
        <div className="flex items-center gap-2.5">
          <Bot className="h-5 w-5 text-black" />
          <span className="font-mono text-xs font-black uppercase tracking-[0.22rem] text-black">
            SmartCloud Bot
          </span>
        </div>
        <button
          onClick={onClose}
          className="flex h-7 w-7 items-center justify-center border-2 border-black bg-white font-mono text-lg leading-none text-black shadow-[2px_2px_0_#111111] transition-all hover:-translate-y-0.5 hover:shadow-[3px_3px_0_#111111]"
          aria-label="Cerrar chat"
        >
          <X className="h-4 w-4" />
        </button>
      </div>

      {/* Messages */}
      <div
        ref={scrollRef}
        data-lenis-prevent
        className="min-h-0 flex-1 overflow-y-auto px-4 pt-5"
        style={{
          background: "#f3f0e8",
          backgroundImage: "radial-gradient(circle, #11111108 1px, transparent 1px)",
          backgroundSize: "16px 16px",
        }}
      >
        <AnimatePresence initial={false}>
          {history.map((item, i) => (
            <motion.div
              key={`${i}-${item.text.slice(0, 20)}`}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            >
              <ChatbotBubble text={item.text} type={item.type} index={i} />
            </motion.div>
          ))}
        </AnimatePresence>

        <AnimatePresence>
          {isTyping && (
            <motion.div
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 6 }}
              transition={{ duration: 0.2 }}
            >
              <TypingBubble />
            </motion.div>
          )}
        </AnimatePresence>
        <div className="h-3" />
      </div>

      {/* Options or CTA */}
      <div className="shrink-0 border-t-2 border-black bg-white pt-2">
        {showOptions && currentNode.options.length > 0 ? (
          <ChatbotOptions options={currentNode.options} onSelect={handleSelect} />
        ) : showOptions && currentNode.cta ? (
          <div className="flex flex-col gap-2 px-4 pb-4 pt-1">
            <a
              href={getCtaHref()}
              target="_blank"
              rel="noopener noreferrer"
              className="clickable block border-2 border-black bg-[#d7ff4f] px-5 py-3.5 text-center font-mono text-xs font-black uppercase tracking-[0.14rem] text-[#111111] shadow-[4px_4px_0_#111111] transition-all hover:-translate-y-0.5 hover:bg-[#c8f040] hover:shadow-[6px_6px_0_#111111]"
            >
              {currentNode.cta.label}
            </a>
            <button
              onClick={handleReset}
              className="clickable flex items-center justify-center gap-2 border-2 border-black bg-white px-5 py-2.5 font-mono text-[10px] font-black uppercase tracking-[0.14rem] text-black shadow-[3px_3px_0_#111111] transition-all hover:-translate-y-0.5 hover:bg-[#f3f0e8] hover:shadow-[5px_5px_0_#111111]"
            >
              <RotateCcw size={12} />
              Volver al inicio
            </button>
          </div>
        ) : isTerminal ? (
          <div className="px-4 pb-4 pt-1">
            <button
              onClick={handleReset}
              className="clickable flex w-full items-center justify-center gap-2 border-2 border-black bg-white px-5 py-3 font-mono text-xs font-black uppercase tracking-[0.14rem] text-black shadow-[4px_4px_0_#111111] transition-all hover:-translate-y-0.5 hover:bg-[#f3f0e8] hover:shadow-[6px_6px_0_#111111]"
            >
              <RotateCcw size={14} />
              Volver al inicio
            </button>
          </div>
        ) : null}
      </div>
    </motion.div>
  );
};

export default ChatbotPanel;
