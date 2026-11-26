export default function IconButton({ icon: Icon, label, href, onClick, expanded }) {
  const Tag = href ? "a" : "button";
  return (
    <Tag
      className="icon-btn"
      href={href}
      onClick={onClick}
      aria-label={label}
      aria-expanded={expanded}
      type={href ? undefined : "button"}
    >
      <Icon size={18} />
    </Tag>
  );
}
