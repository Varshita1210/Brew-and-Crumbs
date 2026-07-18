import { useEffect, useState } from "react";

export default function Preloader() {
  const [visible, setVisible] = useState(true);
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    // Lock scrolling initially
    document.body.style.overflow = "hidden";

    const triggerFadeOut = () => {
      setTimeout(() => {
        setFadeOut(true);
        setTimeout(() => {
          setVisible(false);
          document.body.style.overflow = "visible";
        }, 600); // Matches transition duration in style.css
      }, 1200); // Standard visual pause
    };

    if (document.readyState === "complete") {
      triggerFadeOut();
    } else {
      const handleLoad = () => {
        triggerFadeOut();
      };
      window.addEventListener("load", handleLoad);
      return () => window.removeEventListener("load", handleLoad);
    }
  }, []);

  if (!visible) return null;

  return (
    <div
      id="preloader"
      className="preloader-wrapper"
      style={{
        opacity: fadeOut ? 0 : 1,
        visibility: fadeOut ? "hidden" : "visible",
        transition: "opacity 0.6s cubic-bezier(0.25, 1, 0.5, 1), visibility 0.6s",
      }}
      role="status"
      aria-label="Loading page"
    >
      <div className="preloader-content">
        <div className="cup-animation">
          <div className="cup-body">
            <div className="cup-handle"></div>
          </div>
          <div className="steam-stream stream-1"></div>
          <div className="steam-stream stream-2"></div>
          <div className="steam-stream stream-3"></div>
        </div>
        <h2 className="preloader-logo">Brew & Crumbs</h2>
        <div className="preloader-bar">
          <div className="preloader-progress"></div>
        </div>
      </div>
    </div>
  );
}
