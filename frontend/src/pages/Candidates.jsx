import { useEffect, useState } from "react";
import api from "../api/axios";
import { useToast } from "../contexts/ToastContext";
import { motion, AnimatePresence } from "framer-motion";
import { FiSearch, FiPlus, FiFilter, FiX, FiDownload, FiEye, FiEdit2, FiTrash2 } from "react-icons/fi";

export default function Candidates() {
  const [candidates, setCandidates] = useState([]);
  const [filteredCandidates, setFilteredCandidates] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("ALL");
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({
    first_name: "", last_name: "", email: "", phone: "", 
    position: "", department: "", status: "PENDING", skills: "", notes: ""
  });
  const [editing, setEditing] = useState(null);
  const { showSuccess, showError } = useToast();

  useEffect(() => {
    fetchCandidates();
  }, []);

  useEffect(() => {
    filterCandidates();
  }, [searchTerm, statusFilter, candidates]);

  const fetchCandidates = async () => {
    const { data } = await api.get("/recruitment/candidates/");
    setCandidates(data);
  };

  const filterCandidates = () => {
    let filtered = [...candidates];
    
    if (searchTerm) {
      filtered = filtered.filter(c => 
        c.first_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        c.last_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        c.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        c.position.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    if (statusFilter !== "ALL") {
      filtered = filtered.filter(c => c.status === statusFilter);
    }
    
    setFilteredCandidates(filtered);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editing) {
        await api.patch(`/recruitment/candidates/${editing.id}/`, form);
        showSuccess("✅ Candidate updated successfully!");
      } else {
        await api.post("/recruitment/candidates/", form);
        showSuccess("✅ Candidate added successfully!");
      }
      setShowForm(false);
      setEditing(null);
      setForm({ first_name: "", last_name: "", email: "", phone: "", position: "", department: "", status: "PENDING", skills: "", notes: "" });
      fetchCandidates();
    } catch (err) {
      showError("❌ Error saving candidate");
    }
  };

  const handleDelete = async (id, name) => {
    if (window.confirm(`Delete ${name}?`)) {
      await api.delete(`/recruitment/candidates/${id}/`);
      showSuccess("✅ Candidate deleted");
      fetchCandidates();
    }
  };

  const handleEdit = (candidate) => {
    setEditing(candidate);
    setForm(candidate);
    setShowForm(true);
  };

  const exportToCSV = () => {
    const headers = ["Name", "Email", "Position", "Department", "Status", "Skills"];
    const rows = filteredCandidates.map(c => [
      `${c.first_name} ${c.last_name}`,
      c.email,
      c.position,
      c.department,
      c.status,
      c.skills || ""
    ]);
    
    const csv = [headers, ...rows].map(row => row.join(",")).join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "candidates.csv";
    a.click();
    URL.revokeObjectURL(url);
    showSuccess("📊 Candidates exported to CSV!");
  };

  const statusColors = {
    PENDING: "#f97316",
    INTERVIEW: "#3b82f6",
    HIRED: "#10b981",
    REJECTED: "#ef4444"
  };

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h1 style={styles.title}>Candidates</h1>
        <div style={styles.headerActions}>
          <button onClick={exportToCSV} style={styles.exportBtn}>
            <FiDownload /> Export
          </button>
          <button onClick={() => { setEditing(null); setForm({ first_name: "", last_name: "", email: "", phone: "", position: "", department: "", status: "PENDING", skills: "", notes: "" }); setShowForm(true); }} style={styles.addBtn}>
            <FiPlus /> Add Candidate
          </button>
        </div>
      </div>

      {/* Search and Filter */}
      <div style={styles.searchSection}>
        <div style={styles.searchBar}>
          <FiSearch style={styles.searchIcon} />
          <input
            type="text"
            placeholder="Search by name, email, or position..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={styles.searchInput}
          />
        </div>
        
        <div style={styles.filterGroup}>
          <FiFilter style={styles.filterIcon} />
          <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)} style={styles.filterSelect}>
            <option value="ALL">All Status</option>
            <option value="PENDING">Pending</option>
            <option value="INTERVIEW">Interview</option>
            <option value="HIRED">Hired</option>
            <option value="REJECTED">Rejected</option>
          </select>
        </div>
      </div>

      {/* Candidates Table */}
      <div style={styles.tableContainer}>
        <table style={styles.table}>
          <thead>
            <tr style={styles.tableHeader}>
              <th>Name</th>
              <th>Email</th>
              <th>Position</th>
              <th>Department</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredCandidates.map(candidate => (
              <motion.tr
                key={candidate.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                style={styles.tableRow}
              >
                <td style={styles.cellName}>{candidate.first_name} {candidate.last_name}</td>
                <td>{candidate.email}</td>
                <td>{candidate.position}</td>
                <td>{candidate.department || "—"}</td>
                <td>
                  <span style={{ ...styles.statusBadge, backgroundColor: `${statusColors[candidate.status]}20`, color: statusColors[candidate.status] }}>
                    {candidate.status}
                  </span>
                </td>
                <td style={styles.actions}>
                  <button onClick={() => handleEdit(candidate)} style={styles.actionBtn} title="Edit">
                    <FiEdit2 />
                  </button>
                  <button onClick={() => handleDelete(candidate.id, `${candidate.first_name} ${candidate.last_name}`)} style={{ ...styles.actionBtn, color: "#ef4444" }} title="Delete">
                    <FiTrash2 />
                  </button>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
        
        {filteredCandidates.length === 0 && (
          <div style={styles.emptyState}>
            <p>No candidates found</p>
          </div>
        )}
      </div>

      {/* Add/Edit Modal */}
      <AnimatePresence>
        {showForm && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={styles.modalOverlay}
            onClick={() => setShowForm(false)}
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              style={styles.modal}
              onClick={(e) => e.stopPropagation()}
            >
              <div style={styles.modalHeader}>
                <h2>{editing ? "Edit Candidate" : "Add New Candidate"}</h2>
                <button onClick={() => setShowForm(false)} style={styles.closeBtn}><FiX /></button>
              </div>
              
              <form onSubmit={handleSubmit} style={styles.modalForm}>
                <div style={styles.formRow}>
                  <input type="text" placeholder="First Name *" value={form.first_name} onChange={(e) => setForm({ ...form, first_name: e.target.value })} style={styles.formInput} required />
                  <input type="text" placeholder="Last Name *" value={form.last_name} onChange={(e) => setForm({ ...form, last_name: e.target.value })} style={styles.formInput} required />
                </div>
                
                <div style={styles.formRow}>
                  <input type="email" placeholder="Email *" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} style={styles.formInput} required />
                  <input type="tel" placeholder="Phone" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} style={styles.formInput} />
                </div>
                
                <div style={styles.formRow}>
                  <input type="text" placeholder="Position *" value={form.position} onChange={(e) => setForm({ ...form, position: e.target.value })} style={styles.formInput} required />
                  <input type="text" placeholder="Department" value={form.department} onChange={(e) => setForm({ ...form, department: e.target.value })} style={styles.formInput} />
                </div>
                
                <div style={styles.formRow}>
                  <select value={form.status} onChange={(e) => setForm({ ...form, status: e.target.value })} style={styles.formInput}>
                    <option value="PENDING">Pending</option>
                    <option value="INTERVIEW">Interview</option>
                    <option value="HIRED">Hired</option>
                    <option value="REJECTED">Rejected</option>
                  </select>
                  <input type="text" placeholder="Skills (comma separated)" value={form.skills} onChange={(e) => setForm({ ...form, skills: e.target.value })} style={styles.formInput} />
                </div>
                
                <textarea placeholder="Notes" value={form.notes} onChange={(e) => setForm({ ...form, notes: e.target.value })} style={styles.formTextarea} rows="3" />
                
                <div style={styles.modalActions}>
                  <button type="button" onClick={() => setShowForm(false)} style={styles.cancelBtn}>Cancel</button>
                  <button type="submit" style={styles.saveBtn}>{editing ? "Update" : "Save"}</button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

const styles = {
  container: { padding: "2rem" },
  header: { display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "2rem", flexWrap: "wrap", gap: "1rem" },
  title: { fontSize: "1.75rem", fontWeight: "bold" },
  headerActions: { display: "flex", gap: "1rem" },
  exportBtn: { backgroundColor: "#334155", color: "white", border: "none", padding: "0.5rem 1rem", borderRadius: "8px", cursor: "pointer", display: "flex", alignItems: "center", gap: "0.5rem" },
  addBtn: { backgroundColor: "#f97316", color: "white", border: "none", padding: "0.5rem 1rem", borderRadius: "8px", cursor: "pointer", display: "flex", alignItems: "center", gap: "0.5rem" },
  searchSection: { display: "flex", gap: "1rem", marginBottom: "2rem", flexWrap: "wrap" },
  searchBar: { flex: 1, position: "relative", maxWidth: "400px" },
  searchIcon: { position: "absolute", left: "12px", top: "50%", transform: "translateY(-50%)", color: "#94a3b8" },
  searchInput: { width: "100%", padding: "0.75rem 0.75rem 0.75rem 2.5rem", backgroundColor: "#1e293b", border: "1px solid #334155", borderRadius: "8px", color: "white" },
  filterGroup: { display: "flex", alignItems: "center", gap: "0.5rem", backgroundColor: "#1e293b", padding: "0.5rem 1rem", borderRadius: "8px" },
  filterIcon: { color: "#94a3b8" },
  filterSelect: { backgroundColor: "transparent", border: "none", color: "white", cursor: "pointer" },
  tableContainer: { backgroundColor: "#1e293b", borderRadius: "12px", overflow: "auto" },
  table: { width: "100%", borderCollapse: "collapse" },
  tableHeader: { borderBottom: "1px solid #334155" },
  tableHeader: { borderBottom: "1px solid #334155" },
  tableRow: { borderBottom: "1px solid #334155", transition: "background 0.2s" },
  cellName: { fontWeight: "500" },
  statusBadge: { padding: "0.25rem 0.75rem", borderRadius: "20px", fontSize: "0.75rem", fontWeight: "500", display: "inline-block" },
  actions: { display: "flex", gap: "0.5rem" },
  actionBtn: { background: "transparent", border: "none", color: "#94a3b8", cursor: "pointer", padding: "0.25rem", fontSize: "1rem" },
  emptyState: { padding: "3rem", textAlign: "center", color: "#94a3b8" },
  modalOverlay: { position: "fixed", inset: 0, backgroundColor: "rgba(0,0,0,0.7)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 1000 },
  modal: { backgroundColor: "#1e293b", borderRadius: "16px", width: "90%", maxWidth: "600px", maxHeight: "90vh", overflow: "auto" },
  modalHeader: { display: "flex", justifyContent: "space-between", alignItems: "center", padding: "1.5rem", borderBottom: "1px solid #334155" },
  closeBtn: { background: "transparent", border: "none", color: "#94a3b8", cursor: "pointer", fontSize: "1.25rem" },
  modalForm: { padding: "1.5rem", display: "flex", flexDirection: "column", gap: "1rem" },
  formRow: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" },
  formInput: { padding: "0.75rem", backgroundColor: "#0f172a", border: "1px solid #334155", borderRadius: "8px", color: "white" },
  formTextarea: { padding: "0.75rem", backgroundColor: "#0f172a", border: "1px solid #334155", borderRadius: "8px", color: "white", fontFamily: "inherit" },
  modalActions: { display: "flex", justifyContent: "flex-end", gap: "1rem", marginTop: "1rem" },
  cancelBtn: { padding: "0.5rem 1rem", backgroundColor: "#334155", border: "none", borderRadius: "8px", color: "white", cursor: "pointer" },
  saveBtn: { padding: "0.5rem 1rem", backgroundColor: "#f97316", border: "none", borderRadius: "8px", color: "white", cursor: "pointer" }
};
