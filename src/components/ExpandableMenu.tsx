import { useRef, useState, useEffect } from "react";

export interface ExpandableMenuProps {
  isOpen: boolean;
}

interface MenuItem {
  name: string;
  price: string;
  description: string;
  image: string;
}

interface Category {
  id: string;
  title: string;
  icon: string;
  items: MenuItem[];
}

export default function ExpandableMenu({ isOpen }: ExpandableMenuProps) {
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const panelsRef = useRef<{ [key: string]: HTMLDivElement | null }>({});

  // Auto-expand first category when the full menu is opened
  useEffect(() => {
    if (isOpen && activeCategory === null) {
      setActiveCategory("burgers");
    }
  }, [isOpen, activeCategory]);

  const categories: Category[] = [
    {
      id: "burgers",
      title: "Burgers",
      icon: "fas fa-hamburger",
      items: [
        {
          name: "Crunch Burger",
          price: "₹249",
          description: "Crispy chicken, cheddar cheese, lettuce, tomato & signature sauce.",
          image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=600&q=80",
        },
        {
          name: "Classic Burger",
          price: "₹199",
          description: "Juicy flame-grilled patty, caramelized onions, pickles & house burger sauce.",
          image: "https://images.unsplash.com/photo-1586190848861-99aa4a171e90?auto=format&fit=crop&w=600&q=80",
        },
        {
          name: "Double Cheese Burger",
          price: "₹299",
          description: "Two juicy patties, double cheddar slice, melted cheese blend, and crispy bacon.",
          image: "https://images.unsplash.com/photo-1521305916504-4a1121188589?auto=format&fit=crop&w=600&q=80",
        },
        {
          name: "Veg Burger",
          price: "₹179",
          description: "Spiced potato & pea patty, fresh lettuce, tomato, and tangy mint mayo.",
          image: "https://images.unsplash.com/photo-1525059696034-4967a8e1dca2?auto=format&fit=crop&w=600&q=80",
        },
      ],
    },
    {
      id: "chicken",
      title: "Chicken Items",
      icon: "fas fa-drumstick-bite",
      items: [
        {
          name: "Chicken Wings",
          price: "₹199",
          description: "Spicy fire-glazed chicken wings served with ranch dip.",
          image: "https://images.unsplash.com/photo-1567620832903-9fc6debc209f?auto=format&fit=crop&w=600&q=80",
        },
        {
          name: "Chicken Lollipop",
          price: "₹229",
          description: "Crispy seasoned chicken wings fried and tossed in hot sweet-and-sour chili sauce.",
          image: "https://images.unsplash.com/photo-1569058242253-92a9c755a0ec?auto=format&fit=crop&w=600&q=80",
        },
        {
          name: "Chicken Nuggets",
          price: "₹179",
          description: "Tender, bite-sized chicken breast pieces, breaded and golden-fried.",
          image: "https://images.unsplash.com/photo-1549759594-0d842f402b4d?auto=format&fit=crop&w=600&q=80",
        },
      ],
    },
    {
      id: "wraps",
      title: "Wraps",
      icon: "fas fa-bread-slice",
      items: [
        {
          name: "Chicken Wrap",
          price: "₹189",
          description: "Grilled chicken strips wrapped in a soft tortilla with shredded lettuce and creamy garlic spread.",
          image: "https://images.unsplash.com/photo-1626700051175-6818013e1d4f?auto=format&fit=crop&w=600&q=80",
        },
        {
          name: "Veg Wrap",
          price: "₹169",
          description: "Fresh crunchy vegetables, cucumber, tomatoes, and hummus in a thin spinach wrap.",
          image: "https://images.unsplash.com/photo-1540713434306-58505cf1b6fc?auto=format&fit=crop&w=600&q=80",
        },
        {
          name: "Paneer Wrap",
          price: "₹189",
          description: "Spiced paneer cubes, capsicum, onions, and sweet chili sauce in a warm toasted wrap.",
          image: "https://upload.wikimedia.org/wikipedia/commons/7/75/Paneer_kathi_roll_homemade.jpg",
        },
      ],
    },
    {
      id: "snacks",
      title: "Snacks",
      icon: "fas fa-cookie-bite",
      items: [
        {
          name: "Crispy Fries",
          price: "₹129",
          description: "Premium skin-on potatoes, golden-fried and sprinkled with sea salt.",
          image: "https://images.unsplash.com/photo-1576107232684-1279f390859f?auto=format&fit=crop&w=600&q=80",
        },
        {
          name: "Peri Peri Fries",
          price: "₹149",
          description: "French fries seasoned with fiery African peri-peri spices.",
          image: "https://images.unsplash.com/photo-1585109649139-366815a0d713?auto=format&fit=crop&w=600&q=80",
        },
        {
          name: "Veg Momos",
          price: "₹169",
          description: "Soft steamed vegetable momos served with spicy homemade chutney.",
          image: "https://upload.wikimedia.org/wikipedia/commons/a/a1/Momo_nepal.jpg",
        },
      ],
    },
    {
      id: "beverages",
      title: "Beverages",
      icon: "fas fa-coffee",
      items: [
        {
          name: "Cold Coffee",
          price: "₹179",
          description: "Espresso shot blended with chilled milk, ice cream, sugar, and cocoa powder.",
          image: "https://images.unsplash.com/photo-1517701604599-bb29b565090c?auto=format&fit=crop&w=600&q=80",
        },
        {
          name: "Coffee",
          price: "₹149",
          description: "Premium brewed hot espresso shot layered with velvety milk froth.",
          image: "https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&w=600&q=80",
        },
        {
          name: "Milkshake",
          price: "₹199",
          description: "Rich, creamy vanilla or chocolate ice cream milkshake topped with whipped cream.",
          image: "https://images.unsplash.com/photo-1579954115545-a95591f28bfc?auto=format&fit=crop&w=600&q=80",
        },
        {
          name: "Mojito",
          price: "₹179",
          description: "Refreshing classic virgin mojito with mint leaves, lime juice, syrup, and soda.",
          image: "https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&w=600&q=80",
        },
        {
          name: "Fresh Lime Soda",
          price: "₹99",
          description: "Sparkling fresh lime juice served with sweet or salted syrup.",
          image: "https://images.unsplash.com/photo-1536935338788-846bb9981813?auto=format&fit=crop&w=600&q=80",
        },
      ],
    },
  ];

  const handleToggle = (categoryId: string) => {
    setActiveCategory((prev) => (prev === categoryId ? null : categoryId));
  };

  return (
    <section
      id="expandable-full-menu"
      className={`expandable-menu-section ${isOpen ? "expanded" : ""}`}
      aria-hidden={!isOpen}
    >
      <div className="container">
        <div className="accordion-wrapper">
          {categories.map((category) => {
            const isExpanded = activeCategory === category.id;
            const panel = panelsRef.current[category.id];
            
            return (
              <div key={category.id} className="accordion-item glass-card">
                <button
                  className="accordion-trigger"
                  aria-expanded={isExpanded}
                  aria-controls={`category-panel-${category.id}`}
                  onClick={() => handleToggle(category.id)}
                >
                  <span className="accordion-title-text">
                    <i className={`${category.icon} accordion-icon-prefix`}></i>
                    {category.title}
                  </span>
                  <span className="accordion-chevron">
                    <i className="fas fa-chevron-down"></i>
                  </span>
                </button>
                
                <div
                  id={`category-panel-${category.id}`}
                  className="accordion-panel"
                  ref={(el) => {
                    panelsRef.current[category.id] = el;
                  }}
                  style={{
                    maxHeight: isExpanded && panel ? `${panel.scrollHeight}px` : "0px",
                  }}
                >
                  <div className="accordion-panel-content">
                    <div className="accordion-items-grid">
                      {category.items.map((item, idx) => (
                        <div key={idx} className="menu-item-row">
                          <div className="menu-item-media img-hover-zoom">
                            <img
                              src={item.image}
                              alt={item.name}
                              loading="lazy"
                            />
                          </div>
                          <div className="menu-item-info">
                            <div className="menu-item-headline">
                              <h4>{item.name}</h4>
                              <span className="menu-item-price">{item.price}</span>
                            </div>
                            <p className="menu-item-text">{item.description}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
