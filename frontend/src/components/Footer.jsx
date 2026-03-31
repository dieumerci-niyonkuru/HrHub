export default function Footer() {
  return (
    <footer style={styles.footer}>
      <div style={styles.container}>
        <div style={styles.section}>
          <h3 style={styles.title}>HR-Hub</h3>
          <p style={styles.description}>Professional Recruitment Management System</p>
        </div>
        
        <div style={styles.section}>
          <h3 style={styles.title}>Quick Links</h3>
          <ul style={styles.links}>
            <li><a href="/" style={styles.link}>Home</a></li>
            <li><a href="/about" style={styles.link}>About</a></li>
            <li><a href="/contact" style={styles.link}>Contact</a></li>
          </ul>
        </div>
        
        <div style={styles.section}>
          <h3 style={styles.title}>Connect</h3>
          <div style={styles.social}>
            <a href="https://github.com" target="_blank" style={styles.socialLink}>🐙 GitHub</a>
            <a href="https://linkedin.com" target="_blank" style={styles.socialLink}>💼 LinkedIn</a>
            <a href="https://twitter.com" target="_blank" style={styles.socialLink}>🐦 X</a>
          </div>
        </div>
      </div>
      
      <div style={styles.bottom}>
        <p>&copy; 2024 HR-Hub. All rights reserved.</p>
      </div>
    </footer>
  );
}

const styles = {
  footer: {
    backgroundColor: "#0f172a",
    borderTop: "1px solid #334155",
    marginTop: "auto",
  },
  container: {
    maxWidth: "1200px",
    margin: "0 auto",
    padding: "3rem 2rem",
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
    gap: "2rem",
  },
  section: {
    display: "flex",
    flexDirection: "column",
    gap: "1rem",
  },
  title: {
    color: "#f97316",
    fontSize: "1.2rem",
  },
  description: {
    color: "#94a3b8",
  },
  links: {
    listStyle: "none",
    padding: 0,
  },
  link: {
    color: "#cbd5e1",
    textDecoration: "none",
    display: "block",
    padding: "0.5rem 0",
  },
  social: {
    display: "flex",
    flexDirection: "column",
    gap: "0.5rem",
  },
  socialLink: {
    color: "#cbd5e1",
    textDecoration: "none",
  },
  bottom: {
    borderTop: "1px solid #334155",
    padding: "1.5rem",
    textAlign: "center",
    color: "#64748b",
  },
};
