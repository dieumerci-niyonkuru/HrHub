import { useEffect, useState } from "react";
import api from "../api/axios";
import { useAuth } from "../contexts/AuthContext";

export default function Dashboard() {
  const { user } = useAuth();
  const [stats, setStats] = useState({ candidates: 0, interviews: 0 });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [candidatesRes, interviewsRes] = await Promise.all([
          api.get("/recruitment/candidates/"),
          api.get("/recruitment/interviews/"),
        ]);
        setStats({
          candidates: candidatesRes.data.length,
          interviews: interviewsRes.data.length,
        });
      } catch (err) {
        console.error("Error fetching stats:", err);
      }
    };
    fetchStats();
  }, []);

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Welcome, {user?.full_name || user?.email}!</h1>
      <p style={styles.subtitle}>Here's your recruitment dashboard overview</p>
      
      <div style={styles.grid}>
        <div style={styles.card}>
          <div style={styles.cardNumber}>{stats.candidates}</div>
          <div style={styles.cardLabel}>Total Candidates</div>
        </div>
        <div style={styles.card}>
          <div style={styles.cardNumber}>{stats.interviews}</div>
          <div style={styles.cardLabel}>Total Interviews</div>
        </div>
      </div>
    </div>
  );
}

const styles = {
  container: { padding: "2rem" },
  title: { fontSize: "2rem", marginBottom: "0.5rem" },
  subtitle: { color: "#94a3b8", marginBottom: "2rem" },
  grid: { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", gap: "1.5rem" },
  card: { backgroundColor: "#1e293b", padding: "1.5rem", borderRadius: "12px" },
  cardNumber: { fontSize: "2rem", fontWeight: "bold", color: "#f97316" },
  cardLabel: { color: "#94a3b8", marginTop: "0.5rem" },
};
