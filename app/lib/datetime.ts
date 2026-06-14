/**
 * Indian Standard Time (Asia/Kolkata) formatting helpers.
 * All timestamps coming from the database are UTC, but we always
 * display them to the user in IST.
 */

const IST_TIMEZONE = "Asia/Kolkata";

/** Format a date as: "13 Jun 2026" in IST */
export function formatDateIST(input: string | number | Date): string {
  if (!input) return "";
  return new Intl.DateTimeFormat("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
    timeZone: IST_TIMEZONE,
  }).format(new Date(input));
}

/** Format a date+time as: "13 Jun 2026, 9:42 PM IST" */
export function formatDateTimeIST(input: string | number | Date): string {
  if (!input) return "";
  return new Intl.DateTimeFormat("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
    timeZone: IST_TIMEZONE,
  }).format(new Date(input)) + " IST";
}

/** Format a time only as: "9:42 PM" */
export function formatTimeIST(input: string | number | Date): string {
  if (!input) return "";
  return new Intl.DateTimeFormat("en-IN", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
    timeZone: IST_TIMEZONE,
  }).format(new Date(input));
}

/** Relative time ("2m ago", "3h ago", etc.). Timezone-independent (uses UTC ms diff). */
export function timeAgo(input: string | number | Date): string {
  if (!input) return "";
  const diff = (Date.now() - new Date(input).getTime()) / 1000;
  if (diff < 60) return "just now";
  if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
  if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
  if (diff < 7 * 86400) return `${Math.floor(diff / 86400)}d ago`;
  return formatDateIST(input);
}

/** Returns the current time in IST as a formatted string. */
export function nowIST(): string {
  return formatDateTimeIST(new Date());
}
