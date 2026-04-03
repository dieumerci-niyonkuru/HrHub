import { useEffect, useState } from "react";
import api from "../api/axios";
import { useToast } from "../contexts/ToastContext";
import { useAuth } from "../contexts/AuthContext";
import { FiSearch, FiPlus, FiFilter, FiX, FiDownload, FiEdit2, FiTrash2 } from "react-icons/fi";

const POSITIONS = [
  "Software Engineer", "Senior Software Engineer", "Frontend Developer", "Backend Developer",
  "Full Stack Developer", "Mobile Developer", "DevOps Engineer", "Data Scientist",
  "Data Analyst", "Machine Learning Engineer", "AI Engineer", "Product Manager",
  "Project Manager", "Scrum Master", "UI/UX Designer", "Graphic Designer",
  "QA Engineer", "Test Engineer", "Security Engineer", "Cloud Architect",
  "Database Administrator", "System Administrator", "Network Engineer",
  "Business Analyst", "Technical Lead", "Engineering Manager", "CTO",
  "HR Manager", "Recruiter", "Marketing Manager", "Sales Manager",
  "Customer Success Manager", "Finance Manager", "Accountant", "Legal Counsel",
  "Content Writer", "SEO Specialist", "Social Media Manager", "Operations Manager",
];

const DEPARTMENTS = ["Engineering", "Product", "Design", "Data", "Marketing", "Sales", "HR", "Finance", "Legal", "Operations", "Customer Success", "Other"];

