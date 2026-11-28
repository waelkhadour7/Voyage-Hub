/**
 * Official EU Schengen Short-Stay 90/180-Day Calculator Utility
 * Fully compliant with Regulation (EU) No 610/2013 and the official EU short-stay calculator rules.
 *
 * All dates are normalized to UTC midnight to avoid DST or timezone off-by-one errors.
 */

// 29 Schengen Member States (updated with Bulgaria & Romania air/sea entry 2024)
export const SCHENGEN_COUNTRIES = [
  { code: "AT", nameEn: "Austria", nameAr: "النمسا" },
  { code: "BE", nameEn: "Belgium", nameAr: "بلجيكا" },
  { code: "BG", nameEn: "Bulgaria", nameAr: "بلغاريا" },
  { code: "HR", nameEn: "Croatia", nameAr: "كرواتيا" },
  { code: "CZ", nameEn: "Czech Republic", nameAr: "جمهورية التشيك" },
  { code: "DK", nameEn: "Denmark", nameAr: "الدنمارك" },
  { code: "EE", nameEn: "Estonia", nameAr: "إستونيا" },
  { code: "FI", nameEn: "Finland", nameAr: "فنلندا" },
  { code: "FR", nameEn: "France", nameAr: "فرنسا" },
  { code: "DE", nameEn: "Germany", nameAr: "ألمانيا" },
  { code: "GR", nameEn: "Greece", nameAr: "اليونان" },
  { code: "HU", nameEn: "Hungary", nameAr: "المجر" },
  { code: "IS", nameEn: "Iceland", nameAr: "آيسلندا" },
  { code: "IT", nameEn: "Italy", nameAr: "إيطاليا" },
  { code: "LV", nameEn: "Latvia", nameAr: "لاتفيا" },
  { code: "LI", nameEn: "Liechtenstein", nameAr: "ليختنشتاين" },
  { code: "LT", nameEn: "Lithuania", nameAr: "ليتوانيا" },
  { code: "LU", nameEn: "Luxembourg", nameAr: "لوكسمبورغ" },
  { code: "MT", nameEn: "Malta", nameAr: "مالطا" },
  { code: "NL", nameEn: "Netherlands", nameAr: "هولندا" },
  { code: "NO", nameEn: "Norway", nameAr: "النرويج" },
  { code: "PL", nameEn: "Poland", nameAr: "بولندا" },
  { code: "PT", nameEn: "Portugal", nameAr: "البرتغال" },
  { code: "RO", nameEn: "Romania", nameAr: "رومانيا" },
  { code: "SK", nameEn: "Slovakia", nameAr: "سلوفاكيا" },
  { code: "SI", nameEn: "Slovenia", nameAr: "سلوفينيا" },
  { code: "ES", nameEn: "Spain", nameAr: "إسبانيا" },
  { code: "SE", nameEn: "Sweden", nameAr: "السويد" },
  { code: "CH", nameEn: "Switzerland", nameAr: "سويسرا" },
];

const MS_PER_DAY = 86400000;

/**
 * Normalizes a date string ("YYYY-MM-DD") or Date object to UTC timestamp at midnight.
 */
export function parseDateUTC(dateInput) {
  if (!dateInput) return null;
  if (typeof dateInput === "number") return dateInput;
  if (dateInput instanceof Date) {
    return Date.UTC(dateInput.getUTCFullYear(), dateInput.getUTCMonth(), dateInput.getUTCDate());
  }
  const parts = String(dateInput).trim().split("-");
  if (parts.length !== 3) return null;
  const y = parseInt(parts[0], 10);
  const m = parseInt(parts[1], 10) - 1;
  const d = parseInt(parts[2], 10);
  if (isNaN(y) || isNaN(m) || isNaN(d)) return null;
  return Date.UTC(y, m, d);
}

/**
 * Formats a UTC timestamp to "YYYY-MM-DD".
 */
