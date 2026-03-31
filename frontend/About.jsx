import { FaGithub, FaLinkedin, FaTwitter, FaEnvelope, FaPhone } from "react-icons/fa";

export default function About() {
  return (
    <div style={styles.container}>
      <div style={styles.hero}>
        <h1 style={styles.title}>About <span style={styles.gradient}>HR-Hub</span></h1>
        <p style={styles.subtitle}>Revolutionizing Recruitment Management</p>
      </div>

      <div style={styles.section}>
        <h2 style={styles.sectionTitle}>Our Mission</h2>
        <p style={styles.text}>
          HR-Hub is dedicated to transforming the way companies find and hire talent. 
          We believe in making recruitment efficient, transparent, and fair for everyone involved.
        </p>
      </div>

      <div style={styles.section}>
        <h2 style={styles.sectionTitle}>Meet the Creator</h2>
        <div style={styles.creatorCard}>
          <div style={styles.creatorAvatar}>👨‍💻</div>
          <h3 style={styles.creatorName}>Dieu Merci Niyonkuru</h3>
          <p style={styles.creatorTitle}>Full Stack Developer & HR Technology Specialist</p>
          <p style={styles.creatorBio}>
            Passionate about building innovative solutions that streamline business processes. 
            With expertise in Django, React, and modern web technologies, Dieu Merci created HR-Hub 
            to solve real-world recruitment challenges.
          </p>
          <div style={styles.creatorSocial}>
            <a href="https://github.com/dieumerci-niyonkuru" target="_blank" rel="noopener noreferrer" style={styles.socialIcon} title="GitHub">
              <FaGithub />
            </a>
            <a href="https://www.linkedin.com/in/dieu-merci-niyonkuru-7725b1363/" target="_blank" rel="noopener noreferrer" style={styles.socialIcon} title="LinkedIn">
              <FaLinkedin />
            </a>
            <a href="https://twitter.com/" target="_blank" rel="noopener noreferrer" style={styles.socialIcon} title="Twitter">
              <FaTwitter />
            </a>
            <a href="mailto:dieumercin21@gmail.com" style={styles.socialIcon} title="Email">
              <FaEnvelope />
            </a>
            <a href="tel:+250793516483" style={styles.socialIcon} title="Phone">
              <FaPhone />
            </a>
          </div>
        </div>
      </div>

      <div style={styles.section}>
        <h2 style={styles.sectionTitle}>What We Offer</h2>
        <div style={styles.grid}>
          <div style={styles.card}>
            <div style={styles.cardIcon}>🎯</div>
            <h3>Smart Candidate Matching</h3>
            <p>AI-powered algorithms match the right candidates with the right opportunities</p>
          </div>
          <div style={styles.card}>
            <div style={styles.cardIcon}>📅</div>
            <h3>Streamlined Interviews</h3>
            <p>Schedule, track, and manage interviews seamlessly</p>
          </div>
          <div style={styles.card}>
            <div style={styles.cardIcon}>📊</div>
            <h3>Real-time Analytics</h3>
            <p>Get insights into your recruitment process</p>
          </div>
          <div style={styles.card}>
            <div style={styles.cardIcon}>🔒</div>
            <h3>Secure & Reliable</h3>
            <p>Enterprise-grade security for your data</p>
          </div>
        </div>
      </div>

      <div style={styles.section}>
        <h2 style={styles.sectionTitle}>Why Choose Us?</h2>
        <div style={styles.statsGrid}>
          <div style={styles.statCard}>
            <div style={styles.statNumber}>1000+</div>
            <div style={styles.statLabel}>Candidates Placed</div>
          </div>
          <div style={styles.statCard}>
            <div style={styles.statNumber}>98%</div>
            <div style={styles.statLabel}>Satisfaction Rate</div>
          </div>
          <div style={styles.statCard}>
            <div style={styles.statNumber}>50+</div>
            <div style={styles.statLabel}>Expert Interviewers</div>
          </div>
          <div style={styles.statCard}>
            <div style={styles.statNumber}>24/7</div>
            <div style={styles.statLabel}>Support Available</div>
          </div>
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
  hero: {
    textAlign: "center",
    padding: "4rem 2rem",
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
  section: {
    marginBottom: "4rem",
  },
  sectionTitle: {
    fontSize: "2rem",
    color: "#f97316",
    marginBottom: "1.5rem",
    textAlign: "center",
  },
  text: {
    fontSize: "1.1rem",
    lineHeight: "1.6",
    color: "#cbd5e1",
    textAlign: "center",
    maxWidth: "800px",
    margin: "0 auto",
  },
  creatorCard: {
    backgroundColor: "#1e293b",
    padding: "2rem",
    borderRadius: "12px",
    textAlign: "center",
    maxWidth: "500px",
    margin: "0 auto",
  },
  creatorAvatar: {
    fontSize: "4rem",
    marginBottom: "1rem",
  },
  creatorName: {
    fontSize: "1.5rem",
    color: "#f97316",
    marginBottom: "0.5rem",
  },
  creatorTitle: {
    color: "#94a3b8",
    marginBottom: "1rem",
  },
  creatorBio: {
    color: "#cbd5e1",
    lineHeight: "1.6",
    marginBottom: "1.5rem",
  },
  creatorSocial: {
    display: "flex",
    gap: "1rem",
    justifyContent: "center",
  },
  socialIcon: {
    color: "#94a3b8",
    fontSize: "1.5rem",
    transition: "all 0.2s",
    padding: "0.5rem",
    borderRadius: "8px",
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
    gap: "2rem",
    marginTop: "2rem",
  },
  card: {
    backgroundColor: "#1e293b",
    padding: "2rem",
    borderRadius: "12px",
    textAlign: "center",
    transition: "transform 0.3s",
  },
  cardIcon: {
    fontSize: "3rem",
    marginBottom: "1rem",
  },
  statsGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
    gap: "2rem",
    marginTop: "2rem",
  },
  statCard: {
    textAlign: "center",
    padding: "2rem",
    backgroundColor: "#1e293b",
    borderRadius: "12px",
  },
  statNumber: {
    fontSize: "2.5rem",
    fontWeight: "bold",
    color: "#f97316",
    marginBottom: "0.5rem",
  },
  statLabel: {
    color: "#94a3b8",
  },
};
