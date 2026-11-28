import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { ArrowLeft, MapPin, MessageCircle } from "lucide-react";
import contact from "../data/contact";
import "../styles-hotels.css";

export default function HotelDetailModal({ hotel, onClose, lang = "en" }) {
  const [arrival, setArrival] = useState("");
  const [departure, setDeparture] = useState("");
  const sheetRef = useRef(null);
  const closeRef = useRef(null);
  const ar = lang === "ar";

  useEffect(() => {
    if (!hotel) return;
    const previous = document.body.style.overflow;
    const trigger = document.activeElement;
    const handleKey = (event) => {
      if (event.key === "Escape") { onClose(); return; }
      if (event.key !== "Tab") return;
      const controls = [...sheetRef.current.querySelectorAll('button:not([disabled]), input:not([disabled]), a[href]')];
      if (!controls.length) return;
      if (event.shiftKey && document.activeElement === controls[0]) { event.preventDefault(); controls[controls.length - 1].focus(); }
      else if (!event.shiftKey && document.activeElement === controls[controls.length - 1]) { event.preventDefault(); controls[0].focus(); }
    };
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();
    document.addEventListener("keydown", handleKey);
    return () => { document.body.style.overflow = previous; document.removeEventListener("keydown", handleKey); trigger?.focus(); };
  }, [hotel]);

  if (!hotel) return null;

  const whatsappDigits = contact.whatsapp.replace(/\D/g, "");

  const handleWhatsAppBooking = () => {
    const dates = `${arrival ? ` Check-in: ${arrival}.` : ""}${departure ? ` Check-out: ${departure}.` : ""}`;
    const message = `Hello Voyage Plus, I am interested in ${hotel.name} in ${hotel.location}.${dates} Please confirm availability and the current price.`;
    const url = `https://wa.me/${whatsappDigits}?text=${encodeURIComponent(message)}`;
    window.open(url, "_blank");
  };

  return createPortal(
    <div className="ht-backdrop" onMouseDown={(e) => e.target === e.currentTarget && onClose()}>
      <div ref={sheetRef} className="ht-sheet" role="dialog" aria-modal="true" aria-label={hotel.name} dir={ar ? "rtl" : "ltr"}>
        <div className="ht-sheet-scroll">
        {/* Hero Background Header */}
        <div className="ht-hero-wrap"><span className="ht-image-fallback" aria-hidden="true">VOYAGE PLUS</span><img src={hotel.image} alt="" className="ht-hero-image" onError={(e) => { e.currentTarget.hidden = true; }} />
          <div className="ht-hero-overlay" />

          <button ref={closeRef} type="button" className="ht-close-btn" onClick={onClose} aria-label={ar ? "إغلاق" : "Close"}>
            <ArrowLeft size={20} />
          </button>

        </div>

        {/* Card Content Overlapping Hero */}
        <div className="ht-content-card">
          <div className="ht-title-row">
            <div>
              <h2 className="ht-main-title">{hotel.name}</h2>
              <span className="ht-location-text">
                <MapPin size={14} /> {hotel.location}
              </span>
            </div>
            <div className="ht-price-wrap">
              <strong>{hotel.pricePerNight}</strong>
              <small>{ar ? "سعر توضيحي / ليلة" : "Sample price / night"}</small>
            </div>
          </div>

          <div className="ht-section-block">
            <h4>{ar ? "خطط لإقامتك" : "Plan your stay"}</h4>
            <p className="ht-description">{ar ? "تواصل مع فريقنا لمعرفة الغرف والأسعار والتوافر الحالي. الصور توضيحية وقد لا تمثل الفندق." : "Contact our team for current room options, rates and availability. Images are illustrative and may not show this property."}</p>
            <div className="ht-date-fields"><label>{ar ? "تاريخ الوصول" : "Check-in"} <input type="date" value={arrival} onChange={(e) => setArrival(e.target.value)} /></label><label>{ar ? "تاريخ المغادرة" : "Check-out"} <input type="date" min={arrival || undefined} value={departure} onChange={(e) => setDeparture(e.target.value)} /></label></div>
            {arrival && departure && departure <= arrival && <p className="ht-date-error" role="alert">{ar ? "يجب أن يكون تاريخ المغادرة بعد الوصول." : "Check-out must be after check-in."}</p>}
          </div>
        </div></div>
          {/* Sticky Bottom Booking Bar */}
          <div className="ht-sticky-footer">
            <div className="ht-footer-price">
              <strong>{hotel.pricePerNight}</strong>
              <small>{ar ? "سعر توضيحي / ليلة" : "Sample price / night"}</small>
            </div>

            <button type="button" className="ht-book-btn" onClick={handleWhatsAppBooking} disabled={!!(arrival && departure && departure <= arrival)}>
              <MessageCircle size={18} />
              <span>{ar ? "اطلب عرض سعر" : "Ask for a quote"}</span>
            </button>
          </div>
      </div>
    </div>, document.body
  );
}
