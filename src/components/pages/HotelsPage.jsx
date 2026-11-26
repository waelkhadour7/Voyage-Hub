import { useState } from "react";
import { ArrowLeft, ArrowRight, Star, MapPin, Heart, Building2 } from "lucide-react";
import { Haptics, ImpactStyle } from "@capacitor/haptics";
import ChatBot from "../ChatBot";
import B2BButton from "../B2BButton";
import HotelDetailModal from "../HotelDetailModal";
import ContactMenu from "../ContactMenu";
import Logo from "../Logo";
import { HOTEL_CITIES, hotels } from "../../data/hotels";
import { usePassportLang } from "../../lib/usePassportLang";
import "../../styles-hotels-grid.css";

export default function HotelsPage({ onBackToHome }) {
  const { lang, dir } = usePassportLang();
  const isRtl = dir === "rtl";

  const [activeHotel, setActiveHotel] = useState(null);
  const [selectedCity, setSelectedCity] = useState("all");
  const [selectedPrice, setSelectedPrice] = useState("all");
  const [selectedRating, setSelectedRating] = useState("all");

  const handleBack = () => {
    try {
      Haptics.impact({ style: ImpactStyle.Light });
    } catch {}
    if (onBackToHome) onBackToHome();
  };

  const filteredHotels = hotels.filter((h) => {
    // City filter
    if (selectedCity !== "all" && h.cityId !== selectedCity) return false;

    // Price filter
    if (selectedPrice === "under200" && h.priceNum > 200) return false;
    if (selectedPrice === "200-400" && (h.priceNum < 200 || h.priceNum > 400)) return false;
    if (selectedPrice === "over400" && h.priceNum < 400) return false;

    // Rating filter
    if (selectedRating === "4.9" && parseFloat(h.rating) < 4.9) return false;

    return true;
  });

  return (
    <div className="hg-page-wrap" dir={dir}>
      {/* Native App Top Bar */}
      <header className="hg-native-appbar">
        <button
          type="button"
          className="hg-appbar-back"
          onClick={handleBack}
          aria-label={lang === "ar" ? "العودة للرئيسية" : "Back to Home"}
        >
          {isRtl ? <ArrowRight size={18} /> : <ArrowLeft size={18} />}
          <span>{lang === "ar" ? "الرئيسية" : "Home"}</span>
        </button>

        <h1 className="hg-appbar-title">
          {lang === "ar" ? "الفنادق والإقامة" : "Hotels & Stays"}
        </h1>

        <ContactMenu />
      </header>

      {/* Main Hotels Exploration Grid */}
      <main className="hg-container">
        <div className="container">
          {/* Header Title */}
          <div className="hg-head">
            <div className="hg-head-text">
              <h2>{lang === "ar" ? "الفنادق الفاخرة" : "Hotels"}</h2>
              <p>{lang === "ar" ? "ابحث عن الفندق المثالي لإقامتك القادمة" : "Find hotels for your next stay!"}</p>
            </div>
          </div>

          {/* Filter Dropdowns Row */}
          <div className="hg-filter-row">
            <select
              value={selectedCity}
              onChange={(e) => setSelectedCity(e.target.value)}
              className="hg-select"
              aria-label="Filter by Location"
            >
              {HOTEL_CITIES.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name} ({c.country})
                </option>
              ))}
            </select>

            <select
              value={selectedPrice}
              onChange={(e) => setSelectedPrice(e.target.value)}
              className="hg-select"
              aria-label="Filter by Price"
            >
              <option value="all">Price: All</option>
              <option value="under200">Under $200 / night</option>
              <option value="200-400">$200 - $400 / night</option>
              <option value="over400">Over $400 / night</option>
            </select>

            <select
              value={selectedRating}
              onChange={(e) => setSelectedRating(e.target.value)}
              className="hg-select"
              aria-label="Filter by Rating"
            >
              <option value="all">Rating: All</option>
              <option value="4.9">4.9★ and above</option>
            </select>
          </div>

          {/* Most Explored Destinations */}
          <div className="hg-explored-section">
            <div className="hg-section-title">
              {lang === "ar" ? "الوجهات الأكثر استكشافاً" : "Most Explored"}
            </div>
            <div className="hg-cities-carousel">
              {HOTEL_CITIES.filter((c) => c.id !== "all").map((city) => (
                <div
                  key={city.id}
                  className="hg-city-card"
                  style={{ backgroundImage: `url(${city.image})` }}
                  onClick={() => setSelectedCity(city.id)}
                  role="button"
                  tabIndex={0}
                >
                  <div className="hg-city-overlay" />
                  <div className="hg-city-info">
                    <strong>{city.name}</strong>
                    <small>{city.country}</small>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Hotels Cards Grid */}
          <div className="hg-section-title">
            {lang === "ar" ? "الفنادق المتاحة" : "Featured Hotels"}
          </div>

          <div className="hg-hotels-grid">
            {filteredHotels.map((hotel) => (
              <div
                key={hotel.id}
                className="hg-hotel-card"
                onClick={() => setActiveHotel(hotel)}
                role="button"
                tabIndex={0}
              >
                <div className="hg-card-hero" style={{ backgroundImage: `url(${hotel.image})` }}>
                  <button type="button" className="hg-fav-btn" aria-label="Favorite">
                    <Heart size={18} fill="#ef4444" />
                  </button>
                </div>

                <div className="hg-card-body">
                  <div className="hg-card-title-row">
                    <h3 className="hg-hotel-name">{hotel.name}</h3>
                  </div>

                  <span className="hg-location">
                    <MapPin size={13} /> {hotel.location}
                  </span>

                  <div className="hg-rating-row">
                    <Star size={14} fill="#f59e0b" color="#f59e0b" />
                    <span>{hotel.rating}</span>
                    <small>({hotel.reviewsCount} reviews)</small>
                  </div>

                  <div className="hg-tags-row">
                    {hotel.tags.map((tag, idx) => (
                      <span key={idx} className="hg-tag-pill">
                        {tag}
                      </span>
                    ))}
                  </div>

                  <div className="hg-card-footer">
                    <div>
                      <span className="hg-price-num">{hotel.pricePerNight}</span>
                      <span className="hg-price-unit"> / night</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>

      {/* Detailed Hotel Modal Sheet */}
      <HotelDetailModal
        hotel={activeHotel}
        onClose={() => setActiveHotel(null)}
      />

      {/* Floating Buttons */}
      <B2BButton />
      <ChatBot />
    </div>
  );
}
