import { motion } from "framer-motion";

export default function TheBeginning() {
  const timelineItems = [
    {
      icon: "☕",
      title: "Idea Born",
      year: "2016",
      desc: "The inspiration for Brew & Crumbs Café was born from a passion for coffee and creating meaningful spaces.",
    },
    {
      icon: "🏡",
      title: "Café Opened",
      year: "2016",
      desc: "The café officially opened its doors and welcomed its very first customers.",
    },
    {
      icon: "❤️",
      title: "Still Growing",
      year: "Today",
      desc: "Thousands of coffees, delicious meals, and unforgettable memories later, the journey continues.",
    },
  ];

  return (
    <section id="beginning" className="beginning-section section">
      <div className="container">
        <div className="beginning-layout">
          {/* Left Side: Founder portrait & Milestones */}
          <div className="beginning-left">
            <motion.div
              className="beginning-media"
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.7, ease: "easeOut" }}
            >
              <div className="img-hover-zoom">
                <img
                  src="https://images.unsplash.com/photo-1556157382-97eda2d62296?auto=format&fit=crop&w=800&q=80"
                  alt="Founder of Brew & Crumbs Café inside the café"
                  className="beginning-img"
                  loading="lazy"
                />
              </div>
            </motion.div>

            {/* Milestones Vertical Timeline */}
            <motion.div
              className="milestones-wrapper glass-card"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            >
              <h3 className="milestones-title">Café Milestones</h3>
              <div className="milestones-timeline">
                <div className="milestone-item">
                  <div className="milestone-icon">☕</div>
                  <div className="milestone-info">
                    <span className="milestone-year">2016</span>
                    <p className="milestone-text">Dream was born</p>
                  </div>
                </div>
                <div className="milestone-connector-line"></div>
                <div className="milestone-item">
                  <div className="milestone-icon">🏡</div>
                  <div className="milestone-info">
                    <span className="milestone-year">2016</span>
                    <p className="milestone-text">Brew & Crumbs Café officially opened</p>
                  </div>
                </div>
                <div className="milestone-connector-line"></div>
                <div className="milestone-item">
                  <div className="milestone-icon">👨‍🍳</div>
                  <div className="milestone-info">
                    <span className="milestone-year">2018</span>
                    <p className="milestone-text">Expanded the menu with handcrafted dishes</p>
                  </div>
                </div>
                <div className="milestone-connector-line"></div>
                <div className="milestone-item">
                  <div className="milestone-icon">⭐</div>
                  <div className="milestone-info">
                    <span className="milestone-year">2022</span>
                    <p className="milestone-text">Became a local favorite</p>
                  </div>
                </div>
                <div className="milestone-connector-line"></div>
                <div className="milestone-item">
                  <div className="milestone-icon">❤️</div>
                  <div className="milestone-info">
                    <span className="milestone-year">Today</span>
                    <p className="milestone-text">Serving thousands of happy customers</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Right Side: Copy & Timeline Details */}
          <div className="beginning-content">
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.7, ease: "easeOut" }}
            >
              <span className="section-badge">EST. 2016 • THE STORY BEHIND BREW & CRUMBS</span>
              <h2 className="section-title">Meet the Founder</h2>
              <p className="beginning-story">
                Back in 2016, the founder of Brew & Crumbs Café had a simple dream—to create more than just another coffee shop.
                <br /><br />
                After years of exploring different cafés, meeting people, and discovering how a simple cup of coffee could bring conversations to life, the idea for Brew & Crumbs was born.
                <br /><br />
                The vision was to build a warm, welcoming place where families, friends, students, and professionals could slow down, enjoy handcrafted coffee, delicious food, and create unforgettable memories.
                <br /><br />
                What started as a small idea has now become a place where every cup tells a story and every guest feels at home.
              </p>
            </motion.div>

            {/* Timeline Cards */}
            <div className="timeline-container">
              {timelineItems.map((item, idx) => (
                <div key={idx} style={{ display: "contents" }}>
                  <motion.div
                    className="timeline-item"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{
                      duration: 0.6,
                      delay: idx * 0.15,
                      ease: "easeOut",
                    }}
                  >
                    <div className="timeline-badge">{item.icon}</div>
                    <div className="timeline-card glass-card">
                      <span className="timeline-year">{item.year}</span>
                      <h4 className="timeline-title">{item.title}</h4>
                      <p className="timeline-text">{item.desc}</p>
                    </div>
                  </motion.div>
                  {/* Connector arrow between cards (except the last one) */}
                  {idx < timelineItems.length - 1 && (
                    <motion.div
                      className="timeline-connector"
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 0.7 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, delay: idx * 0.15 + 0.1 }}
                    >
                      <i className="fas fa-arrow-down"></i>
                    </motion.div>
                  )}
                </div>
              ))}
            </div>

            {/* Founder Quote Card */}
            <motion.div
              className="founder-quote-card glass-card"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
            >
              <span className="quote-mark open-quote">“</span>
              <p className="quote-text">
                "Success isn't measured by the number of coffees we serve, but by the smiles and memories our guests take home."
              </p>
              <span className="quote-author">— Founder, Brew & Crumbs Café</span>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
