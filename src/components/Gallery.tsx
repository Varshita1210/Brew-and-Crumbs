import { useEffect, useRef, useState } from "react";

interface GalleryItem {
  title: string;
  caption: string;
  thumbnail: string;
  full: string;
}

export default function Gallery() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [revealed, setRevealed] = useState(false);
  
  // Lightbox State
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

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

    return () => observer.disconnect();
  }, []);

  // Keyboard navigation inside lightbox
  useEffect(() => {
    if (!lightboxOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowLeft") prevImage();
      if (e.key === "ArrowRight") nextImage();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [lightboxOpen, currentIndex]);

  const galleryItems: GalleryItem[] = [
    {
      title: "Gourmet Burger",
      caption: "Crunch Burger — Flame-grilled and dripping with cheddar.",
      thumbnail: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=600&q=80",
      full: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=1200&q=80",
    },
    {
      title: "Artisanal Coffee",
      caption: "Signature Latte Art — Fresh single-origin beans, velvety milk foam.",
      thumbnail: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=600&q=80",
      full: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=1200&q=80",
    },
    {
      title: "Fresh Mojito",
      caption: "Mint Mojito — Crushed fresh lime and mint, chilled carbonated soda.",
      thumbnail: "https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&w=600&q=80",
      full: "https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&w=1200&q=80",
    },
    {
      title: "Creamy Shakes",
      caption: "Decadent Shakes — Creamy blended milkshakes topped with syrup.",
      thumbnail: "https://images.unsplash.com/photo-1572490122747-3968b75cc699?auto=format&fit=crop&w=600&q=80",
      full: "https://images.unsplash.com/photo-1572490122747-3968b75cc699?auto=format&fit=crop&w=1200&q=80",
    },
    {
      title: "Sweet Desserts",
      caption: "Signature Caramel Crumble Tart — Sweet crumb, rich golden caramel fillings.",
      thumbnail: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=600&q=80",
      full: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=1200&q=80",
    },
    {
      title: "Stuffed Wraps",
      caption: "Chicken Tortilla Wrap — Grilled chicken breast strips, crisp vegetables.",
      thumbnail: "https://images.unsplash.com/photo-1551504734-5ee1c4a1479b?auto=format&fit=crop&w=600&q=80",
      full: "https://images.unsplash.com/photo-1551504734-5ee1c4a1479b?auto=format&fit=crop&w=1200&q=80",
    },
    {
      title: "Spicy Wings",
      caption: "Spicy Grilled Chicken Wings — Tossed in smoky garlic chili sauce.",
      thumbnail: "https://images.unsplash.com/photo-1567620832903-9fc6debc209f?auto=format&fit=crop&w=600&q=80",
      full: "https://images.unsplash.com/photo-1567620832903-9fc6debc209f?auto=format&fit=crop&w=1200&q=80",
    },
    {
      title: "Indoor Seating",
      caption: "Warm Café Seating — Modern glass and dark espresso wood styling.",
      thumbnail: "https://images.unsplash.com/photo-1445116572660-236099ec97a0?auto=format&fit=crop&w=600&q=80",
      full: "https://images.unsplash.com/photo-1445116572660-236099ec97a0?auto=format&fit=crop&w=1200&q=80",
    },
    {
      title: "Outdoor Patio",
      caption: "Al Fresco Balcony — Surrounded by fresh leafy planters.",
      thumbnail: "https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&w=600&q=80",
      full: "https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&w=1200&q=80",
    },
    {
      title: "Crispy Fries",
      caption: "Crispy Seasoned French Fries — Golden salted standard finger chips.",
      thumbnail: "https://images.unsplash.com/photo-1573080496219-bb080dd4f877?auto=format&fit=crop&w=600&q=80",
      full: "https://images.unsplash.com/photo-1573080496219-bb080dd4f877?auto=format&fit=crop&w=1200&q=80",
    },
  ];

  const openLightbox = (index: number) => {
    setCurrentIndex(index);
    setLightboxOpen(true);
    document.body.style.overflow = "hidden"; // lock page scroll
  };

  const closeLightbox = () => {
    setLightboxOpen(false);
    document.body.style.overflow = "visible"; // restore page scroll
  };

  const nextImage = () => {
    setCurrentIndex((prev) => (prev + 1) % galleryItems.length);
  };

  const prevImage = () => {
    setCurrentIndex((prev) => (prev - 1 + galleryItems.length) % galleryItems.length);
  };

  return (
    <section
      id="gallery"
      ref={containerRef}
      className={`gallery-section section reveal-element ${
        revealed ? "element-visible" : ""
      }`}
    >
      <div className="container">
        <div className="section-header text-center">
          <span className="section-badge">Visual Feasts</span>
          <h2 className="section-title">Our Gallery</h2>
          <p className="section-subtitle">
            Exquisite close-ups of our signature creations and cozy corners. Tap to inspect in full detail.
          </p>
        </div>

        {/* Masonry Grid */}
        <div className="gallery-masonry-grid">
          {galleryItems.map((item, index) => (
            <div
              key={index}
              className="gallery-card-item img-hover-zoom"
              onClick={() => openLightbox(index)}
            >
              <img
                src={item.thumbnail}
                alt={item.title}
                className="gallery-img"
                loading="lazy"
              />
              <div className="gallery-card-overlay">
                <span className="gallery-view-icon">
                  <i className="fas fa-expand-alt"></i>
                </span>
                <h4 className="gallery-card-title">{item.title}</h4>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox Portal/Overlay */}
      <div
        id="gallery-lightbox"
        className={`lightbox-modal ${lightboxOpen ? "active" : ""}`}
        aria-hidden={!lightboxOpen}
        role="dialog"
        aria-label="Image preview window"
      >
        <div className="lightbox-backdrop" onClick={closeLightbox}></div>
        <div className="lightbox-dialog-container">
          <button
            className="lightbox-close-btn"
            aria-label="Close image preview"
            onClick={closeLightbox}
          >
            &times;
          </button>
          
          <button
            className="lightbox-nav-btn lightbox-btn-prev"
            aria-label="Previous image"
            onClick={prevImage}
          >
            <i className="fas fa-chevron-left"></i>
          </button>
          
          <button
            className="lightbox-nav-btn lightbox-btn-next"
            aria-label="Next image"
            onClick={nextImage}
          >
            <i className="fas fa-chevron-right"></i>
          </button>

          <div className="lightbox-media-wrapper">
            <img
              src={galleryItems[currentIndex].full}
              alt={galleryItems[currentIndex].title}
              className="lightbox-img-source"
            />
            <p className="lightbox-image-caption">
              {galleryItems[currentIndex].caption}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
