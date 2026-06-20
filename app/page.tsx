"use client";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FiSearch,
  FiPlus,
  FiUsers,
  FiTrendingUp,
  FiCheckCircle,
  FiTrash2,
  FiEdit2,
  FiX,
} from "react-icons/fi";

interface Lead {
  _id?: string;
  name: string;
  email: string;
  phone: string;
  company: string;
  status: string;
  notes: string;
  createdAt?: string;
}

export default function Home() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [search, setSearch] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("All");
  const [showModal, setShowModal] = useState(false);
  const [editingLead, setEditingLead] = useState<Lead | null>(null);

  const [formData, setFormData] = useState<Lead>({
    name: "",
    email: "",
    phone: "",
    company: "",
    status: "New",
    notes: "",
  });

 useEffect(() => {
  const storedLeads = JSON.parse(
    localStorage.getItem("crm_leads") || "[]"
  );

  if (storedLeads.length > 0) {
    setLeads(storedLeads);
  } else {
    const defaultLeads = [
      {
        _id: "1",
        name: "Sophia Carter",
        email: "sophia@lumina.com",
        phone: "+1 555-0192",
        company: "Lumina Labs",
        status: "Qualified",
        notes: "Interested in enterprise plan",
        createdAt: "2026-06-06",
      },
      {
        _id: "2",
        name: "Daniel Lee",
        email: "daniel@nova.io",
        phone: "+1 555-0876",
        company: "NovaTech",
        status: "Contacted",
        notes: "Waiting for response",
        createdAt: "2026-06-05",
      },
      {
        _id: "3",
        name: "Emily Stone",
        email: "emily@velocity.ai",
        phone: "+1 555-0123",
        company: "Velocity AI",
        status: "Converted",
        notes: "Converted successfully",
        createdAt: "2026-06-04",
      },
    ];

    setLeads(defaultLeads);

    localStorage.setItem(
      "crm_leads",
      JSON.stringify(defaultLeads)
    );
  }
}, []);

