import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Login.module.css";

const Login = ({ onLogin }) => {
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError]       = useState(null);
  const [loading, setLoading]   = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });
      const data = await response.json();
      if (!response.ok) throw new Error("Invalid username or password");
      localStorage.setItem("token",  data.token);
      localStorage.setItem("role",   data.role || "ADMIN");
      localStorage.setItem("userId", data.userId);
      onLogin(true);
      navigate("/");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.page}>
      {/* Left branding panel */}
      <div className={styles.left}>
        <div className={styles.brand}>
          <div className={styles.brandIcon}>🚗</div>
          <span className={styles.brandName}>AutoShop</span>
        </div>
        <h1 className={styles.leftTitle}>
          Your Shop,<br /><span>Fully Managed.</span>
        </h1>
        <p className={styles.leftDesc}>
          A complete management system for automobile service centres — customers, appointments, invoices, inventory and more.
        </p>
        <div className={styles.features}>
          {["Role-based secure access", "Real-time appointment tracking", "Instant invoice generation", "Parts inventory management"].map(f => (
            <div key={f} className={styles.feature}>
              <span className={styles.featureDot} />
              {f}
            </div>
          ))}
        </div>
      </div>

      {/* Right form panel */}
      <div className={styles.right}>
        <div className={styles.formBox}>
          <h2 className={styles.formTitle}>Welcome back</h2>
          <p className={styles.formSubtitle}>Sign in to your account to continue</p>

          {error && <div className={styles.error}>{error}</div>}

          <form onSubmit={handleSubmit}>
            <div className={styles.field}>
              <label className={styles.label}>Username</label>
              <input
                className={styles.input}
                type="text"
                placeholder="Enter your username"
                value={username}
                onChange={(e) => setUserName(e.target.value)}
                required
              />
            </div>
            <div className={styles.field}>
              <label className={styles.label}>Password</label>
              <input
                className={styles.input}
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <button className={styles.submitBtn} type="submit" disabled={loading}>
              {loading ? "Signing in…" : "Sign In"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
