import { useState, useEffect, useMemo } from "react";
import {
  Calendar,
  Clock,
  ShieldCheck,
  AlertTriangle,
  AlertOctagon,
  Plus,
  Trash2,
  X,
  Info,
  CheckCircle2,
  PlaneTakeoff,
  ArrowRight,
  ChevronRight,
} from "lucide-react";
import {
  SCHENGEN_COUNTRIES,
  formatDateUTC,
  getDaysCount,
  validateTrip,
  calculateSchengenStatus,
  calculateMaxStayFromDate,
  generateRollingTimeline,
} from "../lib/schengenCalculator";
import "../styles-schengen.css";

const STORAGE_KEY = "voyage.schengen.trips.v1";

const DEFAULT_SAMPLE_TRIPS = [
  {
    id: "sample-1",
    countryCode: "FR",
    countryName: "France",
    entryDate: "2024-05-01",
    exitDate: "2024-05-20",
  },
  {
    id: "sample-2",
    countryCode: "IT",
    countryName: "Italy",
    entryDate: "2024-08-10",
    exitDate: "2024-08-25",
  },
];

export default function SchengenCalculatorModal({ isOpen, onClose, lang = "en" }) {
  const isAr = lang === "ar";

  const [mode, setMode] = useState("control"); // "control" | "planning"
  const [trips, setTrips] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      return saved ? JSON.parse(saved) : DEFAULT_SAMPLE_TRIPS;
    } catch {
      return DEFAULT_SAMPLE_TRIPS;
    }
  });

  // Date inputs
  const todayStr = useMemo(() => formatDateUTC(Date.now()), []);
  const [checkDate, setCheckDate] = useState(todayStr);
  const [plannedEntryDate, setPlannedEntryDate] = useState(todayStr);

  // Form state for new trip
  const [showForm, setShowForm] = useState(false);
  const [formCountry, setFormCountry] = useState("FR");
  const [formEntry, setFormEntry] = useState(todayStr);
  const [formExit, setFormExit] = useState(todayStr);
  const [formError, setFormError] = useState("");

  // Persist trips to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(trips));
    } catch (e) {
      console.warn("Failed to persist Schengen trips:", e);
    }
  }, [trips]);

  // Calculations
  const controlStatus = useMemo(() => {
    return calculateSchengenStatus(trips, checkDate);
  }, [trips, checkDate]);

  const planningStatus = useMemo(() => {
    return calculateMaxStayFromDate(trips, plannedEntryDate);
  }, [trips, plannedEntryDate]);

  const timelineData = useMemo(() => {
    return generateRollingTimeline(trips, checkDate, 30);
  }, [trips, checkDate]);

  if (!isOpen) return null;

  // Add Trip Handler
  const handleAddTrip = (e) => {
    e.preventDefault();
    setFormError("");

    const selectedCountry = SCHENGEN_COUNTRIES.find((c) => c.code === formCountry) || SCHENGEN_COUNTRIES[0];
    const newTrip = {
      id: "trip-" + Date.now(),
      countryCode: selectedCountry.code,
      countryName: isAr ? selectedCountry.nameAr : selectedCountry.nameEn,
      entryDate: formEntry,
      exitDate: formExit,
    };

    const val = validateTrip(newTrip, trips);
    if (!val.valid) {
      if (val.error === "exit_before_entry") {
        setFormError(isAr ? "تاريخ المغادرة يجب أن يكون بعد تاريخ الدخول" : "Exit date must be on or after entry date.");
      } else if (val.error === "overlapping_trips") {
        setFormError(
          isAr
            ? "التاريخ يتعارض مع رحلة سابقة مسجلة!"
            : "Trip dates overlap with an existing logged trip!"
        );
      } else {
        setFormError(isAr ? "تاريخ غير صريح أو ناقص" : "Please check date inputs.");
      }
      return;
    }

    setTrips([newTrip, ...trips]);
    setShowForm(false);
  };

  const handleDeleteTrip = (id) => {
    setTrips(trips.filter((t) => t.id !== id));
  };

  // Gauge calculations
  const daysUsed = controlStatus.daysUsed;
  const daysRemaining = controlStatus.daysRemaining;
  const progressPercent = Math.min(100, Math.round((daysUsed / 90) * 100));
  const strokeDasharray = `${(progressPercent / 100) * 364} 364`;

  return (
    <div className="sc-modal-backdrop" role="dialog" aria-modal="true">
      <div className="sc-modal">
        {/* Header */}
        <header className="sc-header">
          <div className="sc-header-info">
            <div className="sc-header-icon">
              <ShieldCheck size={26} />
            </div>
            <div className="sc-header-title">
              <h3>{isAr ? "حاسبة الشنغن ومحفظة التأشيرة" : "Schengen 90/180 Calculator"}</h3>
              <p>
                {isAr
                  ? "حاسبة رسمية دقيقة وفق قواعد الاتحاد الأوروبي (Rolling 180-Day Rule)"
                  : "Official EU Rolling 180-Day Short-Stay Rule Calculator"}
              </p>
            </div>
          </div>
          <button className="sc-close-btn" onClick={onClose} aria-label="Close">
            <X size={20} />
          </button>
        </header>

        {/* Scrollable Content */}
        <div className="sc-body">
          {/* Mode Switcher */}
          <div className="sc-tabs">
            <button
              className={`sc-tab ${mode === "control" ? "is-active" : ""}`}
              onClick={() => setMode("control")}
            >
              <Clock size={16} />
              {isAr ? "وضع الفحص والرقابة (Control Mode)" : "Control / Check Mode"}
            </button>
            <button
              className={`sc-tab ${mode === "planning" ? "is-active" : ""}`}
              onClick={() => setMode("planning")}
            >
              <PlaneTakeoff size={16} />
              {isAr ? "وضع التخطيط القادم (Planning Mode)" : "Planning Mode"}
            </button>
          </div>

          {/* Mode Specific Controls */}
          {mode === "control" ? (
            <div style={{ display: "flex", alignItems: "center", gap: "10px", fontSize: "13px" }}>
              <label style={{ fontWeight: 700, color: "#334155" }}>
                {isAr ? "تاريخ الفحص والتدقيق:" : "Target Check Date:"}
              </label>
              <input
                type="date"
                value={checkDate}
                onChange={(e) => setCheckDate(e.target.value)}
                style={{
                  height: "36px",
                  padding: "0 12px",
                  borderRadius: "8px",
                  border: "1px solid #cbd5e1",
                  fontFamily: "inherit",
                }}
              />
            </div>
          ) : (
            <div style={{ display: "flex", alignItems: "center", gap: "10px", fontSize: "13px" }}>
              <label style={{ fontWeight: 700, color: "#334155" }}>
                {isAr ? "تاريخ السفر المستقبلي المخطط:" : "Planned Entry Date:"}
              </label>
              <input
                type="date"
                value={plannedEntryDate}
                onChange={(e) => setPlannedEntryDate(e.target.value)}
                style={{
                  height: "36px",
                  padding: "0 12px",
                  borderRadius: "8px",
                  border: "1px solid #cbd5e1",
                  fontFamily: "inherit",
                }}
              />
            </div>
          )}

          {/* Dashboard Result Card */}
          {mode === "control" ? (
            <div className="sc-dashboard">
              {/* Circular Gauge */}
              <div className="sc-gauge-wrap">
                <div className="sc-gauge-circle">
                  <svg className="sc-gauge-svg" viewBox="0 0 130 130">
                    <circle className="sc-gauge-bg" cx="65" cy="65" r="58" />
                    <circle
                      className={`sc-gauge-fill is-${controlStatus.statusLevel}`}
                      cx="65"
                      cy="65"
                      r="58"
                      style={{ strokeDasharray }}
                    />
                  </svg>
                  <div className="sc-gauge-center">
                    <span className="sc-gauge-num">{daysUsed}</span>
                    <span className="sc-gauge-denom">/ 90 {isAr ? "يوم" : "Days"}</span>
                  </div>
                </div>

                <div className={`sc-badge is-${controlStatus.statusLevel}`}>
                  {controlStatus.statusLevel === "overstay" ? (
                    <>
                      <AlertOctagon size={12} />
                      {isAr ? "تجاوز المدة القانونية!" : "Overstay Exceeded"}
                    </>
                  ) : controlStatus.statusLevel === "warning" ? (
                    <>
                      <AlertTriangle size={12} />
                      {isAr ? "تحذير: قرب الحد الأقصى" : "Warning Limit Near"}
                    </>
                  ) : (
                    <>
                      <CheckCircle2 size={12} />
                      {isAr ? "وضع نظامي آمن" : "Compliant / Safe"}
                    </>
                  )}
                </div>
              </div>

              {/* Stat Metrics Grid */}
              <div className="sc-stats-grid">
                <div className="sc-stat-card">
                  <div className="sc-stat-label">{isAr ? "الأيام المتبقية المتاحة" : "Days Remaining"}</div>
                  <div className="sc-stat-value is-highlight">{daysRemaining} {isAr ? "يوم" : "Days"}</div>
                </div>

                <div className="sc-stat-card">
                  <div className="sc-stat-label">{isAr ? "نطاق الـ 180 يوم المحسوب" : "180-Day Window"}</div>
                  <div style={{ fontSize: "12px", fontWeight: 700, color: "#475569" }}>
                    {controlStatus.windowStart} <ArrowRight size={12} style={{ display: "inline" }} /> {controlStatus.windowEnd}
                  </div>
                </div>

                <div className="sc-stat-card">
                  <div className="sc-stat-label">{isAr ? "أيام سقطت/تسترد خلال 30 يوم" : "Days Rolling Off Soon"}</div>
                  <div className="sc-stat-value">{controlStatus.expiringIn30Days} {isAr ? "يوم" : "Days"}</div>
                </div>

                <div className="sc-stat-card">
                  <div className="sc-stat-label">{isAr ? "تاريخ الاسترداد القادم" : "Next Day Recovery"}</div>
                  <div style={{ fontSize: "13px", fontWeight: 700, color: "#0b4a9e" }}>
                    {controlStatus.nextDropOffDate || (isAr ? "لا يوجد" : "None")}
                  </div>
                </div>
              </div>
            </div>
          ) : (
            /* Planning Mode Result Card */
            <div className="sc-dashboard" style={{ gridTemplateColumns: "1fr" }}>
              <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                  <h4 style={{ margin: 0, fontSize: "16px", color: "#0f172a" }}>
                    {isAr ? "نتيجة التخطيط المستقبلي:" : "Planned Entry Results:"}
                  </h4>
                  <span className={`sc-badge is-${planningStatus.isFullStayAllowed ? "safe" : "warning"}`}>
                    {planningStatus.isFullStayAllowed
                      ? isAr ? "إقامة كاملة مسموحة (90 يوم)" : "Full 90-Day Stay Allowed"
                      : isAr ? `مسموح حتى ${planningStatus.maxConsecutiveDays} يوم فقط` : `Max ${planningStatus.maxConsecutiveDays} Days Allowed`}
                  </span>
                </div>

                <div className="sc-stats-grid" style={{ gridTemplateColumns: "repeat(3, 1fr)" }}>
                  <div className="sc-stat-card">
                    <div className="sc-stat-label">{isAr ? "الحد الأقصى للأيام المتتالية" : "Max Consecutive Days"}</div>
                    <div className="sc-stat-value is-highlight">{planningStatus.maxConsecutiveDays} {isAr ? "يوم" : "Days"}</div>
                  </div>

                  <div className="sc-stat-card">
                    <div className="sc-stat-label">{isAr ? "آخر تاريخ مغادرة مسموح" : "Max Allowed Exit Date"}</div>
                    <div className="sc-stat-value">{planningStatus.maxExitDate || (isAr ? "غير مسموح" : "N/A")}</div>
                  </div>

                  <div className="sc-stat-card">
                    <div className="sc-stat-label">{isAr ? "تاريخ زيادة الأيام المتاحة" : "Next Day Recovery Date"}</div>
                    <div className="sc-stat-value" style={{ fontSize: "14px", color: "#0b4a9e" }}>
                      {planningStatus.nextRecoveryDate || (isAr ? "مكتمل البرصيد" : "Fully Available")}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Overstay Alert Callout */}
          {controlStatus.isOverstay && mode === "control" && (
            <div style={{ background: "#fef2f2", border: "1px solid #fca5a5", padding: "14px 16px", borderRadius: "12px", color: "#991b1b", display: "flex", gap: "10px", alignItems: "center" }}>
              <AlertOctagon size={22} style={{ flex: "none" }} />
              <div style={{ fontSize: "13px" }}>
                <strong>{isAr ? "تنبيه تجاوز الإقامة (Overstay Warning):" : "Overstay Limit Warning:"}</strong>{" "}
                {isAr
                  ? `لقد تجاوزت الحد الأقصى بـ ${controlStatus.overstayAmount} يوم خلال نافذة الـ 180 يوم الأخيرة!`
                  : `You have exceeded the 90-day short-stay limit by ${controlStatus.overstayAmount} days within this 180-day window!`}
              </div>
            </div>
          )}

          {/* 30-Day Rolling Timeline Grid */}
          <div className="sc-timeline-section">
            <div className="sc-timeline-head">
              <h4>{isAr ? "جدول الأيام القادمة (Next 30 Days Breakdown)" : "Rolling 30-Day Breakdown"}</h4>
              <div className="sc-timeline-legend">
                <span className="sc-legend-item">
                  <span className="sc-dot-legend is-stay" /> {isAr ? "إقامة في شنغن" : "In Schengen"}
                </span>
                <span className="sc-legend-item">
                  <span className="sc-dot-legend is-free" /> {isAr ? "خارج شنغن" : "Out"}
                </span>
              </div>
            </div>

            <div className="sc-heatmap-grid">
              {timelineData.map((d, i) => (
                <div
                  key={i}
                  className={`sc-heatmap-cell ${
                    d.inSchengen ? "is-stay" : ""
                  } ${d.isOverstay ? "is-overstay" : ""}`}
                  title={`${d.dateStr}: ${d.inSchengen ? "In Schengen" : "Outside"} (${d.daysRemaining} days left)`}
                />
              ))}
            </div>
          </div>

          {/* Trip Entry Log */}
          <div className="sc-log-section">
            <div className="sc-log-head">
              <h4>{isAr ? "سجل الرحلات والإقامات (Trip Log)" : "Schengen Trip Entry Log"}</h4>
              {!showForm && (
                <button className="sc-add-trip-btn" onClick={() => setShowForm(true)}>
                  <Plus size={14} /> {isAr ? "إضافة رحلة" : "Add Trip"}
                </button>
              )}
            </div>

            {/* Add Trip Form */}
            {showForm && (
              <form onSubmit={handleAddTrip} className="sc-form-card" style={{ marginBottom: "16px" }}>
                <div className="sc-form-grid">
                  <div className="sc-field">
                    <label>{isAr ? "الدولة:" : "Schengen Country:"}</label>
                    <select value={formCountry} onChange={(e) => setFormCountry(e.target.value)}>
                      {SCHENGEN_COUNTRIES.map((c) => (
                        <option key={c.code} value={c.code}>
                          {isAr ? c.nameAr : c.nameEn}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="sc-field">
                    <label>{isAr ? "تاريخ الدخول:" : "Entry Date:"}</label>
                    <input
                      type="date"
                      value={formEntry}
                      onChange={(e) => setFormEntry(e.target.value)}
                      required
                    />
                  </div>

                  <div className="sc-field">
                    <label>{isAr ? "تاريخ المغادرة:" : "Exit Date:"}</label>
                    <input
                      type="date"
                      value={formExit}
                      onChange={(e) => setFormExit(e.target.value)}
                      required
                    />
                  </div>
                </div>

                {formError && <div className="sc-error-msg">{formError}</div>}

                <div style={{ display: "flex", gap: "8px", justifyContent: "flex-end", marginTop: "4px" }}>
                  <button
                    type="button"
                    onClick={() => setShowForm(false)}
                    style={{
                      padding: "6px 14px",
                      borderRadius: "8px",
                      border: "1px solid #cbd5e1",
                      background: "#fff",
                      cursor: "pointer",
                      fontSize: "12px",
                    }}
                  >
                    {isAr ? "إلغاء" : "Cancel"}
                  </button>
                  <button
                    type="submit"
                    style={{
                      padding: "6px 16px",
                      borderRadius: "8px",
                      border: "0",
                      background: "#0b4a9e",
                      color: "#fff",
                      cursor: "pointer",
                      fontSize: "12px",
                      fontWeight: 700,
                    }}
                  >
                    {isAr ? "حفظ الرحلة" : "Save Trip"}
                  </button>
                </div>
              </form>
            )}

            {/* Trip List */}
            {trips.length === 0 ? (
              <p style={{ color: "#64748b", fontSize: "13px", textAlign: "center", margin: "16px 0" }}>
                {isAr ? "لا توجد رحلات مسجلة بعد." : "No trips logged yet. Click Add Trip to record entry/exit dates."}
              </p>
            ) : (
              <div className="sc-trip-list">
                {trips.map((t) => {
                  const days = getDaysCount(t.entryDate, t.exitDate);
                  return (
                    <div key={t.id} className="sc-trip-card">
                      <div className="sc-trip-info">
                        <div className="sc-trip-flag">{t.countryCode}</div>
                        <div className="sc-trip-details">
                          <h5>{t.countryName}</h5>
                          <p>
                            {t.entryDate} <ChevronRight size={12} style={{ display: "inline" }} /> {t.exitDate}
                          </p>
                        </div>
                      </div>

                      <div className="sc-trip-actions">
                        <span className="sc-trip-days">{days} {isAr ? "أيام" : "Days"}</span>
                        <button
                          className="sc-del-btn"
                          onClick={() => handleDeleteTrip(t.id)}
                          title="Delete trip"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* Official EU Disclaimer Callout */}
          <div className="sc-disclaimer">
            <Info size={20} />
            <div>
              <strong>{isAr ? "تنبيه قانوني هام:" : "Important Legal Disclaimer:"}</strong>{" "}
              {isAr
                ? "تطبق قاعدة 90/180 يوم على الإقامات القصيرة (السياحة والأعمال) في دول الشنغن الـ 29. تُستثنى الفترات المغطاة بتأشيرة إقامة طويلة من النوع (Type-D) أو تصاريح الإقامة الصادرة من دولة عضو."
                : "The 90/180-day rule applies to short-stay visits across all 29 Schengen member states. Stays covered by a National Long-Stay Visa (Type-D) or Residence Permit issued by a member state are excluded from this count."}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
