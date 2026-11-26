import { useState, useEffect } from "react";

export default function SplashScreen({ onFinish }) {
  const [exiting, setExiting] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setExiting(true);
      setTimeout(() => {
        if (onFinish) onFinish();
      }, 700);
    }, 1800);

    return () => clearTimeout(timer);
  }, [onFinish]);

  return (
    <div className={`app-splash-overlay ${exiting ? "is-exiting" : ""}`}>
      <div className="app-splash-glow"></div>
      <div className="app-splash-card">
        <img src="/logo-mark.png" alt="Voyage Plus" className="app-splash-logo" />
      </div>
      <div className="app-splash-text">
        <h1>VOYAGE PLUS</h1>
        <p>Your Portal to Complete Travel Solutions</p>
      </div>
      <div className="app-splash-progress">
        <div className="app-splash-progress-bar"></div>
      </div>
    </div>
  );
}
