import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface MenuItem {
  name: string;
  price: string;
  description: string;
  category: string;
  isVeg: boolean;
  image: string;
}

const menuData: MenuItem[] = [
  // 🍔 Burgers
  {
    name: "Crunch Burger",
    price: "₹249",
    description: "Crispy chicken, cheddar cheese, lettuce, tomato & signature sauce.",
    category: "Burgers",
    isVeg: false,
    image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=600&q=80",
  },
  {
    name: "Classic Burger",
    price: "₹199",
    description: "Juicy flame-grilled patty, caramelized onions, pickles & house burger sauce.",
    category: "Burgers",
    isVeg: false,
    image: "https://images.unsplash.com/photo-1586190848861-99aa4a171e90?auto=format&fit=crop&w=600&q=80",
  },
  {
    name: "Double Cheese Burger",
    price: "₹299",
    description: "Two juicy patties, double cheddar slice, melted cheese blend, and crispy bacon.",
    category: "Burgers",
    isVeg: false,
    image: "https://images.unsplash.com/photo-1521305916504-4a1121188589?auto=format&fit=crop&w=600&q=80",
  },
  {
    name: "Veg Burger",
    price: "₹179",
    description: "Spiced potato & pea patty, fresh lettuce, tomato, and tangy mint mayo.",
    category: "Burgers",
    isVeg: true,
    image: "https://images.unsplash.com/photo-1525059696034-4967a8e1dca2?auto=format&fit=crop&w=600&q=80",
  },
  // 🍗 Chicken Items
  {
    name: "Chicken Wings",
    price: "₹199",
    description: "Spicy fire-glazed chicken wings served with ranch dip.",
    category: "Chicken Items",
    isVeg: false,
    image: "https://images.unsplash.com/photo-1567620832903-9fc6debc209f?auto=format&fit=crop&w=600&q=80",
  },
  {
    name: "Chicken Lollipop",
    price: "₹229",
    description: "Crispy seasoned chicken wings fried and tossed in hot sweet-and-sour chili sauce.",
    category: "Chicken Items",
    isVeg: false,
    image: "https://images.unsplash.com/photo-1569058242253-92a9c755a0ec?auto=format&fit=crop&w=600&q=80",
  },
  {
    name: "Chicken Nuggets",
    price: "₹179",
    description: "Tender, bite-sized chicken breast pieces, breaded and golden-fried.",
    category: "Chicken Items",
    isVeg: false,
    image: "https://images.unsplash.com/photo-1549759594-0d842f402b4d?auto=format&fit=crop&w=600&q=80",
  },
  // 🌯 Wraps
  {
    name: "Chicken Wrap",
    price: "₹189",
    description: "Grilled chicken strips wrapped in a soft tortilla with shredded lettuce and creamy garlic spread.",
    category: "Wraps",
    isVeg: false,
    image: "https://images.unsplash.com/photo-1626700051175-6818013e1d4f?auto=format&fit=crop&w=600&q=80",
  },
  {
    name: "Veg Wrap",
    price: "₹169",
    description: "Fresh crunchy vegetables, cucumber, tomatoes, and hummus in a thin spinach wrap.",
    category: "Wraps",
    isVeg: true,
    image: "https://images.unsplash.com/photo-1540713434306-58505cf1b6fc?auto=format&fit=crop&w=600&q=80",
  },
  {
    name: "Paneer Wrap",
    price: "₹189",
    description: "Spiced paneer cubes, capsicum, onions, and sweet chili sauce in a warm toasted wrap.",
    category: "Wraps",
    isVeg: true,
    image: "https://upload.wikimedia.org/wikipedia/commons/7/75/Paneer_kathi_roll_homemade.jpg",
  },
  // 🍟 Snacks
  {
    name: "Crispy Fries",
    price: "₹129",
    description: "Premium skin-on potatoes, golden-fried and sprinkled with sea salt.",
    category: "Snacks",
    isVeg: true,
    image: "https://images.unsplash.com/photo-1576107232684-1279f390859f?auto=format&fit=crop&w=600&q=80",
  },
  {
    name: "Peri Peri Fries",
    price: "₹149",
    description: "French fries seasoned with fiery African peri-peri spices.",
    category: "Snacks",
    isVeg: true,
    image: "https://images.unsplash.com/photo-1585109649139-366815a0d713?auto=format&fit=crop&w=600&q=80",
  },
  {
    name: "Veg Momos",
    price: "₹169",
    description: "Soft steamed vegetable momos served with spicy homemade chutney.",
    category: "Snacks",
    isVeg: true,
    image: "https://upload.wikimedia.org/wikipedia/commons/a/a1/Momo_nepal.jpg",
  },
  // 🥤 Beverages
  {
    name: "Cold Coffee",
    price: "₹179",
    description: "Espresso shot blended with chilled milk, ice cream, sugar, and cocoa powder.",
    category: "Beverages",
    isVeg: true,
    image: "https://images.unsplash.com/photo-1517701604599-bb29b565090c?auto=format&fit=crop&w=600&q=80",
  },
  {
    name: "Coffee",
    price: "₹149",
    description: "Premium brewed hot espresso shot layered with velvety milk froth.",
    category: "Beverages",
    isVeg: true,
    image: "https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&w=600&q=80",
  },
  {
    name: "Milkshake",
    price: "₹199",
    description: "Rich, creamy vanilla or chocolate ice cream milkshake topped with whipped cream.",
    category: "Beverages",
    isVeg: true,
    image: "https://images.unsplash.com/photo-1579954115545-a95591f28bfc?auto=format&fit=crop&w=600&q=80",
  },
  {
    name: "Mojito",
    price: "₹179",
    description: "Refreshing classic virgin mojito with mint leaves, lime juice, syrup, and soda.",
    category: "Beverages",
    isVeg: true,
    image: "https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&w=600&q=80",
  },
  {
    name: "Fresh Lime Soda",
    price: "₹99",
    description: "Sparkling fresh lime juice served with sweet or salted syrup.",
    category: "Beverages",
    isVeg: true,
    image: "https://images.unsplash.com/photo-1536935338788-846bb9981813?auto=format&fit=crop&w=600&q=80",
  },
];

