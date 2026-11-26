import { Calendar, ShieldCheck, ArrowRight, ArrowLeft } from "lucide-react";

export default function TripDetails({
  travelDate,
  setTravelDate,
  passportExpiry,
  setPassportExpiry,
  onSubmit,
  onSkip,
  lang,
}) {
  const today = new Date().toISOString().split("T")[0];
  const isRtl = lang === "ar";

  return (
    <div className="rd-step-body">
      <h3 id="rd-step3-title" className="rd-step-title">
        {lang === "ar" ? "تفاصيل الرحلة (اختياري)" : "Trip & Passport Details (Optional)"}
      </h3>
      <p className="rd-step-desc">
        {lang === "ar"
          ? "أدخل تاريخ السفر وانتهاء الجواز لحساب مواعيد التقديم وتأكيد صلاحية الجواز."
          : "Add travel & passport dates to calculate apply-by deadlines and validity checks."}
      </p>

      <div className="rd-details-form">
        {/* Travel Date Input */}
        <div className="rd-field-group">
          <label htmlFor="rd-travel-date" className="rd-field-label">
            <Calendar size={15} />
            <span>{lang === "ar" ? "تاريخ السفر المتوقع" : "Expected Travel Date"}</span>
          </label>
          <input
            id="rd-travel-date"
            type="date"
            min={today}
            value={travelDate}
            onChange={(e) => setTravelDate(e.target.value)}
            className="rd-date-input"
            dir="auto"
          />
        </div>

        {/* Passport Expiry Input */}
        <div className="rd-field-group">
          <label htmlFor="rd-passport-expiry" className="rd-field-label">
            <ShieldCheck size={15} />
            <span>{lang === "ar" ? "تاريخ انتهاء جواز السفر" : "Passport Expiry Date"}</span>
          </label>
          <input
            id="rd-passport-expiry"
            type="date"
            value={passportExpiry}
            onChange={(e) => setPassportExpiry(e.target.value)}
            className="rd-date-input"
            dir="auto"
          />
        </div>

        <p className="rd-privacy-note">
          🔒 {lang === "ar" ? "محفوظ على هذا الجهاز فقط." : "Saved on this device only."}
        </p>

        <div className="rd-step3-actions">
          <button type="button" className="rd-btn-skip" onClick={onSkip}>
            {lang === "ar" ? "تخطي هذه الخطوة" : "Skip this step"}
          </button>
          <button type="button" className="rd-btn-primary" onClick={onSubmit}>
            <span>{lang === "ar" ? "عرض النتيجة" : "Show Results"}</span>
            {isRtl ? <ArrowLeft size={16} /> : <ArrowRight size={16} />}
          </button>
        </div>
      </div>
    </div>
  );
}
