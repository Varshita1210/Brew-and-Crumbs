import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

export interface FeaturedMenuProps {
  fullMenuOpen: boolean;
  setFullMenuOpen: (open: boolean | ((prev: boolean) => boolean)) => void;
}

export default function FeaturedMenu({
  fullMenuOpen,
  setFullMenuOpen,
}: FeaturedMenuProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [revealed, setRevealed] = useState(false);
  const [hoveredIdx, setHoveredIdx] = useState<number>(0);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Scroll reveal observer
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setRevealed(true);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    // Check screen width for mobile bypass
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    handleResize();
    window.addEventListener("resize", handleResize);

    return () => {
      observer.disconnect();
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const featuredItems = [
    {
      title: "Crunch Burger",
      price: "₹249",
      description: "Crispy chicken, cheddar cheese, lettuce, tomato & signature sauce.",
      image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=600&q=80",
    },
    {
      title: "Chicken Wings",
      price: "₹199",
      description: "Spicy grilled wings served with creamy dip.",
      image: "https://images.unsplash.com/photo-1567620832903-9fc6debc209f?auto=format&fit=crop&w=600&q=80",
    },
    {
      title: "Chicken Wrap",
      price: "₹189",
      description: "Soft tortilla filled with grilled chicken and fresh veggies.",
      image: "https://images.unsplash.com/photo-1626700051175-6818013e1d4f?auto=format&fit=crop&w=600&q=80",
    },
    {
      title: "Crispy Fries",
      price: "₹129",
      description: "Golden crispy fries with seasoning.",
      image: "https://images.unsplash.com/photo-1576107232684-1279f390859f?auto=format&fit=crop&w=600&q=80",
    },
    {
      title: "Signature Cold Coffee",
      price: "₹179",
      description: "Rich coffee blended with cream and chocolate.",
      image: "https://images.unsplash.com/photo-1517701604599-bb29b565090c?auto=format&fit=crop&w=600&q=80",
    },
  ];

  const handleToggle = () => {
    setFullMenuOpen((prev) => !prev);
    
    // Smooth scroll offset adjustment if opening
    if (fullMenuOpen) {
      document.getElementById("menu")?.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      id="menu"
      ref={containerRef}
      className={`menu-section section reveal-element ${
        revealed ? "element-visible" : ""
      }`}
    >
      <div className="container">
        <div className="section-header text-center">
          <span className="section-badge">Chef's Selection</span>
          <h2 className="section-title">Featured Menu</h2>
          <p className="section-subtitle">
            A curated preview of our mouthwatering culinary stars, handcrafted with love and fresh ingredients.
          </p>
        </div>

        {/* Horizontal Hover-Expand Accordion Gallery */}
        <div className="featured-menu-accordion">
          {featuredItems.map((item, idx) => {
            const isExpanded = idx === hoveredIdx;
            
            return (
              <motion.article
                key={idx}
                className="menu-accordion-card"
                onMouseEnter={() => !isMobile && setHoveredIdx(idx)}
                onTouchStart={() => isMobile && setHoveredIdx(idx)}
                animate={{
                  // Responsive flex weights: expanded vs collapsed
                  flex: isMobile ? "none" : isExpanded ? 4.2 : 0.85,
                }}
                transition={{
                  duration: 0.35,
                  ease: [0.25, 1, 0.5, 1], // Smooth easeInOut curve
                }}
              >
                {/* Food Image */}
                <motion.img
                  src={item.image}
                  alt={item.title}
                  className="menu-accordion-card-img"
                  loading="lazy"
                  animate={{
                    scale: isExpanded ? 1.06 : 1.0,
                  }}
                  transition={{ duration: 0.4 }}
                />

                {/* Dark Gradient Overlay & Copy Details */}
                <motion.div
                  className="menu-accordion-overlay"
                  animate={{
                    opacity: (isMobile || isExpanded) ? 1 : 0,
                    y: (isMobile || isExpanded) ? 0 : 15,
                  }}
                  transition={{ duration: 0.3 }}
                >
                  <h3 className="menu-accordion-title">{item.title}</h3>
                  <p className="menu-accordion-desc">{item.description}</p>
                  <div className="menu-accordion-price-row">
                    <span className="menu-accordion-price">{item.price}</span>
                  </div>
                </motion.div>
              </motion.article>
            );
          })}
        </div>

        {/* View Full Menu CTA */}
        <div className="menu-toggle-container text-center" style={{ marginTop: "40px" }}>
          <button
            id="view-full-menu-btn"
            className="btn btn-primary btn-ripple"
            onClick={handleToggle}
            aria-expanded={fullMenuOpen}
            aria-controls="expandable-full-menu"
          >
            {fullMenuOpen ? "Close Full Menu" : "View Full Menu"}
          </button>
        </div>
      </div>
    </section>
  );
}
