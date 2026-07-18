import { useEffect, useState } from "react";

interface NavbarProps {
  onOpenFullMenu: () => void;
}

export default function Navbar({ onOpenFullMenu }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileActive, setMobileActive] = useState(false);
  const [activeSection, setActiveSection] = useState("home");

  useEffect(() => {
    // 1. Sticky Header scroll listener
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);

    // 2. Active section highlights (Intersection Observer)
    const sections = document.querySelectorAll("section[id]");
    const options = {
      root: null,
      rootMargin: "-120px 0px -40% 0px",
      threshold: 0.15,
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const id = entry.target.getAttribute("id");
          if (id) setActiveSection(id);
        }
      });
    }, options);

    sections.forEach((section) => observer.observe(section));

    return () => {
      window.removeEventListener("scroll", handleScroll);
      sections.forEach((section) => observer.unobserve(section));
    };
  }, []);

  const toggleMobileMenu = () => {
    setMobileActive(!mobileActive);
  };

  const closeMobileMenu = () => {
    setMobileActive(false);
  };

  const navLinks = [
    { label: "Home", href: "#home" },
    { label: "About", href: "#about" },
    { label: "Menu", href: "#menu" },
    { label: "Gallery", href: "#gallery" },
    { label: "The Beginning", href: "#beginning" },
    { label: "Reviews", href: "#reviews" },
    { label: "Contact", href: "#contact" },
  ];

  return (
    <header className={`header ${scrolled ? "header-scrolled" : ""}`}>
      <div className="header-container container">
        <a href="#home" className="logo-link" onClick={closeMobileMenu}>
          <span className="logo-text">Brew & Crumbs</span>
        </a>

        {/* Navigation Menu */}
        <nav
          className={`nav-menu ${mobileActive ? "mobile-menu-active" : ""}`}
          id="nav-menu"
          aria-label="Main Navigation"
        >
          <ul className="nav-list">
            {navLinks.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className={`nav-link ${
                    activeSection === link.href.slice(1) ? "active" : ""
                  }`}
                  onClick={closeMobileMenu}
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>

          {/* Mobile Drawer Buttons */}
          <div className="nav-mobile-buttons">
            <button
              className="btn btn-full-menu"
              onClick={() => {
                onOpenFullMenu();
                closeMobileMenu();
              }}
            >
              Full Menu
            </button>
            <a
              href="#book-table"
              className="btn btn-primary btn-sm"
              onClick={closeMobileMenu}
            >
              Book Table
            </a>
          </div>
        </nav>

        {/* Desktop Actions and Mobile Toggle */}
        <div className="header-actions">
          <button
            className="btn btn-full-menu btn-nav-full-menu"
            onClick={onOpenFullMenu}
          >
            Full Menu
          </button>

          <a
            href="#book-table"
            className="btn btn-primary btn-sm btn-nav-reserve"
            onClick={closeMobileMenu}
          >
            Book Table
          </a>
          
          <button
            className={`nav-toggle ${mobileActive ? "open" : ""}`}
            id="nav-toggle"
            onClick={toggleMobileMenu}
            aria-expanded={mobileActive}
            aria-label="Toggle navigation menu"
            aria-controls="nav-menu"
          >
            <span className="nav-toggle-bar"></span>
            <span className="nav-toggle-bar"></span>
            <span className="nav-toggle-bar"></span>
          </button>
        </div>
      </div>
    </header>
  );
}
