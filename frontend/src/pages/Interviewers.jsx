import { useEffect, useState } from "react";
import api from "../api/axios";
import { useToast } from "../contexts/ToastContext";
import { useAuth } from "../contexts/AuthContext";
import { FiPlus, FiX, FiSearch, FiEdit2, FiTrash2, FiUser } from "react-icons/fi";

export default function Interviewers() {
  const { user } = useAuth();
  const { showSuccess, showError } = useToast();
  const [interviewers, setInterviewers] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [search, setSearch] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState(null);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState({ first_name: "", last_name: "", email: "", password: "", phone: "", department: "" });

  useEffect(() => { fetchInterviewers(); }, []);
  useEffect(() => {
    let f = [...interviewers];
    if (search) f = f.filter(i => `${i.first_name} ${i.last_name} ${i.email} ${i.department}`.toLowerCase().includes(search.toLowerCase()));
    setFiltered(f);
  }, [search, interviewers]);

  const fetchInterviewers = async () => {
    try {
      const r = await api.get("/users/interviewers/");
      setInterviewers(r.data || []);
    } catch (e) { showError("Failed to load interviewers"); }
    finally { setLoading(false); }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = { first_name: form.first_name, last_name: form.last_name, email: form.email, phone: form.phone, department: form.department, role: "INTERVIEWER" };
    if (!editing && form.password) payload.password = form.password;
    try {
      if (editing) {
        await api.patch(`/users/interviewers/${editing.id}/`, payload);
        showSuccess("✅ Interviewer updated!");
      } else {
        if (!form.password) { showError("Password is required"); return; }
        await api.post("/users/interviewers/", { ...payload, password: form.password });
        showSuccess("✅ Interviewer added!");
      }
      setShowForm(false); setEditing(null);
      setForm({ first_name: "", last_name: "", email: "", password: "", phone: "", department: "" });
      fetchInterviewers();
    } catch (e) {
      const msg = e.response?.data?.email?.[0] || e.response?.data?.detail || "Error saving interviewer";
      showError("❌ " + msg);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Remove this interviewer?")) return;
    try {
      await api.delete(`/users/interviewers/${id}/`);
      showSuccess("✅ Interviewer removed");
      fetchInterviewers();
    } catch { showError("Error deleting interviewer"); }
  };

  const handleEdit = (iv) => {
    setEditing(iv);
    setForm({ first_name: iv.first_name, last_name: iv.last_name, email: iv.email, password: "", phone: iv.phone || "", department: iv.department || "" });
    setShowForm(true);
  };

  if (loading) return <div style={{ textAlign: "center", padding: "4rem", color: "#94a3b8" }}>Loading interviewers...</div>;

  return (
    <div style={S.container}>
      <div style={S.header}>
        <div>
          <h1 style={S.title}>Interviewers</h1>
          <p style={{ color: "#94a3b8", fontSize: "0.875rem" }}>{filtered.length} interviewer{filtered.length !== 1 ? "s" : ""}</p>
        </div>
        <button onClick={() => { setEditing(null); setForm({ first_name: "", last_name: "", email: "", password: "", phone: "", department: "" }); setShowForm(true); }} style={S.addBtn}>
          <FiPlus /> Add Interviewer
        </button>
      </div>

      <div style={S.toolbar}>
        <div style={S.searchBox}>
          <FiSearch style={{ color: "#94a3b8", position: "absolute", left: "0.75rem", top: "50%", transform: "translateY(-50%)" }} />
          <input placeholder="Search by name, email, department..." value={search} onChange={e => setSearch(e.target.value)} style={S.searchInput} />
        </div>
      </div>

      {filtered.length === 0 ? (
        <div style={{ textAlign: "center", padding: "4rem", backgroundColor: "#1e293b", borderRadius: "12px", color: "#94a3b8" }}>
          <div style={{ fontSize: "3rem", marginBottom: "1rem" }}>👤</div>
          <p>No interviewers yet. Add your first one!</p>
        </div>
      ) : (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: "1rem" }}>
          {filtered.map(iv => (
            <div key={iv.id} style={S.card}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                <div style={{ display: "flex", gap: "0.75rem", alignItems: "center" }}>
                  <div style={S.avatar}>{iv.first_name[0]}{iv.last_name[0]}</div>
                  <div>
                    <div style={{ color: "#f1f5f9", fontWeight: "600" }}>{iv.first_name} {iv.last_name}</div>
                    <div style={{ color: "#94a3b8", fontSize: "0.8rem" }}>{iv.email}</div>
                  </div>
                </div>
                <div style={{ display: "flex", gap: "0.25rem" }}>
                  <button onClick={() => handleEdit(iv)} style={S.iconBtn}><FiEdit2 /></button>
                  {user?.role === "SUPER_HR" && <button onClick={() => handleDelete(iv.id)} style={{ ...S.iconBtn, color: "#ef4444" }}><FiTrash2 /></button>}
                </div>
              </div>
              <div style={{ marginTop: "1rem", display: "flex", flexDirection: "column", gap: "0.35rem" }}>
                {iv.department && <div style={{ color: "#94a3b8", fontSize: "0.8rem" }}>🏢 {iv.department}</div>}
                {iv.phone && <div style={{ color: "#94a3b8", fontSize: "0.8rem" }}>📞 {iv.phone}</div>}
                <div style={{ display: "flex", gap: "0.5rem", marginTop: "0.5rem" }}>
                  <span style={S.badge}>{iv.is_available ? "✅ Available" : "🔴 Busy"}</span>
                  <span style={{ ...S.badge, backgroundColor: "rgba(249,115,22,0.15)", color: "#f97316" }}>INTERVIEWER</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {showForm && (
        <div style={S.overlay} onClick={() => setShowForm(false)}>
          <div style={S.modal} onClick={e => e.stopPropagation()}>
            <div style={S.modalHeader}>
              <h2 style={{ color: "#f1f5f9", fontSize: "1.2rem" }}>{editing ? "Edit Interviewer" : "Add Interviewer"}</h2>
              <button onClick={() => setShowForm(false)} style={S.closeBtn}><FiX /></button>
            </div>
            <form onSubmit={handleSubmit} style={{ padding: "1.5rem", display: "flex", flexDirection: "column", gap: "1rem" }}>
              <div style={S.formGrid}>
                <div style={S.field}>
                  <label style={S.label}>First Name *</label>
                  <input type="text" value={form.first_name} onChange={e => setForm({ ...form, first_name: e.target.value })} style={S.input} required />
                </div>
                <div style={S.field}>
                  <label style={S.label}>Last Name *</label>
                  <input type="text" value={form.last_name} onChange={e => setForm({ ...form, last_name: e.target.value })} style={S.input} required />
                </div>
                <div style={S.field}>
                  <label style={S.label}>Email *</label>
                  <input type="email" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} style={S.input} required />
                </div>
                <div style={S.field}>
                  <label style={S.label}>{editing ? "New Password (optional)" : "Password *"}</label>
                  <input type="password" value={form.password} onChange={e => setForm({ ...form, password: e.target.value })} style={S.input} placeholder={editing ? "Leave blank to keep current" : ""} required={!editing} />
                </div>
                <div style={S.field}>
                  <label style={S.label}>Phone</label>
                  <input type="tel" value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })} style={S.input} />
                </div>
                <div style={S.field}>
                  <label style={S.label}>Department</label>
                  <input type="text" value={form.department} onChange={e => setForm({ ...form, department: e.target.value })} style={S.input} />
                </div>
              </div>
              <div style={S.actions}>
                <button type="button" onClick={() => setShowForm(false)} style={S.cancelBtn}>Cancel</button>
                <button type="submit" style={S.saveBtn}>{editing ? "Update" : "Add Interviewer"}</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

const S = {
  container: { padding: "1.5rem 2rem", maxWidth: "1280px", margin: "0 auto" },
  header: { display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "1.5rem", flexWrap: "wrap", gap: "1rem" },
  title: { fontSize: "1.75rem", fontWeight: "bold", color: "#f1f5f9" },
  addBtn: { backgroundColor: "#f97316", color: "white", border: "none", padding: "0.6rem 1.25rem", borderRadius: "8px", cursor: "pointer", display: "flex", alignItems: "center", gap: "0.5rem", fontWeight: "600" },
  toolbar: { marginBottom: "1.5rem" },
  searchBox: { position: "relative", maxWidth: "400px" },
  searchInput: { width: "100%", padding: "0.65rem 0.75rem 0.65rem 2.5rem", backgroundColor: "#1e293b", border: "1px solid #334155", borderRadius: "8px", color: "white", fontSize: "0.875rem" },
  card: { backgroundColor: "#1e293b", padding: "1.25rem", borderRadius: "12px", border: "1px solid #334155" },
  avatar: { width: "42px", height: "42px", backgroundColor: "rgba(249,115,22,0.2)", color: "#f97316", borderRadius: "10px", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: "bold", flexShrink: 0 },
  badge: { display: "inline-block", padding: "0.2rem 0.6rem", borderRadius: "99px", fontSize: "0.7rem", fontWeight: "600", backgroundColor: "#0f172a", color: "#94a3b8" },
  iconBtn: { background: "transparent", border: "none", color: "#94a3b8", cursor: "pointer", padding: "0.35rem", fontSize: "0.95rem" },
  overlay: { position: "fixed", inset: 0, backgroundColor: "rgba(0,0,0,0.7)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 1000, padding: "1rem" },
  modal: { backgroundColor: "#1e293b", borderRadius: "16px", width: "100%", maxWidth: "540px", maxHeight: "90vh", overflow: "auto" },
  modalHeader: { display: "flex", justifyContent: "space-between", alignItems: "center", padding: "1.25rem 1.5rem", borderBottom: "1px solid #334155" },
  closeBtn: { background: "transparent", border: "none", color: "#94a3b8", cursor: "pointer", fontSize: "1.25rem" },
  formGrid: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" },
  field: { display: "flex", flexDirection: "column", gap: "0.35rem" },
  label: { color: "#94a3b8", fontSize: "0.8rem", fontWeight: "600" },
  input: { padding: "0.65rem 0.75rem", backgroundColor: "#0f172a", border: "1px solid #334155", borderRadius: "8px", color: "white", fontSize: "0.875rem" },
  actions: { display: "flex", justifyContent: "flex-end", gap: "0.75rem" },
  cancelBtn: { padding: "0.6rem 1.25rem", backgroundColor: "#334155", border: "none", borderRadius: "8px", color: "white", cursor: "pointer" },
  saveBtn: { padding: "0.6rem 1.5rem", backgroundColor: "#f97316", border: "none", borderRadius: "8px", color: "white", cursor: "pointer", fontWeight: "600" },
};
