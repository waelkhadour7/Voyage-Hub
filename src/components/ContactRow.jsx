export default function ContactRow({ icon: Icon, label, value, href, tone = "green", external }) {
  return (
    <a
      className={`crow crow--${tone}`}
      href={href}
      {...(external ? { target: "_blank", rel: "noreferrer" } : {})}
    >
      <span className="crow-icon"><Icon size={18} /></span>
      <span className="crow-text">
        <small>{label}</small>
        <strong>{value}</strong>
      </span>
    </a>
  );
}
