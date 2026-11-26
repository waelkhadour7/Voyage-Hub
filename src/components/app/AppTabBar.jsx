import { useEffect, useState } from "react";
import { Home, Compass, Briefcase, Headphones, Menu } from "lucide-react";
import { Haptics, ImpactStyle } from "@capacitor/haptics";
import { Keyboard } from "@capacitor/keyboard";
import { appText } from "../../data/appText";
import { usePassportLang } from "../../lib/usePassportLang";

export default function AppTabBar({ activeTab, onSelectTab }) {
  const { lang, t, dir } = usePassportLang();
  const [keyboardOpen, setKeyboardOpen] = useState(false);

  useEffect(() => {
    let hideListener;
    let showListener;

    try {
      showListener = Keyboard.addListener("keyboardWillShow", () => setKeyboardOpen(true));
      hideListener = Keyboard.addListener("keyboardWillHide", () => setKeyboardOpen(false));
    } catch {
      // Non-native / fallback
    }

    const onFocusIn = (e) => {
      if (["INPUT", "TEXTAREA", "SELECT"].includes(e.target?.tagName)) {
        setKeyboardOpen(true);
      }
    };
    const onFocusOut = () => setKeyboardOpen(false);

    window.addEventListener("focusin", onFocusIn);
    window.addEventListener("focusout", onFocusOut);

    return () => {
      try {
        showListener?.remove();
        hideListener?.remove();
      } catch {}
      window.removeEventListener("focusin", onFocusIn);
      window.removeEventListener("focusout", onFocusOut);
    };
  }, []);

  const tabs = [
    { id: "home", icon: Home, label: t(appText.tabs.home) },
    { id: "explore", icon: Compass, label: t(appText.tabs.explore) },
    { id: "services", icon: Briefcase, label: t(appText.tabs.services) },
    { id: "support", icon: Headphones, label: t(appText.tabs.support) },
    { id: "more", icon: Menu, label: t(appText.tabs.more) },
  ];

  const handleTabClick = (tabId) => {
    try {
      Haptics.impact({ style: ImpactStyle.Light });
    } catch {}
    onSelectTab(tabId);
  };

  return (
    <div
      className={`ap-tabbar-wrap ${keyboardOpen ? "is-keyboard-open" : ""}`}
      dir={dir}
      role="navigation"
      aria-label="Bottom Navigation"
    >
      <nav className="ap-tabbar" role="tablist">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              type="button"
              role="tab"
              aria-selected={isActive}
              aria-current={isActive ? "page" : undefined}
              className={`ap-tab-item ${isActive ? "is-active" : ""}`}
              onClick={() => handleTabClick(tab.id)}
            >
              <div className="ap-tab-icon-wrap">
                {isActive && <div className="ap-tab-pill" />}
                <Icon size={20} className="ap-tab-icon" />
              </div>
              <span className="ap-tab-label">{tab.label}</span>
            </button>
          );
        })}
      </nav>
    </div>
  );
}
