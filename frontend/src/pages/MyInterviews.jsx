import { useEffect, useState } from "react";
import api from "../api/axios";
import { useToast } from "../contexts/ToastContext";
import { FiCalendar, FiMapPin, FiX, FiFilter } from "react-icons/fi";

export default function MyInterviews() {
  const { showSuccess, showError } = useToast();
  const [interviews, setInterviews] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [statusFilter, setStatusFilter] = useState("ALL");
  const [loading, setLoading] = useState(true);
  const [feedbackModal, setFeedbackModal] = useState(null);
  const [feedback, setFeedback] = useState({ score: "", feedback: "", status: "COMPLETED" });

  useEffect(() => { fetchInterviews(); }, []);
  useEffect(() => {
    let f = [...interviews];
    if (statusFilter !== "ALL") f = f.filter(i => i.status === statusFilter);
    setFiltered(f);
  }, [statusFilter, interviews]);

  const fetchInterviews = async () => {
    try {
      const r = await api.get("/recruitment/my-interviews/");
      setInterviews(r.data || []);
    } catch (e) { showError("Failed to load interviews"); }
    finally { setLoading(false); }
  };

  const handleFeedbackSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.patch(`/recruitment/interviews/${feedbackModal.id}/`, {
        status: feedback.status,
        score: feedback.score ? parseInt(feedback.score) : null,
        feedback: feedback.feedback,
      });
      showSuccess("✅ Feedback submitted!");
      setFeedbackModal(null);
      fetchInterviews();
    } catch { showError("❌ Error submitting feedback"); }
  };

  const statusColors = { SCHEDULED: "#3b82f6", COMPLETED: "#10b981", CANCELLED: "#ef4444" };
  const typeColors = { PHONE: "#8b5cf6", TECHNICAL: "#f97316", HR: "#3b82f6", FINAL: "#10b981" };
  const typeLabels = { PHONE: "Phone Screen", TECHNICAL: "Technical", HR: "HR Round", FINAL: "Final Round" };

  if (loading) return <div style={{ textAlign: "center", padding: "4rem", color: "#94a3b8" }}>Loading your interviews...</div>;

  return (
    <div style={S.container}>
      <div style={S.header}>
        <div>
          <h1 style={S.title}>My Interviews</h1>
          <p style={{ color: "#94a3b8", fontSize: "0.875rem" }}>{filtered.length} interview{filtered.length !== 1 ? "s" : ""}</p>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", backgroundColor: "#1e293b", padding: "0.5rem 1rem", borderRadius: "8px", border: "1px solid #334155" }}>
          <FiFilter style={{ color: "#94a3b8" }} />
          <select value={statusFilter} onChange={e => setStatusFilter(e.target.value)} style={{ backgroundColor: "transparent", border: "none", color: "white", cursor: "pointer" }}>
            <option value="ALL">All Status</option>
            <option value="SCHEDULED">Scheduled</option>
            <option value="COMPLETED">Completed</option>
            <option value="CANCELLED">Cancelled</option>
          </select>
        </div>
      </div>

      {/* Stats */}
      <div style={{ display: "flex", gap: "1rem", marginBottom: "1.5rem", flexWrap: "wrap" }}>
        {[
          { label: "Total", value: interviews.length, color: "#f97316" },
          { label: "Upcoming", value: interviews.filter(i => i.status === "SCHEDULED").length, color: "#3b82f6" },
          { label: "Done", value: interviews.filter(i => i.status === "COMPLETED").length, color: "#10b981" },
        ].map((s, i) => (
          <div key={i} style={{ backgroundColor: "#1e293b", padding: "0.75rem 1.5rem", borderRadius: "10px", borderLeft: `3px solid ${s.color}`, textAlign: "center" }}>
            <div style={{ color: s.color, fontWeight: "bold", fontSize: "1.5rem" }}>{s.value}</div>
            <div style={{ color: "#94a3b8", fontSize: "0.75rem" }}>{s.label}</div>
          </div>
        ))}
      </div>

      {filtered.length === 0 ? (
        <div style={{ textAlign: "center", padding: "4rem", backgroundColor: "#1e293b", borderRadius: "12px", color: "#94a3b8" }}>
          <div style={{ fontSize: "3rem", marginBottom: "1rem" }}>📅</div>
          <p>No interviews assigned to you yet.</p>
        </div>
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          {filtered.map(iv => (
            <div key={iv.id} style={{ ...S.card, borderLeft: `4px solid ${statusColors[iv.status]}` }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: "1rem" }}>
                <div>
                  <h3 style={{ color: "#f1f5f9", fontWeight: "600", marginBottom: "0.35rem", fontSize: "1.1rem" }}>
                    {iv.candidate_name || `Candidate #${iv.candidate}`}
                  </h3>
                  <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
                    <span style={{ ...S.badge, backgroundColor: `${statusColors[iv.status]}20`, color: statusColors[iv.status] }}>{iv.status}</span>
                    <span style={{ ...S.badge, backgroundColor: `${typeColors[iv.interview_type]}20`, color: typeColors[iv.interview_type] }}>{typeLabels[iv.interview_type]}</span>
                  </div>
                </div>
                <div style={{ display: "flex", gap: "0.5rem", alignItems: "center" }}>
                  {iv.score && (
                    <div style={{ backgroundColor: "#10b98120", color: "#10b981", padding: "0.35rem 0.75rem", borderRadius: "8px", fontWeight: "bold" }}>
                      Score: {iv.score}/10
                    </div>
                  )}
                  {iv.status === "SCHEDULED" && (
                    <button onClick={() => { setFeedbackModal(iv); setFeedback({ score: "", feedback: "", status: "COMPLETED" }); }}
                      style={S.feedbackBtn}>
                      Submit Feedback
                    </button>
                  )}
                </div>
              </div>

              <div style={{ display: "flex", gap: "1.5rem", marginTop: "1rem", flexWrap: "wrap" }}>
                {iv.scheduled_at && (
                  <div style={{ display: "flex", alignItems: "center", gap: "0.4rem", color: "#94a3b8", fontSize: "0.875rem" }}>
                    <FiCalendar style={{ color: "#f97316" }} />
                    {new Date(iv.scheduled_at).toLocaleString("en-US", { weekday: "short", month: "short", day: "numeric", hour: "2-digit", minute: "2-digit" })}
                  </div>
                )}
                {iv.location && (
                  <div style={{ display: "flex", alignItems: "center", gap: "0.4rem", color: "#94a3b8", fontSize: "0.875rem" }}>
                    <FiMapPin style={{ color: "#3b82f6" }} />
                    {iv.location}
                  </div>
                )}
              </div>

              {iv.feedback && (
                <div style={{ marginTop: "0.75rem", padding: "0.75rem", backgroundColor: "#0f172a", borderRadius: "8px" }}>
                  <div style={{ color: "#94a3b8", fontSize: "0.75rem", marginBottom: "0.25rem" }}>YOUR FEEDBACK</div>
                  <div style={{ color: "#cbd5e1", fontSize: "0.875rem", fontStyle: "italic" }}>{iv.feedback}</div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Feedback Modal */}
      {feedbackModal && (
        <div style={S.overlay} onClick={() => setFeedbackModal(null)}>
          <div style={S.modal} onClick={e => e.stopPropagation()}>
            <div style={S.modalHeader}>
              <div>
                <h2 style={{ color: "#f1f5f9", fontSize: "1.1rem" }}>Submit Interview Feedback</h2>
                <p style={{ color: "#94a3b8", fontSize: "0.8rem" }}>For: {feedbackModal.candidate_name}</p>
              </div>
              <button onClick={() => setFeedbackModal(null)} style={{ background: "transparent", border: "none", color: "#94a3b8", cursor: "pointer", fontSize: "1.25rem" }}><FiX /></button>
            </div>
            <form onSubmit={handleFeedbackSubmit} style={{ padding: "1.5rem", display: "flex", flexDirection: "column", gap: "1rem" }}>
              <div style={S.field}>
                <label style={S.label}>Outcome</label>
                <select value={feedback.status} onChange={e => setFeedback({ ...feedback, status: e.target.value })} style={S.input}>
                  <option value="COMPLETED">Completed</option>
                  <option value="CANCELLED">Cancelled</option>
                </select>
              </div>
              <div style={S.field}>
                <label style={S.label}>Score (1-10)</label>
                <input type="number" min="1" max="10" value={feedback.score} onChange={e => setFeedback({ ...feedback, score: e.target.value })} style={S.input} placeholder="Rate the candidate 1-10" />
              </div>
              <div style={S.field}>
                <label style={S.label}>Feedback *</label>
                <textarea value={feedback.feedback} onChange={e => setFeedback({ ...feedback, feedback: e.target.value })} style={{ ...S.input, height: "120px", resize: "vertical" }} placeholder="Share your detailed feedback about the candidate..." required />
              </div>
              <div style={{ display: "flex", justifyContent: "flex-end", gap: "0.75rem" }}>
                <button type="button" onClick={() => setFeedbackModal(null)} style={S.cancelBtn}>Cancel</button>
                <button type="submit" style={S.saveBtn}>Submit Feedback</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

const S = {
  container: { padding: "1.5rem 2rem", maxWidth: "900px", margin: "0 auto" },
  header: { display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "1.5rem", flexWrap: "wrap", gap: "1rem" },
  title: { fontSize: "1.75rem", fontWeight: "bold", color: "#f1f5f9" },
  card: { backgroundColor: "#1e293b", padding: "1.25rem", borderRadius: "12px", border: "1px solid #334155" },
  badge: { padding: "0.2rem 0.6rem", borderRadius: "99px", fontSize: "0.7rem", fontWeight: "600" },
  feedbackBtn: { backgroundColor: "#f97316", color: "white", border: "none", padding: "0.5rem 1rem", borderRadius: "8px", cursor: "pointer", fontWeight: "600", fontSize: "0.875rem" },
  overlay: { position: "fixed", inset: 0, backgroundColor: "rgba(0,0,0,0.7)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 1000, padding: "1rem" },
  modal: { backgroundColor: "#1e293b", borderRadius: "16px", width: "100%", maxWidth: "500px" },
  modalHeader: { display: "flex", justifyContent: "space-between", alignItems: "flex-start", padding: "1.25rem 1.5rem", borderBottom: "1px solid #334155" },
  field: { display: "flex", flexDirection: "column", gap: "0.35rem" },
  label: { color: "#94a3b8", fontSize: "0.8rem", fontWeight: "600" },
  input: { padding: "0.65rem 0.75rem", backgroundColor: "#0f172a", border: "1px solid #334155", borderRadius: "8px", color: "white", fontSize: "0.875rem" },
  cancelBtn: { padding: "0.6rem 1.25rem", backgroundColor: "#334155", border: "none", borderRadius: "8px", color: "white", cursor: "pointer" },
  saveBtn: { padding: "0.6rem 1.5rem", backgroundColor: "#f97316", border: "none", borderRadius: "8px", color: "white", cursor: "pointer", fontWeight: "600" },
};
