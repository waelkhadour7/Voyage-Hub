import { useEffect, useRef, useState } from "react";

export function parseHash(hash) {
  const cleanHash = (hash || "#/home").replace(/^#\/?/, "");
  const parts = cleanHash.split("/").filter(Boolean);

  const mainTab = parts[0] || "home";
  const validTabs = ["home", "explore", "services", "support", "more"];
  const activeTab = validTabs.includes(mainTab) ? mainTab : "home";
  const param = parts.slice(1).join("/") || null;

  return {
    raw: hash || "#/home",
    activeTab,
    param,
  };
}

export function useHashRoute() {
  const [route, setRoute] = useState(() => parseHash(window.location.hash));
  const scrollPositions = useRef({});

  useEffect(() => {
    const handleHashChange = () => {
      setRoute(parseHash(window.location.hash));
    };

    if (!window.location.hash || window.location.hash === "#/") {
      window.history.replaceState(null, "", "#/home");
    }

    window.addEventListener("hashchange", handleHashChange);
    return () => window.removeEventListener("hashchange", handleHashChange);
  }, []);

  const saveTabScroll = (tab, scrollPos) => {
    if (tab) {
      scrollPositions.current[tab] = scrollPos;
    }
  };

  const getTabScroll = (tab) => {
    return scrollPositions.current[tab] || 0;
  };

  const navigate = (newHash) => {
    const targetHash = newHash.startsWith("#") ? newHash : `#/${newHash}`;
    if (window.location.hash !== targetHash) {
      window.location.hash = targetHash;
    }
  };

  const back = () => {
    if (window.history.length > 1) {
      window.history.back();
    } else {
      navigate("#/home");
    }
  };

  return {
    route,
    activeTab: route.activeTab,
    param: route.param,
    navigate,
    back,
    saveTabScroll,
    getTabScroll,
  };
}
