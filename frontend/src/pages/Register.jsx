import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../api/axios";

export default function Register() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    email: "",
    first_name: "",
    last_name: "",
    password: "",
    confirm_password: "",
    phone: "",
    department: "",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");
    
    try {
      const response = await api.post("/register/", form);
      setSuccess(response.data.message || "Registration successful! Please check your email to verify.");
      setTimeout(() => navigate("/login"), 3000);
    } catch (err) {
      setError(err.response?.data?.detail || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h1 style={styles.title}>Create Account</h1>
        <p style={styles.subtitle}>Join HR-Hub as an Interviewer</p>
        
        {error && <div style={styles.error}>{error}</div>}
        {success && <div style={styles.success}>{success}</div>}
        
        <form onSubmit={handleSubmit}>
          <input type="email" placeholder="Email *" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} style={styles.input} required />
          <input type="text" placeholder="First Name *" value={form.first_name} onChange={(e) => setForm({ ...form, first_name: e.target.value })} style={styles.input} required />
          <input type="text" placeholder="Last Name *" value={form.last_name} onChange={(e) => setForm({ ...form, last_name: e.target.value })} style={styles.input} required />
          <input type="tel" placeholder="Phone" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} style={styles.input} />
          <input type="text" placeholder="Department" value={form.department} onChange={(e) => setForm({ ...form, department: e.target.value })} style={styles.input} />
          <input type="password" placeholder="Password *" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} style={styles.input} required />
          <input type="password" placeholder="Confirm Password *" value={form.confirm_password} onChange={(e) => setForm({ ...form, confirm_password: e.target.value })} style={styles.input} required />
          <button type="submit" disabled={loading} style={styles.button}>
            {loading ? "Registering..." : "Register"}
          </button>
        </form>
        
        <p style={styles.footer}>
          Already have an account? <Link to="/login" style={styles.link}>Sign In</Link>
        </p>
      </div>
    </div>
  );
}

const styles = {
  container: { minHeight: "100vh", backgroundColor: "#0f172a", display: "flex", alignItems: "center", justifyContent: "center", padding: "1rem" },
  card: { backgroundColor: "#1e293b", padding: "2rem", borderRadius: "12px", width: "500px", maxWidth: "100%" },
  title: { fontSize: "2rem", color: "#f97316", marginBottom: "0.5rem", textAlign: "center" },
  subtitle: { color: "#94a3b8", marginBottom: "1.5rem", textAlign: "center" },
  error: { backgroundColor: "rgba(239,68,68,0.1)", border: "1px solid #ef4444", color: "#ef4444", padding: "0.75rem", borderRadius: "6px", marginBottom: "1rem" },
  success: { backgroundColor: "rgba(34,197,94,0.1)", border: "1px solid #22c55e", color: "#22c55e", padding: "0.75rem", borderRadius: "6px", marginBottom: "1rem" },
  input: { width: "100%", padding: "0.75rem", marginBottom: "1rem", backgroundColor: "#0f172a", border: "1px solid #334155", borderRadius: "6px", color: "white" },
  button: { width: "100%", padding: "0.75rem", backgroundColor: "#f97316", border: "none", borderRadius: "6px", color: "white", fontWeight: "bold", cursor: "pointer" },
  footer: { textAlign: "center", marginTop: "1rem", color: "#94a3b8" },
  link: { color: "#f97316", textDecoration: "none" },
};
