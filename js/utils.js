/* Shared date/time + storage utilities for the whole project. */
window.BirthdayUtils = (() => {
  const C = window.BIRTHDAY_CONFIG;
  const pad = n => String(n).padStart(2, "0");

  function istParts(now = new Date()) {
    const parts = new Intl.DateTimeFormat("en-CA", {
      timeZone: C.timezone,
      year: "numeric", month: "2-digit", day: "2-digit",
      hour: "2-digit", minute: "2-digit", second: "2-digit",
      hourCycle: "h23"
    }).formatToParts(now);
    const out = {};
    parts.forEach(p => out[p.type] = p.value);
    return {
      year: Number(out.year), month: Number(out.month), day: Number(out.day),
      hour: Number(out.hour), minute: Number(out.minute), second: Number(out.second)
    };
  }

  function istDateString(year, month, day) {
    return `${year}-${pad(month)}-${pad(day)}T00:00:00+05:30`;
  }

  function startInstant() {
    return new Date(istDateString(C.year, C.journeyStart.month, C.journeyStart.day));
  }

  function birthdayInstant() {
    return new Date(istDateString(C.year, C.birthday.month, C.birthday.day));
  }

  function chapterStartInstant(chapter) {
    // Exact requested timeline:
    // 30 = Aug 13, 29 = Aug 14, ... 3 = Sep 9, 2 = Sep 10,
    // Chapter 2 remains active on Sep 11 as the one calendar buffer day,
    // and Chapter 1 unlocks on Sep 12.
    const start = new Date(startInstant().getTime());
    const daysAfter = chapter === 1 ? 30 : 30 - chapter;
    return new Date(start.getTime() + daysAfter * 86400000);
  }

  function chapterNumber(now = new Date()) {
    const t = now.getTime();
    const start = startInstant().getTime();
    const birthday = birthdayInstant().getTime();

    if (t < start) return 0;        // not started
    if (t >= birthday) return 0;    // birthday/finale
    const days = Math.floor((t - start) / 86400000);
    return Math.max(1, Math.min(30, 30 - days));
  }

  function isChapterUnlocked(chapter, now = new Date()) {
    return now.getTime() >= chapterStartInstant(chapter).getTime();
  }

  function state(now = new Date()) {
    const t = now.getTime();
    if (t < startInstant().getTime()) return "prestart";
    if (t >= birthdayInstant().getTime()) return "birthday";
    return "journey";
  }

  function diffParts(ms) {
    ms = Math.max(0, ms);
    const total = Math.floor(ms / 1000);
    return {
      days: Math.floor(total / 86400),
      hours: Math.floor((total % 86400) / 3600),
      minutes: Math.floor((total % 3600) / 60),
      seconds: total % 60
    };
  }

  function countdownTo(date) {
    return diffParts(date.getTime() - Date.now());
  }

  function formatCountdown(p) {
    return `${p.days}d ${pad(p.hours)}h ${pad(p.minutes)}m ${pad(p.seconds)}s`;
  }

  function chapterLabel(chapter) {
    return String(chapter).padStart(2, "0");
  }

  function chapterDateText(chapter) {
    const d = new Date(chapterStartInstant(chapter));
    return new Intl.DateTimeFormat("en-IN", {
      timeZone: C.timezone, day: "numeric", month: "short"
    }).format(d);
  }

  function storageGet(key, fallback = null) {
    try {
      const value = localStorage.getItem(key);
      return value === null ? fallback : JSON.parse(value);
    } catch {
      return fallback;
    }
  }

  function storageSet(key, value) {
    try { localStorage.setItem(key, JSON.stringify(value)); } catch {}
  }

  return {
    istParts, startInstant, birthdayInstant, chapterStartInstant,
    chapterNumber, isChapterUnlocked, state, diffParts, countdownTo,
    formatCountdown, chapterLabel, chapterDateText, storageGet, storageSet
  };
})();
