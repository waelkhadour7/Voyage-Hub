import { ArrowRight } from "lucide-react";

export default function CtaButton({ children, href = "#" }) {
  return (
    <a className="cta" href={href}>
      {children}
      <span className="cta-arrow"><ArrowRight size={14} /></span>
    </a>
  );
}
