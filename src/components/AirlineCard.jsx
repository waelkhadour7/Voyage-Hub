import { useState } from "react";

export default function AirlineCard({ airline }) {
  const [failed, setFailed] = useState(!airline.logo);
  return (
    <div className="airline-card">
      <div className="airline-logo">
        {failed ? (
          <strong className="airline-fallback">{airline.name}</strong>
        ) : (
          <img src={airline.logo} alt="" loading="lazy" onError={() => setFailed(true)} />
        )}
      </div>
      <span className="airline-name">{airline.name}</span>
    </div>
  );
}
