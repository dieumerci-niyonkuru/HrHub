import { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { FiMenu, FiX, FiHome, FiInfo, FiMail, FiLogOut, FiUsers, FiCalendar, FiUser, FiGrid, FiChevronDown } from "react-icons/fi";

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setMobileMenuOpen(false);
    setDropdownOpen(false);
  }, [location]);

  useEffect(() => {
    const close = (e) => { if (!e.target.closest(".user-dropdown")) setDropdownOpen(false); };
    document.addEventListener("click", close);
    return () => document.removeEventListener("click", close);
  }, []);

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  const isActive = (path) => location.pathname === path;

  const publicLinks = [
    { to: "/", label: "Home", icon: <FiHome /> },
    { to: "/about", label: "About", icon: <FiInfo /> },
    { to: "/contact", label: "Contact", icon: <FiMail /> },
  ];

  const hrLinks = [
    { to: "/dashboard", label: "Dashboard", icon: <FiGrid /> },
    { to: "/candidates", label: "Candidates", icon: <FiUsers /> },
    { to: "/interviews", label: "Interviews", icon: <FiCalendar /> },
    { to: "/interviewers", label: "Interviewers", icon: <FiUser /> },
  ];

  const interviewerLinks = [
    { to: "/dashboard", label: "Dashboard", icon: <FiGrid /> },
    { to: "/my-interviews", label: "My Interviews", icon: <FiCalendar /> },
  ];

  const navLinks = user
    ? (user.role === "INTERVIEWER" ? interviewerLinks : hrLinks)
    : publicLinks;

  return (
    <nav style={{ ...S.navbar, backgroundColor: scrolled ? "rgba(15,23,42,0.98)" : "#1e293b" }}>
      <div style={S.container}>
        <Link to="/" style={S.logo}>
          <span style={S.logoIcon}>HR</span>
          <span style={S.logoText}>Hub</span>
        </Link>

        <div style={S.desktopNav}>
          {navLinks.map(link => (
            <Link key={link.to} to={link.to}
              style={{ ...S.navLink, ...(isActive(link.to) ? S.navLinkActive : {}) }}>
              {link.icon}<span>{link.label}</span>
            </Link>
          ))}
        </div>

        <div style={S.userSection}>
          {user ? (
            <div className="user-dropdown" style={{ position: "relative" }}>
              <button onClick={() => setDropdownOpen(!dropdownOpen)} style={S.userBtn}>
                <span style={S.avatar}>{(user.full_name?.[0] || "U").toUpperCase()}</span>
                <div style={S.userInfo}>
                  <span style={S.userName}>{user.full_name?.split(" ")[0] || "User"}</span>
                  <span style={S.userRole}>{user.role?.replace(/_/g, " ")}</span>
                </div>
                <FiChevronDown style={{ color: "#94a3b8", fontSize: "0.8rem", transform: dropdownOpen ? "rotate(180deg)" : "none", transition: "0.2s" }} />
              </button>
              {dropdownOpen && (
                <div style={S.dropdown}>
                  <div style={{ padding: "0.75rem", borderBottom: "1px solid #334155" }}>
                    <div style={{ color: "#f1f5f9", fontWeight: "bold", fontSize: "0.95rem" }}>{user.full_name}</div>
                    <div style={{ color: "#94a3b8", fontSize: "0.8rem" }}>{user.email}</div>
                    <span style={S.roleBadge}>{user.role?.replace(/_/g, " ")}</span>
                  </div>
                  <button onClick={handleLogout} style={S.dropdownLogout}>
                    <FiLogOut /> Sign Out
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div style={S.authBtns}>
              <Link to="/login" style={S.loginBtn}>Login</Link>
              <Link to="/register" style={S.registerBtn}>Join Us</Link>
            </div>
          )}
        </div>

        <button style={S.menuBtn} onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
          {mobileMenuOpen ? <FiX size={22} /> : <FiMenu size={22} />}
        </button>
      </div>

      {mobileMenuOpen && (
        <div style={S.mobileMenu}>
          {navLinks.map(link => (
            <Link key={link.to} to={link.to}
              style={{ ...S.mobileLink, ...(isActive(link.to) ? S.mobileLinkActive : {}) }}>
              {link.icon}<span>{link.label}</span>
            </Link>
          ))}
          {user && (
            <>
              <hr style={{ borderColor: "#334155", margin: "0.5rem 0" }} />
              <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", padding: "0.75rem" }}>
                <span style={S.avatar}>{(user.full_name?.[0] || "U").toUpperCase()}</span>
                <div>
                  <div style={{ color: "#f1f5f9", fontWeight: "bold" }}>{user.full_name}</div>
                  <div style={{ color: "#94a3b8", fontSize: "0.8rem" }}>{user.email}</div>
                </div>
              </div>
              <button onClick={handleLogout} style={S.mobileLogout}>
                <FiLogOut /> Sign Out
              </button>
            </>
          )}
        </div>
      )}
    </nav>
  );
}

const S = {
  navbar: { position: "sticky", top: 0, zIndex: 1000, borderBottom: "1px solid rgba(249,115,22,0.3)", transition: "all 0.3s", backdropFilter: "blur(10px)" },
  container: { maxWidth: "1280px", margin: "0 auto", padding: "0.75rem 1.5rem", display: "flex", justifyContent: "space-between", alignItems: "center", gap: "1rem" },
  logo: { textDecoration: "none", display: "flex", alignItems: "center", gap: "0.25rem", flexShrink: 0 },
  logoIcon: { backgroundColor: "#f97316", color: "white", padding: "0.3rem 0.6rem", borderRadius: "6px", fontWeight: "900", fontSize: "1rem" },
  logoText: { fontSize: "1.4rem", fontWeight: "bold", color: "#f1f5f9" },
  desktopNav: { display: "flex", gap: "0.25rem", alignItems: "center", flexWrap: "wrap" },
  navLink: { color: "#94a3b8", textDecoration: "none", display: "flex", alignItems: "center", gap: "0.4rem", fontSize: "0.875rem", padding: "0.5rem 0.75rem", borderRadius: "8px", transition: "all 0.2s", whiteSpace: "nowrap" },
  navLinkActive: { color: "#f97316", backgroundColor: "rgba(249,115,22,0.1)", fontWeight: "600" },
  userSection: { display: "flex", alignItems: "center", gap: "1rem", flexShrink: 0 },
  userBtn: { display: "flex", alignItems: "center", gap: "0.5rem", backgroundColor: "#0f172a", border: "1px solid #334155", padding: "0.4rem 0.75rem", borderRadius: "10px", cursor: "pointer", color: "white", transition: "all 0.2s" },
  avatar: { width: "32px", height: "32px", backgroundColor: "#f97316", borderRadius: "8px", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: "bold", fontSize: "0.9rem", flexShrink: 0 },
  userInfo: { display: "flex", flexDirection: "column", alignItems: "flex-start" },
  userName: { color: "#f1f5f9", fontSize: "0.85rem", fontWeight: "600", lineHeight: 1.2 },
  userRole: { color: "#f97316", fontSize: "0.7rem", lineHeight: 1.2 },
  dropdown: { position: "absolute", right: 0, top: "calc(100% + 8px)", backgroundColor: "#1e293b", border: "1px solid #334155", borderRadius: "12px", minWidth: "220px", boxShadow: "0 20px 40px rgba(0,0,0,0.4)", zIndex: 1001, overflow: "hidden" },
  roleBadge: { display: "inline-block", marginTop: "0.25rem", backgroundColor: "rgba(249,115,22,0.15)", color: "#f97316", fontSize: "0.7rem", padding: "0.15rem 0.5rem", borderRadius: "20px" },
  dropdownLogout: { width: "100%", backgroundColor: "transparent", border: "none", color: "#ef4444", padding: "0.75rem 1rem", cursor: "pointer", display: "flex", alignItems: "center", gap: "0.5rem", fontSize: "0.875rem", transition: "0.2s" },
  authBtns: { display: "flex", gap: "0.75rem" },
  loginBtn: { backgroundColor: "transparent", color: "#cbd5e1", padding: "0.5rem 1rem", borderRadius: "8px", textDecoration: "none", border: "1px solid #334155", fontSize: "0.875rem" },
  registerBtn: { backgroundColor: "#f97316", color: "white", padding: "0.5rem 1.25rem", borderRadius: "8px", textDecoration: "none", fontWeight: "bold", fontSize: "0.875rem" },
  menuBtn: { display: "none", background: "transparent", border: "none", color: "#cbd5e1", cursor: "pointer", padding: "0.5rem" },
  mobileMenu: { backgroundColor: "#1e293b", borderTop: "1px solid #334155", padding: "1rem", display: "flex", flexDirection: "column", gap: "0.25rem" },
  mobileLink: { color: "#94a3b8", textDecoration: "none", padding: "0.75rem 1rem", display: "flex", alignItems: "center", gap: "0.75rem", borderRadius: "8px", fontSize: "0.9rem" },
  mobileLinkActive: { color: "#f97316", backgroundColor: "rgba(249,115,22,0.1)" },
  mobileLogout: { backgroundColor: "rgba(239,68,68,0.1)", color: "#ef4444", border: "none", padding: "0.75rem 1rem", borderRadius: "8px", cursor: "pointer", display: "flex", alignItems: "center", gap: "0.75rem", width: "100%", fontSize: "0.9rem" },
};
