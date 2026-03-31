import { useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import api from "../api/axios";
import { useToast } from "../contexts/ToastContext";
import { motion } from "framer-motion";
import { FiLock, FiCheckCircle } from "react-icons/fi";
import PasswordChecklist from "react-password-checklist";

export default function ResetPassword() {
  const { token } = useParams();
  const navigate = useNavigate();
  const { showSuccess, showError } = useToast();
  const [form, setForm] = useState({
    new_password: "",
    confirm_password: ""
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (form.new_password !== form.confirm_password) {
      showError("❌ Passwords don't match!");
      return;
    }
    
    setLoading(true);
    try {
      await api.post(`/reset-password/${token}/`, {
        new_password: form.new_password,
        confirm_password: form.confirm_password
      });
      setSuccess(true);
      showSuccess("✅ Password reset successful!");
      setTimeout(() => navigate("/login"), 3000);
    } catch (err) {
      showError("❌ Invalid or expired reset link. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div style={styles.container}>
        <div style={styles.card}>
          <div style={styles.successIcon}>
            <FiCheckCircle size={60} color="#10b981" />
          </div>
          <h2 style={styles.successTitle}>Password Reset Success!</h2>
          <p style={styles.successText}>You can now login with your new password.</p>
          <Link to="/login" style={styles.successBtn}>Go to Login</Link>
        </div>
      </div>
    );
  }

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
          <h1 style={styles.title}>Create New Password</h1>
          <p style={styles.subtitle}>Enter your new password below</p>
        </div>
        
        <form onSubmit={handleSubmit} style={styles.form}>
          <div style={styles.inputGroup}>
            <FiLock style={styles.inputIcon} />
            <input
              type="password"
              placeholder="New Password (min 8 characters)"
              value={form.new_password}
              onChange={(e) => setForm({ ...form, new_password: e.target.value })}
              style={styles.input}
              required
            />
          </div>
          
          <div style={styles.inputGroup}>
            <FiLock style={styles.inputIcon} />
            <input
              type="password"
              placeholder="Confirm New Password"
              value={form.confirm_password}
              onChange={(e) => setForm({ ...form, confirm_password: e.target.value })}
              style={styles.input}
              required
            />
          </div>
          
          {form.new_password && (
            <PasswordChecklist
              rules={["minLength", "specialChar", "number", "capital", "match"]}
              minLength={8}
              value={form.new_password}
              valueAgain={form.confirm_password}
              messages={{
                minLength: "At least 8 characters",
                specialChar: "At least 1 special character",
                number: "At least 1 number",
                capital: "At least 1 capital letter",
                match: "Passwords match",
              }}
              style={styles.passwordChecklist}
            />
          )}
          
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            disabled={loading}
            style={styles.button}
          >
            {loading ? "Resetting..." : "Reset Password"}
          </motion.button>
        </form>
        
        <div style={styles.footer}>
          <Link to="/login" style={styles.backLink}>Back to Login</Link>
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
  passwordChecklist: {
    backgroundColor: "#0f172a",
    padding: "0.75rem",
    borderRadius: "8px",
    fontSize: "0.75rem",
    color: "#94a3b8",
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
    marginTop: "0.5rem",
  },
  footer: {
    textAlign: "center",
    marginTop: "1.5rem",
  },
  backLink: {
    color: "#94a3b8",
    textDecoration: "none",
    fontSize: "0.875rem",
  },
  successIcon: {
    textAlign: "center",
    marginBottom: "1rem",
  },
  successTitle: {
    textAlign: "center",
    fontSize: "1.5rem",
    color: "#10b981",
    marginBottom: "0.5rem",
  },
  successText: {
    textAlign: "center",
    color: "#94a3b8",
    marginBottom: "1.5rem",
  },
  successBtn: {
    display: "block",
    textAlign: "center",
    backgroundColor: "#f97316",
    color: "white",
    padding: "0.75rem",
    borderRadius: "8px",
    textDecoration: "none",
    fontWeight: "bold",
  },
};
