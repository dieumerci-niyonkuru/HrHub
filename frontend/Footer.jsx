import { FaGithub, FaLinkedin, FaTwitter, FaHeart } from "react-icons/fa";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer style={styles.footer}>
      <div style={styles.container}>
        <div style={styles.section}>
          <h3 style={styles.title}>HR-Hub</h3>
          <p style={styles.description}>
            Professional Recruitment Management System designed to streamline hiring processes.
          </p>
          <p style={styles.credit}>
            Created with <FaHeart style={styles.heartIcon} /> by <strong>Dieu Merci</strong>
          </p>
        </div>
        
        <div style={styles.section}>
          <h3 style={styles.title}>Quick Links</h3>
          <ul style={styles.links}>
            <li><a href="/" style={styles.link}>Home</a></li>
            <li><a href="/about" style={styles.link}>About Us</a></li>
            <li><a href="/contact" style={styles.link}>Contact</a></li>
            <li><a href="/dashboard" style={styles.link}>Dashboard</a></li>
          </ul>
        </div>
        
        <div style={styles.section}>
          <h3 style={styles.title}>Connect With Me</h3>
          <div style={styles.social}>
            <a 
              href="https://github.com/dieumerci-niyonkuru" 
              target="_blank" 
              rel="noopener noreferrer"
              style={styles.socialLink}
              title="GitHub"
            >
              <FaGithub style={styles.socialIcon} />
              <span>GitHub</span>
            </a>
            <a 
              href="https://www.linkedin.com/in/dieu-merci-niyonkuru-7725b1363/" 
              target="_blank" 
              rel="noopener noreferrer"
              style={styles.socialLink}
              title="LinkedIn"
            >
              <FaLinkedin style={styles.socialIcon} />
              <span>LinkedIn</span>
            </a>
            <a 
              href="https://twitter.com/" 
              target="_blank" 
              rel="noopener noreferrer"
              style={styles.socialLink}
              title="X (Twitter)"
            >
              <FaTwitter style={styles.socialIcon} />
              <span>X (Twitter)</span>
            </a>
          </div>
        </div>
      </div>
      
      <div style={styles.bottom}>
        <p>&copy; {currentYear} HR-Hub. All rights reserved.</p>
        <p style={styles.creator}>Designed & Developed by <strong style={styles.creatorName}>Dieu Merci Niyonkuru</strong></p>
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
    gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
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
    marginBottom: "0.5rem",
  },
  description: {
    color: "#94a3b8",
    lineHeight: "1.6",
  },
  credit: {
    color: "#94a3b8",
    fontSize: "0.9rem",
    marginTop: "0.5rem",
    display: "flex",
    alignItems: "center",
    gap: "0.25rem",
  },
  heartIcon: {
    color: "#ef4444",
    fontSize: "0.8rem",
  },
  links: {
    listStyle: "none",
    padding: 0,
    margin: 0,
  },
  link: {
    color: "#cbd5e1",
    textDecoration: "none",
    display: "block",
    padding: "0.5rem 0",
    transition: "color 0.2s",
  },
  social: {
    display: "flex",
    flexDirection: "column",
    gap: "0.75rem",
  },
  socialLink: {
    color: "#cbd5e1",
    textDecoration: "none",
    display: "flex",
    alignItems: "center",
    gap: "0.75rem",
    padding: "0.5rem 0",
    transition: "all 0.2s",
    borderRadius: "6px",
  },
  socialIcon: {
    fontSize: "1.2rem",
    transition: "transform 0.2s",
  },
  bottom: {
    borderTop: "1px solid #334155",
    padding: "1.5rem",
    textAlign: "center",
    color: "#64748b",
    fontSize: "0.875rem",
  },
  creator: {
    marginTop: "0.5rem",
  },
  creatorName: {
    color: "#f97316",
    fontWeight: "bold",
  },
};

