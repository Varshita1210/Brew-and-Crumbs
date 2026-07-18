import { useEffect, useRef, useState } from "react";
import Preloader from "./components/Preloader";
import Navbar from "./components/Navbar";
import FullMenuModal from "./components/FullMenuModal";
import CoffeeBeansBackground from "./components/CoffeeBeansBackground";
import AboutUs from "./components/AboutUs";
import FeaturedMenu from "./components/FeaturedMenu";
import ExpandableMenu from "./components/ExpandableMenu";
import Gallery from "./components/Gallery";
import Testimonials from "./components/Testimonials";
import ReservationForm from "./components/ReservationForm";
import Contact from "./components/Contact";
import Footer from "./components/Footer";

export default function App() {
  const [fullMenuOpen, setFullMenuOpen] = useState(false);
  const [backToTopVisible, setBackToTopVisible] = useState(false);
  const [isFullMenuOpen, setIsFullMenuOpen] = useState(false);


  // Refs for custom cursor elements
  const cursorOuterRef = useRef<HTMLDivElement>(null);
  const cursorInnerRef = useRef<HTMLDivElement>(null);
  const scrollBarRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // 1. Scroll-related progress & back to top toggles
    const handleScroll = () => {
      const windowScroll = document.documentElement.scrollTop;
      const height =
        document.documentElement.scrollHeight -
        document.documentElement.clientHeight;
      const scrolled = (windowScroll / height) * 100;

      if (scrollBarRef.current) {
        scrollBarRef.current.style.width = scrolled + "%";
      }

      if (windowScroll > 400) {
        setBackToTopVisible(true);
      } else {
        setBackToTopVisible(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    // 2. High-performance direct DOM custom cursor with lerp (desktop only)
    const outer = cursorOuterRef.current;
    const inner = cursorInnerRef.current;

    let mouseX = 0, mouseY = 0;
    let cursorX = 0, cursorY = 0;
    let isMoving = false;
    let animFrame: number;

    const onMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;

      if (inner) {
        inner.style.left = mouseX + "px";
        inner.style.top = mouseY + "px";
      }

      if (!isMoving && outer && inner) {
        isMoving = true;
        outer.style.opacity = "1";
        inner.style.opacity = "1";
      }
    };

    window.addEventListener("mousemove", onMouseMove);

    const tick = () => {
      const dx = mouseX - cursorX;
      const dy = mouseY - cursorY;
      cursorX += dx * 0.15; // lerp speed factor
      cursorY += dy * 0.15;

      if (outer) {
        outer.style.left = cursorX + "px";
        outer.style.top = cursorY + "px";
      }

      animFrame = requestAnimationFrame(tick);
    };
    tick();

    // Mouse leave viewport check
    const onMouseLeave = () => {
      if (outer && inner) {
        outer.style.opacity = "0";
        inner.style.opacity = "0";
      }
      isMoving = false;
    };
    document.addEventListener("mouseleave", onMouseLeave);

    // Cursor hover expands classes handler
    const handleMouseEnterTarget = () => {
      outer?.classList.add("cursor-hover");
    };

    const handleMouseLeaveTarget = () => {
      outer?.classList.remove("cursor-hover");
    };

    const attachHoverHandlers = () => {
      const targets = document.querySelectorAll(
        "a, button, input, select, textarea, .gallery-card-item, .accordion-trigger, .social-flip-node"
      );
      targets.forEach((t) => {
        t.addEventListener("mouseenter", handleMouseEnterTarget);
        t.addEventListener("mouseleave", handleMouseLeaveTarget);
      });
    };

    attachHoverHandlers();
    
    // MutationObserver to attach hovers to asynchronously rendered elements (e.g. accordion triggers)
    const observer = new MutationObserver(attachHoverHandlers);
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseleave", onMouseLeave);
      cancelAnimationFrame(animFrame);
      observer.disconnect();
    };
  }, []);

  const handleBackToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <>
      {/* Steaming Coffee Cup Preloader */}
      <Preloader />

      {/* Gold Scroll Progress Bar */}
      <div ref={scrollBarRef} id="scroll-progress-bar" aria-hidden="true" />

      {/* Custom Pointer Cursors */}
      <div ref={cursorOuterRef} id="custom-cursor" className="cursor-outer" aria-hidden="true" />
      <div ref={cursorInnerRef} id="custom-cursor-dot" className="cursor-inner" aria-hidden="true" />

      {/* Back to Top Arrow Button */}
      <button
        id="back-to-top"
        className={`back-to-top-btn ${backToTopVisible ? "visible" : ""}`}
        onClick={handleBackToTop}
        aria-label="Back to Top"
      >
        <i className="fas fa-arrow-up"></i>
      </button>

      {/* Navigation Bar */}
      <Navbar onOpenFullMenu={() => setIsFullMenuOpen(true)} />

      {/* Hero Landing Area */}
      <section id="home" className="hero-section">
        <div className="hero-bg-media">
          <div className="hero-overlay"></div>
          <img
            src="https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?auto=format&fit=crop&w=1920&q=80"
            alt="Brew & Crumbs Café Cozy Ambience"
            className="hero-bg-img"
          />
        </div>

        {/* Drifting Coffee Beans Canvas */}
        <CoffeeBeansBackground />

        {/* Liquid Three.js Text Title */}
        {/* Left-Aligned Hero Content */}
        <div className="hero-content">
          <div className="hero-text-block">
            <span className="section-badge badge-light" style={{ display: "inline-block", marginBottom: "16px" }}>
              EST. 2016 • HANDCRAFTED CRAFTSMANSHIP
            </span>
            
            <h1 className="section-title" style={{ marginTop: "12px", marginBottom: "16px", fontSize: "clamp(2.2rem, 5.5vw, 4.25rem)", lineHeight: 1.15 }}>
              Every Bite Tells a Story
            </h1>
            
            <p className="section-subtitle" style={{ marginBottom: "35px", maxWidth: "600px", marginLeft: "0", lineHeight: 1.6 }}>
              Fresh ingredients, handcrafted coffee, and unforgettable moments—all under one roof.
            </p>
            
            <div className="hero-buttons">
              <a href="#menu" className="btn btn-primary btn-ripple">
                Explore Menu
              </a>
              <a href="#book-table" className="btn btn-secondary btn-ripple">
                Book a Table
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Stories / Statistics */}
      <AboutUs />

      {/* Five Chef Selection Cards */}
      <FeaturedMenu
        fullMenuOpen={fullMenuOpen}
        setFullMenuOpen={setFullMenuOpen}
      />

      {/* Accordion Categories */}
      <ExpandableMenu isOpen={fullMenuOpen} />

      {/* Masonry Lightbox-Ready Gallery */}
      <Gallery />

      {/* Auto-Slide Testimonials */}
      <Testimonials />

      {/* Inputs Validated Booking Form */}
      <ReservationForm />

      {/* Addresses, Maps, and Social Flips */}
      <Contact />

      {/* newsletter, footer links */}
      <Footer />

      {/* Full Menu Modal Popup */}
      <FullMenuModal isOpen={isFullMenuOpen} onClose={() => setIsFullMenuOpen(false)} />
    </>
  );
}
