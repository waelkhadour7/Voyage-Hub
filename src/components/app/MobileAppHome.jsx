import { useState } from "react";
import { Search, MapPin, Star, ArrowUpRight, Map, Plane, Building2, BookUser, Bus, ShieldCheck, Users, SlidersHorizontal, User } from "lucide-react";
import { destinations } from "../../data/destinations";
import Logo from "../Logo";
import ContactMenu from "../ContactMenu";
import AgentModal from "../AgentModal";
import CountryBudgetModal from "../CountryBudgetModal";
import ReadinessSection from "../readiness/ReadinessSection";
import AirlinesSection from "../AirlinesSection";
import "../../styles-mobile-home.css";

const services = [
  { label: "Tour Packages", icon: Map, key: "packages" },
  { label: "Flights", icon: Plane, key: "flights" },
  { label: "Hotels", icon: Building2, key: "hotels" },
  { label: "Visa", icon: BookUser, key: "visa" },
  { label: "Transfer", icon: Bus, key: "transfer" },
  { label: "Insurance", icon: ShieldCheck, key: "insurance" },
  { label: "B2B", icon: Users, key: "b2b" },
];

export default function MobileAppHome() {
  const [activeCountry, setActiveCountry] = useState(null);
  const [agentOpen, setAgentOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("packages");

  const filteredDestinations = destinations.filter((item) => {
    if (!search.trim()) return true;
    const q = search.toLowerCase();
    return (
      item.country.toLowerCase().includes(q) ||
      item.title.toLowerCase().includes(q)
    );
  });

  return (
    <div className="mh-container">
      {/* Top Header / Greeting Bar */}
      <header className="mh-header">
        <div className="mh-user-info">
          <Logo />
          <div className="mh-greeting">
            <small>Welcome to</small>
            <strong>Voyage Plus Travel</strong>
          </div>
        </div>

        <div className="mh-actions">
          <button
            type="button"
            className="mh-action-btn"
            onClick={() => setAgentOpen(true)}
            aria-label="Agent Sign Up"
            title="Agent Sign Up"
          >
            <User size={18} />
          </button>
          <ContactMenu />
        </div>
      </header>

      {/* Main Headline */}
      <h1 className="mh-headline">
        Explore Amazing <span>Destinations !</span>
      </h1>

      {/* Search & Filter Bar */}
      <div className="mh-search-row">
        <div className="mh-search-box">
          <Search size={18} className="mh-search-icon" aria-hidden="true" />
          <input
            type="text"
            className="mh-search-input"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search destination or package..."
            dir="auto"
          />
        </div>
        <button
          type="button"
          className="mh-filter-btn"
          aria-label="Filters"
          onClick={() => {
            const section = document.getElementById("readiness-checker");
            section?.scrollIntoView({ behavior: "smooth" });
          }}
        >
          <SlidersHorizontal size={18} />
        </button>
      </div>

      {/* Where would you like to visit? (Circular Country Avatars Carousel) */}
      <div className="mh-section-head">
        <h2 className="mh-section-title">Where would you like to visit?</h2>
      </div>

      <div className="mh-circle-carousel">
        {destinations.map((d) => (
          <button
            key={d.country}
            type="button"
            className="mh-circle-item"
            onClick={() => setActiveCountry(d.country)}
          >
            <div className="mh-circle-img-wrap">
              <img src={d.image} alt={d.country} className="mh-circle-img" />
            </div>
            <span className="mh-circle-label">{d.country}</span>
          </button>
        ))}
      </div>

      {/* Popular Destinations Cards */}
      <div className="mh-section-head">
        <h2 className="mh-section-title">Popular Destinations</h2>
        <button
          type="button"
          className="mh-see-all"
          onClick={() => setActiveCountry(destinations[0].country)}
        >
          See all
        </button>
      </div>

      <div className="mh-popular-grid">
        {filteredDestinations.map((item) => (
          <div
            key={item.country}
            className="mh-card"
            style={{ backgroundImage: `url(${item.image})` }}
            onClick={() => setActiveCountry(item.country)}
            role="button"
            tabIndex={0}
            aria-label={`View budget and tour quote for ${item.country}`}
          >
            <div className="mh-card-overlay" />
            <div className="mh-card-top">
              <span className="mh-arrow-badge">
                <ArrowUpRight size={16} />
              </span>
            </div>
            <div className="mh-card-bottom">
              <div className="mh-card-meta">
                <span className="mh-card-country">
                  <MapPin size={12} /> {item.country}
                </span>
                <span className="mh-card-rating">
                  <Star size={12} fill="currentColor" /> {item.rating}
                </span>
              </div>
              <h3 className="mh-card-title">{item.title}</h3>
            </div>
          </div>
        ))}
      </div>

      {/* Choose Category / Services Pill Chips */}
      <div className="mh-section-head">
        <h2 className="mh-section-title">Explore Services</h2>
      </div>

      <div className="mh-category-chips">
        {services.map((s) => {
          const Icon = s.icon;
          const isActive = activeCategory === s.key;
          return (
            <button
              key={s.key}
              type="button"
              className={`mh-cat-chip ${isActive ? "is-active" : ""}`}
              onClick={() => setActiveCategory(s.key)}
            >
              <span className="mh-cat-icon">
                <Icon size={14} />
              </span>
              <span>{s.label}</span>
            </button>
          );
        })}
      </div>

      {/* Travel Readiness Checker Widget */}
      <ReadinessSection />

      {/* Airline Partners */}
      <AirlinesSection />

      {/* Country Budget Modal */}
      <CountryBudgetModal
        countryName={activeCountry}
        onClose={() => setActiveCountry(null)}
      />

      {/* Agent Sign Up Modal */}
      <AgentModal open={agentOpen} onClose={() => setAgentOpen(false)} />
    </div>
  );
}
