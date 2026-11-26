import { Capacitor } from "@capacitor/core";

export function isAppMode() {
  if (typeof window === "undefined") return false;

  // 1. Force app mode with ?app=1 in URL (for web browser testing)
  const urlParams = new URLSearchParams(window.location.search);
  if (urlParams.get("app") === "1") return true;

  // 2. Native Capacitor app (Android / iOS)
  if (Capacitor.isNativePlatform()) return true;

  // 3. Installed PWA (Standalone mode)
  if (window.matchMedia && window.matchMedia("(display-mode: standalone)").matches) return true;

  return false;
}

export function isNativeApp() {
  return typeof window !== "undefined" && Capacitor.isNativePlatform();
}
