import React, { useEffect } from "react";
import styles from "./Home.module.css";
import { useNavigate } from "react-router-dom";

const features = [
  { icon: "👤", bg: "#dbeafe", title: "Customer Management", desc: "Maintain complete customer profiles with contact info, vehicles, and full service history." },
  { icon: "🔧", bg: "#dcfce7", title: "Service Tracking",    desc: "Track ongoing and completed repairs. Assign mechanics and monitor job progress in real time." },
  { icon: "📅", bg: "#fef9c3", title: "Appointments",        desc: "Schedule service appointments, avoid conflicts, and manage bookings with status updates." },
  { icon: "🧾", bg: "#f3e8ff", title: "Invoice Generation",  desc: "Generate professional invoices with parts, labour costs, and tax breakdown instantly." },
  { icon: "📦", bg: "#ffedd5", title: "Inventory Control",   desc: "Track parts stock, quantities, and unit pricing to prevent shortfalls during service." },
  { icon: "👨‍🔧", bg: "#e0f2fe", title: "Mechanic Directory",  desc: "Manage your team of mechanics, their skills, contact details, and service assignments." },
];

const Home = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) navigate("/login");
  }, [navigate]);

  return (
    <div className={styles.page}>
      {/* Hero */}
      <section className={styles.hero}>
        <div className={styles.heroBg} />
        <div className={styles.heroContent}>
          <div className={styles.heroLeft}>
            <span className={styles.heroTag}>🚗 Automotive Management Platform</span>
            <h1 className={styles.heroTitle}>
              Modern Shop <span>Management</span>, Simplified.
            </h1>
            <p className={styles.heroSubtitle}>
              Streamline your automobile shop operations — from customer intake and service scheduling to invoicing and inventory — all in one place.
            </p>
            <div className={styles.heroBtns}>
              <button className={styles.btnPrimary} onClick={() => navigate("/add-appointment-page")}>
                📅 Book Appointment
              </button>
              <button className={styles.btnSecondary} onClick={() => navigate("/all-appointments")}>
                View All Jobs
              </button>
            </div>
            <div className={styles.heroStats}>
              <div className={styles.stat}>
                <span className={styles.statNum}>360°</span>
                <span className={styles.statLabel}>Shop Coverage</span>
              </div>
              <div className={styles.stat}>
                <span className={styles.statNum}>Real-time</span>
                <span className={styles.statLabel}>Status Updates</span>
              </div>
              <div className={styles.stat}>
                <span className={styles.statNum}>Secure</span>
                <span className={styles.statLabel}>Role-based Access</span>
              </div>
            </div>
          </div>

          <div className={styles.heroRight}>
            <div className={styles.heroCard}>
              <div className={styles.heroCardTitle}>Today's Overview</div>
              {[
                { icon: "📅", bg: styles.iconBlue,   label: "Appointments",    value: "Track & Manage" },
                { icon: "🔧", bg: styles.iconGreen,  label: "Active Services", value: "Monitor Progress" },
                { icon: "🧾", bg: styles.iconYellow, label: "Pending Invoices", value: "Generate & Send" },
                { icon: "📦", bg: styles.iconPurple, label: "Inventory",       value: "Parts & Stock" },
              ].map((item) => (
                <div key={item.label} className={styles.heroCardRow}>
                  <div className={`${styles.heroCardIcon} ${item.bg}`}>{item.icon}</div>
                  <div>
                    <div className={styles.heroCardLabel}>{item.label}</div>
                    <div className={styles.heroCardValue}>{item.value}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className={styles.features}>
        <div className={styles.featuresInner}>
          <span className={styles.sectionTag}>Everything You Need</span>
          <h2 className={styles.sectionTitle}>Built for Automobile Shops</h2>
          <div className={styles.featureGrid}>
            {features.map((f) => (
              <div key={f.title} className={styles.featureCard}>
                <div className={styles.featureIcon} style={{ background: f.bg }}>{f.icon}</div>
                <div className={styles.featureTitle}>{f.title}</div>
                <div className={styles.featureDesc}>{f.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
