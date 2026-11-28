export default function ServiceItem({ icon: Icon, label, color, href = "#", onClick }) {
  if (onClick) {
    return (
      <button className="service service-b2b" type="button" onClick={onClick}>
        <span className="service-icon" style={{ "--c": color }}><Icon size={26} /></span>
        <span className="service-label">{label}</span>
      </button>
    );
  }
  return (
    <a className="service" href={href}>
      <span className="service-icon" style={{ "--c": color }}><Icon size={26} /></span>
      <span className="service-label">{label}</span>
    </a>
  );
}
