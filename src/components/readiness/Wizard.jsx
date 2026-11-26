import { useRef, useState, useEffect } from "react";
import { ArrowLeft, ArrowRight, MessageCircle } from "lucide-react";
import NationalityPicker from "./NationalityPicker";
import DestinationPicker from "./DestinationPicker";
import TripDetails from "./TripDetails";
import contact from "../../data/contact";

export default function Wizard({
  selectedNat,
  setSelectedNat,
  selectedDest,
  setSelectedDest,
  travelDate,
  setTravelDate,
  passportExpiry,
  setPassportExpiry,
  onComplete,
  lang,
  t,
}) {
  const [step, setStep] = useState(1);
  const [otherCountry, setOtherCountry] = useState(false);
  const titleRef = useRef(null);

  const isRtl = lang === "ar";
  const whatsappDigits = contact.whatsapp.replace(/\D/g, "");

  useEffect(() => {
    // Focus management when step changes for accessibility
    titleRef.current?.focus();
  }, [step, otherCountry]);

  const goBack = () => {
    if (otherCountry) {
      setOtherCountry(false);
      return;
    }
    if (step > 1) setStep(step - 1);
  };

  const handleNatSelect = (nat) => {
    setSelectedNat(nat);
    setStep(2);
  };

  const handleDestSelect = (dest) => {
    setSelectedDest(dest);
    setStep(3);
  };

  const handleOtherCountry = () => {
    setOtherCountry(true);
  };

  const handleWhatsappOther = () => {
    const natName = t(selectedNat?.name) || "Not specified";
    const msg = `Hello Voyage Tours, I am a citizen of ${natName} and I need travel/visa assistance for a country not listed.`;
    const url = `https://wa.me/${whatsappDigits}?text=${encodeURIComponent(msg)}`;
    window.open(url, "_blank", "noreferrer");
  };

  if (otherCountry) {
    return (
      <div className="rd-wizard-wrap">
        <div className="rd-wizard-nav">
          <button type="button" className="rd-btn-back" onClick={goBack}>
            {isRtl ? <ArrowRight size={16} /> : <ArrowLeft size={16} />}
            <span>{lang === "ar" ? "رجوع" : "Back"}</span>
          </button>
        </div>

        <div className="rd-other-state" ref={titleRef} tabIndex={-1}>
          <h3>{lang === "ar" ? "وجهات غير مدرجة" : "Unlisted Destination"}</h3>
          <p>
            {lang === "ar"
              ? "فريقنا المتخصص في فوياج بلاس يساعدك في متطلبات الفيزا والسفر لجميع دول العالم."
              : "Our dedicated travel team at Voyage Plus assists with visa & travel rules for all destinations worldwide."}
          </p>
          <button
            type="button"
            className="rd-btn-whatsapp"
            onClick={handleWhatsappOther}
          >
            <MessageCircle size={18} />
            <span>{lang === "ar" ? "تواصل مع فريقنا عبر واتساب" : "Chat with Our Team on WhatsApp"}</span>
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="rd-wizard-wrap">
      {/* Progress Indicator */}
      <div className="rd-progress-bar-wrap" aria-label="Wizard progress">
        <div className="rd-progress-track">
          <div
            className="rd-progress-fill"
            style={{ width: step === 1 ? "33%" : step === 2 ? "66%" : "100%" }}
          />
        </div>
        <div className="rd-progress-steps">
          <div className={`rd-step-dot ${step >= 1 ? "is-active" : ""}`}>1</div>
          <div className={`rd-step-dot ${step >= 2 ? "is-active" : ""}`}>2</div>
          <div className={`rd-step-dot ${step >= 3 ? "is-active" : ""}`}>3</div>
        </div>
      </div>

      {/* Nav Back Button */}
      {step > 1 && (
        <div className="rd-wizard-nav">
          <button type="button" className="rd-btn-back" onClick={goBack}>
            {isRtl ? <ArrowRight size={16} /> : <ArrowLeft size={16} />}
            <span>{lang === "ar" ? "رجوع" : "Back"}</span>
          </button>
        </div>
      )}

      {/* Step Content */}
      <div className="rd-step-container" ref={titleRef} tabIndex={-1}>
        {step === 1 && (
          <NationalityPicker
            selected={selectedNat}
            onSelect={handleNatSelect}
            lang={lang}
            t={t}
          />
        )}

        {step === 2 && (
          <DestinationPicker
            selected={selectedDest}
            onSelect={handleDestSelect}
            onOtherSelect={handleOtherCountry}
            lang={lang}
            t={t}
          />
        )}

        {step === 3 && (
          <TripDetails
            travelDate={travelDate}
            setTravelDate={setTravelDate}
            passportExpiry={passportExpiry}
            setPassportExpiry={setPassportExpiry}
            onSubmit={onComplete}
            onSkip={onComplete}
            lang={lang}
          />
        )}
      </div>
    </div>
  );
}
