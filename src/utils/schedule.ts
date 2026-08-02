import { restaurantContent } from '../data/restaurantContent';

export interface TimezoneStatus {
  isOpen: boolean;
  dayName: string;
  jstTimeString: string;
  timezoneLabel: string;
  statusText: string;
  todaySchedule: string;
}

export function getEstablishmentStatus(): TimezoneStatus {
  const { operatingHours } = restaurantContent;
  const timeZone = 'Asia/Tokyo';
  const now = new Date();

  // Day name in Tokyo timezone (UTC+9)
  const jstDayName = new Intl.DateTimeFormat('en-US', { weekday: 'long', timeZone }).format(now);

  // Time in Tokyo (24-hr format)
  const jstHour = parseInt(new Intl.DateTimeFormat('en-US', { hour: 'numeric', hour12: false, timeZone }).format(now), 10);
  const jstMinute = parseInt(new Intl.DateTimeFormat('en-US', { minute: 'numeric', timeZone }).format(now), 10);
  const currentMinutes = jstHour * 60 + jstMinute;

  // Formatted current JST time string (e.g. "6:30 PM")
  const jstTimeString = new Intl.DateTimeFormat('en-US', {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
    timeZone,
  }).format(now);

  const todayHours = operatingHours.find((h) => h.day === jstDayName);

  if (!todayHours) {
    return {
      isOpen: false,
      dayName: jstDayName,
      jstTimeString,
      timezoneLabel: 'JST (UTC+9)',
      statusText: `Closed Today (${jstDayName})`,
      todaySchedule: 'Closed',
    };
  }

  const parseTimeStr = (tStr: string) => {
    const match = tStr.match(/^(\d+):(\d+)\s*(AM|PM)$/i);
    if (!match) return 0;
    let [_, h, m, period] = match;
    let hours = parseInt(h, 10);
    const minutes = parseInt(m, 10);
    if (period.toUpperCase() === 'PM' && hours < 12) hours += 12;
    if (period.toUpperCase() === 'AM' && hours === 12) hours = 0;
    return hours * 60 + minutes;
  };

  const openMinutes = parseTimeStr(todayHours.open);
  const closeMinutes = parseTimeStr(todayHours.close);

  const isOpen = currentMinutes >= openMinutes && currentMinutes < closeMinutes;

  return {
    isOpen,
    dayName: jstDayName,
    jstTimeString,
    timezoneLabel: 'JST (UTC+9)',
    statusText: isOpen
      ? `Open Today • ${todayHours.open} – ${todayHours.close}`
      : `Closed Now • Opens at ${todayHours.open}`,
    todaySchedule: `${todayHours.open} – ${todayHours.close}`,
  };
}
