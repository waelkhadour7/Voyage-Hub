import { useEffect, useRef, useState } from "react";
import { App as CapApp } from "@capacitor/app";
import { StatusBar, Style } from "@capacitor/status-bar";
import { SplashScreen } from "@capacitor/splash-screen";
import { useHashRoute } from "../../lib/useHashRoute";
import { usePassportLang } from "../../lib/usePassportLang";
import { appText } from "../../data/appText";
import AppHeader from "./AppHeader";
import AppTabBar from "./AppTabBar";
import HomeScreen from "./screens/HomeScreen";
import ExploreScreen from "./screens/ExploreScreen";
import ServicesScreen from "./screens/ServicesScreen";
import SupportScreen from "./screens/SupportScreen";
import MoreScreen from "./screens/MoreScreen";
import "../../styles-app.css";

export default function AppShell() {
  const { activeTab, param, navigate, back, saveTabScroll, getTabScroll } = useHashRoute();
  const { lang, t, dir } = usePassportLang();
  const [isOffline, setIsOffline] = useState(() => (typeof navigator !== "undefined" ? !navigator.onLine : false));
  const [exitToast, setExitToast] = useState(false);

  const scrollRef = useRef(null);
  const lastBackTime = useRef(0);

  // Mark body class for app mode styling & safe area rules
  useEffect(() => {
    document.documentElement.classList.add("is-app-mode");
    document.body.classList.add("is-app-mode");

    // Native Status Bar & Splash Screen setup
    try {
      StatusBar.setStyle({ style: Style.Dark });
      StatusBar.setBackgroundColor({ color: "#0b4a9e" });
    } catch {}

    try {
      SplashScreen.hide();
    } catch {}

    return () => {
      document.documentElement.classList.remove("is-app-mode");
      document.body.classList.remove("is-app-mode");
    };
  }, []);

  // Offline status listener
  useEffect(() => {
    const handleOnline = () => setIsOffline(false);
    const handleOffline = () => setIsOffline(true);

    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, []);

  // Android Hardware Back Button Handler
  useEffect(() => {
    let disposed = false;
    let backListener;

    try {
      CapApp.addListener("backButton", () => {
        // 1. Close open modals/sheets if present
        const closeBtn = document.querySelector(".modal-close, .cb-close, .pp-sheet-close");
        if (closeBtn) {
          closeBtn.click();
          return;
        }

        // 2. Handle param / sub-screens
        if (param) {
          back();
          return;
        }

        // 3. Handle non-home tabs
        if (activeTab !== "home") {
          navigate("#/home");
          return;
        }

        // 4. Double tap to exit from Home tab
        const now = Date.now();
        if (now - lastBackTime.current < 2000) {
          CapApp.exitApp();
        } else {
          lastBackTime.current = now;
          setExitToast(true);
          setTimeout(() => setExitToast(false), 2000);
        }
      }).then((listener) => {
        if (disposed) listener.remove();
        else backListener = listener;
      }).catch(() => {});
    } catch {}

    return () => {
      disposed = true;
      try {
        backListener?.remove();
      } catch {}
    };
  }, [activeTab, param, back, navigate]);

  // Restore scroll position when switching tabs
  useEffect(() => {
    if (scrollRef.current) {
      const savedPos = getTabScroll(activeTab);
      scrollRef.current.scrollTop = savedPos;
    }
  }, [activeTab, getTabScroll]);

  const handleScroll = (e) => {
    saveTabScroll(activeTab, e.target.scrollTop);
  };

  const screenTitleMap = {
    home: t(appText.appName),
    explore: t(appText.tabs.explore),
    services: t(appText.tabs.services),
    support: t(appText.tabs.support),
    more: t(appText.tabs.more),
  };

  return (
    <div className="ap-shell" dir={dir}>
      {/* App Header */}
      <AppHeader
        title={screenTitleMap[activeTab] || t(appText.appName)}
        showBack={!!param}
        onBack={back}
      />

      {/* Offline Banner */}
      {isOffline && (
        <div className="ap-offline-banner" role="status">
          {t(appText.offlineBanner)}
        </div>
      )}

      {/* Toast Notification */}
      {exitToast && (
        <div className="ap-offline-banner" style={{ background: "#1e293b" }} role="status">
          {t(appText.exitToast)}
        </div>
      )}

      {/* Main Screen Scroll Container */}
      <div className="ap-main-container">
        <div className="ap-screen-scroll" ref={scrollRef} onScroll={handleScroll}>
          {activeTab === "home" && <HomeScreen onNavigate={navigate} />}
          {activeTab === "explore" && <ExploreScreen param={param} onNavigate={navigate} />}
          {activeTab === "services" && <ServicesScreen onNavigate={navigate} />}
          {activeTab === "support" && <SupportScreen onNavigate={navigate} />}
          {activeTab === "more" && <MoreScreen onNavigate={navigate} />}
        </div>
      </div>

      {/* Bottom Navigation Tab Bar */}
      <AppTabBar
        activeTab={activeTab}
        onSelectTab={(tabId) => navigate(`#/${tabId}`)}
      />
    </div>
  );
}
