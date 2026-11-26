import { useEffect, useRef, useState } from "react";
import { FileText, Mail, MessageCircle, Phone } from "lucide-react";
import IconButton from "./IconButton";
import ContactRow from "./ContactRow";
import contact from "../data/contact";

export default function ContactMenu() {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    if (!open) return;
    const onDown = (e) => !ref.current?.contains(e.target) && setOpen(false);
    const onKey = (e) => e.key === "Escape" && setOpen(false);
    document.addEventListener("mousedown", onDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const digits = contact.whatsapp.replace(/\D/g, "");

  return (
    <div className="contact-wrap" ref={ref}>
      <IconButton icon={Phone} label="Contact us" expanded={open} onClick={() => setOpen(!open)} />
      {open && (
        <div className="contact-panel" role="dialog" aria-label={contact.title}>
          <div className="contact-head">
            <span className="contact-head-icon"><Phone size={20} /></span>
            <div>
              <h4>{contact.title}</h4>
              <p>{contact.subtitle}</p>
            </div>
          </div>
          <div className="contact-body">
            <ContactRow icon={Phone} label="Call Now" value={contact.phone} href={`tel:${contact.phone.replace(/\s/g, "")}`} />
            <ContactRow icon={MessageCircle} label="Whatsapp" value={contact.whatsapp} href={`https://wa.me/${digits}`} external />
            <ContactRow icon={Mail} label="Email Us" value={contact.email} href={`mailto:${contact.email}`} tone="blue" />
            <a className="connect" href={contact.connectHref}><FileText size={16} /> Connect With Us</a>
          </div>
        </div>
      )}
    </div>
  );
}