export default function Candidates() {
  const { user } = useAuth();
  const { showSuccess, showError } = useToast();
  const [candidates, setCandidates] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("ALL");
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState(null);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState({ first_name: "", last_name: "", email: "", phone: "", position: "", department: "", status: "PENDING", skills: "", notes: "" });

  useEffect(() => { fetchCandidates(); }, []);
  useEffect(() => {
    let f = [...candidates];
    if (search) f = f.filter(c => `${c.first_name} ${c.last_name} ${c.email} ${c.position}`.toLowerCase().includes(search.toLowerCase()));
    if (statusFilter !== "ALL") f = f.filter(c => c.status === statusFilter);
    setFiltered(f);
  }, [search, statusFilter, candidates]);

  const fetchCandidates = async () => {
    try {
      const { data } = await api.get("/recruitment/candidates/");
      setCandidates(data || []);
    } catch { showError("Failed to load candidates"); }
    finally { setLoading(false); }
  };

  const cleanForm = () => ({ first_name: form.first_name, last_name: form.last_name, email: form.email, phone: form.phone, position: form.position, department: form.department, status: form.status, skills: form.skills, notes: form.notes });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editing) {
        await api.patch(`/recruitment/candidates/${editing.id}/`, cleanForm());
        showSuccess("✅ Candidate updated!");
      } else {
        await api.post("/recruitment/candidates/", cleanForm());
        showSuccess("✅ Candidate added!");
      }
      setShowForm(false); setEditing(null);
      setForm({ first_name: "", last_name: "", email: "", phone: "", position: "", department: "", status: "PENDING", skills: "", notes: "" });
      fetchCandidates();
    } catch (e) {
      const msg = e.response?.data?.email?.[0] || e.response?.data?.detail || "Error saving candidate";
      showError("❌ " + msg);
    }
  };

  const handleDelete = async (id, name) => {
    if (!window.confirm(`Delete ${name}?`)) return;
    await api.delete(`/recruitment/candidates/${id}/`);
    showSuccess("✅ Candidate deleted");
    fetchCandidates();
  };

  const handleEdit = (c) => {
    setEditing(c);
    setForm({ first_name: c.first_name, last_name: c.last_name, email: c.email, phone: c.phone || "", position: c.position, department: c.department || "", status: c.status, skills: c.skills || "", notes: c.notes || "" });
    setShowForm(true);
  };

  const exportCSV = () => {
    const rows = [["Name", "Email", "Phone", "Position", "Department", "Status", "Skills"],
      ...filtered.map(c => [`${c.first_name} ${c.last_name}`, c.email, c.phone, c.position, c.department, c.status, c.skills])];
    const csv = rows.map(r => r.join(",")).join("\n");
    const a = document.createElement("a"); a.href = URL.createObjectURL(new Blob([csv], { type: "text/csv" })); a.download = "candidates.csv"; a.click();
    showSuccess("📊 Exported!");
  };

  const statusColors = { PENDING: "#f97316", INTERVIEW: "#3b82f6", HIRED: "#10b981", REJECTED: "#ef4444" };
  if (loading) return <div style={{ textAlign: "center", padding: "4rem", color: "#94a3b8" }}>Loading candidates...</div>;

  return (
    <div style={S.container}>
      <div style={S.header}>
        <div>
          <h1 style={S.title}>Candidates</h1>
          <p style={{ color: "#94a3b8", fontSize: "0.875rem" }}>{filtered.length} of {candidates.length} candidates</p>
        </div>
        <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap" }}>
          <button onClick={exportCSV} style={S.exportBtn}><FiDownload /> Export CSV</button>
          <button onClick={() => { setEditing(null); setForm({ first_name: "", last_name: "", email: "", phone: "", position: "", department: "", status: "PENDING", skills: "", notes: "" }); setShowForm(true); }} style={S.addBtn}>
            <FiPlus /> Add Candidate
          </button>
        </div>
      </div>

      {/* Stats */}
      <div style={{ display: "flex", gap: "1rem", marginBottom: "1.5rem", flexWrap: "wrap" }}>
        {[{ label: "Total", value: candidates.length, color: "#94a3b8" },
          { label: "Pending", value: candidates.filter(c => c.status === "PENDING").length, color: "#f97316" },
          { label: "Interview", value: candidates.filter(c => c.status === "INTERVIEW").length, color: "#3b82f6" },
          { label: "Hired", value: candidates.filter(c => c.status === "HIRED").length, color: "#10b981" },
          { label: "Rejected", value: candidates.filter(c => c.status === "REJECTED").length, color: "#ef4444" },
        ].map((s, i) => (
          <div key={i} onClick={() => setStatusFilter(i === 0 ? "ALL" : s.label.toUpperCase())}
            style={{ backgroundColor: "#1e293b", padding: "0.6rem 1rem", borderRadius: "8px", cursor: "pointer", borderLeft: `3px solid ${s.color}`, transition: "all 0.2s" }}>
            <span style={{ color: s.color, fontWeight: "bold" }}>{s.value}</span>
            <span style={{ color: "#94a3b8", fontSize: "0.8rem", marginLeft: "0.4rem" }}>{s.label}</span>
          </div>
        ))}
      </div>

      {/* Search & Filter */}
      <div style={S.toolbar}>
        <div style={S.searchBox}>
          <FiSearch style={{ position: "absolute", left: "0.75rem", top: "50%", transform: "translateY(-50%)", color: "#94a3b8" }} />
          <input placeholder="Search by name, email, position..." value={search} onChange={e => setSearch(e.target.value)} style={S.searchInput} />
          {search && <button onClick={() => setSearch("")} style={{ position: "absolute", right: "0.75rem", top: "50%", transform: "translateY(-50%)", background: "none", border: "none", color: "#94a3b8", cursor: "pointer" }}><FiX /></button>}
        </div>
        <div style={S.filterBox}>
          <FiFilter style={{ color: "#94a3b8" }} />
          <select value={statusFilter} onChange={e => setStatusFilter(e.target.value)} style={S.select}>
            <option value="ALL">All Status</option>
            <option value="PENDING">Pending</option>
            <option value="INTERVIEW">Interview</option>
            <option value="HIRED">Hired</option>
            <option value="REJECTED">Rejected</option>
          </select>
        </div>
      </div>

      {/* Table */}
      <div style={S.tableWrap}>
        <table style={S.table}>
          <thead>
            <tr style={{ backgroundColor: "#0f172a" }}>
              {["Candidate", "Email", "Position", "Department", "Status", "Actions"].map(h => (
                <th key={h} style={S.th}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filtered.length === 0 ? (
              <tr><td colSpan="6" style={{ textAlign: "center", padding: "3rem", color: "#94a3b8" }}>No candidates found</td></tr>
            ) : filtered.map(c => (
              <tr key={c.id} style={S.tr}>
                <td style={S.td}>
                  <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
                    <div style={{ width: "36px", height: "36px", backgroundColor: "rgba(249,115,22,0.2)", color: "#f97316", borderRadius: "8px", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: "bold", flexShrink: 0 }}>
                      {c.first_name[0]}{c.last_name[0]}
                    </div>
                    <div>
                      <div style={{ color: "#f1f5f9", fontWeight: "600", fontSize: "0.875rem" }}>{c.first_name} {c.last_name}</div>
                      {c.phone && <div style={{ color: "#94a3b8", fontSize: "0.75rem" }}>{c.phone}</div>}
                    </div>
                  </div>
                </td>
                <td style={{ ...S.td, color: "#94a3b8", fontSize: "0.875rem" }}>{c.email}</td>
                <td style={{ ...S.td, color: "#cbd5e1", fontSize: "0.875rem" }}>{c.position}</td>
                <td style={{ ...S.td, color: "#94a3b8", fontSize: "0.875rem" }}>{c.department || "—"}</td>
                <td style={S.td}>
                  <span style={{ backgroundColor: `${statusColors[c.status]}20`, color: statusColors[c.status], padding: "0.2rem 0.75rem", borderRadius: "99px", fontSize: "0.75rem", fontWeight: "600" }}>
                    {c.status}
                  </span>
                </td>
                <td style={{ ...S.td, display: "flex", gap: "0.25rem" }}>
                  <button onClick={() => handleEdit(c)} style={S.iconBtn} title="Edit"><FiEdit2 /></button>
                  {user?.role === "SUPER_HR" && <button onClick={() => handleDelete(c.id, `${c.first_name} ${c.last_name}`)} style={{ ...S.iconBtn, color: "#ef4444" }} title="Delete"><FiTrash2 /></button>}
                </td>
              </table>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal */}
      {showForm && (
        <div style={S.overlay} onClick={() => setShowForm(false)}>
          <div style={S.modal} onClick={e => e.stopPropagation()}>
            <div style={S.modalHeader}>
              <h2 style={{ color: "#f1f5f9", fontSize: "1.1rem" }}>{editing ? "Edit Candidate" : "Add New Candidate"}</h2>
              <button onClick={() => setShowForm(false)} style={{ background: "transparent", border: "none", color: "#94a3b8", cursor: "pointer", fontSize: "1.25rem" }}><FiX /></button>
            </div>
            <form onSubmit={handleSubmit} style={{ padding: "1.5rem", display: "flex", flexDirection: "column", gap: "1rem" }}>
              <div style={S.formGrid}>
                <div style={S.field}><label style={S.label}>First Name *</label>
                  <input value={form.first_name} onChange={e => setForm({ ...form, first_name: e.target.value })} style={S.input} required /></div>
                <div style={S.field}><label style={S.label}>Last Name *</label>
                  <input value={form.last_name} onChange={e => setForm({ ...form, last_name: e.target.value })} style={S.input} required /></div>
                <div style={S.field}><label style={S.label}>Email *</label>
                  <input type="email" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} style={S.input} required /></div>
                <div style={S.field}><label style={S.label}>Phone</label>
                  <input type="tel" value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })} style={S.input} /></div>
                <div style={S.field}><label style={S.label}>Position *</label>
                  <select value={form.position} onChange={e => setForm({ ...form, position: e.target.value })} style={S.input} required>
                    <option value="">Select a position...</option>
                    {POSITIONS.map(p => <option key={p} value={p}>{p}</option>)}
                    <option value="other">Other (type below)</option>
                  </select>
                  {form.position === "other" && <input placeholder="Enter custom position" onChange={e => setForm({ ...form, position: e.target.value })} style={{ ...S.input, marginTop: "0.5rem" }} />}
                </div>
                <div style={S.field}><label style={S.label}>Department</label>
                  <select value={form.department} onChange={e => setForm({ ...form, department: e.target.value })} style={S.input}>
                    <option value="">Select department...</option>
                    {DEPARTMENTS.map(d => <option key={d} value={d}>{d}</option>)}
                  </select>
                </div>
                <div style={S.field}><label style={S.label}>Status</label>
                  <select value={form.status} onChange={e => setForm({ ...form, status: e.target.value })} style={S.input}>
                    <option value="PENDING">Pending Review</option>
                    <option value="INTERVIEW">In Interview</option>
                    <option value="HIRED">Hired</option>
                    <option value="REJECTED">Rejected</option>
                  </select>
                </div>
                <div style={S.field}><label style={S.label}>Skills</label>
                  <input placeholder="e.g. React, Python, SQL" value={form.skills} onChange={e => setForm({ ...form, skills: e.target.value })} style={S.input} /></div>
              </div>
              <div style={S.field}><label style={S.label}>Notes</label>
                <textarea placeholder="Additional notes..." value={form.notes} onChange={e => setForm({ ...form, notes: e.target.value })} style={{ ...S.input, height: "80px", resize: "vertical" }} /></div>
              <div style={{ display: "flex", justifyContent: "flex-end", gap: "0.75rem" }}>
                <button type="button" onClick={() => setShowForm(false)} style={S.cancelBtn}>Cancel</button>
                <button type="submit" style={S.saveBtn}>{editing ? "Update" : "Save Candidate"}</button>
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
  exportBtn: { backgroundColor: "#334155", color: "white", border: "none", padding: "0.6rem 1.25rem", borderRadius: "8px", cursor: "pointer", display: "flex", alignItems: "center", gap: "0.5rem" },
  toolbar: { display: "flex", gap: "1rem", marginBottom: "1.25rem", flexWrap: "wrap" },
  searchBox: { position: "relative", flex: 1, minWidth: "200px", maxWidth: "450px" },
  searchInput: { width: "100%", padding: "0.65rem 2.5rem", backgroundColor: "#1e293b", border: "1px solid #334155", borderRadius: "8px", color: "white", fontSize: "0.875rem" },
  filterBox: { display: "flex", alignItems: "center", gap: "0.5rem", backgroundColor: "#1e293b", padding: "0.5rem 1rem", borderRadius: "8px", border: "1px solid #334155" },
  select: { backgroundColor: "transparent", border: "none", color: "white", cursor: "pointer", fontSize: "0.875rem" },
  tableWrap: { backgroundColor: "#1e293b", borderRadius: "12px", overflow: "auto", border: "1px solid #334155" },
  table: { width: "100%", borderCollapse: "collapse" },
  th: { padding: "0.85rem 1rem", textAlign: "left", color: "#94a3b8", fontSize: "0.75rem", fontWeight: "600", textTransform: "uppercase", letterSpacing: "0.05em", borderBottom: "1px solid #334155" },
  tr: { borderBottom: "1px solid #2d3748", transition: "background 0.15s" },
  td: { padding: "0.85rem 1rem" },
  iconBtn: { background: "transparent", border: "none", color: "#94a3b8", cursor: "pointer", padding: "0.35rem", fontSize: "0.95rem" },
  overlay: { position: "fixed", inset: 0, backgroundColor: "rgba(0,0,0,0.75)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 1000, padding: "1rem" },
  modal: { backgroundColor: "#1e293b", borderRadius: "16px", width: "100%", maxWidth: "620px", maxHeight: "90vh", overflow: "auto" },
  modalHeader: { display: "flex", justifyContent: "space-between", alignItems: "center", padding: "1.25rem 1.5rem", borderBottom: "1px solid #334155" },
  formGrid: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" },
  field: { display: "flex", flexDirection: "column", gap: "0.35rem" },
  label: { color: "#94a3b8", fontSize: "0.8rem", fontWeight: "600" },
  input: { padding: "0.65rem 0.75rem", backgroundColor: "#0f172a", border: "1px solid #334155", borderRadius: "8px", color: "white", fontSize: "0.875rem" },
  cancelBtn: { padding: "0.6rem 1.25rem", backgroundColor: "#334155", border: "none", borderRadius: "8px", color: "white", cursor: "pointer" },
  saveBtn: { padding: "0.6rem 1.5rem", backgroundColor: "#f97316", border: "none", borderRadius: "8px", color: "white", cursor: "pointer", fontWeight: "600" },
};
