import { useEffect, useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import api from "../api/axios";
import { motion } from "framer-motion";
import { 
  FiUsers, FiCalendar, FiUserCheck, FiTrendingUp, 
  FiClock, FiCheckCircle, FiXCircle, FiActivity 
} from "react-icons/fi";
import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement, Title } from 'chart.js';
import { Pie, Bar } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement, Title);

export default function Dashboard() {
  const { user } = useAuth();
  const [stats, setStats] = useState({
    total_candidates: 0,
    total_interviews: 0,
    pending_candidates: 0,
    hired_candidates: 0,
    rejected_candidates: 0,
    upcoming_interviews: 0,
    completed_interviews: 0,
    recent_activity: []
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const [candidatesRes, interviewsRes] = await Promise.all([
        api.get("/recruitment/candidates/"),
        api.get("/recruitment/interviews/")
      ]);
      
      const candidates = candidatesRes.data;
      const interviews = interviewsRes.data;
      
      setStats({
        total_candidates: candidates.length,
        total_interviews: interviews.length,
        pending_candidates: candidates.filter(c => c.status === 'PENDING').length,
        hired_candidates: candidates.filter(c => c.status === 'HIRED').length,
        rejected_candidates: candidates.filter(c => c.status === 'REJECTED').length,
        upcoming_interviews: interviews.filter(i => i.status === 'SCHEDULED').length,
        completed_interviews: interviews.filter(i => i.status === 'COMPLETED').length,
        recent_activity: [...candidates.slice(0, 5), ...interviews.slice(0, 5)].sort((a, b) => 
          new Date(b.created_at) - new Date(a.created_at)
        ).slice(0, 5)
      });
    } catch (error) {
      console.error("Error fetching dashboard data:", error);
    } finally {
      setLoading(false);
    }
  };

  // Pie Chart Data
  const pieData = {
    labels: ['Pending', 'Hired', 'Rejected'],
    datasets: [{
      data: [stats.pending_candidates, stats.hired_candidates, stats.rejected_candidates],
      backgroundColor: ['#f97316', '#10b981', '#ef4444'],
      borderWidth: 0
    }]
  };

  // Bar Chart Data
  const barData = {
    labels: ['Upcoming', 'Completed'],
    datasets: [{
      label: 'Interviews',
      data: [stats.upcoming_interviews, stats.completed_interviews],
      backgroundColor: ['#3b82f6', '#10b981'],
      borderRadius: 8
    }]
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom',
        labels: { color: '#94a3b8' }
      }
    }
  };

  const statCards = [
    { icon: <FiUsers />, label: "Total Candidates", value: stats.total_candidates, color: "#f97316", bg: "rgba(249, 115, 22, 0.1)" },
    { icon: <FiCalendar />, label: "Total Interviews", value: stats.total_interviews, color: "#3b82f6", bg: "rgba(59, 130, 246, 0.1)" },
    { icon: <FiUserCheck />, label: "Hired", value: stats.hired_candidates, color: "#10b981", bg: "rgba(16, 185, 129, 0.1)" },
    { icon: <FiTrendingUp />, label: "Upcoming", value: stats.upcoming_interviews, color: "#8b5cf6", bg: "rgba(139, 92, 246, 0.1)" },
  ];

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h1 style={styles.title}>Welcome back, {user?.full_name?.split(" ")[0] || user?.email?.split("@")[0]}! 👋</h1>
        <p style={styles.subtitle}>Here's what's happening with your recruitment today</p>
      </div>

      {/* Stats Cards */}
      <div style={styles.statsGrid}>
        {statCards.map((stat, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            style={{ ...styles.statCard, backgroundColor: stat.bg, borderLeft: `4px solid ${stat.color}` }}
          >
            <div style={{ ...styles.statIcon, color: stat.color }}>{stat.icon}</div>
            <div>
              <div style={styles.statValue}>{stat.value}</div>
              <div style={styles.statLabel}>{stat.label}</div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Charts Section */}
      <div style={styles.chartsGrid}>
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
          style={styles.chartCard}
        >
          <h3 style={styles.chartTitle}>Candidate Status</h3>
          <div style={styles.pieChartContainer}>
            <Pie data={pieData} options={chartOptions} />
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
          style={styles.chartCard}
        >
          <h3 style={styles.chartTitle}>Interview Overview</h3>
          <div style={styles.barChartContainer}>
            <Bar data={barData} options={chartOptions} />
          </div>
        </motion.div>
      </div>

      {/* Recent Activity */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        style={styles.activityCard}
      >
        <div style={styles.activityHeader}>
          <FiActivity />
          <h3 style={styles.activityTitle}>Recent Activity</h3>
        </div>
        <div style={styles.activityList}>
          {stats.recent_activity.length > 0 ? (
            stats.recent_activity.map((item, index) => (
              <div key={index} style={styles.activityItem}>
                <span style={styles.activityDot}></span>
                <div>
                  <div style={styles.activityText}>
                    {item.first_name ? 
                      `New candidate: ${item.first_name} ${item.last_name} applied for ${item.position}` :
                      `Interview scheduled with ${item.candidate?.first_name || 'candidate'}`
                    }
                  </div>
                  <div style={styles.activityTime}>
                    {new Date(item.created_at).toLocaleDateString()}
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p style={styles.noActivity}>No recent activity</p>
          )}
        </div>
      </motion.div>
    </div>
  );
}

const styles = {
  container: { padding: "2rem" },
  header: { marginBottom: "2rem" },
  title: { fontSize: "1.75rem", fontWeight: "bold", marginBottom: "0.5rem" },
  subtitle: { color: "#94a3b8" },
  statsGrid: { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: "1.5rem", marginBottom: "2rem" },
  statCard: { padding: "1.5rem", borderRadius: "12px", display: "flex", alignItems: "center", gap: "1rem" },
  statIcon: { fontSize: "2rem" },
  statValue: { fontSize: "1.75rem", fontWeight: "bold" },
  statLabel: { color: "#94a3b8", fontSize: "0.875rem" },
  chartsGrid: { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(350px, 1fr))", gap: "1.5rem", marginBottom: "2rem" },
  chartCard: { backgroundColor: "#1e293b", padding: "1.5rem", borderRadius: "12px" },
  chartTitle: { marginBottom: "1rem", fontSize: "1rem", color: "#f97316" },
  pieChartContainer: { height: "250px", display: "flex", justifyContent: "center" },
  barChartContainer: { height: "250px" },
  activityCard: { backgroundColor: "#1e293b", padding: "1.5rem", borderRadius: "12px" },
  activityHeader: { display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "1rem" },
  activityTitle: { fontSize: "1rem", color: "#f97316" },
  activityList: { display: "flex", flexDirection: "column", gap: "1rem" },
  activityItem: { display: "flex", gap: "1rem", alignItems: "flex-start", padding: "0.75rem", backgroundColor: "#0f172a", borderRadius: "8px" },
  activityDot: { width: "8px", height: "8px", borderRadius: "50%", backgroundColor: "#f97316", marginTop: "6px" },
  activityText: { fontSize: "0.875rem", marginBottom: "0.25rem" },
  activityTime: { fontSize: "0.75rem", color: "#64748b" },
  noActivity: { color: "#94a3b8", textAlign: "center", padding: "2rem" }
};
