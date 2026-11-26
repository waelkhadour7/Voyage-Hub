import { useEffect, useState } from "react";
import { User, Equal } from "lucide-react";
import Logo from "./Logo";
import NavDropdown from "./NavDropdown";
import Button from "./Button";
import IconButton from "./IconButton";
import AgentModal from "./AgentModal";
import ContactMenu from "./ContactMenu";

const about = [{ label: "Who we are", href: "#" }, { label: "Contact", href: "#" }];
const services = [
  { label: "Tour packages", href: "#" },
  { label: "Flights", href: "#" },
  { label: "Hotels", href: "#" },
];

export default function Header() {
  const [agentOpen, setAgentOpen] = useState(false);

  // البوت يفتح نافذة التسجيل عبر هذا الحدث
  useEffect(() => {
    const open = () => setAgentOpen(true);
    window.addEventListener("voyage:open-agent", open);
    return () => window.removeEventListener("voyage:open-agent", open);
  }, []);
  return (
    <header className="header">
      <Logo />
      <nav className="nav">
        <NavDropdown label="About" items={about} />
        <NavDropdown label="Services" items={services} />
        <Button icon={User} onClick={() => setAgentOpen(true)} title="Agent Sign Up" aria-label="Agent Sign Up">Agent Sign Up</Button>
        <IconButton icon={Equal} label="Menu" />
        <ContactMenu />
      </nav>
      <AgentModal open={agentOpen} onClose={() => setAgentOpen(false)} />
    </header>
  );
}
