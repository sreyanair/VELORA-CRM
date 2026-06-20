"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";

import {
  FiSearch,
  FiMail,
  FiPhone,
  FiUser,
} from "react-icons/fi";

import {
  pageStyle,
  sidebar,
  mainContent,
  navContainer,
  navItem,
  activeNavItem,
  logo,
  logoSub,
  orb1,
  orb2,
} from "../style";

function Leads() {
  const [search, setSearch] = useState("");

  const [leads, setLeads] = useState([]);

useEffect(() => {
  const storedLeads = JSON.parse(
    localStorage.getItem("crm_leads") || "[]"
  );

  setLeads(storedLeads);
}, []);


  const filteredLeads = useMemo(() => {
  return leads.filter(
    (lead) =>
      lead.name
        .toLowerCase()
        .includes(search.toLowerCase()) ||

      lead.email
        .toLowerCase()
        .includes(search.toLowerCase()) ||

      lead.company
        .toLowerCase()
        .includes(search.toLowerCase())
  );
}, [leads, search]);

  const getStatusStyle = (status) => {
    switch (status) {
      case "New":
        return {
          background:
            "rgba(168,85,247,0.18)",
          color: "#d8b4fe",
        };

      case "Contacted":
        return {
          background:
            "rgba(59,130,246,0.18)",
          color: "#93c5fd",
        };

      case "Qualified":
        return {
          background:
            "rgba(34,197,94,0.18)",
          color: "#86efac",
        };

      default:
        return {
          background:
            "rgba(255,255,255,0.08)",
          color: "#fff",
        };
    }
  };

  return (
    <div style={pageStyle}>
      {/* Background */}
      <div style={orb1}></div>
      <div style={orb2}></div>

      {/* Sidebar */}
      <aside style={sidebar}>
        <div>
          <h1 style={logo}>VELORA</h1>
          <p style={logoSub}>Lead Management CRM</p>

          <div style={navContainer}>
            <Link
              href="/"
              style={{ textDecoration: "none" }}
            >
              <div style={navItem}>Dashboard</div>
            </Link>

            <Link
              href="/leads"
              style={{ textDecoration: "none" }}
            >
              <div style={activeNavItem}>Leads</div>
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
        </div>
      </aside>

      {/* Main */}
      <main style={mainContent}>
        {/* Header */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "30px",
          }}
        >
          <div>
            <h1
              style={{
                fontSize: "36px",
                margin: 0,
              }}
            >
              Leads Directory
            </h1>

            <p
              style={{
                color: "#94a3b8",
                marginTop: "8px",
              }}
            >
              Manage and track all your leads
            </p>
          </div>

          {/* Search */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "10px",
              padding: "14px 18px",
              width: "340px",
              borderRadius: "18px",
              background:
                "rgba(255,255,255,0.08)",
              border:
                "1px solid rgba(255,255,255,0.08)",
              backdropFilter: "blur(16px)",
            }}
          >
            <FiSearch color="#94a3b8" />

            <input
              placeholder="Search leads..."
              value={search}
              onChange={(e) =>
                setSearch(e.target.value)
              }
              style={{
                background: "transparent",
                border: "none",
                outline: "none",
                color: "white",
                width: "100%",
                fontSize: "14px",
              }}
            />
          </div>
        </div>

        {/* Leads Grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns:
              "repeat(auto-fit,minmax(320px,1fr))",
            gap: "24px",
          }}
        >
          {filteredLeads.map((lead, index) => (
            <motion.div
              key={index}
              whileHover={{
                y: -8,
                scale: 1.02,
              }}
              transition={{ duration: 0.2 }}
              style={{
                background:
                  "rgba(255,255,255,0.06)",
                border:
                  "1px solid rgba(255,255,255,0.08)",
                borderRadius: "28px",
                padding: "24px",
                backdropFilter: "blur(20px)",
                boxShadow:
                  "0 20px 40px rgba(0,0,0,0.25)",
              }}
            >
              {/* Top */}
              <div
                style={{
                  display: "flex",
                  justifyContent:
                    "space-between",
                  alignItems: "center",
                  marginBottom: "24px",
                }}
              >
                <div
                  style={{
                    width: "58px",
                    height: "58px",
                    borderRadius: "18px",
                    background:
                      "linear-gradient(135deg,#7c3aed 0%,#4f46e5 100%)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "22px",
                  }}
                >
                  <FiUser />
                </div>

                <span
                  style={{
                    padding:
                      "10px 16px",
                    borderRadius:
                      "999px",
                    fontSize: "12px",
                    fontWeight: "600",
                    ...getStatusStyle(
                      lead.status
                    ),
                  }}
                >
                  {lead.status}
                </span>
              </div>

              {/* Name */}
              <h2
                style={{
                  margin: 0,
                  fontSize: "22px",
                }}
              >
                {lead.name}
              </h2>

              <p
                style={{
                  color: "#a5b4fc",
                  marginTop: "8px",
                  marginBottom: "20px",
                }}
              >
                {lead.company}
              </p>

              {/* Info */}
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "14px",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "12px",
                    color: "#cbd5e1",
                  }}
                >
                  <FiMail />
                  {lead.email}
                </div>

                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "12px",
                    color: "#cbd5e1",
                  }}
                >
                  <FiPhone />
                  {lead.phone}
                </div>
              </div>

              {/* Footer */}
              <div
                style={{
                  marginTop: "24px",
                  display: "flex",
                  gap: "12px",
                }}
              >
                <button
                  style={{
                    flex: 1,
                    padding: "14px",
                    borderRadius: "16px",
                    border: "none",
                    cursor: "pointer",
                    background:
                      "linear-gradient(135deg,#7c3aed 0%,#4f46e5 100%)",
                    color: "#fff",
                    fontWeight: "600",
                  }}
                >
                  View Details
                </button>

                <button
                  style={{
                    width: "52px",
                    borderRadius: "16px",
                    border:
                      "1px solid rgba(255,255,255,0.08)",
                    background:
                      "rgba(255,255,255,0.08)",
                    color: "#fff",
                    cursor: "pointer",
                  }}
                >
                  ⋯
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </main>
    </div>
  );
}

export default Leads;