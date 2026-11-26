import { useState } from "react";
import { ChevronDown } from "lucide-react";

export default function NavDropdown({ label, items = [] }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="dropdown" onMouseLeave={() => setOpen(false)}>
      <button
        className="nav-link"
        aria-expanded={open}
        onClick={() => setOpen(!open)}
        onMouseEnter={() => setOpen(true)}
      >
        {label} <ChevronDown size={16} />
      </button>
      {open && (
        <ul className="dropdown-menu">
          {items.map((i) => (
            <li key={i.label}><a href={i.href}>{i.label}</a></li>
          ))}
        </ul>
      )}
    </div>
  );
}