useEffect(() => {
  // Prevent overwriting on initial empty render
  if (leads.length > 0) {
    localStorage.setItem(
      "crm_leads",
      JSON.stringify(leads)
    );
  }
}, [leads]);

  const filteredLeads = useMemo(() => {
    return leads.filter((lead) => {
      const matchesSearch =
        lead.name.toLowerCase().includes(search.toLowerCase()) ||
        lead.email.toLowerCase().includes(search.toLowerCase()) ||
        lead.company.toLowerCase().includes(search.toLowerCase());

      const matchesStatus =
        selectedStatus === "All" || lead.status === selectedStatus;

      return matchesSearch && matchesStatus;
    });
  }, [leads, search, selectedStatus]);

  const resetForm = () => {
    setFormData({
      name: "",
      email: "",
      phone: "",
      company: "",
      status: "New",
      notes: "",
    });
  };

  const handleSubmit = () => {
    if (editingLead) {
      setLeads((prev) =>
        prev.map((lead) =>
          lead._id === editingLead._id ? { ...formData } : lead
        )
      );
    } else {
      setLeads((prev) => [
        {
          ...formData,
          _id: Date.now().toString(),
          createdAt: new Date().toISOString(),
        },
        ...prev,
      ]);
    }

    resetForm();
    setEditingLead(null);
    setShowModal(false);
  };

  const handleDelete = (id?: string) => {
  const confirmDelete = window.confirm(
    "Are you sure you want to delete this lead?"
  );

  if (!confirmDelete) return;

  setLeads((prev) => prev.filter((lead) => lead._id !== id));
};

  const openEditModal = (lead: Lead) => {
    setEditingLead(lead);
    setFormData(lead);
    setShowModal(true);
  };

  const getStatusStyle = (status: string) => {
    switch (status) {
      case "New":
        return {
          color: "#c084fc",
          background: "rgba(192,132,252,0.15)",
        };

      case "Contacted":
        return {
          color: "#fde68a",
          background: "rgba(253,230,138,0.15)",
        };

      case "Qualified":
        return {
          color: "#93c5fd",
          background: "rgba(147,197,253,0.15)",
        };

      case "Converted":
        return {
          color: "#6ee7b7",
          background: "rgba(110,231,183,0.15)",
        };

      case "Lost":
        return {
          color: "#fca5a5",
          background: "rgba(252,165,165,0.15)",
        };

      default:
        return {
          color: "#fff",
          background: "rgba(255,255,255,0.08)",
        };
    }
  };

  const totalLeads = leads.length;
  const converted = leads.filter((l) => l.status === "Converted").length;
  const qualified = leads.filter((l) => l.status === "Qualified").length;
  const contacted = leads.filter((l) => l.status === "Contacted").length;

  return (
    <div style={pageStyle}>
      {/* Background Orbs */}
      <div style={orb1}></div>
      <div style={orb2}></div>

      {/* Sidebar */}
      <aside style={sidebar}>
        <div>
          <h1 style={logo}>VELORA</h1>
          <p style={logoSub}>Lead Management CRM</p>
        </div>

        <div style={navContainer}>
  <Link
    href="/"
    style={{ textDecoration: "none" }}
  >
    <div style={activeNavItem}>Dashboard</div>
  </Link>

  <Link
    href="/leads"
    style={{ textDecoration: "none" }}
  >
    <div style={navItem}>Leads</div>
  </Link>

  <Link
    href="/analytics"
    style={{ textDecoration: "none" }}
  >
    <div style={navItem}>Analytics</div>
  </Link>

  <Link
    href="/pipeline"
    style={{ textDecoration: "none" }}
  >
    <div style={navItem}>Pipeline</div>
  </Link>
</div>

        <button
          style={newLeadButton}
          onClick={() => {
            resetForm();
            setEditingLead(null);
            setShowModal(true);
          }}
        >
          <FiPlus />
          Add New Lead
        </button>
      </aside>

      {/* Main */}
      <main style={mainContent}>
        {/* Topbar */}
        <div style={topbar}>
          <div>
            <h2 style={dashboardTitle}>Welcome back 👋</h2>
            <p style={dashboardSubtitle}>
              Here's your lead pipeline overview.
            </p>
          </div>

          <div style={searchWrapper}>
            <FiSearch color="#94a3b8" />
            <input
              placeholder="Search leads..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              style={searchInput}
            />
          </div>
        </div>

        {/* Stats */}
        <div style={statsGrid}>
          <StatCard
            icon={<FiUsers />}
            title="Total Leads"
            value={totalLeads}
          />

          <StatCard
            icon={<FiTrendingUp />}
            title="Qualified"
            value={qualified}
          />

          <StatCard
            icon={<FiCheckCircle />}
            title="Converted"
            value={converted}
          />

          <StatCard
            icon={<FiUsers />}
            title="Contacted"
            value={contacted}
          />
        </div>

        {/* Filters */}
        <div style={filterRow}>
          {[
            "All",
            "New",
            "Contacted",
            "Qualified",
            "Converted",
            "Lost",
          ].map((status) => (
            <button
              key={status}
              style={{
                ...filterButton,
                ...(selectedStatus === status
                  ? activeFilterButton
                  : {}),
              }}
              onClick={() => setSelectedStatus(status)}
            >
              {status}
            </button>
          ))}
        </div>

        {/* Table */}
        <div style={tableCard}>
          <div style={tableHeader}>
            <h3 style={tableTitle}>Lead Directory</h3>
          </div>

          <div style={{ overflowX: "auto" }}>
            <table style={table}>
              <thead>
                <tr>
                  <th style={th}>Lead</th>
                  <th style={th}>Company</th>
                  <th style={th}>Status</th>
                  <th style={th}>Created</th>
                  <th style={th}>Actions</th>
                </tr>
              </thead>

              <tbody>
                {filteredLeads.map((lead, index) => (
                  <motion.tr
                    key={lead._id}
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                    style={tr}
                  >
                    <td style={td}>
                      <div style={leadName}>{lead.name}</div>
                      <div style={leadMeta}>{lead.email}</div>
                      <div style={leadMeta}>{lead.phone}</div>
                    </td>

                    <td style={td}>{lead.company}</td>

                    <td style={td}>
                      <span
                        style={{
                          ...statusBadge,
                          ...getStatusStyle(lead.status),
                        }}
                      >
                        {lead.status}
                      </span>
                    </td>

                    <td style={td}>
                      {lead.createdAt?.slice(0, 10)}
                    </td>

                    <td style={td}>
                      <div style={actionRow}>
                        <button
                          style={iconButton}
                          onClick={() => openEditModal(lead)}
                        >
                          <FiEdit2 />
                        </button>

                        <button
                          style={iconButtonDanger}
                          onClick={() => handleDelete(lead._id)}
                        >
                          <FiTrash2 />
                        </button>
                      </div>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>

      {/* Modal */}
      <AnimatePresence>
        {showModal && (
          <motion.div
            style={modalOverlay}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              style={modal}
              initial={{ opacity: 0, scale: 0.9, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9 }}
            >
              <div style={modalHeader}>
                <h2 style={modalTitle}>
                  {editingLead ? "Edit Lead" : "Add New Lead"}
                </h2>

                <button
                  style={closeButton}
                  onClick={() => setShowModal(false)}
                >
                  <FiX />
                </button>
              </div>

              <div style={formGrid}>
                <input
                  placeholder="Full Name"
                  style={input}
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      name: e.target.value,
                    })
                  }
                />

                <input
                  placeholder="Email"
                  style={input}
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      email: e.target.value,
                    })
                  }
                />

                <input
                  placeholder="Phone"
                  style={input}
                  value={formData.phone}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      phone: e.target.value,
                    })
                  }
                />

                <input
                  placeholder="Company"
                  style={input}
                  value={formData.company}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      company: e.target.value,
                    })
                  }
                />

                <select
  style={{
    ...input,
    backgroundColor: "#111827",
    color: "#ffffff",
  }}
  value={formData.status}
  onChange={(e) =>
    setFormData({
      ...formData,
      status: e.target.value,
    })
  }
