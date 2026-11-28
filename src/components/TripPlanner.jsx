import { useState } from "react";
import { Compass, ArrowLeft, MessageCircle } from "lucide-react";
import contact from "../data/contact";
import "../styles-trip-planner.css";

const choices = {
  beach: { en: ["Thailand", "Indonesia", "Philippines"], ar: ["تايلاند", "إندونيسيا", "الفلبين"] },
  culture: { en: ["Japan", "Egypt", "South Korea"], ar: ["اليابان", "مصر", "كوريا الجنوبية"] },
  nature: { en: ["Kenya", "Nepal", "Vietnam"], ar: ["كينيا", "نيبال", "فيتنام"] },
};

export default function TripPlanner({ lang, onClose }) {
  const ar = lang === "ar";
  const [style, setStyle] = useState("beach");
  const [destination, setDestination] = useState("");
  const [days, setDays] = useState("5");
  const [travelers, setTravelers] = useState("2");
  const [budget, setBudget] = useState("");
  const [result, setResult] = useState(null);
  const labels = ar ? { beach: "شاطئ واسترخاء", culture: "ثقافة ومدن", nature: "طبيعة ومغامرة" } : { beach: "Beach & relaxation", culture: "Culture & cities", nature: "Nature & adventure" };
  const generate = (e) => { e.preventDefault(); setResult({ style, destination: destination.trim(), days, travelers, budget: budget.trim() }); };
  const list = result ? choices[result.style][ar ? "ar" : "en"] : [];
  const message = result && (ar
    ? `مرحباً، أريد عرضاً لرحلة. الوجهة: ${result.destination || list.join("، ")}، نوع الرحلة: ${labels[result.style]}، المدة: ${result.days} أيام، المسافرون: ${result.travelers}، الميزانية: ${result.budget || "لم أحددها بعد"}.`
    : `Hello, I'd like a trip quote. Destination: ${result.destination || list.join(", ")}; style: ${labels[result.style]}; duration: ${result.days} days; travelers: ${result.travelers}; budget: ${result.budget || "not decided"}.`);
  return <div className="tp-wrap" dir={ar ? "rtl" : "ltr"}>
    <div className="tp-heading"><button type="button" onClick={onClose} aria-label={ar ? "العودة للمحادثة" : "Back to chat"}><ArrowLeft size={17} /></button><div><strong>{ar ? "خطّط رحلتك" : "Plan your trip"}</strong><small>{ar ? "اقتراح مبدئي من وجهاتنا" : "A starting point from our destinations"}</small></div><Compass size={20} /></div>
    <div className="tp-content">
      <form onSubmit={generate} className="tp-form">
        <label>{ar ? "نوع الرحلة" : "Travel style"}<select value={style} onChange={(e) => setStyle(e.target.value)}>{Object.entries(labels).map(([value, label]) => <option key={value} value={value}>{label}</option>)}</select></label>
        <label>{ar ? "وجهة معينة (اختياري)" : "Destination (optional)"}<input value={destination} onChange={(e) => setDestination(e.target.value)} maxLength={80} placeholder={ar ? "أو دعنا نقترح عليك" : "Or let us suggest a few"} /></label>
        <div className="tp-row"><label>{ar ? "الأيام" : "Days"}<input type="number" min="1" max="30" required value={days} onChange={(e) => setDays(e.target.value)} /></label><label>{ar ? "المسافرون" : "Travelers"}<input type="number" min="1" max="20" required value={travelers} onChange={(e) => setTravelers(e.target.value)} /></label></div>
        <label>{ar ? "الميزانية مع العملة (اختياري)" : "Budget and currency (optional)"}<input maxLength={60} value={budget} onChange={(e) => setBudget(e.target.value)} placeholder={ar ? "مثلاً ٥٠٠٠ درهم" : "e.g. AED 5,000"} /></label>
        <button className="tp-primary" type="submit">{ar ? "اعرض أفكار الرحلة" : "Show trip ideas"}</button>
      </form>
      {result && <div className="tp-result" role="status"><span className="tp-kicker">{ar ? "فكرة مبدئية" : "YOUR STARTING PLAN"}</span><h3>{result.destination || (ar ? "وجهات قد تعجبك" : "Destinations to consider")}</h3>{!result.destination && <div className="tp-chips">{list.map((name) => <span key={name}>{name}</span>)}</div>}
        <p>{ar ? `${result.days} أيام · ${result.travelers} مسافرين` : `${result.days} days · ${result.travelers} travelers`}{result.budget ? ` · ${result.budget}` : ""}</p>
        <strong>{ar ? "أفكار لترتيب الرحلة" : "A flexible itinerary outline"}</strong>
        <ol><li>{ar ? "الوصول، تسجيل الدخول والراحة." : "Arrive, check in and settle in."}</li><li>{ar ? `خصص وقتاً للأنشطة المناسبة لرحلة ${labels[result.style]}.` : `Leave time for ${labels[result.style].toLowerCase()} experiences.`}</li><li>{ar ? "اختر نشاطاً إضافياً أو وقتاً حراً قبل المغادرة." : "Add a favourite activity or free time before departure."}</li></ol>
        <p className="tp-note">{ar ? "هذه أفكار عامة وليست حجزاً أو عرض سعر. تحقق من التوفر ومتطلبات الدخول والأسعار قبل الحجز." : "These are general ideas, not a booking or quote. Confirm availability, entry requirements and prices before booking."}</p>
        <a className="tp-contact" href={`https://wa.me/${contact.whatsapp.replace(/\D/g, "")}?text=${encodeURIComponent(message)}`} target="_blank" rel="noreferrer"><MessageCircle size={16} />{ar ? "اطلب برنامجاً من فريقنا" : "Ask our team for a plan"}</a>
      </div>}
    </div>
  </div>;
}
