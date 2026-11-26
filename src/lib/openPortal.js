import { Capacitor, registerPlugin } from "@capacitor/core";
import { portal } from "../data/portal";

const Portal = registerPlugin("Portal");

export function openPortal() {
  if (Capacitor.isNativePlatform()) return Portal.open({ url: portal.url, title: portal.title });
  window.open(portal.url, "_blank", "noopener"); // تجربة المتصفح فقط
}