export function formatDateUTC(timestamp) {
  if (!timestamp || isNaN(timestamp)) return "";
  const d = new Date(timestamp);
  const year = d.getUTCFullYear();
  const month = String(d.getUTCMonth() + 1).padStart(2, "0");
  const day = String(d.getUTCDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

/**
 * Calculates number of days between start and end (inclusive of both entry & exit dates).
 */
export function getDaysCount(entryDate, exitDate) {
  const start = parseDateUTC(entryDate);
  const end = parseDateUTC(exitDate);
  if (start === null || end === null || end < start) return 0;
  return Math.round((end - start) / MS_PER_DAY) + 1;
}

/**
 * Validates a new trip object before adding to log.
 */
export function validateTrip(newTrip, existingTrips = []) {
  if (!newTrip.entryDate || !newTrip.exitDate) {
    return { valid: false, error: "both_dates_required" };
  }
  const start = parseDateUTC(newTrip.entryDate);
  const end = parseDateUTC(newTrip.exitDate);

  if (!start || !end) {
    return { valid: false, error: "invalid_date_format" };
  }

  if (end < start) {
    return { valid: false, error: "exit_before_entry" };
  }

  // Check overlap with existing trips (excluding current trip ID if editing)
  for (const t of existingTrips) {
    if (newTrip.id && t.id === newTrip.id) continue;
    const tStart = parseDateUTC(t.entryDate);
    const tEnd = parseDateUTC(t.exitDate);
    if (!tStart || !tEnd) continue;

    if (start <= tEnd && end >= tStart) {
      return { valid: false, error: "overlapping_trips", conflictingTrip: t };
    }
  }

  return { valid: true, error: null };
}

/**
 * Expands a list of trip objects into a Set of UTC timestamp days spent in Schengen.
 */
export function buildSchengenStaySet(trips) {
  const staySet = new Set();
  if (!Array.isArray(trips)) return staySet;

  for (const trip of trips) {
    const start = parseDateUTC(trip.entryDate);
    const end = parseDateUTC(trip.exitDate);
    if (start === null || end === null || end < start) continue;

    let curr = start;
    while (curr <= end) {
      staySet.add(curr);
      curr += MS_PER_DAY;
    }
  }

  return staySet;
}

/**
 * Official Control / Check Mode calculation.
 * Computes Schengen status for a given checkDate (defaults to today).
 */
export function calculateSchengenStatus(trips, checkDateInput = new Date()) {
  const checkTimestamp = parseDateUTC(checkDateInput) || parseDateUTC(new Date());
  const windowStart = checkTimestamp - (180 - 1) * MS_PER_DAY; // 180 days inclusive
  const staySet = buildSchengenStaySet(trips);

  let daysUsed = 0;
  let overstayStart = null;
  let overstayEnd = null;

  // Track daily usage in the 180-day window
  let windowCount = 0;
  for (let t = windowStart; t <= checkTimestamp; t += MS_PER_DAY) {
    if (staySet.has(t)) {
      daysUsed++;
      windowCount++;
      if (windowCount > 90) {
        if (!overstayStart) overstayStart = t;
        overstayEnd = t;
      }
    }
  }

  const daysRemaining = Math.max(0, 90 - daysUsed);
  const isOverstay = daysUsed > 90;
  const overstayAmount = isOverstay ? daysUsed - 90 : 0;

  // Identify next rolling drop-off date (when older trip days drop out of window)
  let nextDropOffDate = null;
  let nextDropOffDays = 0;

  for (let offset = 1; offset <= 180; offset++) {
    const futureCheck = checkTimestamp + offset * MS_PER_DAY;
    const futureWindowStart = futureCheck - 179 * MS_PER_DAY;
    // Check if the day dropping off (futureWindowStart - 1 day) was in staySet
    const droppedDay = futureWindowStart - MS_PER_DAY;
    if (staySet.has(droppedDay)) {
      nextDropOffDate = formatDateUTC(futureCheck);
      nextDropOffDays = 1;
      break;
    }
  }

  // Calculate upcoming expiring days in the next 30 days
  let expiringIn30Days = 0;
  for (let i = 0; i < 30; i++) {
    const dayToDrop = windowStart + i * MS_PER_DAY;
    if (staySet.has(dayToDrop)) {
      expiringIn30Days++;
    }
  }

  return {
    checkDate: formatDateUTC(checkTimestamp),
    windowStart: formatDateUTC(windowStart),
    windowEnd: formatDateUTC(checkTimestamp),
    daysUsed,
    daysRemaining,
    isOverstay,
    overstayAmount,
    overstayStart: overstayStart ? formatDateUTC(overstayStart) : null,
    overstayEnd: overstayEnd ? formatDateUTC(overstayEnd) : null,
    nextDropOffDate,
    nextDropOffDays,
    expiringIn30Days,
    statusLevel: isOverstay ? "overstay" : daysRemaining <= 10 ? "warning" : "safe",
  };
}

/**
 * Official Planning Mode calculation.
 * Given a planned future entry date, calculates maximum consecutive days allowed
 * and identifies when days recover.
 */
export function calculateMaxStayFromDate(trips, plannedEntryDateInput, skipRecoveryCheck = false) {
  const entryTimestamp = parseDateUTC(plannedEntryDateInput);
  if (!entryTimestamp) {
    return { error: "invalid_entry_date" };
  }

  // Combine existing trips with a simulated continuous stay starting on plannedEntryDate
  const existingStaySet = buildSchengenStaySet(trips);

  let maxConsecutiveDays = 0;
  let simDay = entryTimestamp;

  while (maxConsecutiveDays < 90) {
    // Current check date during the planned stay
    const checkDate = simDay;
    const windowStart = checkDate - 179 * MS_PER_DAY;

    // Count existing days in window [windowStart, checkDate]
    let daysInWindow = 0;
    for (let t = windowStart; t <= checkDate; t += MS_PER_DAY) {
      if (t >= entryTimestamp && t <= simDay) {
        // Simulated current stay day
        daysInWindow++;
      } else if (existingStaySet.has(t)) {
        // Past existing stay day
        daysInWindow++;
      }
    }

    if (daysInWindow > 90) {
      break;
    }

    maxConsecutiveDays++;
    simDay += MS_PER_DAY;
  }

  const maxExitTimestamp = maxConsecutiveDays > 0 ? entryTimestamp + (maxConsecutiveDays - 1) * MS_PER_DAY : null;

  // Find next recovery date if maxConsecutiveDays < 90
  let nextRecoveryDate = null;
  if (!skipRecoveryCheck && maxConsecutiveDays < 90) {
    for (let offset = 1; offset <= 180; offset++) {
      const candidateEntry = entryTimestamp + offset * MS_PER_DAY;
      const res = calculateMaxStayFromDate(trips, formatDateUTC(candidateEntry), true);
      if (res.maxConsecutiveDays > maxConsecutiveDays) {
        nextRecoveryDate = formatDateUTC(candidateEntry);
        break;
      }
    }
  }

  return {
    plannedEntryDate: formatDateUTC(entryTimestamp),
    maxConsecutiveDays,
    maxExitDate: maxExitTimestamp ? formatDateUTC(maxExitTimestamp) : null,
    nextRecoveryDate,
    isFullStayAllowed: maxConsecutiveDays === 90,
  };
}

/**
 * Generates a rolling timeline array for calendar/chart rendering over `numDays` from `startDate`.
 */
export function generateRollingTimeline(trips, startDateInput = new Date(), numDays = 180) {
  const startTimestamp = parseDateUTC(startDateInput) || parseDateUTC(new Date());
  const staySet = buildSchengenStaySet(trips);
  const timeline = [];

  for (let i = 0; i < numDays; i++) {
    const currentTimestamp = startTimestamp + i * MS_PER_DAY;
    const windowStart = currentTimestamp - 179 * MS_PER_DAY;

    let windowUsed = 0;
    for (let t = windowStart; t <= currentTimestamp; t += MS_PER_DAY) {
      if (staySet.has(t)) windowUsed++;
    }

    const dateStr = formatDateUTC(currentTimestamp);
    const inSchengen = staySet.has(currentTimestamp);
    const isOverstay = windowUsed > 90;
    const isExpiringSoon = staySet.has(windowStart); // Day dropping off today

    timeline.push({
      dateStr,
      timestamp: currentTimestamp,
      inSchengen,
      windowUsed,
      daysRemaining: Math.max(0, 90 - windowUsed),
      isOverstay,
      isExpiringSoon,
    });
  }

  return timeline;
}
