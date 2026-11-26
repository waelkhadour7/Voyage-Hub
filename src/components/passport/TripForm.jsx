import { useState } from "react";
import { X, Check } from "lucide-react";

export default function TripForm({
  country,
  initialData = null,
  onSubmit,
  onClose,
  lang,
}) {
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 60 }, (_, i) => currentYear + 1 - i);
  const months = [
    { value: 1, en: "Jan", ar: "يناير" },
    { value: 2, en: "Feb", ar: "فبراير" },
    { value: 3, en: "Mar", ar: "مارس" },
    { value: 4, en: "Apr", ar: "أبريل" },
    { value: 5, en: "May", ar: "مايو" },
    { value: 6, en: "Jun", ar: "يونيو" },
    { value: 7, en: "Jul", ar: "يوليو" },
    { value: 8, en: "Aug", ar: "أغسطس" },
    { value: 9, en: "Sep", ar: "سبتمبر" },
    { value: 10, en: "Oct", ar: "أكتوبر" },
    { value: 11, en: "Nov", ar: "نوفمبر" },
    { value: 12, en: "Dec", ar: "ديسمبر" },
  ];

  const [startYear, setStartYear] = useState(
    initialData?.start?.y || currentYear
  );
  const [startMonth, setStartMonth] = useState(
    initialData?.start?.m || new Date().getMonth() + 1
  );
  const [hasEndDate, setHasEndDate] = useState(!!initialData?.end);
  const [endYear, setEndYear] = useState(initialData?.end?.y || currentYear);
  const [endMonth, setEndMonth] = useState(initialData?.end?.m || 12);
  const [city, setCity] = useState(initialData?.city || "");
  const [note, setNote] = useState(initialData?.note || "");
  const [error, setError] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError(null);

    if (hasEndDate) {
      if (endYear < startYear || (endYear === startYear && endMonth < startMonth)) {
        setError(
          lang === "ar"
            ? "تاريخ النهاية لا يمكن أن يكون قبل تاريخ البداية"
            : "End date cannot be before start date"
        );
        return;
      }
    }

    const payload = {
      country: country.id,
      start: { y: parseInt(startYear, 10), m: parseInt(startMonth, 10) },
      end: hasEndDate
        ? { y: parseInt(endYear, 10), m: parseInt(endMonth, 10) }
        : null,
      city: city.trim(),
      note: note.trim().slice(0, 140),
    };

    onSubmit(payload);
  };

  return (
    <div className="pp-sheet-backdrop" onMouseDown={(e) => e.target === e.currentTarget && onClose()}>
      <div className="pp-sheet" role="dialog" aria-modal="true" aria-label="Add Trip">
        <button type="button" className="pp-sheet-close" onClick={onClose} aria-label="Close">
          <X size={20} />
        </button>

        <h3 className="pp-sheet-title">
          {lang === "ar" ? `إضافة رحلة إلى ${country.name}` : `Add Trip to ${country.name}`}
        </h3>

        {error && <div className="pp-form-error">{error}</div>}

        <form onSubmit={handleSubmit} className="pp-trip-form">
          {/* Start Date */}
          <div className="pp-field-group">
            <label className="pp-label">
              {lang === "ar" ? "تاريخ الرحلة (البداية) *" : "Trip Start Date *"}
            </label>
            <div className="pp-date-row">
              <select
                value={startMonth}
                onChange={(e) => setStartMonth(e.target.value)}
                className="pp-select"
                aria-label="Start Month"
              >
                {months.map((m) => (
                  <option key={m.value} value={m.value}>
                    {lang === "ar" ? m.ar : m.en}
                  </option>
                ))}
              </select>

              <select
                value={startYear}
                onChange={(e) => setStartYear(e.target.value)}
                className="pp-select"
                aria-label="Start Year"
              >
                {years.map((y) => (
                  <option key={y} value={y}>
                    {y}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Optional End Date Toggle */}
          <div className="pp-field-group">
            <label className="pp-checkbox-label">
              <input
                type="checkbox"
                checked={hasEndDate}
                onChange={(e) => setHasEndDate(e.target.checked)}
              />
              <span>{lang === "ar" ? "تأكيد تاريخ النهاية" : "Set End Date"}</span>
            </label>

            {hasEndDate && (
              <div className="pp-date-row">
                <select
                  value={endMonth}
                  onChange={(e) => setEndMonth(e.target.value)}
                  className="pp-select"
                  aria-label="End Month"
                >
                  {months.map((m) => (
                    <option key={m.value} value={m.value}>
                      {lang === "ar" ? m.ar : m.en}
                    </option>
                  ))}
                </select>

                <select
                  value={endYear}
                  onChange={(e) => setEndYear(e.target.value)}
                  className="pp-select"
                  aria-label="End Year"
                >
                  {years.map((y) => (
                    <option key={y} value={y}>
                      {y}
                    </option>
                  ))}
                </select>
              </div>
            )}
          </div>

          {/* City / Place */}
          <div className="pp-field-group">
            <label htmlFor="pp-city-input" className="pp-label">
              {lang === "ar" ? "المدينة / المكان (اختياري)" : "City / Region (Optional)"}
            </label>
            <input
              id="pp-city-input"
              type="text"
              className="pp-input"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              placeholder={lang === "ar" ? "مثال: مانيلا، دبي، طوكيو" : "e.g., Manila, Tokyo, Dubai"}
              dir="auto"
            />
          </div>

          {/* Short Note */}
          <div className="pp-field-group">
            <label htmlFor="pp-note-input" className="pp-label">
              {lang === "ar" ? "ملاحظات وتفاصيل (140 حرف)" : "Trip Note (max 140 chars)"}
            </label>
            <textarea
              id="pp-note-input"
              className="pp-textarea"
              maxLength={140}
              value={note}
              onChange={(e) => setNote(e.target.value)}
              placeholder={lang === "ar" ? "اكتب ذكرى صغيرة..." : "A short memory or milestone..."}
              dir="auto"
            />
          </div>

          <button type="submit" className="pp-btn-save">
            <Check size={16} />
            <span>{lang === "ar" ? "حفظ وتوليد الختم" : "Save & Generate Stamp"}</span>
          </button>
        </form>
      </div>
    </div>
  );
}
