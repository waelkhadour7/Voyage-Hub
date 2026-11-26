import { MessageCircle, ArrowLeft, MapPin, Star, Clock, Info } from "lucide-react";
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

          {/* Photo Gallery Stack */}
          <div className="cd-gallery-stack">
            <img src={item.image} alt="" className="cd-thumb-item" />
            <span className="cd-thumb-more">+12</span>
          </div>
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

          {/* Meta Info Pills */}
          <div className="cd-meta-pills">
            <div className="cd-meta-item">
              <span className="cd-meta-icon">
                <Clock size={16} />
              </span>
              <div className="cd-meta-text">
                <small>Duration</small>
                <strong>7 Days</strong>
              </div>
            </div>

            <div className="cd-meta-item">
              <span className="cd-meta-icon star">
                <Star size={16} fill="currentColor" />
              </span>
              <div className="cd-meta-text">
                <small>Rating</small>
                <strong>{item.rating || "4.9"} (Reviews)</strong>
              </div>
            </div>
          </div>

          {/* Overview */}
          <div className="cd-overview-wrap">
            <h4>Overview</h4>
            <p>{overviewText}</p>
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
