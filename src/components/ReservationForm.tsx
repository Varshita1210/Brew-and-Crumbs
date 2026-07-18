import React, { useEffect, useRef, useState } from "react";

interface FormErrors {
  fullname?: string;
  phone?: string;
  email?: string;
  date?: string;
  time?: string;
  guests?: string;
}

export default function ReservationForm() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [revealed, setRevealed] = useState(false);
  
  // Form fields states
  const [fullname, setFullname] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [guests, setGuests] = useState("");
  const [requests, setRequests] = useState("");

  // Validation errors states
  const [errors, setErrors] = useState<FormErrors>({});
  const [successModal, setSuccessModal] = useState(false);

  // Set today's date as min date constraint
  const [minDate, setMinDate] = useState("");

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

    // Set today constraint
    const today = new Date().toISOString().split("T")[0];
    setMinDate(today);

    return () => observer.disconnect();
  }, []);

  const validate = (): boolean => {
    const newErrors: FormErrors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^[\d\s\-+()]{10,15}$/;

    if (!fullname.trim()) {
      newErrors.fullname = "Please enter your name.";
    }
    
    if (!phoneRegex.test(phone.trim())) {
      newErrors.phone = "Please enter a valid phone number.";
    }

    if (!emailRegex.test(email.trim())) {
      newErrors.email = "Please enter a valid email address.";
    }

    if (!date) {
      newErrors.date = "Please select a date.";
    } else {
      const selected = new Date(date);
      const todayStr = new Date().toISOString().split("T")[0];
      const todayDate = new Date(todayStr);
      if (selected < todayDate) {
        newErrors.date = "Please choose a future date.";
      }
    }

    if (!time) {
      newErrors.time = "Please select a dining slot.";
    }

    if (!guests) {
      newErrors.guests = "Please specify guest count.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      // Show checkmark success popup
      setSuccessModal(true);
      document.body.style.overflow = "hidden"; // lock page scroll

      // Reset form fields
      setFullname("");
      setPhone("");
      setEmail("");
      setDate("");
      setTime("");
      setGuests("");
      setRequests("");
      setErrors({});
    }
  };

  const closeSuccessModal = () => {
    setSuccessModal(false);
    document.body.style.overflow = "visible"; // unlock page scroll
  };

  return (
    <section
      id="book-table"
      ref={containerRef}
      className={`reservation-section section reveal-element ${
        revealed ? "element-visible" : ""
      }`}
    >
      <div className="container">
        <div className="reservation-container glass-card">
          
          {/* Left Side: Branding Rules */}
          <div className="reservation-promo">
            <span className="section-badge badge-light">Dine With Us</span>
            <h2 className="reservation-promo-title">Secure Your Culinary Experience</h2>
            <p className="reservation-promo-desc">
              Skip the waiting lines and book your private table in advance. Whether it is an evening study session, a weekend family brunch, or a custom candle-lit dining request, we hold your spot with warm hospitality.
            </p>
            <div className="reservation-notice-list">
              <div className="notice-item">
                <i className="far fa-clock notice-icon"></i>
                <p>
                  <strong>15-Minute Grace Period:</strong> We hold reserved tables for up to 15 minutes past the booking time.
                </p>
              </div>
              <div className="notice-item">
                <i className="fas fa-users notice-icon"></i>
                <p>
                  <strong>Large Gatherings:</strong> For groups larger than 7 guests, please call us directly to design a custom group menu.
                </p>
              </div>
            </div>
          </div>

          {/* Right Side: Validation Reservation Form */}
          <div className="reservation-form-wrapper">
            <form onSubmit={handleSubmit} className="reservation-form" noValidate>
              
              <div className="form-grid-row">
                <div className={`form-field-group ${errors.fullname ? "has-error" : ""}`}>
                  <label htmlFor="res-fullname" className="form-field-label">Full Name</label>
                  <div className="input-icon-wrapper">
                    <i className="far fa-user input-field-icon"></i>
                    <input
                      type="text"
                      id="res-fullname"
                      className="input-control"
                      placeholder="Enter your full name"
                      value={fullname}
                      onChange={(e) => setFullname(e.target.value)}
                      required
                    />
                  </div>
                  {errors.fullname && (
                    <span className="field-error-feedback">{errors.fullname}</span>
                  )}
                </div>

                <div className={`form-field-group ${errors.phone ? "has-error" : ""}`}>
                  <label htmlFor="res-phone" className="form-field-label">Phone Number</label>
                  <div className="input-icon-wrapper">
                    <i className="fas fa-phone-alt input-field-icon"></i>
                    <input
                      type="tel"
                      id="res-phone"
                      className="input-control"
                      placeholder="+91 XXXXX XXXXX"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      required
                    />
                  </div>
                  {errors.phone && (
                    <span className="field-error-feedback">{errors.phone}</span>
                  )}
                </div>
              </div>

              <div className={`form-field-group ${errors.email ? "has-error" : ""}`}>
                <label htmlFor="res-email" className="form-field-label">Email Address</label>
                <div className="input-icon-wrapper">
                  <i className="far fa-envelope input-field-icon"></i>
                  <input
                    type="email"
                    id="res-email"
                    className="input-control"
                    placeholder="hello@brewandcrumbs.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
                {errors.email && (
                  <span className="field-error-feedback">{errors.email}</span>
                )}
              </div>

              <div className="form-grid-row">
                <div className={`form-field-group ${errors.date ? "has-error" : ""}`}>
                  <label htmlFor="res-date" className="form-field-label">Date</label>
                  <div className="input-icon-wrapper">
                    <i className="far fa-calendar input-field-icon"></i>
                    <input
                      type="date"
                      id="res-date"
                      className="input-control"
                      min={minDate}
                      value={date}
                      onChange={(e) => setDate(e.target.value)}
                      required
                    />
                  </div>
                  {errors.date && (
                    <span className="field-error-feedback">{errors.date}</span>
                  )}
                </div>

                <div className={`form-field-group ${errors.time ? "has-error" : ""}`}>
                  <label htmlFor="res-time" className="form-field-label">Time</label>
                  <div className="input-icon-wrapper">
                    <i className="far fa-clock input-field-icon"></i>
                    <input
                      type="time"
                      id="res-time"
                      className="input-control"
                      value={time}
                      onChange={(e) => setTime(e.target.value)}
                      required
                    />
                  </div>
                  {errors.time && (
                    <span className="field-error-feedback">{errors.time}</span>
                  )}
                </div>
              </div>

              <div className={`form-field-group ${errors.guests ? "has-error" : ""}`}>
                <label htmlFor="res-guests" className="form-field-label">Number of Guests</label>
                <div className="input-icon-wrapper">
                  <i className="fas fa-users input-field-icon"></i>
                  <select
                    id="res-guests"
                    className="input-control"
                    value={guests}
                    onChange={(e) => setGuests(e.target.value)}
                    required
                  >
                    <option value="" disabled>Select number of guests</option>
                    <option value="1">1 Guest</option>
                    <option value="2">2 Guests</option>
                    <option value="3">3 Guests</option>
                    <option value="4">4 Guests</option>
                    <option value="5">5 Guests</option>
                    <option value="6">6 Guests</option>
                    <option value="7">7 Guests</option>
                  </select>
                </div>
                {errors.guests && (
                  <span className="field-error-feedback">{errors.guests}</span>
                )}
              </div>

              <div className="form-field-group">
                <label htmlFor="res-requests" className="form-field-label">Special Requests (Optional)</label>
                <textarea
                  id="res-requests"
                  className="input-control text-area-control"
                  rows={3}
                  placeholder="E.g., high chair, window-side table, birthday banner setup..."
                  value={requests}
                  onChange={(e) => setRequests(e.target.value)}
                ></textarea>
              </div>

              <button type="submit" className="btn btn-primary w-100 btn-ripple submit-reservation-btn">
                Reserve Your Table
              </button>
              
            </form>
          </div>

        </div>
      </div>

      {/* Success Modal */}
      <div
        id="reservation-success-modal"
        className={`modal-window ${successModal ? "active" : ""}`}
        aria-hidden={!successModal}
        role="dialog"
        aria-labelledby="modal-success-title"
      >
        <div className="modal-window-backdrop" onClick={closeSuccessModal}></div>
        <div className="modal-window-dialog">
          <div className="modal-success-content glass-card text-center">
            <button
              className="modal-window-close-btn"
              aria-label="Close modal window"
              onClick={closeSuccessModal}
            >
              &times;
            </button>
            <div className="success-checkmark-circle">
              <i className="fas fa-check"></i>
            </div>
            <h3 id="modal-success-title" className="modal-success-header">
              Reservation Confirmed
            </h3>
            <p className="modal-success-text">
              🎉 Thank you! Your reservation request has been received. We'll contact you shortly.
            </p>
            <button
              className="btn btn-primary modal-success-dismiss-btn btn-ripple"
              onClick={closeSuccessModal}
            >
              Great!
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
