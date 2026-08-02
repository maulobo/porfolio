/**
 * Formateo y aritmética de fechas para el CRM de muestra.
 *
 * Las fechas del mock son strings `YYYY-MM-DD`. Se parsean a mediodía UTC para
 * que el desfase horario no corra un día el resultado en zonas negativas.
 */

const parseISODate = (value: string) => new Date(`${value.slice(0, 10)}T12:00:00Z`);

const moneyFormatters = new Map<string, Intl.NumberFormat>();

export function fmtMoney(amount: number, currency = "ARS") {
  let formatter = moneyFormatters.get(currency);
  if (!formatter) {
    formatter = new Intl.NumberFormat("es-AR", {
      style: "currency",
      currency,
      maximumFractionDigits: 0,
    });
    moneyFormatters.set(currency, formatter);
  }
  return formatter.format(amount);
}

const dateFormatter = new Intl.DateTimeFormat("es-AR", {
  day: "numeric",
  month: "short",
  year: "numeric",
});

export function fmtDate(isoDate: string | null | undefined) {
  if (!isoDate) return "—";
  return dateFormatter.format(parseISODate(isoDate)).replace(" de ", " ");
}

/** Días calendario desde hoy hasta la fecha dada. Negativo si ya pasó. */
export function daysTo(isoDate: string | null | undefined): number | null {
  if (!isoDate) return null;
  const target = parseISODate(isoDate);
  const now = new Date();
  const todayUTC = Date.UTC(now.getFullYear(), now.getMonth(), now.getDate(), 12);
  return Math.round((target.getTime() - todayUTC) / 86_400_000);
}

/**
 * Semáforo de vencimientos: verde > 5 días · amarillo ≤ 3 · rojo vencido o ≤ 1
 * · gris cuando no hay deadline o el ítem ya está cerrado.
 */
export type DeadlineColor = "green" | "yellow" | "red" | "grey";

export function deadlineColor(isoDate: string | null | undefined, done = false): DeadlineColor {
  if (done || !isoDate) return "grey";
  const d = daysTo(isoDate)!;
  if (d <= 1) return "red";
  if (d <= 5) return "yellow";
  return "green";
}

/** Iniciales para los avatares ("Ana Belén Prado" → "AB"). */
export function initials(fullName: string) {
  return fullName
    .split(" ")
    .filter(Boolean)
    .map((part) => part[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
}

/** Texto relativo corto para deadlines ("hoy", "mañana", "en 4 días"). */
export function relativeDays(days: number | null) {
  if (days === null) return "sin fecha";
  if (days === 0) return "hoy";
  if (days === 1) return "mañana";
  if (days < 0) return `hace ${Math.abs(days)} días`;
  return `en ${days} días`;
}
