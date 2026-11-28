import { Map, Plane, Building2, BookUser, Bus, ShieldCheck, Users } from "lucide-react";
import ServiceItem from "./ServiceItem";
import B2BButton from "./B2BButton";

const blue = "#0b84d6";
const green = "#7fae2f";
const services = [
  { label: "TOUR PACKAGES", icon: Map, color: blue, href: "#/packages" },
  { label: "FLIGHTS", icon: Plane, color: green, href: "#/flights" },
  { label: "HOTELS", icon: Building2, color: blue, href: "#/hotels" },
  { label: "SCHENGEN VISA", icon: BookUser, color: green, onClick: () => window.dispatchEvent(new CustomEvent("voyage:open-schengen")) },
  { label: "TRANSFER", icon: Bus, color: blue, href: "#/transfer" },
  { label: "INSURANCE", icon: ShieldCheck, color: green, href: "#/insurance" },
];

export default function ServiceBar() {
  return (
    <div className="container">
      <div className="service-bar">
        {services.map((s) => (
          <ServiceItem key={s.label} {...s} />
        ))}
        <B2BButton />
      </div>
    </div>
  );
}
