import { useEffect, useRef, useState } from "react";

interface Review {
  name: string;
  role: string;
  rating: number;
  text: string;
  avatar: string;
}

export default function Testimonials() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [revealed, setRevealed] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const timerRef = useRef<any>(null);

  const reviews: Review[] = [
    {
      name: "Ananya Sen",
      role: "Coffee Enthusiast",
      rating: 5,
      text: "The burgers were juicy, the coffee was exceptional, and the ambience was simply perfect.",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80",
    },
    {
      name: "Kabir Malhotra",
      role: "Food Critic",
      rating: 5,
      text: "A hidden gem! Amazing food and wonderful hospitality. The signature cold coffee is out of this world.",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80",
    },
    {
      name: "Priya Nair",
      role: "Regular Guest",
      rating: 5,
      text: "My favorite café for weekend brunch and evening coffee. Cozy corners, super friendly staff, and the wraps are exceptionally fresh!",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=150&q=80",
    },
  ];

  const startTimer = () => {
    stopTimer();
    timerRef.current = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % reviews.length);
    }, 5000);
  };

  const stopTimer = () => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }
  };

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

    startTimer();

    return () => {
      observer.disconnect();
      stopTimer();
    };
  }, []);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % reviews.length);
    startTimer();
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + reviews.length) % reviews.length);
    startTimer();
  };

  const selectSlide = (index: number) => {
    setCurrentIndex(index);
    startTimer();
  };

  return (
    <section
      id="reviews"
      ref={containerRef}
      className={`reviews-section section reveal-element ${
        revealed ? "element-visible" : ""
      }`}
    >
      <div className="container">
        <div className="section-header text-center">
          <span className="section-badge">Guest Diaries</span>
          <h2 className="section-title">Guest Experiences</h2>
          <p className="section-subtitle">
            Real feedback from visitors who make Brew & Crumbs their daily happy place.
          </p>
        </div>

        {/* Testimonials Slides Container */}
        <div className="reviews-slider-outer">
          <div className="reviews-slides-viewport">
            <div
              className="reviews-slides-track"
              style={{
                transform: `translateX(-${currentIndex * 100}%)`,
              }}
            >
              {reviews.map((item, index) => (
                <div key={index} className="review-slide-card">
                  <div className="review-slide-inner glass-card">
                    <div className="quote-mark-icon">
                      <i className="fas fa-quote-left"></i>
                    </div>
                    
                    {/* Stars */}
                    <div className="rating-stars">
                      {Array.from({ length: item.rating }).map((_, i) => (
                        <i key={i} className="fas fa-star"></i>
                      ))}
                    </div>

                    <p className="review-body-text">"{item.text}"</p>

                    <div className="reviewer-profile">
                      <img
                        src={item.avatar}
                        alt={item.name}
                        className="reviewer-avatar"
                        loading="lazy"
                      />
                      <div className="reviewer-info">
                        <h4 className="reviewer-name">{item.name}</h4>
                        <span className="reviewer-title">{item.role}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Navigation Controls */}
          <div className="reviews-slider-navigation">
            <button
              className="reviews-arrow-btn reviews-btn-prev"
              onClick={prevSlide}
              aria-label="View previous testimonial"
            >
              <i className="fas fa-chevron-left"></i>
            </button>

            <div className="reviews-slider-dots">
              {reviews.map((_, index) => (
                <button
                  key={index}
                  className={`slider-dot ${
                    index === currentIndex ? "active-dot" : ""
                  }`}
                  onClick={() => selectSlide(index)}
                  aria-label={`Go to testimonial slide ${index + 1}`}
                ></button>
              ))}
            </div>

            <button
              className="reviews-arrow-btn reviews-btn-next"
              onClick={nextSlide}
              aria-label="View next testimonial"
            >
              <i className="fas fa-chevron-right"></i>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
