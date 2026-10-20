import type { GridScanProps } from "./GridScan";

/** Configuración aprobada del fondo: la comparten /servicios y /servicios/web. */
export const gridScanPreset = {
  linesColor: "#4d4757",
  scanColor: "#a855f7",
  cells: 8,
  depth: 1.8,
  scanDuration: 2.4,
  scanDelay: 1.6,
  clickEffect: "ping",
  lineThickness: 1,
  lineStyle: "solid",
  depthFade: 0.6,
  shading: 0.7,
  reflection: 0.35,
  points: true,
  scanDirection: "forward",
  scanWidth: 1,
  trail: 0.5,
  glow: 0.6,
  parallax: 1,
  autoScan: true,
  interactive: true,
  intro: true,
  lightMode: false,
} satisfies GridScanProps;
