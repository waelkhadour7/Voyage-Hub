import { useState } from "react";
import { ArrowLeft, Share2, Star, MapPin, Users, Bath, Bed, Maximize2, MessageCircle } from "lucide-react";
import contact from "../data/contact";
import "../styles-hotels.css";

export default function HotelDetailModal({ hotel, onClose }) {
  const [expanded, setExpanded] = useState(false);

  if (!hotel) return null;

  const whatsappDigits = contact.whatsapp.replace(/\D/g, "");

  const handleWhatsAppBooking = () => {
    const message = `Hello Voyage Plus, I am interested in reserving a stay at ${hotel.name} in ${hotel.location}. Please provide availability and customized package details.`;
    const url = `https://wa.me/${whatsappDigits}?text=${encodeURIComponent(message)}`;
    window.open(url, "_blank");
  };

  return (
    <div className="ht-backdrop" onMouseDown={(e) => e.target === e.currentTarget && onClose()}>
      <div className="ht-sheet" role="dialog" aria-modal="true" aria-label={hotel.name}>
        {/* Hero Background Header */}
        <div className="ht-hero-wrap" style={{ backgroundImage: `url(${hotel.image})` }}>
          <div className="ht-hero-overlay" />

          <button type="button" className="ht-close-btn" onClick={onClose} aria-label="Close">
            <ArrowLeft size={20} />
          </button>

          <button type="button" className="ht-share-btn" aria-label="Share">
            <Share2 size={18} />
          </button>
        </div>

        {/* Card Content Overlapping Hero */}
        <div className="ht-content-card">
          <div className="ht-title-row">
            <div>
              <h2 className="ht-main-title">{hotel.name}</h2>
              <span className="ht-location-text">
                <MapPin size={14} /> {hotel.location}
              </span>
            </div>
            <div className="ht-price-wrap">
              <strong>{hotel.pricePerNight}</strong>
              <small>/ night</small>
            </div>
          </div>

          {/* Photo Gallery Thumbnails */}
          <div className="ht-gallery-row">
            {hotel.gallery.slice(0, 3).map((img, idx) => (
              <img key={idx} src={img} alt="" className="ht-gallery-thumb" />
            ))}
            <div className="ht-gallery-more">
              <span>12+ more</span>
            </div>
          </div>

          {/* Property Details Badges */}
          <div className="ht-section-block">
            <h4>Property details</h4>
            <div className="ht-specs-grid">
              <span className="ht-spec-badge">
                <Maximize2 size={14} /> {hotel.specs.size}
              </span>
              <span className="ht-spec-badge">
                <Users size={14} /> {hotel.specs.guests}
              </span>
              <span className="ht-spec-badge">
                <Bath size={14} /> {hotel.specs.bath}
              </span>
              <span className="ht-spec-badge">
                <Bed size={14} /> {hotel.specs.beds}
              </span>
            </div>
            <p className="ht-description">
              {expanded ? hotel.description : `${hotel.description.slice(0, 110)}...`}
              <button type="button" className="ht-read-more" onClick={() => setExpanded(!expanded)}>
                {expanded ? " Show less" : " Read more"}
              </button>
            </p>
          </div>

          {/* Rating and Reviews */}
          <div className="ht-section-block">
            <div className="ht-rating-head">
              <Star size={18} fill="#f59e0b" color="#f59e0b" />
              <strong>{hotel.rating}</strong>
              <span>• {hotel.reviewsCount} reviews</span>
            </div>

            <div className="ht-bars-group">
              <div className="ht-bar-row">
                <span>Communication</span>
                <div className="ht-bar-track">
                  <div className="ht-bar-fill" style={{ width: "98%" }} />
                </div>
                <strong>{hotel.ratings.communication}</strong>
              </div>

              <div className="ht-bar-row">
                <span>Cleanliness</span>
                <div className="ht-bar-track">
                  <div className="ht-bar-fill" style={{ width: "96%" }} />
                </div>
                <strong>{hotel.ratings.cleanliness}</strong>
              </div>
            </div>
          </div>

          {/* Sticky Bottom Booking Bar */}
          <div className="ht-sticky-footer">
            <div className="ht-footer-price">
              <strong>{hotel.totalEst}</strong>
              <small>Estimated for 7 nights</small>
            </div>

            <button type="button" className="ht-book-btn" onClick={handleWhatsAppBooking}>
              <MessageCircle size={18} />
              <span>Inquire / Book Now</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
