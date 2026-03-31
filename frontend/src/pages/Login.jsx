import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      await login(form.email, form.password);
      navigate("/dashboard");
    } catch (err) {
      setError(err.response?.data?.detail || "Invalid credentials");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h1 style={styles.title}>HR-Hub</h1>
        <p style={styles.subtitle}>Sign in to your account</p>
        
        {error && <div style={styles.error}>{error}</div>}
        
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            style={styles.input}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
            style={styles.input}
            required
          />
          <button type="submit" disabled={loading} style={styles.button}>
            {loading ? "Signing in..." : "Sign In"}
          </button>
        </form>
        
        <p style={styles.footer}>
          Don't have an account? <Link to="/register" style={styles.link}>Register</Link>
        </p>
      </div>
    </div>
  );
}

const styles = {
  container: { minHeight: "100vh", backgroundColor: "#0f172a", display: "flex", alignItems: "center", justifyContent: "center" },
  card: { backgroundColor: "#1e293b", padding: "2rem", borderRadius: "12px", width: "400px" },
  title: { fontSize: "2rem", color: "#f97316", marginBottom: "0.5rem", textAlign: "center" },
  subtitle: { color: "#94a3b8", marginBottom: "1.5rem", textAlign: "center" },
  error: { backgroundColor: "rgba(239,68,68,0.1)", border: "1px solid #ef4444", color: "#ef4444", padding: "0.75rem", borderRadius: "6px", marginBottom: "1rem" },
  input: { width: "100%", padding: "0.75rem", marginBottom: "1rem", backgroundColor: "#0f172a", border: "1px solid #334155", borderRadius: "6px", color: "white" },
  button: { width: "100%", padding: "0.75rem", backgroundColor: "#f97316", border: "none", borderRadius: "6px", color: "white", fontWeight: "bold", cursor: "pointer" },
  footer: { textAlign: "center", marginTop: "1rem", color: "#94a3b8" },
  link: { color: "#f97316", textDecoration: "none" },
};
