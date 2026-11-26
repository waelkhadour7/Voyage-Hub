import { useState } from "react";
import { Building2, MapPin, Star, Tag, Bed, Key, Heart, ArrowRight } from "lucide-react";
import { hotels } from "../data/hotels";
import HotelDetailModal from "./HotelDetailModal";
import "../styles-hotels.css";

export default function HotelsSection() {
  const [activeHotel, setActiveHotel] = useState(null);

  return (
    <section className="ht-section" id="hotels-section">
      <div className="container">
        <div className="ht-banner-card">
          {/* Main Content Side */}
          <div className="ht-banner-info">
            <span className="ht-badge">
              <Building2 size={15} /> Premium Hotel Stays
            </span>
            <h2 className="ht-banner-title">Stay Somewhere Beautiful</h2>
            <p className="ht-banner-subtitle">
              Discover handpicked hotels, luxurious stays, and exceptional experiences in the world’s most beautiful destinations.
            </p>

            <button
              type="button"
              className="ht-btn-explore"
              onClick={() => setActiveHotel(hotels[0])}
            >
              <span>Explore All Hotels</span>
              <ArrowRight size={16} />
            </button>
          </div>

          {/* Cards Carousel / Grid */}
          <div className="ht-cards-grid">
            {hotels.slice(0, 3).map((item) => (
              <div
                key={item.id}
                className="ht-card"
                onClick={() => setActiveHotel(item)}
                role="button"
                tabIndex={0}
                aria-label={`View details for ${item.name}`}
              >
                <div className="ht-card-img" style={{ backgroundImage: `url(${item.image})` }}>
                  <span className="ht-card-country">
                    <MapPin size={12} /> {item.country}
                  </span>
                  <span className="ht-card-rating">
                    <Star size={12} fill="#8dbb2e" color="#8dbb2e" /> {item.rating}
                  </span>
                </div>

                <div className="ht-card-body">
                  <h3 className="ht-card-name">{item.name}</h3>

                  <div className="ht-features-row">
                    <div className="ht-feat-badge">
                      <Tag size={12} />
                      <small>Best Price</small>
                    </div>
                    <div className="ht-feat-badge">
                      <Bed size={12} />
                      <small>Comfort</small>
                    </div>
                    <div className="ht-feat-badge">
                      <Key size={12} />
                      <small>Check in/out</small>
                    </div>
                    <div className="ht-feat-badge">
                      <Heart size={12} />
                      <small>Hospitality</small>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <HotelDetailModal
        hotel={activeHotel}
        onClose={() => setActiveHotel(null)}
      />
    </section>
  );
}