const categories = ["Burgers", "Chicken Items", "Wraps", "Snacks", "Beverages"];

interface FullMenuModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function FullMenuModal({ isOpen, onClose }: FullMenuModalProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [filter, setFilter] = useState<"all" | "veg" | "non-veg">("all");

  const filteredItems = menuData.filter((item) => {
    // 1. Text Search Filter
    const matchesSearch =
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase());

    // 2. Veg/Non-Veg Filter
    const matchesVeg =
      filter === "all" ||
      (filter === "veg" && item.isVeg) ||
      (filter === "non-veg" && !item.isVeg);

    return matchesSearch && matchesVeg;
  });

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="full-menu-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
        >
          <motion.div
            className="full-menu-modal"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ type: "spring", damping: 25, stiffness: 220 }}
          >
            {/* Modal Header */}
            <div className="full-menu-header">
              <h2 className="full-menu-title">Full Menu</h2>
              <button
                className="full-menu-close"
                onClick={onClose}
                aria-label="Close menu"
              >
                ✕
              </button>
            </div>

            {/* Search and Filters panel */}
            <div className="full-menu-search-filter-sticky">
              <div className="full-menu-search-wrapper">
                <span className="search-icon">🔍</span>
                <input
                  type="text"
                  placeholder="Search your favorite food..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="full-menu-search-input"
                />
              </div>

              <div className="full-menu-filters">
                <button
                  className={`filter-btn ${filter === "all" ? "active" : ""}`}
                  onClick={() => setFilter("all")}
                >
                  All
                </button>
                <button
                  className={`filter-btn ${filter === "veg" ? "active" : ""}`}
                  onClick={() => setFilter("veg")}
                >
                  🟢 Veg
                </button>
                <button
                  className={`filter-btn ${filter === "non-veg" ? "active" : ""}`}
                  onClick={() => setFilter("non-veg")}
                >
                  🔴 Non-Veg
                </button>
              </div>
            </div>

            {/* Scrollable Modal Body catalog list */}
            <div className="full-menu-body">
              {filteredItems.length === 0 ? (
                <div style={{ textAlign: "center", padding: "60px 20px", color: "rgba(255,248,231,0.6)" }}>
                  <p style={{ fontSize: "1.2rem", margin: 0 }}>No items match your criteria.</p>
                </div>
              ) : (
                categories.map((category) => {
                  const items = filteredItems.filter((item) => item.category === category);
                  if (items.length === 0) return null;

                  return (
                    <section key={category} className="full-menu-category-section">
                      <h3 className="full-menu-category-title">{category}</h3>
                      <div className="full-menu-items-grid">
                        {items.map((item) => (
                          <article key={item.name} className="full-menu-card">
                            <div className="full-menu-card-image-box">
                              <img
                                src={item.image}
                                alt={item.name}
                                className="full-menu-card-img"
                                loading="lazy"
                              />
                            </div>
                            <div className="full-menu-card-details">
                              <div className="full-menu-card-header">
                                <h4 className="full-menu-card-title">{item.name}</h4>
                                <span
                                  className={`menu-indicator ${
                                    item.isVeg ? "veg" : "non-veg"
                                  }`}
                                  title={item.isVeg ? "Veg" : "Non-Veg"}
                                >
                                  <span className="indicator-dot"></span>
                                </span>
                              </div>
                              <p className="full-menu-card-desc">{item.description}</p>
                              <div className="full-menu-card-footer">
                                <span className="full-menu-card-price">{item.price}</span>
                              </div>
                            </div>
                          </article>
                        ))}
                      </div>
                    </section>
                  );
                })
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
