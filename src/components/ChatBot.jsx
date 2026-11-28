import { useEffect, useRef, useState } from "react";
import { MessageCircle, Send, X } from "lucide-react";
import { faq, fallback, welcome } from "../data/faq";
import { isArabic, matchFaq } from "../lib/matchFaq";
import ChatMessage from "./ChatMessage";
import TripPlanner from "./TripPlanner";

const topics = faq.filter((e) => e.chip);
const deviceLang = () => ((navigator.language || "en").startsWith("ar") ? "ar" : "en");

export default function ChatBot() {
  const [open, setOpen] = useState(false);
  const [lang, setLang] = useState(deviceLang);
  const [msgs, setMsgs] = useState(() => [{ from: "bot", entry: welcome, lang: deviceLang() }]);
  const [text, setText] = useState("");
  const [typing, setTyping] = useState(false);
  const [planning, setPlanning] = useState(false);
  const bodyRef = useRef(null);

  useEffect(() => {
    bodyRef.current?.scrollTo({ top: bodyRef.current.scrollHeight, behavior: "smooth" });
  }, [msgs, typing, open]);

  // سؤال حر أو ضغطة على موضوع جاهز (entry يتجاوز المطابقة)
  const ask = async (question, entry) => {
    const q = question.trim();
    if (!q || typing) return;
    const l = entry ? lang : isArabic(q) ? "ar" : /[a-z]/i.test(q) ? "en" : lang;
    setLang(l);
    setMsgs((m) => [...m, { from: "user", text: q }]);
    setText("");
    setTyping(true);
    const endpoint = import.meta.env.VITE_CHAT_API_URL;
    if (!endpoint || entry) {
      setMsgs((m) => [...m, { from: "bot", entry: entry || matchFaq(q, faq) || fallback, lang: l }]);
      setTyping(false);
      return;
    }
    try {
      const response = await fetch(endpoint, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ message: q }), signal: AbortSignal.timeout(35000) });
      if (!response.ok) throw new Error("Assistant unavailable");
      const data = await response.json();
      if (typeof data.reply !== "string" || !data.reply.trim()) throw new Error("Empty response");
      setMsgs((m) => [...m, { from: "bot", text: data.reply }]);
    } catch {
      setMsgs((m) => [...m, { from: "bot", text: l === "ar" ? "المساعد غير متاح حالياً. يرجى المحاولة لاحقاً." : "The assistant is unavailable right now. Please try again later." }]);
    } finally { setTyping(false); }
  };

  const ar = lang === "ar";

  return (
    <>
      {open && (
        <section className="chat" role="dialog" aria-label="Voyage Plus assistant">
          <header className="chat-head">
            <span className="chat-dot" />
            <div className="chat-title">
              <strong>{ar ? "مساعد فوياج بلاس" : "Voyage Plus Assistant"}</strong>
              <small>{import.meta.env.VITE_CHAT_API_URL ? (ar ? "مساعد السفر" : "Travel assistant") : (ar ? "اقتراحات جاهزة وإجابات شائعة" : "Curated trip ideas & FAQs · no live AI")}</small>
            </div>
            <button className="chat-lang" onClick={() => setLang(ar ? "en" : "ar")}>{ar ? "EN" : "عربي"}</button>
            <button className="chat-x" onClick={() => setOpen(false)} aria-label="Close"><X size={18} /></button>
          </header>

          {planning ? <TripPlanner lang={lang} onClose={() => setPlanning(false)} /> : <><div className="chat-body" ref={bodyRef}>
            {msgs.map((m, i) => <ChatMessage key={i} msg={m} />)}
            {typing && <div className="msg msg-bot typing"><i /><i /><i /></div>}
          </div>

          <button type="button" className="chat-plan-primary" onClick={() => setPlanning(true)}>✈ {ar ? "خطط رحلتي" : "Plan my trip"}</button>

          <div className="chat-topics">
            {topics.map((t) => (
              <button key={t.id} onClick={() => ask(t.chip[lang], t)}>{t.chip[lang]}</button>
            ))}
          </div>

          <form className="chat-input" onSubmit={(e) => { e.preventDefault(); ask(text); }}>
            <input
              value={text} onChange={(e) => setText(e.target.value)} dir="auto"
              placeholder={ar ? "اكتب سؤالك..." : "Type your question..."}
            />
            <button type="submit" aria-label="Send" disabled={!text.trim()}><Send size={18} /></button>
          </form></>}
        </section>
      )}

      <button className="chat-fab" onClick={() => setOpen(!open)} aria-label="Chat" aria-expanded={open}>
        {open ? <X size={24} /> : <MessageCircle size={26} />}
      </button>
    </>
  );
}
