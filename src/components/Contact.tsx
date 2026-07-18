import { useEffect, useRef, useState } from "react";
import SocialFlipButton from "./SocialFlipButton";

export default function Contact() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [revealed, setRevealed] = useState(false);

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

  return (
    <section
      id="contact"
      ref={containerRef}
      className={`contact-section section reveal-element ${
        revealed ? "element-visible" : ""
      }`}
    >
      <div className="container">
        <div className="section-header text-center">
          <span className="section-badge">Get in Touch</span>
          <div className="contact-heading-social-flip-wrapper">
            <SocialFlipButton />
          </div>
          <p className="section-subtitle">
            Reach out to us or find your way to our warm coffee oasis. We would love to hear from you!
          </p>
        </div>

        <div className="contact-layout-grid">
          
          {/* Address & Context Cards Info */}
          <div className="contact-info-column">
            
            <div className="contact-info-card glass-card">
              <div className="contact-icon-box">
                <i className="fas fa-map-marked-alt"></i>
              </div>
              <div className="contact-text-box">
                <h4>Address</h4>
                <p>123 Brew Street, Coffee District, Hyderabad, India</p>
              </div>
            </div>

            <div className="contact-info-card glass-card">
              <div className="contact-icon-box">
                <i className="fas fa-phone-alt"></i>
              </div>
              <div className="contact-text-box">
                <h4>Phone</h4>
                <p>
                  <a href="tel:+919876543210" className="hover-link">
                    +91 98765 43210
                  </a>
                </p>
              </div>
            </div>

            <div className="contact-info-card glass-card">
              <div className="contact-icon-box">
                <i className="far fa-envelope-open"></i>
              </div>
              <div className="contact-text-box">
                <h4>Email</h4>
                <p>
                  <a href="mailto:hello@brewandcrumbs.com" className="hover-link">
                    hello@brewandcrumbs.com
                  </a>
                </p>
              </div>
            </div>

            <div className="contact-info-card glass-card">
              <div className="contact-icon-box">
                <i className="far fa-clock"></i>
              </div>
              <div className="contact-text-box">
                <h4>Hours</h4>
                <p>
                  <strong>Monday–Friday:</strong> 9:00 AM – 10:00 PM
                  <br />
                  <strong>Saturday–Sunday:</strong> 8:00 AM – 11:00 PM
                </p>
              </div>
            </div>

          </div>

          {/* Interactive Column (Maps + Social Flip) */}
          <div className="contact-interactive-column">
            <div className="google-maps-box glass-card">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3806.827222384795!2d78.38139537604085!3d17.432098601831885!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bcb93dc8c5dbb39%3A0xe96ad02d447e0964!2sHyderabad%2C%20Telangana%2C%20India!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen={true}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                aria-label="Brew & Crumbs Café Google Maps Location"
              ></iframe>
            </div>


          </div>

        </div>
      </div>
    </section>
  );
}
