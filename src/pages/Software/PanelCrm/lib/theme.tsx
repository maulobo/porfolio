import { createContext, useContext } from "react";

export type CrmTheme = "dark" | "light";

export const CrmThemeContext = createContext<CrmTheme>("dark");

export const useCrmTheme = () => useContext(CrmThemeContext);

/**
 * Paleta en hex para SVG.
 *
 * Recharts pinta con atributos de presentación y gradientes propios, donde no
 * podemos confiar en `var(--crm-*)`. Estos valores replican los tokens de
 * `crm.css`: si se tocan allá, hay que tocarlos acá.
 */
export const CHART_COLORS: Record<CrmTheme, {
  series1: string;
  series2: string;
  grid: string;
  axis: string;
  surface: string;
  border: string;
  text: string;
}> = {
  dark: {
    series1: "#4c8df6",
    series2: "#3dd68c",
    grid: "#272d38",
    axis: "#96a0b0",
    surface: "#161920",
    border: "#272d38",
    text: "#e8ecf3",
  },
  light: {
    series1: "#1f6feb",
    series2: "#15a05c",
    grid: "#e2e8f0",
    axis: "#55657c",
    surface: "#ffffff",
    border: "#e2e8f0",
    text: "#0f1b2d",
  },
};
