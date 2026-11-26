import { BookOpen, Map, BarChart3 } from "lucide-react";
import { passportText } from "../../data/passportText";

export default function PassportTabs({ activeTab, onTabChange, t }) {
  const tabs = [
    { id: "booklet", icon: BookOpen, label: t(passportText.tabs.booklet) },
    { id: "map", icon: Map, label: t(passportText.tabs.map) },
    { id: "stats", icon: BarChart3, label: t(passportText.tabs.stats) },
  ];

  return (
    <div className="pp-tabs-wrap" role="tablist">
      {tabs.map((tab) => {
        const Icon = tab.icon;
        const isActive = activeTab === tab.id;
        return (
          <button
            key={tab.id}
            type="button"
            role="tab"
            aria-selected={isActive}
            className={`pp-tab-btn ${isActive ? "is-active" : ""}`}
            onClick={() => onTabChange(tab.id)}
          >
            <Icon size={16} />
            <span>{tab.label}</span>
          </button>
        );
      })}
    </div>
  );
}
