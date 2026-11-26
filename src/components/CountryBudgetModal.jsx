import { useState } from "react";
import { MessageCircle, X, Plane, Wallet, Building2 } from "lucide-react";
import { DEPARTURE_CITIES, getCountryBudget } from "../data/countryBudgets";
import contact from "../data/contact";

export default function CountryBudgetModal({ countryName, onClose }) {
  const [departure, setDeparture] = useState(DEPARTURE_CITIES[0]); // Default: Dubai 🇦🇪

  if (!countryName) return null;

  const data = getCountryBudget(countryName);
  const startingPrice = data.startingPrices[departure.code] || "$850";
  const whatsappDigits = contact.whatsapp.replace(/\D/g, "");

  const handleWhatsAppQuote = () => {
    const message = `Hello Voyage Tours, I would like to get a customized tour quote for ${data.name} departing from ${departure.name}.`;
    const url = `https://wa.me/${whatsappDigits}?text=${encodeURIComponent(message)}`;
    window.open(url, "_blank");
  };

  return (
    <div className="cb-backdrop" onMouseDown={(e) => e.target === e.currentTarget && onClose()}>
      <div className="cb-sheet" role="dialog" aria-modal="true" aria-label={`${data.name} Tour Quote & Budget`}>
        <button className="cb-close" onClick={onClose} aria-label="Close"><X size={20} /></button>

        {/* Header: Country Flag Image, Name, and Currency */}
        <div className="cb-header">
          <img
            src={`https://flagcdn.com/w80/${data.iso}.png`}
            alt={`${data.name} flag`}
            className="cb-flag-img"
            onError={(e) => {
              e.target.style.display = "none";
            }}
          />
          <div>
            <h3>{data.name}</h3>
            <p>Local Currency: <strong>{data.currency}</strong></p>
          </div>
        </div>

        <div className="cb-body">
          {/* Departure Point Selector */}
          <div className="cb-group">
            <label className="cb-label"><Plane size={15} /> Departure Point</label>
            <div className="cb-chips">
              {DEPARTURE_CITIES.map((city) => (
                <button
                  key={city.code}
                  type="button"
                  className={`cb-chip ${departure.code === city.code ? "is-active" : ""}`}
                  onClick={() => setDeparture(city)}
                >
                  <img
                    src={`https://flagcdn.com/w40/${city.iso}.png`}
                    alt={`${city.name} flag`}
                    className="cb-chip-flag"
                    onError={(e) => {
                      e.target.style.display = "none";
                    }}
                  />
                  <span>{city.name}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Estimated Daily Budget */}
          <div className="cb-group">
            <label className="cb-label"><Wallet size={15} /> Estimated Daily Budget</label>
            <div className="cb-budget-grid">
              <div className="cb-budget-card cb-eco">
                <span>Economy</span>
                <strong>{data.budget.economy}</strong>
              </div>
              <div className="cb-budget-card cb-mid">
                <span>Mid-range</span>
                <strong>{data.budget.midrange}</strong>
              </div>
              <div className="cb-budget-card cb-lux">
                <span>Luxury</span>
                <strong>{data.budget.luxury}</strong>
              </div>
            </div>
          </div>

          {/* Flight & Accommodation Starting Price */}
          <div className="cb-price-card">
            <div className="cb-price-info">
              <span><Building2 size={16} /> Flights + Hotels from ({departure.name})</span>
              <small>Estimated baseline package starting cost</small>
            </div>
            <strong className="cb-price-val">{startingPrice}</strong>
          </div>

          {/* Sales Lead CTA Button */}
          <button type="button" className="cb-whatsapp-btn" onClick={handleWhatsAppQuote}>
            <MessageCircle size={20} />
            <span>Get a Tour Quote</span>
          </button>
        </div>
      </div>
    </div>
  );
}
