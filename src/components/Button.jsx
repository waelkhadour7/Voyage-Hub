export default function Button({ icon: Icon, children, href, onClick, ...props }) {
  const Tag = href ? "a" : "button";
  return (
    <Tag className="btn" href={href} onClick={onClick} type={href ? undefined : "button"} {...props}>
      {Icon && <span className="btn-icon"><Icon size={16} /></span>}
      <span className="btn-label">{children}</span>
    </Tag>
  );
}
