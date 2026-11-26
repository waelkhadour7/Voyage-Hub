export default function ServiceItem({ icon: Icon, label, color, href = "#" }) {
  return (
    <a className="service" href={href}>
      <span className="service-icon" style={{ "--c": color }}><Icon size={26} /></span>
      <span className="service-label">{label}</span>
    </a>
  );
}
