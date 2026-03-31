import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../api/axios";
import { useToast } from "../contexts/ToastContext";
import { motion } from "framer-motion";
import { FiUser, FiMail, FiLock, FiUserPlus } from "react-icons/fi";
import PasswordChecklist from "react-password-checklist";

export default function Register() {
  const navigate = useNavigate();
  const { showSuccess, showError } = useToast();
  const [form, setForm] = useState({
    email: "",
    first_name: "",
    last_name: "",
    password: "",
    confirm_password: "",
    phone: "",
    department: "",
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    if (form.password !== form.confirm_password) {
      showError("❌ Passwords don't match!");
      setLoading(false);
      return;
    }
    
    try {
      const response = await api.post("/register/", {
        email: form.email,
        first_name: form.first_name,
        last_name: form.last_name,
        password: form.password,
        confirm_password: form.confirm_password,
        phone: form.phone,
        department: form.department,
      });
      
      showSuccess("✅ Account created successfully! Please login.");
      setTimeout(() => navigate("/login"), 2000);
    } catch (err) {
      if (err.response?.data?.email) {
        showError("❌ Email already registered. Please use a different email.");
      } else {
        showError("❌ Registration failed. Please try again.");
      }
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
          <h1 style={styles.title}>Create Account</h1>
          <p style={styles.subtitle}>Join HR-Hub as an Interviewer</p>
        </div>
        
        <form onSubmit={handleSubmit} style={styles.form}>
          <div style={styles.row}>
            <div style={styles.inputGroup}>
              <FiUser style={styles.inputIcon} />
              <input
                type="text"
                placeholder="First Name *"
                value={form.first_name}
                onChange={(e) => setForm({ ...form, first_name: e.target.value })}
                style={styles.input}
                required
              />
            </div>
            <div style={styles.inputGroup}>
              <FiUser style={styles.inputIcon} />
              <input
                type="text"
                placeholder="Last Name *"
                value={form.last_name}
                onChange={(e) => setForm({ ...form, last_name: e.target.value })}
                style={styles.input}
                required
              />
            </div>
          </div>
          
          <div style={styles.inputGroup}>
            <FiMail style={styles.inputIcon} />
            <input
              type="email"
              placeholder="Email Address *"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              style={styles.input}
              required
            />
          </div>
          
          <div style={styles.row}>
            <input
              type="tel"
              placeholder="Phone (Optional)"
              value={form.phone}
              onChange={(e) => setForm({ ...form, phone: e.target.value })}
              style={{ ...styles.input, flex: 1 }}
            />
            <input
              type="text"
              placeholder="Department (Optional)"
              value={form.department}
              onChange={(e) => setForm({ ...form, department: e.target.value })}
              style={{ ...styles.input, flex: 1 }}
            />
          </div>
          
          <div style={styles.inputGroup}>
            <FiLock style={styles.inputIcon} />
            <input
              type="password"
              placeholder="Password * (min 8 characters)"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              style={styles.input}
              required
            />
          </div>
          
          <div style={styles.inputGroup}>
            <FiLock style={styles.inputIcon} />
            <input
              type="password"
              placeholder="Confirm Password *"
              value={form.confirm_password}
              onChange={(e) => setForm({ ...form, confirm_password: e.target.value })}
              style={styles.input}
              required
            />
          </div>
          
          {form.password && (
            <PasswordChecklist
              rules={["minLength", "specialChar", "number", "capital", "match"]}
              minLength={8}
              value={form.password}
              valueAgain={form.confirm_password}
              messages={{
                minLength: "Password has at least 8 characters",
                specialChar: "Password has at least 1 special character",
                number: "Password has at least 1 number",
                capital: "Password has at least 1 capital letter",
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
            <FiUserPlus />
            {loading ? "Creating Account..." : "Create Account"}
          </motion.button>
        </form>
        
        <p style={styles.footer}>
          Already have an account? <Link to="/login" style={styles.link}>Sign In</Link>
        </p>
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
    padding: "2rem",
    borderRadius: "16px",
    width: "550px",
    maxWidth: "100%",
    boxShadow: "0 20px 40px rgba(0,0,0,0.3)",
  },
  header: {
    textAlign: "center",
    marginBottom: "1.5rem",
  },
  logo: {
    width: "50px",
    height: "50px",
    marginBottom: "0.75rem",
  },
  title: {
    fontSize: "1.5rem",
    color: "#f97316",
    marginBottom: "0.25rem",
  },
  subtitle: {
    color: "#94a3b8",
    fontSize: "0.875rem",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "1rem",
  },
  row: {
    display: "flex",
    gap: "1rem",
  },
  inputGroup: {
    position: "relative",
    flex: 1,
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
    fontSize: "0.9rem",
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
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "0.5rem",
    marginTop: "0.5rem",
  },
  footer: {
    textAlign: "center",
    marginTop: "1.5rem",
    color: "#94a3b8",
    fontSize: "0.875rem",
  },
  link: {
    color: "#f97316",
    textDecoration: "none",
  },
};
