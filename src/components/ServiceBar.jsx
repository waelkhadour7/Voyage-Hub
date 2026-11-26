import { Map, Plane, Building2, BookUser, Bus, ShieldCheck, Users } from "lucide-react";
import ServiceItem from "./ServiceItem";

const blue = "#0b84d6";
const green = "#7fae2f";
const services = [
  { label: "TOUR PACKAGES", icon: Map, color: blue, href: "#/packages" },
  { label: "FLIGHTS", icon: Plane, color: green, href: "#/flights" },
  { label: "HOTELS", icon: Building2, color: blue, href: "#/hotels" },
  { label: "VISA", icon: BookUser, color: green, href: "#/visa" },
  { label: "TRANSFER", icon: Bus, color: blue, href: "#/transfer" },
  { label: "INSURANCE", icon: ShieldCheck, color: green, href: "#/insurance" },
  { label: "B2B", icon: Users, color: blue, href: "#/b2b" },
];

export default function ServiceBar() {
  return (
    <div className="container">
      <div className="service-bar">
        {services.map((s) => (
          <ServiceItem key={s.label} {...s} />
        ))}
      </div>
    </div>
  );
}
