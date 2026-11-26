import { Mail, MessageCircle, Phone, User } from "lucide-react";
import contact from "../data/contact";

const digits = contact.whatsapp.replace(/\D/g, "");
const ACTIONS = {
  call: { icon: Phone, label: { en: "Call", ar: "اتصال" }, href: `tel:${contact.phone.replace(/\s/g, "")}` },
  whatsapp: { icon: MessageCircle, label: { en: "WhatsApp", ar: "واتساب" }, href: `https://wa.me/${digits}`, external: true },
  email: { icon: Mail, label: { en: "Email", ar: "إيميل" }, href: `mailto:${contact.email}` },
  agent: { icon: User, label: { en: "Agent Sign Up", ar: "التسجيل كوكيل" }, event: "voyage:open-agent" },
};

function ActionChip({ kind, lang }) {
  const a = ACTIONS[kind];
  const Icon = a.icon;
  if (a.event) {
    return (
      <button type="button" className="chip-action" onClick={() => window.dispatchEvent(new CustomEvent(a.event))}>
        <Icon size={14} /> {a.label[lang]}
      </button>
    );
  }
  return (
    <a className="chip-action" href={a.href} {...(a.external ? { target: "_blank", rel: "noreferrer" } : {})}>
      <Icon size={14} /> {a.label[lang]}
    </a>
  );
}

export default function ChatMessage({ msg }) {
  if (msg.from === "user") return <div className="msg msg-user" dir="auto">{msg.text}</div>;
  if (msg.text) return <div className="msg msg-bot" dir="auto"><p>{msg.text}</p></div>;
  const { entry, lang } = msg;
  return (
    <div className="msg msg-bot" dir={lang === "ar" ? "rtl" : "ltr"}>
      <p>{entry.a[lang]}</p>
      {entry.actions?.length > 0 && (
        <div className="msg-actions">
          {entry.actions.map((k) => <ActionChip key={k} kind={k} lang={lang} />)}
        </div>
      )}
      {entry.id === "contact" && (
        <ul className="contact-lines" dir="ltr">
          <li>{contact.phone}</li><li>{contact.whatsapp}</li><li>{contact.email}</li>
        </ul>
      )}
    </div>
  );
}
