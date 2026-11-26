import { rules, sampleRules } from "../data/readiness";

export function getRule(nationalityCode, destinationCode) {
  if (!nationalityCode || !destinationCode) return null;

  // Check production rules first
  if (rules[nationalityCode] && rules[nationalityCode][destinationCode]) {
    return rules[nationalityCode][destinationCode];
  }

  // Fallback to sampleRules if in DEV mode
  if (import.meta.env.DEV && sampleRules[nationalityCode] && sampleRules[nationalityCode][destinationCode]) {
    return sampleRules[nationalityCode][destinationCode];
  }

  return null;
}

export function daysSince(dateString) {
  if (!dateString) return Infinity;
  const date = new Date(dateString);
  if (isNaN(date.getTime())) return Infinity;
  const now = new Date();
  const diffTime = Math.abs(now - date);
  return Math.floor(diffTime / (1000 * 60 * 60 * 24));
}

export function isRuleOutdated(lastReviewedDate) {
  if (!lastReviewedDate) return true;
  return daysSince(lastReviewedDate) > 90;
}

export function computeApplyBy(travelDateString, processingDaysArray) {
  if (!travelDateString || !Array.isArray(processingDaysArray) || processingDaysArray.length < 2) {
    return null;
  }

  const travelDate = new Date(travelDateString);
  if (isNaN(travelDate.getTime())) return null;

  const maxDays = processingDaysArray[1] || processingDaysArray[0] || 0;
  const bufferDays = 3;
  const totalLeadDays = maxDays + bufferDays;

  const applyByDate = new Date(travelDate);
  applyByDate.setDate(applyByDate.getDate() - totalLeadDays);

  const year = applyByDate.getFullYear();
  const month = String(applyByDate.getMonth() + 1).padStart(2, "0");
  const day = String(applyByDate.getDate()).padStart(2, "0");

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  return {
    dateString: `${year}-${month}-${day}`,
    isPast: applyByDate < today,
  };
}

export function passportCheck(travelDateString, expiryDateString, requiredValidityMonths) {
  if (!travelDateString || !expiryDateString || !requiredValidityMonths) {
    return null;
  }

  const travelDate = new Date(travelDateString);
  const expiryDate = new Date(expiryDateString);

  if (isNaN(travelDate.getTime()) || isNaN(expiryDate.getTime())) return null;

  const requiredExpiry = new Date(travelDate);
  requiredExpiry.setMonth(requiredExpiry.getMonth() + requiredValidityMonths);

  const isValid = expiryDate >= requiredExpiry;

  return {
    ok: isValid,
    message: isValid
      ? {
          en: `Passport is valid for at least ${requiredValidityMonths} months beyond travel date.`,
          ar: `جواز السفر ساري لمدة ${requiredValidityMonths} أشهر على الأقل بعد تاريخ السفر.`,
        }
      : {
          en: `Passport expires before the required ${requiredValidityMonths} months validity beyond travel date.`,
          ar: `تنتهي صلاحية جواز السفر قبل مدة ${requiredValidityMonths} أشهر المطلوبة بعد تاريخ السفر.`,
        },
  };
}
