import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { useTheme } from "../contexts/ThemeContext";
import { FiMenu, FiX, FiHome, FiInfo, FiMail, FiLogOut, FiSun, FiMoon } from "react-icons/fi";

export default function Navbar() {
  const { user, logout } = useAuth();
  const { darkMode, toggleTheme } = useTheme();
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  const navLinks = [
    { to: "/", label: "Home", icon: <FiHome /> },
    { to: "/about", label: "About", icon: <FiInfo /> },
    { to: "/contact", label: "Contact", icon: <FiMail /> },
  ];

  return (
    <nav style={{ ...styles.navbar, backgroundColor: scrolled ? "#0f172a" : "#1e293b" }}>
      <div style={styles.container}>
        <Link to="/" style={styles.logo}>
          <span style={styles.logoText}>HR-Hub</span>
        </Link>

        <div style={styles.desktopNav}>
          {navLinks.map(link => (
            <Link key={link.to} to={link.to} style={styles.navLink}>
              {link.icon}
              <span>{link.label}</span>
            </Link>
          ))}
        </div>

        <div style={styles.userSection}>
          <button onClick={toggleTheme} style={styles.themeBtn}>
            {darkMode ? <FiSun /> : <FiMoon />}
          </button>
          
          {user ? (
            <>
              <div style={styles.userInfo}>
                <span style={styles.userAvatar}>{user.full_name?.[0] || user.email[0]}</span>
                <span style={styles.userName}>{user.full_name?.split(" ")[0] || user.email.split("@")[0]}</span>
              </div>
              <button onClick={handleLogout} style={styles.logoutBtn}>
                <FiLogOut /> Logout
              </button>
            </>
          ) : (
            <div style={styles.authBtns}>
              <Link to="/login" style={styles.loginBtn}>Login</Link>
              <Link to="/register" style={styles.registerBtn}>Join Us</Link>
            </div>
          )}
        </div>

        <button style={styles.menuBtn} onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
          {mobileMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
        </button>
      </div>

      {mobileMenuOpen && (
        <div style={styles.mobileMenu}>
          {navLinks.map(link => (
            <Link
              key={link.to}
              to={link.to}
              style={styles.mobileLink}
              onClick={() => setMobileMenuOpen(false)}
            >
              {link.icon}
              <span>{link.label}</span>
            </Link>
          ))}
        </div>
      )}
    </nav>
  );
}

const styles = {
  navbar: {
    position: "sticky",
    top: 0,
    zIndex: 1000,
    borderBottom: "1px solid #f97316",
    transition: "all 0.3s ease",
  },
  container: {
    maxWidth: "1200px",
    margin: "0 auto",
    padding: "1rem 2rem",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    flexWrap: "wrap",
  },
  logo: {
    textDecoration: "none",
  },
  logoText: {
    fontSize: "1.5rem",
    fontWeight: "bold",
    color: "#f97316",
  },
  desktopNav: {
    display: "flex",
    gap: "2rem",
    alignItems: "center",
  },
  navLink: {
    color: "#cbd5e1",
    textDecoration: "none",
    display: "flex",
    alignItems: "center",
    gap: "0.5rem",
    fontSize: "0.95rem",
  },
  userSection: {
    display: "flex",
    alignItems: "center",
    gap: "1rem",
  },
  themeBtn: {
    background: "transparent",
    border: "none",
    color: "#cbd5e1",
    cursor: "pointer",
    fontSize: "1.2rem",
    padding: "0.5rem",
    display: "flex",
    alignItems: "center",
  },
  userInfo: {
    display: "flex",
    alignItems: "center",
    gap: "0.5rem",
    backgroundColor: "#334155",
    padding: "0.5rem 1rem",
    borderRadius: "8px",
  },
  userAvatar: {
    width: "32px",
    height: "32px",
    backgroundColor: "#f97316",
    borderRadius: "50%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontWeight: "bold",
  },
  userName: {
    color: "#f1f5f9",
    fontSize: "0.9rem",
  },
  logoutBtn: {
    backgroundColor: "#ef4444",
    color: "white",
    border: "none",
    padding: "0.5rem 1rem",
    borderRadius: "8px",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    gap: "0.5rem",
  },
  authBtns: {
    display: "flex",
    gap: "1rem",
  },
  loginBtn: {
    backgroundColor: "transparent",
    color: "#cbd5e1",
    padding: "0.5rem 1rem",
    borderRadius: "8px",
    textDecoration: "none",
    border: "1px solid #334155",
  },
  registerBtn: {
    backgroundColor: "#f97316",
    color: "white",
    padding: "0.5rem 1.5rem",
    borderRadius: "8px",
    textDecoration: "none",
    fontWeight: "bold",
  },
  menuBtn: {
    display: "none",
    background: "transparent",
    border: "none",
    color: "#cbd5e1",
    cursor: "pointer",
  },
  mobileMenu: {
    position: "absolute",
    top: "70px",
    left: 0,
    right: 0,
    backgroundColor: "#1e293b",
    borderBottom: "1px solid #334155",
    padding: "1rem",
    display: "flex",
    flexDirection: "column",
    gap: "0.5rem",
    zIndex: 999,
  },
  mobileLink: {
    color: "#cbd5e1",
    textDecoration: "none",
    padding: "0.75rem 1rem",
    display: "flex",
    alignItems: "center",
    gap: "0.75rem",
    borderRadius: "8px",
  },
};

// Make responsive
if (typeof window !== "undefined" && window.innerWidth <= 768) {
  styles.desktopNav.display = "none";
  styles.menuBtn.display = "block";
}
