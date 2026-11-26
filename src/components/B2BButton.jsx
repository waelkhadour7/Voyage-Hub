import { Capacitor } from "@capacitor/core";
import { InAppBrowser } from "@capgo/capacitor-inappbrowser";
import { portal } from "../data/portal";

export default function B2BButton() {
  const handleClick = async () => {
    if (Capacitor.isNativePlatform()) {
      try {
        // Use openWebView to keep the portal strictly inside the app.
        // Provide a clean standard mobile Chrome user agent (without '; wv')
        // to bypass the website's anti-WebView block ("This site cannot be loaded in a WebView").
        await InAppBrowser.openWebView({
          url: portal.url,
          title: portal.title,
          enableGooglePaySupport: true,
          showArrow: true,
          customUserAgent:
            "Mozilla/5.0 (Linux; Android 10; Mobile) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Mobile Safari/537.36",
        });
      } catch (err) {
        console.error("Failed to open InAppBrowser:", err);
        window.open(portal.url, "_blank");
      }
    } else {
      window.open(portal.url, "_blank");
    }
  };

  return (
    <button className="b2b-btn" onClick={handleClick} aria-label="B2B Portal">
      B2B
    </button>
  );
}
