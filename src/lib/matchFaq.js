// مطابقة بالكلمات المفتاحية (بدون ذكاء اصطناعي). تُوحَّد الحروف العربية لتقليل أخطاء الكتابة.
export const norm = (s) =>
  s.toLowerCase()
    .replace(/[\u064B-\u065F\u0640]/g, "")      // التشكيل والتطويل
    .replace(/[أإآ]/g, "ا").replace(/ى/g, "ي").replace(/ة/g, "ه")
    .replace(/[^\p{L}\p{N}\s]/gu, " ").replace(/\s+/g, " ").trim();

export const isArabic = (s) => /[\u0600-\u06FF]/.test(s);

export function matchFaq(text, faq) {
  const q = ` ${norm(text)} `;
  let best = null, bestScore = 0;
  for (const e of faq) {
    let score = 0;
    for (const k of e.keywords) {
      const nk = norm(k);
      // الكلمات القصيرة تُطابَق ككلمة كاملة حتى لا تظهر داخل كلمات أخرى
      const hit = nk.length <= 3 ? q.includes(` ${nk} `) : q.includes(nk);
      if (hit) score += nk.length;               // الكلمة الأطول = أدق
    }
    if (score > bestScore) { best = e; bestScore = score; }
  }
  return best;
}
