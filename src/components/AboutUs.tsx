import { useEffect, useRef, useState } from "react";

export default function AboutUs() {
  const containerRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const [revealed, setRevealed] = useState(false);
  const [statsAnimated, setStatsAnimated] = useState(false);

  // Counter values states
  const [years, setYears] = useState(0);
  const [customers, setCustomers] = useState(0);
  const [dishes, setDishes] = useState(0);
  const [rating, setRating] = useState(0.0);

  useEffect(() => {
    // 1. Scroll reveal intersection observer
    const revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setRevealed(true);
            revealObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );

    if (containerRef.current) {
      revealObserver.observe(containerRef.current);
    }

    // 2. Stats count-up intersection observer
    const statsObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !statsAnimated) {
            setStatsAnimated(true);
            animateStats();
            statsObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.25 }
    );

    if (statsRef.current) {
      statsObserver.observe(statsRef.current);
    }

    return () => {
      revealObserver.disconnect();
      statsObserver.disconnect();
    };
  }, [statsAnimated]);

  // Animate stats from 0 to targets
  const animateStats = () => {
    const duration = 1800; // time in ms
    const startTime = performance.now();

    const targets = {
      years: 10,
      customers: 20,
      dishes: 50,
      rating: 4.9,
    };

    const count = (timestamp: number) => {
      const elapsed = timestamp - startTime;
      const progress = Math.min(elapsed / duration, 1);

      // Ease-out calculation
      const easeProgress = 1 - Math.pow(1 - progress, 3);

      setYears(Math.floor(easeProgress * targets.years));
      setCustomers(Math.floor(easeProgress * targets.customers));
      setDishes(Math.floor(easeProgress * targets.dishes));
      setRating(parseFloat((easeProgress * targets.rating).toFixed(1)));

      if (progress < 1) {
        requestAnimationFrame(count);
      } else {
        // Guarantee final numbers match targets exactly
        setYears(targets.years);
        setCustomers(targets.customers);
        setDishes(targets.dishes);
        setRating(targets.rating);
      }
    };

    requestAnimationFrame(count);
  };

  return (
    <section
      id="about"
      ref={containerRef}
      className={`about-section section reveal-element ${
        revealed ? "element-visible" : ""
      }`}
    >
      <div className="container">
        <div className="about-layout">
          
          {/* Left Text / Stats Panel */}
          <div className="about-content">
            <span className="section-badge">Welcome to Brew & Crumbs Café</span>
            <h2 className="section-title">Crafting Cozy Memories, One Cup at a Time</h2>
            <p className="about-description">
              Brew & Crumbs Café was founded on a simple philosophy: coffee is more than just a morning routine—it’s an art form, a community hub, and a spark for laughter. Inside our warm, caramel-infused interiors, every guest is family. We strive to provide an Instagram-worthy escape from the bustle of Hyderabad, blending standard, artisanal brews with gourmet delicacies.
            </p>
            <p className="about-description">
              Our expert baristas brew single-origin beans sourced ethically from premium coffee estates. Complementing our drinks, our culinary team works with fresh, local, and sustainable ingredients to prepare signature dishes that tell their own flavor stories. Come in, find a cozy corner, and let every bite delight your senses.
            </p>

            {/* Stats Grid */}
            <div className="stats-grid" ref={statsRef}>
              <div className="stat-item glass-card">
                <div className="stat-number-wrapper">
                  <span className="stat-number">{years}</span>
                  <span className="stat-suffix">+</span>
                </div>
                <span className="stat-label">Years of Experience</span>
              </div>
              
              <div className="stat-item glass-card">
                <div className="stat-number-wrapper">
                  <span className="stat-number">{customers}</span>
                  <span className="stat-suffix">K+</span>
                </div>
                <span className="stat-label">Happy Customers</span>
              </div>

              <div className="stat-item glass-card">
                <div className="stat-number-wrapper">
                  <span className="stat-number">{dishes}</span>
                  <span className="stat-suffix">+</span>
                </div>
                <span className="stat-label">Signature Dishes</span>
              </div>

              <div className="stat-item glass-card">
                <div className="stat-number-wrapper">
                  <span className="stat-number">{rating.toFixed(1)}</span>
                  <span className="stat-suffix">★</span>
                </div>
                <span className="stat-label">Customer Rating</span>
              </div>
            </div>
          </div>

          {/* Right Overlapping Collage Grid */}
          <div className="about-media">
            <div className="collage-container">
              <div className="collage-card collage-card-main img-hover-zoom">
                <img
                  src="https://images.unsplash.com/photo-1498804103079-a6351b050096?auto=format&fit=crop&w=800&q=80"
                  alt="Brew and Crumbs Café Interior Ambience"
                  className="collage-img"
                />
              </div>
              <div className="collage-card collage-card-sub-1 img-hover-zoom">
                <img
                  src="https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=600&q=80"
                  alt="Barista Handcrafting Latte Art"
                  className="collage-img"
                />
              </div>
              <div className="collage-card collage-card-sub-2 img-hover-zoom">
                <img
                  src="https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=600&q=80"
                  alt="Fresh Baked Gourmet Pastry"
                  className="collage-img"
                />
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
