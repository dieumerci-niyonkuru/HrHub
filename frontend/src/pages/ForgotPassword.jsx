import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../api/axios";
import { useToast } from "../contexts/ToastContext";
import { motion } from "framer-motion";
import { FiMail, FiArrowLeft } from "react-icons/fi";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const { showSuccess, showError } = useToast();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await api.post("/forgot-password/", { email });
      showSuccess("✅ Password reset link sent! Check your terminal.");
      setTimeout(() => navigate("/login"), 3000);
    } catch (err) {
      showError("❌ Failed to send reset link. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        style={styles.card}
      >
        <div style={styles.header}>
          <img src="/hr-hub-logo.svg" alt="HR-Hub" style={styles.logo} />
          <h1 style={styles.title}>Forgot Password?</h1>
          <p style={styles.subtitle}>
            Enter your email address and we'll send you a link to reset your password.
          </p>
        </div>
        
        <form onSubmit={handleSubmit} style={styles.form}>
          <div style={styles.inputGroup}>
            <FiMail style={styles.inputIcon} />
            <input
              type="email"
              placeholder="Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={styles.input}
              required
            />
          </div>
          
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            disabled={loading}
            style={styles.button}
          >
            {loading ? "Sending..." : "Send Reset Link"}
          </motion.button>
        </form>
        
        <div style={styles.footer}>
          <Link to="/login" style={styles.backLink}>
            <FiArrowLeft /> Back to Login
          </Link>
        </div>
      </motion.div>
    </div>
  );
}

const styles = {
  container: {
    minHeight: "100vh",
    backgroundColor: "#0f172a",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "1rem",
  },
  card: {
    backgroundColor: "#1e293b",
    padding: "2.5rem",
    borderRadius: "16px",
    width: "450px",
    maxWidth: "100%",
    boxShadow: "0 20px 40px rgba(0,0,0,0.3)",
  },
  header: {
    textAlign: "center",
    marginBottom: "2rem",
  },
  logo: {
    width: "60px",
    height: "60px",
    marginBottom: "1rem",
  },
  title: {
    fontSize: "1.75rem",
    color: "#f97316",
    marginBottom: "0.5rem",
  },
  subtitle: {
    color: "#94a3b8",
    fontSize: "0.9rem",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "1.25rem",
  },
  inputGroup: {
    position: "relative",
  },
  inputIcon: {
    position: "absolute",
    left: "12px",
    top: "50%",
    transform: "translateY(-50%)",
    color: "#94a3b8",
    fontSize: "1rem",
  },
  input: {
    width: "100%",
    padding: "0.75rem 0.75rem 0.75rem 2.5rem",
    backgroundColor: "#0f172a",
    border: "1px solid #334155",
    borderRadius: "8px",
    color: "white",
    fontSize: "1rem",
  },
  button: {
    backgroundColor: "#f97316",
    color: "white",
    border: "none",
    padding: "0.75rem",
    borderRadius: "8px",
    fontWeight: "bold",
    cursor: "pointer",
    fontSize: "1rem",
  },
  footer: {
    textAlign: "center",
    marginTop: "1.5rem",
  },
  backLink: {
    color: "#94a3b8",
    textDecoration: "none",
    display: "inline-flex",
    alignItems: "center",
    gap: "0.5rem",
    fontSize: "0.875rem",
  },
};
