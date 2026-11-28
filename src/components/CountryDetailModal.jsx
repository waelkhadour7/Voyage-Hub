import { MessageCircle, ArrowLeft, MapPin, Info, Compass, ClipboardCheck } from "lucide-react";
import contact from "../data/contact";
import "../styles-country-detail.css";

const COUNTRY_OVERVIEWS = {
  Kenya: "Embark on an unforgettable African safari adventure through Kenya's iconic Maasai Mara, Great Rift Valley, and wildlife reserves with luxury tented camps and guided game drives.",
  Egypt: "Discover the timeless wonders of Egypt, from the ancient Pyramids of Giza and Sphinx to luxury Nile cruises, Luxor temples, and Red Sea coastal escapes.",
  Philippines: "Experience the vibrant twin cities and pristine tropical islands of Palawan and El Nido in the Philippines. Enjoy luxury beach resorts, crystal-clear lagoons, and island-hopping tours.",
  China: "Discover the imperial majesty and ancient heritage of Beijing, including guided tours of the Great Wall of China, Forbidden City, and authentic cultural experiences.",
  Nepal: "A scenic Himalayan adventure combining panoramic mountain vistas in Pokhara, ancient heritage in Kathmandu, and thrilling jungle wildlife safari in Chitwan National Park.",
  Korea: "Immerse yourself in Seoul's vibrant street life, iconic K-Pop culture, historic Gyeongbokgung palace, and modern shopping districts.",
  Thailand: "Escape to tropical paradise with luxury island stays in Phuket, limestone lagoon boat tours in Phi Phi, and vibrant cultural explorations in Bangkok.",
  Japan: "A captivating cultural journey through Tokyo's futuristic skyline and Kyoto's historic temples, serene gardens, and traditional tea houses.",
  Vietnam: "Explore the breathtaking limestone islands of Ha Long Bay, historic Hanoi streets, and scenic emerald waters on a luxury cruise.",
  Indonesia: "Retreat to Bali's tropical beaches, lush rice terraces in Ubud, vibrant arts, and luxury wellness resorts.",
};

const HIGHLIGHTS = {
  Kenya: ["Maasai Mara wildlife", "Great Rift Valley", "Guided game drives"],
  Egypt: ["Pyramids of Giza", "Nile cruises", "Red Sea escapes"],
  Philippines: ["Palawan and El Nido", "Island hopping", "Tropical beaches"],
  China: ["Great Wall", "Forbidden City", "Beijing heritage"],
  Nepal: ["Kathmandu heritage", "Pokhara mountain views", "Chitwan wildlife"],
  Korea: ["Seoul city life", "Gyeongbokgung Palace", "Shopping and culture"],
  Thailand: ["Bangkok culture", "Phuket beaches", "Phi Phi islands"],
  Japan: ["Tokyo city life", "Kyoto temples", "Traditional gardens"],
  Vietnam: ["Ha Long Bay", "Hanoi old streets", "Scenic cruises"],
  Indonesia: ["Bali beaches", "Ubud rice terraces", "Arts and wellness"],
};

export default function CountryDetailModal({ item, onClose }) {
  if (!item) return null;

  const whatsappDigits = contact.whatsapp.replace(/\D/g, "");
  const overviewText =
    COUNTRY_OVERVIEWS[item.country] ||
    "We curate handpicked luxury travel experiences tailored precisely to your schedule, preferences, and holiday goals.";

  const handleWhatsAppInquiry = () => {
    const message = `Hello Voyage Plus, I would like to get a customized quote for ${item.country} - ${item.title}.`;
    const url = `https://wa.me/${whatsappDigits}?text=${encodeURIComponent(message)}`;
    window.open(url, "_blank");
  };

  return (
    <div className="cd-backdrop" onMouseDown={(e) => e.target === e.currentTarget && onClose()}>
      <div className="cd-sheet" role="dialog" aria-modal="true" aria-label={item.title}>
        {/* Hero Background Header */}
        <div className="cd-hero-wrap" style={{ backgroundImage: `url(${item.image})` }}>
          <div className="cd-hero-overlay" />

          <button type="button" className="cd-close-btn" onClick={onClose} aria-label="Close">
            <ArrowLeft size={20} />
          </button>

        </div>

        {/* Content Card Overlapping Hero */}
        <div className="cd-content-card">
          <div className="cd-title-row">
            <div>
              <h2 className="cd-main-title">{item.title}</h2>
              <span className="cd-country-badge">
                <MapPin size={14} /> {item.country}
              </span>
            </div>
          </div>

          {/* Overview */}
          <div className="cd-overview-wrap">
            <h4>Overview</h4>
            <p>{overviewText}</p>
          </div>

          {HIGHLIGHTS[item.country] && <div className="cd-planning-block">
            <h4><Compass size={18} /> Experience highlights</h4>
            <div className="cd-highlight-list">{HIGHLIGHTS[item.country].map((highlight) => <span key={highlight}>{highlight}</span>)}</div>
            <p>These are ideas for your trip. Ask our team about availability and a personalised itinerary.</p>
          </div>}
          <div className="cd-planning-block">
            <h4><ClipboardCheck size={18} /> Before you travel</h4>
            <ul><li>Check passport and entry requirements with official sources.</li><li>Confirm travel dates, flights and accommodation before booking.</li><li>Consider travel insurance and allow room in your budget for activities.</li></ul>
          </div>

          {/* Action Buttons */}
          <div className="cd-actions-wrap">
            <button type="button" className="cd-whatsapp-btn" onClick={handleWhatsAppInquiry}>
              <MessageCircle size={20} />
              <span>Inquire via WhatsApp</span>
            </button>

            <button
              type="button"
              className="cd-details-btn"
              onClick={() => {
                window.location.href = `tel:${contact.phone.replace(/\s/g, "")}`;
              }}
            >
              <Info size={16} />
              <span>Call Us: {contact.phone}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