>
  <option value="New">New</option>
  <option value="Contacted">Contacted</option>
  <option value="Qualified">Qualified</option>
  <option value="Converted">Converted</option>
  <option value="Lost">Lost</option>
</select>

                <textarea
                  placeholder="Notes"
                  style={textarea}
                  value={formData.notes}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      notes: e.target.value,
                    })
                  }
                />
              </div>

              <button style={submitButton} onClick={handleSubmit}>
                {editingLead ? "Save Changes" : "Create Lead"}
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ---------- COMPONENT ---------- */

function StatCard({
  icon,
  title,
  value,
}: {
  icon: React.ReactNode;
  title: string;
  value: number;
}) {
  return (
    <motion.div
      whileHover={{ y: -5 }}
      transition={{ duration: 0.2 }}
      style={statCard}
    >
      <div style={statIcon}>{icon}</div>

      <div>
        <div style={statTitle}>{title}</div>
        <div style={statValue}>{value}</div>
      </div>
    </motion.div>
  );
}

/* ---------- STYLES ---------- */

const pageStyle = {
  minHeight: "100vh",
  display: "flex",
  background:
    "linear-gradient(135deg,#09090f 0%,#111827 50%,#1e1b4b 100%)",
  fontFamily:
    'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
  color: "white",
  overflow: "hidden",
};

const orb1 = {
  position: "fixed" as const,
  width: "500px",
  height: "500px",
  borderRadius: "50%",
  background: "rgba(99,102,241,0.18)",
  filter: "blur(120px)",
  top: "-150px",
  left: "-120px",
};

const orb2 = {
  position: "fixed" as const,
  width: "400px",
  height: "400px",
  borderRadius: "50%",
  background: "rgba(168,85,247,0.16)",
  filter: "blur(120px)",
  bottom: "-120px",
  right: "-80px",
};

const sidebar = {
  width: "270px",
  padding: "32px 24px",
  borderRight: "1px solid rgba(255,255,255,0.08)",
  background: "rgba(255,255,255,0.04)",
  backdropFilter: "blur(20px)",
  display: "flex",
  flexDirection: "column" as const,
  justifyContent: "space-between",
  zIndex: 2,
};

const logo = {
  margin: 0,
  fontSize: "30px",
  fontWeight: 700,
  letterSpacing: "-0.04em",
};

const logoSub = {
  color: "#94a3b8",
  marginTop: "6px",
  fontSize: "13px",
};

const navContainer = {
  marginTop: "50px",
  display: "flex",
  flexDirection: "column" as const,
  gap: "12px",
};

const navItem = {
  padding: "14px 18px",
  borderRadius: "16px",
  color: "#cbd5e1",
  cursor: "pointer",
  transition: "0.2s",
};

const activeNavItem = {
  ...navItem,
  background: "rgba(255,255,255,0.1)",
  border: "1px solid rgba(255,255,255,0.12)",
  color: "#fff",
};

const newLeadButton = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  gap: "10px",
  width: "100%",
  padding: "16px",
  borderRadius: "18px",
  border: "none",
  cursor: "pointer",
  color: "#fff",
  fontWeight: 600,
  fontSize: "14px",
  background:
    "linear-gradient(135deg,#7c3aed 0%,#4f46e5 100%)",
  boxShadow: "0 15px 40px rgba(99,102,241,0.35)",
};

const mainContent = {
  flex: 1,
  padding: "32px",
  zIndex: 2,
  overflowY: "auto" as const,
};

const topbar = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  marginBottom: "32px",
};

const dashboardTitle = {
  margin: 0,
  fontSize: "32px",
  fontWeight: 700,
};

const dashboardSubtitle = {
  marginTop: "8px",
  color: "#94a3b8",
};

const searchWrapper = {
  display: "flex",
  alignItems: "center",
  gap: "10px",
  padding: "14px 18px",
  width: "340px",
  borderRadius: "18px",
  background: "rgba(255,255,255,0.08)",
  border: "1px solid rgba(255,255,255,0.08)",
  backdropFilter: "blur(16px)",
};

const searchInput = {
  background: "transparent",
  border: "none",
  outline: "none",
  color: "white",
  width: "100%",
  fontSize: "14px",
};

