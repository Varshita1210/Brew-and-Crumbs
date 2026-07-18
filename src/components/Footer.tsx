import React, { useEffect, useRef, useState } from "react";

export default function Footer() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [revealed, setRevealed] = useState(false);
  const [email, setEmail] = useState("");
  const [feedback, setFeedback] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);

  useEffect(() => {
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

    return () => observer.disconnect();
  }, []);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email.trim())) {
      setFeedback("Please provide a valid email.");
      setIsSuccess(false);
    } else {
      setFeedback("🎉 Subscribed successfully! Thank you.");
      setIsSuccess(true);
      setEmail("");
      
      // Auto-clear success message after 5 seconds
      setTimeout(() => {
        setFeedback("");
      }, 5000);
    }
  };

  return (
    <footer ref={containerRef} className="footer-area">
      <div className="footer-top-container container">
        
        {/* Brand Column */}
        <div className={`footer-col footer-col-brand reveal-element ${revealed ? "element-visible" : ""}`}>
          <h3 className="footer-logo">Brew & Crumbs</h3>
          <p className="footer-tagline">"Where Every Sip Meets Every Smile."</p>
          <p className="footer-love-tag">Made with ❤️, Fresh Coffee & Great Memories.</p>
        </div>

        {/* Links Navigation Column */}
        <div className={`footer-col footer-col-links reveal-element ${revealed ? "element-visible" : ""}`}>
          <h4>Quick Links</h4>
          <ul className="footer-links-list">
            <li><a href="#home" className="footer-link">Home</a></li>
            <li><a href="#about" className="footer-link">About Us</a></li>
            <li><a href="#menu" className="footer-link">Featured Menu</a></li>
            <li><a href="#gallery" className="footer-link">Gallery</a></li>
            <li><a href="#reviews" className="footer-link">Reviews</a></li>
            <li><a href="#book-table" className="footer-link">Book Table</a></li>
            <li><a href="#contact" className="footer-link">Contact</a></li>
          </ul>
        </div>

        {/* Newsletter Column */}
        <div className={`footer-col footer-col-newsletter reveal-element ${revealed ? "element-visible" : ""}`}>
          <h4>Stay in the Loop</h4>
          <p>
            Subscribe to our premium newsletter to receive secret recipes, event invites, and early breakfast discounts.
          </p>
          <form onSubmit={handleSubscribe} className="newsletter-form-container" noValidate>
            <div className="newsletter-input-group">
              <input
                type="email"
                className="input-control newsletter-input"
                placeholder="Your Email Address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <button
                type="submit"
                className="newsletter-submit-btn btn-ripple"
                aria-label="Subscribe to newsletter"
              >
                <i className="fas fa-paper-plane"></i>
              </button>
            </div>
            {feedback && (
              <span
                className={`newsletter-feedback-msg ${
                  isSuccess ? "success" : "error"
                }`}
              >
                {feedback}
              </span>
            )}
          </form>
        </div>

      </div>

      {/* Copyright Bar */}
      <div className="footer-bottom-bar text-center">
        <div className="container footer-bottom-flex">
          <p className="copyright-text">&copy; 2026 Brew & Crumbs Café. All Rights Reserved.</p>
          <div className="footer-bottom-socials">
            <a href="#" aria-label="Instagram"><i className="fab fa-instagram"></i></a>
            <a href="#" aria-label="Facebook"><i className="fab fa-facebook-f"></i></a>
            <a href="#" aria-label="Twitter"><i className="fab fa-twitter"></i></a>
            <a href="https://wa.me/919876543210" target="_blank" rel="noopener noreferrer" aria-label="WhatsApp">
              <i className="fab fa-whatsapp"></i>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
