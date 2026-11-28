import { useRef, useState } from "react";
import { Plane, Compass, RotateCcw, AlertTriangle, MessageCircle, ShieldCheck, X } from "lucide-react";
import { useLang } from "../../lib/useLang";
import { meta } from "../../data/readiness";
import { getRule, isRuleOutdated } from "../../lib/readiness";
import Wizard from "./Wizard";
import contact from "../../data/contact";
import "../../styles-readiness.css";

export default function ReadinessSection() {
  const { lang, setLang, t, dir } = useLang();
  const [active, setActive] = useState(false);
  const [selectedNat, setSelectedNat] = useState(null);
  const [selectedDest, setSelectedDest] = useState(null);
  const [travelDate, setTravelDate] = useState("");
  const [passportExpiry, setPassportExpiry] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const startRef = useRef(null);

  const rule = selectedNat && selectedDest ? getRule(selectedNat.code, selectedDest.code) : null;
  const whatsappDigits = contact.whatsapp.replace(/\D/g, "");

  const handleStart = () => {
    setActive(true);
    setSubmitted(false);
  };

  const handleReset = () => {
    setActive(false);
    setSelectedNat(null);
    setSelectedDest(null);
    setTravelDate("");
    setPassportExpiry("");
    setSubmitted(false);
  };

  const handleClose = () => {
    setActive(false);
    setSubmitted(false);
    requestAnimationFrame(() => startRef.current?.focus());
  };

  const handleSendToTeam = () => {
    const nat = t(selectedNat?.name) || "Unspecified";
    const dest = t(selectedDest?.name) || "Unspecified";
    const msg = `Hello Voyage Tours, I checked my readiness for traveling from ${nat} to ${dest} (Travel date: ${travelDate || "Not set"}). Please assist me with full visa requirements.`;
    const url = `https://wa.me/${whatsappDigits}?text=${encodeURIComponent(msg)}`;
    window.open(url, "_blank", "noreferrer");
  };

  return (
    <section className="rd-section" id="readiness-checker" dir={dir}>
      <div className="container">
        {/* Main Card */}
        <div className="rd-card">
          <div className="rd-card-bg" aria-hidden="true" />

          {/* Header Bar */}
          <div className="rd-head">
            <div className="rd-badge">
              <Compass size={14} />
              <span>{lang === "ar" ? "فاحص أصل السفر والفيزا" : "Travel Readiness Checker"}</span>
            </div>

            {/* Language Toggle */}
            <button
              type="button"
              className="rd-lang-toggle"
              onClick={() => setLang(lang === "en" ? "ar" : "en")}
              aria-label="Toggle language"
            >
              {lang === "en" ? "عربي" : "EN"}
            </button>
          </div>

          <div className="rd-hero-content">
            <h2 className="rd-title">
              {lang === "ar" ? "هل أنت مستعد للطيران؟ ✈️" : "Are you ready to fly? ✈️"}
            </h2>
            <p className="rd-subtitle">
              {lang === "ar"
                ? "تحقق فوراً من متطلبات التأشيرة وصلاحية جواز السفر ومهلة التقديم بدون رسوم ومحفوظة على جهازك فقط."
                : "Check visa eligibility, passport validity, and lead-time deadlines instantly. Offline & stored on your device only."}
            </p>

            {!active && !submitted && (
              <button ref={startRef} type="button" className="rd-btn-start" onClick={handleStart}>
                <Plane size={18} />
                <span>{lang === "ar" ? "تحقق من رحلتي الآن" : "Check My Trip"}</span>
              </button>
            )}
          </div>

          {(active || submitted) && <div className="rd-close-wrap"><button type="button" className="rd-close-checker" onClick={handleClose}><X size={18} aria-hidden="true" /><span>{lang === "ar" ? "إغلاق الفحص" : "Close checker"}</span></button></div>}

          {/* Inline Wizard */}
          {active && !submitted && (
            <Wizard
              selectedNat={selectedNat}
              setSelectedNat={setSelectedNat}
              selectedDest={selectedDest}
              setSelectedDest={setSelectedDest}
              travelDate={travelDate}
              setTravelDate={setTravelDate}
              passportExpiry={passportExpiry}
              setPassportExpiry={setPassportExpiry}
              onComplete={() => setSubmitted(true)}
              lang={lang}
              t={t}
            />
          )}

          {/* Result / Phase 1 Summary & Empty State */}
          {submitted && (
            <div className="rd-result-wrap" aria-live="polite">
              {/* DEV Sample Data Badge Warning (Hard Rule) */}
              {rule?.isSample && (
                <div className="rd-sample-badge">
                  🚨 {lang === "ar" ? "بيانات تجريبية - ليست حقيقية" : "SAMPLE DATA - NOT REAL"}
                </div>
              )}

              <div className="rd-result-card">
                <div className="rd-result-route">
                  <div className="rd-route-badge">
                    {selectedNat?.iso && (
                      <img
                        src={`https://flagcdn.com/w40/${selectedNat.iso}.png`}
                        alt=""
                        className="rd-route-flag"
                        onError={(e) => {
                          e.target.style.display = "none";
                        }}
                      />
                    )}
                    <strong>{selectedNat?.code}</strong>
                    <small>{t(selectedNat?.name)}</small>
                  </div>
                  <div className="rd-route-plane">
                    <Plane size={20} />
                  </div>
                  <div className="rd-route-badge">
                    {selectedDest?.iso && (
                      <img
                        src={`https://flagcdn.com/w40/${selectedDest.iso}.png`}
                        alt=""
                        className="rd-route-flag"
                        onError={(e) => {
                          e.target.style.display = "none";
                        }}
                      />
                    )}
                    <strong>{selectedDest?.code}</strong>
                    <small>{t(selectedDest?.name)}</small>
                  </div>
                </div>

                {rule ? (
                  <div className="rd-status-block">
                    <div className="rd-status-badge">
                      <ShieldCheck size={20} />
                      <strong className="rd-status-text">
                        {rule.status === "visa_free" && (lang === "ar" ? "دخول بدون تأشيرة" : "VISA FREE")}
                        {rule.status === "on_arrival" && (lang === "ar" ? "تأشيرة عند الوصول" : "VISA ON ARRIVAL")}
                        {rule.status === "e_visa" && (lang === "ar" ? "تأشيرة إلكترونية" : "E-VISA REQUIRED")}
                        {rule.status === "visa_required" && (lang === "ar" ? "تأشيرة مسبقة مطلوبة" : "VISA REQUIRED")}
                        {rule.status === "depends" && (lang === "ar" ? "تعتمد على الشروط" : "CONDITIONAL ENTRY")}
                      </strong>
                    </div>

                    {rule.notes && <p className="rd-status-note">{t(rule.notes)}</p>}

                    {/* Outdated Warning Chip */}
                    {isRuleOutdated(rule.lastReviewed) && (
                      <div className="rd-warning-chip">
                        <AlertTriangle size={14} />
                        <span>
                          {lang === "ar"
                            ? "قد تكون هذه المعلومات قديمة، يرجى التأكيد مع فريقنا"
                            : "Rules may be outdated. Always confirm with our team."}
                        </span>
                      </div>
                    )}
                  </div>
                ) : (
                  /* Empty state when no rule exists for combination */
                  <div className="rd-no-rule">
                    <div className="rd-no-rule-icon">
                      <Compass size={32} />
                    </div>
                    <h4>
                      {lang === "ar"
                        ? "لم نتحقق من هذه التركيبة بعد"
                        : "We haven't verified this combination yet"}
                    </h4>
                    <p>
                      {lang === "ar"
                        ? "فريقنا مستعد لتزويدك بأحدث المتطلبات الرسمية فوراً."
                        : "Our team will verify official requirements for your passport and destination."}
                    </p>
                    <button
                      type="button"
                      className="rd-btn-whatsapp-sm"
                      onClick={handleSendToTeam}
                    >
                      <MessageCircle size={16} />
                      <span>{lang === "ar" ? "إرسال إلى فريقنا" : "Send to Our Team"}</span>
                    </button>
                  </div>
                )}

                <div className="rd-result-footer">
                  <p className="rd-disclaimer">
                    ℹ️ {t(meta.disclaimer)}
                  </p>
                  <button type="button" className="rd-btn-reset" onClick={handleReset}>
                    <RotateCcw size={14} />
                    <span>{lang === "ar" ? "فحص رحلة أخرى" : "Check Another Trip"}</span>
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