const statsGrid = {
  display: "grid",
  gridTemplateColumns: "repeat(4,1fr)",
  gap: "22px",
  marginBottom: "28px",
};

const statCard = {
  padding: "24px",
  borderRadius: "28px",
  background: "rgba(255,255,255,0.08)",
  border: "1px solid rgba(255,255,255,0.08)",
  backdropFilter: "blur(20px)",
  display: "flex",
  alignItems: "center",
  gap: "18px",
  boxShadow: "0 20px 50px rgba(0,0,0,0.25)",
};

const statIcon = {
  width: "52px",
  height: "52px",
  borderRadius: "18px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  background:
    "linear-gradient(135deg,#7c3aed 0%,#4f46e5 100%)",
  fontSize: "20px",
};

const statTitle = {
  color: "#94a3b8",
  fontSize: "14px",
};

const statValue = {
  marginTop: "4px",
  fontSize: "28px",
  fontWeight: 700,
};

const filterRow = {
  display: "flex",
  gap: "12px",
  marginBottom: "24px",
  flexWrap: "wrap" as const,
};

const filterButton = {
  padding: "10px 18px",
  borderRadius: "999px",
  border: "1px solid rgba(255,255,255,0.08)",
  background: "rgba(255,255,255,0.06)",
  color: "#cbd5e1",
  cursor: "pointer",
  transition: "0.2s",
};

const activeFilterButton = {
  background:
    "linear-gradient(135deg,#7c3aed 0%,#4f46e5 100%)",
  color: "#fff",
};

const tableCard = {
  padding: "28px",
  borderRadius: "30px",
  background: "rgba(255,255,255,0.08)",
  border: "1px solid rgba(255,255,255,0.08)",
  backdropFilter: "blur(24px)",
  boxShadow: "0 20px 50px rgba(0,0,0,0.25)",
};

const tableHeader = {
  marginBottom: "22px",
};

const tableTitle = {
  margin: 0,
  fontSize: "22px",
};

const table = {
  width: "100%",
  borderCollapse: "collapse" as const,
};

const th = {
  textAlign: "left" as const,
  paddingBottom: "18px",
  color: "#94a3b8",
  fontSize: "13px",
  fontWeight: 600,
};

const tr = {
  borderTop: "1px solid rgba(255,255,255,0.06)",
};

const td = {
  padding: "22px 0",
};

const leadName = {
  fontWeight: 600,
  fontSize: "15px",
};

const leadMeta = {
  marginTop: "4px",
  color: "#94a3b8",
  fontSize: "13px",
};

const statusBadge = {
  padding: "10px 16px",
  borderRadius: "999px",
  fontSize: "12px",
  fontWeight: 600,
};

const actionRow = {
  display: "flex",
  gap: "10px",
};

const iconButton = {
  width: "40px",
  height: "40px",
  borderRadius: "12px",
  border: "1px solid rgba(255,255,255,0.08)",
  background: "rgba(255,255,255,0.08)",
  color: "#fff",
  cursor: "pointer",
};

const iconButtonDanger = {
  ...iconButton,
  color: "#fca5a5",
};

const modalOverlay = {
  position: "fixed" as const,
  inset: 0,
  background: "rgba(0,0,0,0.55)",
  backdropFilter: "blur(10px)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  zIndex: 100,
};

const modal = {
  width: "560px",
  padding: "30px",
  borderRadius: "32px",
  background: "rgba(17,24,39,0.9)",
  border: "1px solid rgba(255,255,255,0.08)",
  backdropFilter: "blur(24px)",
};

const modalHeader = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  marginBottom: "24px",
};

const modalTitle = {
  margin: 0,
  fontSize: "24px",
};

const closeButton = {
  width: "42px",
  height: "42px",
  borderRadius: "14px",
  border: "none",
  background: "rgba(255,255,255,0.08)",
  color: "#fff",
  cursor: "pointer",
};

const formGrid = {
  display: "flex",
  flexDirection: "column" as const,
  gap: "16px",
};

const input = {
  width: "100%",
  padding: "16px",
  borderRadius: "18px",
  border: "1px solid rgba(255,255,255,0.08)",
  background: "rgba(255,255,255,0.06)",
  color: "#fff",
  outline: "none",
  fontSize: "14px",
};

const textarea = {
  ...input,
  minHeight: "120px",
  resize: "none" as const,
};

const submitButton = {
  marginTop: "24px",
  width: "100%",
  padding: "16px",
  borderRadius: "18px",
  border: "none",
  cursor: "pointer",
  color: "#fff",
  fontWeight: 600,
  fontSize: "15px",
  background:
    "linear-gradient(135deg,#7c3aed 0%,#4f46e5 100%)",
  boxShadow: "0 15px 40px rgba(99,102,241,0.35)",
};

