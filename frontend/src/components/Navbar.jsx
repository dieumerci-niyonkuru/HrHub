import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import Logo from "./Logo";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
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

  const navItems = [
    { to: "/", label: "Home", icon: "🏠" },
    { to: "/about", label: "About", icon: "ℹ️" },
    { to: "/contact", label: "Contact", icon: "📧" },
  ];

  const authItems = user ? [
    { to: "/dashboard", label: "Dashboard", icon: "📊" },
    { to: "/candidates", label: "Candidates", icon: "👥" },
    { to: "/interviews", label: "Interviews", icon: "📅" },
    { to: "/interviewers", label: "Interviewers", icon: "🎯" },
    { to: "/my-interviews", label: "My Interviews", icon: "📋" },
  ] : [];

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      style={{
        ...styles.navbar,
        backgroundColor: scrolled ? "rgba(15, 23, 42, 0.95)" : "rgba(30, 41, 59, 0.95)",
        backdropFilter: scrolled ? "blur(10px)" : "blur(5px)",
        boxShadow: scrolled ? "0 4px 20px rgba(0,0,0,0.2)" : "none",
        borderBottom: scrolled ? "1px solid rgba(249, 115, 22, 0.5)" : "1px solid rgba(249, 115, 22, 0.3)",
      }}
    >
      <div style={styles.container}>
        <Link to="/" style={styles.logoLink}>
          <Logo size="small" />
          <span style={styles.logoText}>HR-Hub</span>
        </Link>
        
        <div style={styles.navLinks}>
          {navItems.map(item => (
            <motion.div
              key={item.to}
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link to={item.to} style={styles.navLink}>
                <span style={styles.navIcon}>{item.icon}</span>
                {item.label}
              </Link>
            </motion.div>
          ))}
          
          {user && authItems.map(item => (
            <motion.div
              key={item.to}
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link to={item.to} style={styles.navLink}>
                <span style={styles.navIcon}>{item.icon}</span>
                {item.label}
              </Link>
            </motion.div>
          ))}
        </div>
        
        <div style={styles.userSection}>
          {user ? (
            <>
              <motion.div
                whileHover={{ scale: 1.05 }}
                style={styles.userInfo}
              >
                <span style={styles.userAvatar}>{user.full_name?.[0] || user.email[0]}</span>
                <span style={styles.userName}>{user.full_name?.split(" ")[0] || user.email.split("@")[0]}</span>
              </motion.div>
              <motion.button
                whileHover={{ scale: 1.05, backgroundColor: "#dc2626" }}
                whileTap={{ scale: 0.95 }}
                onClick={handleLogout}
                style={styles.logoutBtn}
              >
                Logout
              </motion.button>
            </>
          ) : (
            <div style={styles.authBtns}>
              <Link to="/login" style={styles.loginBtn}>Login</Link>
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link to="/register" style={styles.joinBtn}>
                  ✨ Join Us
                </Link>
              </motion.div>
            </div>
          )}
        </div>
      </div>
    </motion.nav>
  );
}

const styles = {
  navbar: {
    position: "sticky",
    top: 0,
    zIndex: 1000,
    transition: "all 0.3s ease",
  },
  container: {
    maxWidth: "1200px",
    margin: "0 auto",
    padding: "0.8rem 2rem",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    flexWrap: "wrap",
    gap: "1rem",
  },
  logoLink: {
    display: "flex",
    alignItems: "center",
    gap: "0.75rem",
    textDecoration: "none",
  },
  logoText: {
    fontSize: "1.5rem",
    fontWeight: "bold",
    background: "linear-gradient(135deg, #f97316, #fb923c)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
  },
  navLinks: {
    display: "flex",
    gap: "1.5rem",
    alignItems: "center",
    flexWrap: "wrap",
  },
  navLink: {
    color: "#cbd5e1",
    textDecoration: "none",
    display: "flex",
    alignItems: "center",
    gap: "0.5rem",
    transition: "color 0.3s",
    fontSize: "0.95rem",
    fontWeight: "500",
  },
  navIcon: {
    fontSize: "1.1rem",
  },
  userSection: {
    display: "flex",
    alignItems: "center",
    gap: "1rem",
  },
  userInfo: {
    display: "flex",
    alignItems: "center",
    gap: "0.5rem",
    backgroundColor: "#334155",
    padding: "0.5rem 1rem",
    borderRadius: "8px",
    cursor: "pointer",
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
    fontSize: "0.9rem",
    transition: "background 0.2s",
  },
  authBtns: {
    display: "flex",
    gap: "1rem",
    alignItems: "center",
  },
  loginBtn: {
    backgroundColor: "transparent",
    color: "#cbd5e1",
    padding: "0.5rem 1rem",
    borderRadius: "8px",
    textDecoration: "none",
    border: "1px solid #334155",
    fontSize: "0.9rem",
    transition: "all 0.2s",
  },
  joinBtn: {
    backgroundColor: "#f97316",
    color: "white",
    padding: "0.5rem 1.5rem",
    borderRadius: "8px",
    textDecoration: "none",
    fontWeight: "bold",
    fontSize: "0.9rem",
    display: "flex",
    alignItems: "center",
    gap: "0.5rem",
    transition: "all 0.2s",
  },
};