// Add hover effects via CSS (will be applied globally)
const styleSheet = document.createElement("style");
styleSheet.textContent = `
  .social-link:hover {
    color: #b1500b !important;
    transform: translateX(5px);
  }
  .social-link:hover svg {
    transform: scale(1.1);
  }
`;
document.head.appendChild(styleSheet);
EOFcat > Footer.jsx << 'EOF'
import { FaGithub, FaLinkedin, FaTwitter, FaHeart } from "react-icons/fa";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer style={styles.footer}>
      <div style={styles.container}>
        <div style={styles.section}>
          <h3 style={styles.title}>HR-Hub</h3>
          <p style={styles.description}>
            Professional Recruitment Management System designed to streamline hiring processes.
          </p>
          <p style={styles.credit}>
            Created with <FaHeart style={styles.heartIcon} /> by <strong>Dieu Merci</strong>
          </p>
        </div>
        
        <div style={styles.section}>
          <h3 style={styles.title}>Quick Links</h3>
          <ul style={styles.links}>
            <li><a href="/" style={styles.link}>Home</a></li>
            <li><a href="/about" style={styles.link}>About Us</a></li>
            <li><a href="/contact" style={styles.link}>Contact</a></li>
            <li><a href="/dashboard" style={styles.link}>Dashboard</a></li>
          </ul>
        </div>
        
        <div style={styles.section}>
          <h3 style={styles.title}>Connect With Me</h3>
          <div style={styles.social}>
            <a 
              href="https://github.com/dieumerci-niyonkuru" 
              target="_blank" 
              rel="noopener noreferrer"
              style={styles.socialLink}
              title="GitHub"
            >
              <FaGithub style={styles.socialIcon} />
              <span>GitHub</span>
            </a>
            <a 
              href="https://www.linkedin.com/in/dieu-merci-niyonkuru-7725b1363/" 
              target="_blank" 
              rel="noopener noreferrer"
              style={styles.socialLink}
              title="LinkedIn"
            >
              <FaLinkedin style={styles.socialIcon} />
              <span>LinkedIn</span>
            </a>
            <a 
              href="https://twitter.com/" 
              target="_blank" 
              rel="noopener noreferrer"
              style={styles.socialLink}
              title="X (Twitter)"
            >
              <FaTwitter style={styles.socialIcon} />
              <span>X (Twitter)</span>
            </a>
          </div>
        </div>
      </div>
      
      <div style={styles.bottom}>
        <p>&copy; {currentYear} HR-Hub. All rights reserved.</p>
        <p style={styles.creator}>Designed & Developed by <strong style={styles.creatorName}>Dieu Merci Niyonkuru</strong></p>
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
    gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
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
    marginBottom: "0.5rem",
  },
  description: {
    color: "#94a3b8",
    lineHeight: "1.6",
  },
  credit: {
    color: "#94a3b8",
    fontSize: "0.9rem",
    marginTop: "0.5rem",
    display: "flex",
    alignItems: "center",
    gap: "0.25rem",
  },
  heartIcon: {
    color: "#ef4444",
    fontSize: "0.8rem",
  },
  links: {
    listStyle: "none",
    padding: 0,
    margin: 0,
  },
  link: {
    color: "#cbd5e1",
    textDecoration: "none",
    display: "block",
    padding: "0.5rem 0",
    transition: "color 0.2s",
  },
  social: {
    display: "flex",
    flexDirection: "column",
    gap: "0.75rem",
  },
  socialLink: {
    color: "#cbd5e1",
    textDecoration: "none",
    display: "flex",
    alignItems: "center",
    gap: "0.75rem",
    padding: "0.5rem 0",
    transition: "all 0.2s",
    borderRadius: "6px",
  },
  socialIcon: {
    fontSize: "1.2rem",
    transition: "transform 0.2s",
  },
  bottom: {
    borderTop: "1px solid #334155",
    padding: "1.5rem",
    textAlign: "center",
    color: "#64748b",
    fontSize: "0.875rem",
  },
  creator: {
    marginTop: "0.5rem",
  },
  creatorName: {
    color: "#f97316",
    fontWeight: "bold",
  },
};

// Add hover effects via CSS (will be applied globally)
const styleSheet = document.createElement("style");
styleSheet.textContent = `
  .social-link:hover {
    color: #f97316 !important;
    transform: translateX(5px);
  }
  .social-link:hover svg {
    transform: scale(1.1);
  }
`;
document.head.appendChild(styleSheet);
