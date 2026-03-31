import { useState } from "react";
import api from "../api/axios";

export default function Contact() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: ""
  });
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setStatus("");
    
    // Simulate sending message (you can connect to backend later)
    setTimeout(() => {
      setStatus("Message sent successfully! We'll get back to you soon.");
      setForm({ name: "", email: "", message: "" });
      setLoading(false);
    }, 1000);
  };

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h1 style={styles.title}>Contact <span style={styles.gradient}>Us</span></h1>
        <p style={styles.subtitle}>Get in touch with our team</p>
      </div>

      <div style={styles.content}>
        <div style={styles.infoSection}>
          <div style={styles.infoCard}>
            <div style={styles.infoIcon}>📞</div>
            <h3>Phone</h3>
            <p><a href="tel:+250793516483" style={styles.phoneLink}>+250 793 516 483</a></p>
          </div>
          
          <div style={styles.infoCard}>
            <div style={styles.infoIcon}>📧</div>
            <h3>Email</h3>
            <p>support@hr-hub.com</p>
          </div>
          
          <div style={styles.infoCard}>
            <div style={styles.infoIcon}>📍</div>
            <h3>Location</h3>
            <p>Kigali, Rwanda</p>
          </div>
          
          <div style={styles.infoCard}>
            <div style={styles.infoIcon}>⏰</div>
            <h3>Hours</h3>
            <p>Monday - Friday: 9AM - 6PM</p>
          </div>
        </div>

        <div style={styles.formSection}>
          <h2 style={styles.formTitle}>Send us a message</h2>
          <form onSubmit={handleSubmit} style={styles.form}>
            <input
              type="text"
              placeholder="Your Name"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              style={styles.input}
              required
            />
            <input
              type="email"
              placeholder="Your Email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              style={styles.input}
              required
            />
            <textarea
              placeholder="Your Message"
              rows="5"
              value={form.message}
              onChange={(e) => setForm({ ...form, message: e.target.value })}
              style={styles.textarea}
              required
            />
            <button type="submit" disabled={loading} style={styles.button}>
              {loading ? "Sending..." : "Send Message"}
            </button>
            {status && <div style={styles.status}>{status}</div>}
          </form>
        </div>
      </div>

      <div style={styles.socialSection}>
        <h2 style={styles.socialTitle}>Connect With Us</h2>
        <div style={styles.socialGrid}>
          <a href="https://github.com/dieu-merci-niyonkuru" target="_blank" style={styles.socialCard}>
            <div style={styles.socialIcon}>🐙</div>
            <div>GitHub</div>
            <div style={styles.socialHandle}>@dieumerci</div>
          </a>
          <a href="https://www.linkedin.com/in/dieu-merci-niyonkuru-7725b1363/" target="_blank" style={styles.socialCard}>
            <div style={styles.socialIcon}>💼</div>
            <div>LinkedIn</div>
            <div style={styles.socialHandle}>Dieu Merci</div>
          </a>
          <a href="https://twitter.com/" target="_blank" style={styles.socialCard}>
            <div style={styles.socialIcon}>🐦</div>
            <div>X (Twitter)</div>
            <div style={styles.socialHandle}>@hrhub</div>
          </a>
          <a href="https://github.com/dieu-merci-niyonkuru/Hr-hub" target="_blank" style={styles.socialCard}>
            <div style={styles.socialIcon}>📦</div>
            <div>GitHub Repo</div>
            <div style={styles.socialHandle}>HR-Hub Project</div>
          </a>
        </div>
      </div>
    </div>
  );
}

const styles = {
  container: {
    maxWidth: "1200px",
    margin: "0 auto",
    padding: "2rem",
  },
  header: {
    textAlign: "center",
    padding: "3rem 2rem",
    background: "linear-gradient(135deg, #1e293b, #0f172a)",
    borderRadius: "12px",
    marginBottom: "3rem",
  },
  title: {
    fontSize: "3rem",
    marginBottom: "1rem",
    color: "#f1f5f9",
  },
  gradient: {
    background: "linear-gradient(135deg, #f97316, #fb923c)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
  },
  subtitle: {
    fontSize: "1.2rem",
    color: "#94a3b8",
  },
  content: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
    gap: "3rem",
    marginBottom: "3rem",
  },
  infoSection: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
    gap: "1.5rem",
  },
  infoCard: {
    backgroundColor: "#1e293b",
    padding: "1.5rem",
    borderRadius: "12px",
    textAlign: "center",
  },
  infoIcon: {
    fontSize: "2.5rem",
    marginBottom: "0.5rem",
  },
  phoneLink: {
    color: "#f97316",
    textDecoration: "none",
    fontSize: "1.1rem",
  },
  formSection: {
    backgroundColor: "#1e293b",
    padding: "2rem",
    borderRadius: "12px",
  },
  formTitle: {
    fontSize: "1.5rem",
    color: "#f97316",
    marginBottom: "1.5rem",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "1rem",
  },
  input: {
    padding: "0.75rem",
    backgroundColor: "#0f172a",
    border: "1px solid #334155",
    borderRadius: "6px",
    color: "white",
    fontSize: "1rem",
  },
  textarea: {
    padding: "0.75rem",
    backgroundColor: "#0f172a",
    border: "1px solid #334155",
    borderRadius: "6px",
    color: "white",
    fontSize: "1rem",
    fontFamily: "inherit",
  },
  button: {
    padding: "0.75rem",
    backgroundColor: "#f97316",
    border: "none",
    borderRadius: "6px",
    color: "white",
    fontWeight: "bold",
    cursor: "pointer",
    fontSize: "1rem",
  },
  status: {
    marginTop: "1rem",
    padding: "0.75rem",
    backgroundColor: "rgba(34,197,94,0.1)",
    border: "1px solid #22c55e",
    borderRadius: "6px",
    color: "#22c55e",
    textAlign: "center",
  },
  socialSection: {
    marginTop: "3rem",
    padding: "2rem",
    backgroundColor: "#1e293b",
    borderRadius: "12px",
  },
  socialTitle: {
    fontSize: "1.5rem",
    textAlign: "center",
    marginBottom: "2rem",
    color: "#f97316",
  },
  socialGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
    gap: "1.5rem",
  },
  socialCard: {
    backgroundColor: "#0f172a",
    padding: "1.5rem",
    borderRadius: "12px",
    textAlign: "center",
    textDecoration: "none",
    color: "#f1f5f9",
    transition: "transform 0.2s",
  },
  socialIcon: {
    fontSize: "2rem",
    marginBottom: "0.5rem",
  },
  socialHandle: {
    fontSize: "0.875rem",
    color: "#f97316",
    marginTop: "0.25rem",
  },
};
