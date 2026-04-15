import "../styles/globals.css";
import { useEffect } from "react";

export default function App({ Component, pageProps }) {
  useEffect(() => {
    let cancelled = false;

    const loadScript = (src) =>
      new Promise((resolve, reject) => {
        const existing = document.querySelector(`script[src="${src}"]`);

        if (existing) {
          if (existing.dataset.loaded === "true") {
            resolve();
            return;
          }

          existing.addEventListener("load", resolve, { once: true });
          existing.addEventListener("error", reject, { once: true });
          return;
        }

        const script = document.createElement("script");
        script.src = src;
        script.async = false;
        script.crossOrigin = "anonymous";
        script.onload = () => {
          script.dataset.loaded = "true";
          resolve();
        };
        script.onerror = reject;
        document.body.appendChild(script);
      });

    const bootWebflowRuntime = async () => {
      try {
        await loadScript("https://code.jquery.com/jquery-3.5.1.min.js");
        await loadScript(
          "/external/cdn.prod.website-files.com/64cc98fb252732dec5bda7e9/js/webflow.schunk.36b8fb49256177c8.js",
        );
        await loadScript(
          "/external/cdn.prod.website-files.com/64cc98fb252732dec5bda7e9/js/webflow.3512287f.6a59fb76e774e328.js",
        );
      } catch {
        // Keep page interactive even when legacy runtime fails to load.
      }
    };

    if (!cancelled) {
      bootWebflowRuntime();
    }

    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <>
      <Component {...pageProps} />
    </>
  );
}
