import { useEffect, useState } from "react";
import api from "../api/axios";
import { useToast } from "../contexts/ToastContext";
import { useAuth } from "../contexts/AuthContext";
import { FiPlus, FiX, FiSearch, FiEdit2, FiTrash2, FiCalendar, FiFilter } from "react-icons/fi";

export default function Interviews() {
  const { user } = useAuth();
  const { showSuccess, showError } = useToast();
  const [interviews, setInterviews] = useState([]);
  const [candidates, setCandidates] = useState([]);
  const [interviewers, setInterviewers] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("ALL");
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState(null);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState({ candidate: "", interviewer: "", interview_type: "TECHNICAL", scheduled_at: "", location: "", status: "SCHEDULED", score: "", feedback: "" });

  useEffect(() => { fetchAll(); }, []);
  useEffect(() => {
    let f = [...interviews];
    if (search) f = f.filter(i => (i.candidate_name || "").toLowerCase().includes(search.toLowerCase()) || (i.interviewer_name || "").toLowerCase().includes(search.toLowerCase()));
    if (statusFilter !== "ALL") f = f.filter(i => i.status === statusFilter);
    setFiltered(f);
  }, [search, statusFilter, interviews]);

  const fetchAll = async () => {
    try {
      const [iv, c, ir] = await Promise.all([
        api.get("/recruitment/interviews/"),
        api.get("/recruitment/candidates/"),
        api.get("/users/interviewers/"),
      ]);
      setInterviews(iv.data || []);
      setCandidates(c.data || []);
      setInterviewers(ir.data || []);
    } catch (e) { showError("Failed to load data"); }
    finally { setLoading(false); }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = { candidate: form.candidate, interviewer: form.interviewer, interview_type: form.interview_type, scheduled_at: form.scheduled_at, location: form.location, status: form.status };
    if (form.score) payload.score = parseInt(form.score);
    if (form.feedback) payload.feedback = form.feedback;
    try {
      if (editing) {
        await api.patch(`/recruitment/interviews/${editing.id}/`, payload);
        showSuccess("✅ Interview updated!");
      } else {
        await api.post("/recruitment/interviews/", payload);
        showSuccess("✅ Interview scheduled!");
      }
      setShowForm(false); setEditing(null);
      setForm({ candidate: "", interviewer: "", interview_type: "TECHNICAL", scheduled_at: "", location: "", status: "SCHEDULED", score: "", feedback: "" });
      fetchAll();
    } catch (e) { showError("❌ Error saving interview. Check all fields."); }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this interview?")) return;
    await api.delete(`/recruitment/interviews/${id}/`);
    showSuccess("✅ Interview deleted");
    fetchAll();
  };

  const handleEdit = (iv) => {
    setEditing(iv);
    setForm({ candidate: iv.candidate, interviewer: iv.interviewer, interview_type: iv.interview_type, scheduled_at: iv.scheduled_at?.slice(0, 16) || "", location: iv.location || "", status: iv.status, score: iv.score || "", feedback: iv.feedback || "" });
    setShowForm(true);
  };

  const statusColors = { SCHEDULED: "#3b82f6", COMPLETED: "#10b981", CANCELLED: "#ef4444" };
  const typeColors = { PHONE: "#8b5cf6", TECHNICAL: "#f97316", HR: "#3b82f6", FINAL: "#10b981" };

  if (loading) return <div style={{ textAlign: "center", padding: "4rem", color: "#94a3b8" }}>Loading interviews...</div>;

  return (
    <div style={S.container}>
      <div style={S.header}>
        <div>
          <h1 style={S.title}>Interview Management</h1>
          <p style={{ color: "#94a3b8", fontSize: "0.875rem" }}>{filtered.length} interview{filtered.length !== 1 ? "s" : ""} found</p>
        </div>
        <button onClick={() => { setEditing(null); setForm({ candidate: "", interviewer: "", interview_type: "TECHNICAL", scheduled_at: "", location: "", status: "SCHEDULED", score: "", feedback: "" }); setShowForm(true); }} style={S.addBtn}>
          <FiPlus /> Schedule Interview
        </button>
      </div>

      {/* Search & Filter */}
      <div style={S.toolbar}>
        <div style={S.searchBox}>
          <FiSearch style={{ color: "#94a3b8", position: "absolute", left: "0.75rem", top: "50%", transform: "translateY(-50%)" }} />
          <input placeholder="Search candidates or interviewers..." value={search} onChange={e => setSearch(e.target.value)} style={S.searchInput} />
        </div>
        <div style={S.filterBox}>
          <FiFilter style={{ color: "#94a3b8" }} />
          <select value={statusFilter} onChange={e => setStatusFilter(e.target.value)} style={S.select}>
            <option value="ALL">All Status</option>
            <option value="SCHEDULED">Scheduled</option>
            <option value="COMPLETED">Completed</option>
            <option value="CANCELLED">Cancelled</option>
          </select>
        </div>
      </div>

      {/* Stats row */}
      <div style={{ display: "flex", gap: "1rem", marginBottom: "1.5rem", flexWrap: "wrap" }}>
        {[
          { label: "Total", value: interviews.length, color: "#f97316" },
          { label: "Scheduled", value: interviews.filter(i => i.status === "SCHEDULED").length, color: "#3b82f6" },
          { label: "Completed", value: interviews.filter(i => i.status === "COMPLETED").length, color: "#10b981" },
          { label: "Cancelled", value: interviews.filter(i => i.status === "CANCELLED").length, color: "#ef4444" },
        ].map((s, i) => (
          <div key={i} style={{ backgroundColor: "#1e293b", padding: "0.75rem 1.25rem", borderRadius: "10px", borderLeft: `3px solid ${s.color}` }}>
            <div style={{ color: s.color, fontWeight: "bold", fontSize: "1.25rem" }}>{s.value}</div>
            <div style={{ color: "#94a3b8", fontSize: "0.75rem" }}>{s.label}</div>
          </div>
        ))}
      </div>

      {/* Cards Grid */}
      {filtered.length === 0 ? (
        <div style={{ textAlign: "center", padding: "4rem", backgroundColor: "#1e293b", borderRadius: "12px", color: "#94a3b8" }}>
          <div style={{ fontSize: "3rem", marginBottom: "1rem" }}>📅</div>
          <p>No interviews found. Schedule one!</p>
        </div>
      ) : (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))", gap: "1rem" }}>
          {filtered.map(iv => (
            <div key={iv.id} style={S.card}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "1rem" }}>
                <div>
                  <div style={{ color: "#f1f5f9", fontWeight: "600", marginBottom: "0.25rem" }}>{iv.candidate_name || `Candidate #${iv.candidate}`}</div>
                  <div style={{ color: "#94a3b8", fontSize: "0.8rem" }}>with {iv.interviewer_name || `Interviewer #${iv.interviewer}`}</div>
                </div>
                <div style={{ display: "flex", gap: "0.5rem" }}>
                  <button onClick={() => handleEdit(iv)} style={S.iconBtn}><FiEdit2 /></button>
                  {user?.role === "SUPER_HR" && <button onClick={() => handleDelete(iv.id)} style={{ ...S.iconBtn, color: "#ef4444" }}><FiTrash2 /></button>}
                </div>
              </div>
              <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap", marginBottom: "0.75rem" }}>
                <span style={{ ...S.badge, backgroundColor: `${statusColors[iv.status]}20`, color: statusColors[iv.status] }}>{iv.status}</span>
                <span style={{ ...S.badge, backgroundColor: `${typeColors[iv.interview_type]}20`, color: typeColors[iv.interview_type] }}>{iv.interview_type}</span>
                {iv.score && <span style={{ ...S.badge, backgroundColor: "#10b98120", color: "#10b981" }}>Score: {iv.score}/10</span>}
              </div>
              <div style={{ color: "#94a3b8", fontSize: "0.8rem", display: "flex", gap: "1rem", flexWrap: "wrap" }}>
                {iv.scheduled_at && <span><FiCalendar style={{ marginRight: "0.25rem" }} />{new Date(iv.scheduled_at).toLocaleString()}</span>}
                {iv.location && <span>📍 {iv.location}</span>}
              </div>
              {iv.feedback && <div style={{ marginTop: "0.75rem", padding: "0.5rem", backgroundColor: "#0f172a", borderRadius: "6px", color: "#94a3b8", fontSize: "0.8rem", fontStyle: "italic" }}>"{iv.feedback.slice(0, 100)}{iv.feedback.length > 100 ? "..." : ""}"</div>}
            </div>
          ))}
        </div>
      )}

      {/* Modal */}
      {showForm && (
        <div style={S.overlay} onClick={() => setShowForm(false)}>
          <div style={S.modal} onClick={e => e.stopPropagation()}>
            <div style={S.modalHeader}>
              <h2 style={{ color: "#f1f5f9", fontSize: "1.2rem" }}>{editing ? "Edit Interview" : "Schedule Interview"}</h2>
              <button onClick={() => setShowForm(false)} style={S.closeBtn}><FiX /></button>
            </div>
            <form onSubmit={handleSubmit} style={S.form}>
              <div style={S.formGrid}>
                <div style={S.field}>
                  <label style={S.label}>Candidate *</label>
                  <select value={form.candidate} onChange={e => setForm({ ...form, candidate: e.target.value })} style={S.input} required>
                    <option value="">Select candidate...</option>
                    {candidates.map(c => <option key={c.id} value={c.id}>{c.first_name} {c.last_name} — {c.position}</option>)}
                  </select>
                </div>
                <div style={S.field}>
                  <label style={S.label}>Interviewer *</label>
                  <select value={form.interviewer} onChange={e => setForm({ ...form, interviewer: e.target.value })} style={S.input} required>
                    <option value="">Select interviewer...</option>
                    {interviewers.map(i => <option key={i.id} value={i.id}>{i.first_name} {i.last_name}</option>)}
                  </select>
                </div>
                <div style={S.field}>
                  <label style={S.label}>Interview Type</label>
                  <select value={form.interview_type} onChange={e => setForm({ ...form, interview_type: e.target.value })} style={S.input}>
                    <option value="PHONE">Phone Screen</option>
                    <option value="TECHNICAL">Technical Interview</option>
                    <option value="HR">HR Interview</option>
                    <option value="FINAL">Final Interview</option>
                  </select>
                </div>
                <div style={S.field}>
                  <label style={S.label}>Scheduled Date & Time *</label>
                  <input type="datetime-local" value={form.scheduled_at} onChange={e => setForm({ ...form, scheduled_at: e.target.value })} style={S.input} required />
                </div>
                <div style={S.field}>
                  <label style={S.label}>Location / Meeting Link</label>
                  <input type="text" placeholder="e.g. Office Room 3 or Zoom link" value={form.location} onChange={e => setForm({ ...form, location: e.target.value })} style={S.input} />
                </div>
                <div style={S.field}>
                  <label style={S.label}>Status</label>
                  <select value={form.status} onChange={e => setForm({ ...form, status: e.target.value })} style={S.input}>
                    <option value="SCHEDULED">Scheduled</option>
                    <option value="COMPLETED">Completed</option>
                    <option value="CANCELLED">Cancelled</option>
                  </select>
                </div>
                {form.status === "COMPLETED" && (
                  <div style={S.field}>
                    <label style={S.label}>Score (1-10)</label>
                    <input type="number" min="1" max="10" placeholder="Score" value={form.score} onChange={e => setForm({ ...form, score: e.target.value })} style={S.input} />
                  </div>
                )}
              </div>
              {form.status === "COMPLETED" && (
                <div style={S.field}>
                  <label style={S.label}>Feedback</label>
                  <textarea placeholder="Interview feedback..." value={form.feedback} onChange={e => setForm({ ...form, feedback: e.target.value })} style={{ ...S.input, height: "80px", resize: "vertical" }} />
                </div>
              )}
              <div style={S.actions}>
                <button type="button" onClick={() => setShowForm(false)} style={S.cancelBtn}>Cancel</button>
                <button type="submit" style={S.saveBtn}>{editing ? "Update" : "Schedule"}</button>
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
  toolbar: { display: "flex", gap: "1rem", marginBottom: "1.25rem", flexWrap: "wrap" },
  searchBox: { position: "relative", flex: 1, minWidth: "200px" },
  searchInput: { width: "100%", padding: "0.65rem 0.75rem 0.65rem 2.5rem", backgroundColor: "#1e293b", border: "1px solid #334155", borderRadius: "8px", color: "white", fontSize: "0.875rem" },
  filterBox: { display: "flex", alignItems: "center", gap: "0.5rem", backgroundColor: "#1e293b", padding: "0.5rem 1rem", borderRadius: "8px", border: "1px solid #334155" },
  select: { backgroundColor: "transparent", border: "none", color: "white", cursor: "pointer", fontSize: "0.875rem" },
  card: { backgroundColor: "#1e293b", padding: "1.25rem", borderRadius: "12px", border: "1px solid #334155", transition: "border-color 0.2s" },
  badge: { padding: "0.2rem 0.6rem", borderRadius: "99px", fontSize: "0.7rem", fontWeight: "600" },
  iconBtn: { background: "transparent", border: "none", color: "#94a3b8", cursor: "pointer", padding: "0.35rem", fontSize: "0.95rem" },
  overlay: { position: "fixed", inset: 0, backgroundColor: "rgba(0,0,0,0.7)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 1000, padding: "1rem" },
  modal: { backgroundColor: "#1e293b", borderRadius: "16px", width: "100%", maxWidth: "600px", maxHeight: "90vh", overflow: "auto" },
  modalHeader: { display: "flex", justifyContent: "space-between", alignItems: "center", padding: "1.25rem 1.5rem", borderBottom: "1px solid #334155" },
  closeBtn: { background: "transparent", border: "none", color: "#94a3b8", cursor: "pointer", fontSize: "1.25rem" },
  form: { padding: "1.5rem" },
  formGrid: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem", marginBottom: "1rem" },
  field: { display: "flex", flexDirection: "column", gap: "0.35rem" },
  label: { color: "#94a3b8", fontSize: "0.8rem", fontWeight: "600" },
  input: { padding: "0.65rem 0.75rem", backgroundColor: "#0f172a", border: "1px solid #334155", borderRadius: "8px", color: "white", fontSize: "0.875rem" },
  actions: { display: "flex", justifyContent: "flex-end", gap: "0.75rem", marginTop: "1.5rem" },
  cancelBtn: { padding: "0.6rem 1.25rem", backgroundColor: "#334155", border: "none", borderRadius: "8px", color: "white", cursor: "pointer" },
  saveBtn: { padding: "0.6rem 1.5rem", backgroundColor: "#f97316", border: "none", borderRadius: "8px", color: "white", cursor: "pointer", fontWeight: "600" },
};
