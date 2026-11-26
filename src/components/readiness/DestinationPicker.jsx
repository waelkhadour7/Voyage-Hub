import { Plane, HelpCircle, Check } from "lucide-react";
import { destinations } from "../../data/readiness";

export default function DestinationPicker({ selected, onSelect, onOtherSelect, lang, t }) {
  return (
    <div className="rd-step-body">
      <h3 id="rd-step2-title" className="rd-step-title">
        {lang === "ar" ? "اختر وجهة السفر" : "Select Your Destination"}
      </h3>
      <p className="rd-step-desc">
        {lang === "ar"
          ? "اختر الوجهة المحددة لعرض متطلبات التأشيرة الخاصة بها."
          : "Pick a destination to see its travel and visa requirements."}
      </p>

      <div className="rd-dest-grid" role="radiogroup" aria-labelledby="rd-step2-title">
        {destinations.map((dest) => {
          const isSelected = selected?.code === dest.code;
          return (
            <button
              key={dest.code}
              type="button"
              role="radio"
              aria-checked={isSelected}
              className={`rd-dest-card ${isSelected ? "is-selected" : ""}`}
              onClick={() => onSelect(dest)}
            >
              <div className="rd-dest-card-head">
                <div className="rd-dest-flag-wrap">
                  {dest.iso && (
                    <img
                      src={`https://flagcdn.com/w40/${dest.iso}.png`}
                      alt=""
                      className="rd-flag-icon"
                      onError={(e) => {
                        e.target.style.display = "none";
                      }}
                    />
                  )}
                  <span className="rd-dest-plane"><Plane size={16} /></span>
                </div>
                {isSelected && <Check size={18} className="rd-dest-check" />}
              </div>
              <strong className="rd-dest-name">{t(dest.name)}</strong>
              <span className="rd-dest-code">{dest.code}</span>
            </button>
          );
        })}

        {/* Other Country Option */}
        <button
          type="button"
          className="rd-dest-card rd-dest-other"
          onClick={onOtherSelect}
        >
          <div className="rd-dest-card-head">
            <span className="rd-dest-plane"><HelpCircle size={18} /></span>
          </div>
          <strong className="rd-dest-name">
            {lang === "ar" ? "وجهة أخرى" : "Another Country"}
          </strong>
          <span className="rd-dest-code">
            {lang === "ar" ? "تواصل مع فريقنا" : "Ask Our Team"}
          </span>
        </button>
      </div>
    </div>
  );
}
