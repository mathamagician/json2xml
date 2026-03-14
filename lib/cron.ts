const MONTH_NAMES = ["", "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
const DAY_NAMES = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

function parseField(field: string, min: number, max: number): number[] {
  const values = new Set<number>();

  for (const part of field.split(",")) {
    const stepMatch = part.match(/^(.+)\/(\d+)$/);
    let range: string;
    let step = 1;

    if (stepMatch) {
      range = stepMatch[1];
      step = parseInt(stepMatch[2]);
    } else {
      range = part;
    }

    if (range === "*") {
      for (let i = min; i <= max; i += step) values.add(i);
    } else if (range.includes("-")) {
      const [start, end] = range.split("-").map(Number);
      for (let i = start; i <= end; i += step) values.add(i);
    } else {
      values.add(parseInt(range));
    }
  }

  return Array.from(values).sort((a, b) => a - b);
}

function describeField(field: string, unit: string, names?: string[]): string {
  if (field === "*") return `every ${unit}`;

  const stepMatch = field.match(/^\*\/(\d+)$/);
  if (stepMatch) return `every ${stepMatch[1]} ${unit}s`;

  const parts = field.split(",").map((p) => {
    if (p.includes("-")) {
      const [start, end] = p.split("-");
      const s = names ? names[parseInt(start)] : start;
      const e = names ? names[parseInt(end)] : end;
      return `${s}-${e}`;
    }
    return names ? names[parseInt(p)] ?? p : p;
  });

  return parts.join(", ");
}

export function cronToHuman(expression: string): string {
  const parts = expression.trim().split(/\s+/);
  if (parts.length !== 5) throw new Error("Cron expression must have exactly 5 fields: minute hour day month weekday");

  const [minute, hour, day, month, weekday] = parts;

  const segments: string[] = [];

  // Minutes
  if (minute === "*") {
    segments.push("Every minute");
  } else if (minute.startsWith("*/")) {
    segments.push(`Every ${minute.slice(2)} minutes`);
  } else {
    segments.push(`At minute ${describeField(minute, "minute")}`);
  }

  // Hours
  if (hour !== "*") {
    segments.push(`past hour ${describeField(hour, "hour")}`);
  }

  // Day of month
  if (day !== "*") {
    segments.push(`on day ${describeField(day, "day")} of the month`);
  }

  // Month
  if (month !== "*") {
    segments.push(`in ${describeField(month, "month", MONTH_NAMES)}`);
  }

  // Day of week
  if (weekday !== "*") {
    segments.push(`on ${describeField(weekday, "day", DAY_NAMES)}`);
  }

  return segments.join(" ");
}

export function getNextRuns(expression: string, count: number = 5): Date[] {
  const parts = expression.trim().split(/\s+/);
  if (parts.length !== 5) throw new Error("Invalid cron expression");

  const minutes = parseField(parts[0], 0, 59);
  const hours = parseField(parts[1], 0, 23);
  const days = parseField(parts[2], 1, 31);
  const months = parseField(parts[3], 1, 12);
  const weekdays = parseField(parts[4], 0, 6);

  const allDays = parts[2] === "*";
  const allWeekdays = parts[4] === "*";

  const results: Date[] = [];
  const now = new Date();
  const candidate = new Date(now);
  candidate.setSeconds(0);
  candidate.setMilliseconds(0);
  candidate.setMinutes(candidate.getMinutes() + 1);

  let safety = 0;
  while (results.length < count && safety < 525600) { // max 1 year of minutes
    safety++;
    const m = candidate.getMinutes();
    const h = candidate.getHours();
    const d = candidate.getDate();
    const mo = candidate.getMonth() + 1;
    const wd = candidate.getDay();

    if (
      minutes.includes(m) &&
      hours.includes(h) &&
      months.includes(mo) &&
      (allDays || days.includes(d)) &&
      (allWeekdays || weekdays.includes(wd))
    ) {
      results.push(new Date(candidate));
    }

    candidate.setMinutes(candidate.getMinutes() + 1);
  }

  return results;
}
