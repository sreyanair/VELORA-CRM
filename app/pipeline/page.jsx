"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

import {
  FiUser,
  FiMail,
  FiPhone,
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

function Pipeline() {
  const [leads, setLeads] = useState([]);

  // Load leads from Dashboard
  useEffect(() => {
    const storedLeads =
      JSON.parse(localStorage.getItem("crm_leads")) || [];

    setLeads(storedLeads);
  }, []);

  // Dynamic Pipeline
  const pipelineData = {
    New: leads.filter(
      (lead) => lead.status === "New"
    ),

    Contacted: leads.filter(
      (lead) => lead.status === "Contacted"
    ),

    Qualified: leads.filter(
      (lead) => lead.status === "Qualified"
    ),

    Converted: leads.filter(
      (lead) => lead.status === "Converted"
    ),
  };

  const getColumnStyle = (status) => {
    switch (status) {
      case "New":
        return "#a855f7";

      case "Contacted":
        return "#3b82f6";

      case "Qualified":
        return "#22c55e";

      case "Converted":
        return "#f59e0b";

      default:
        return "#fff";
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

          <p style={logoSub}>
            Lead Management CRM
          </p>

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
              <div style={activeNavItem}>
                Pipeline
              </div>
            </Link>
          </div>
        </div>
      </aside>

      {/* Main */}
      <main style={mainContent}>
        {/* Header */}
        <div
          style={{
            marginBottom: "36px",
          }}
        >
          <h1
            style={{
              fontSize: "38px",
              marginBottom: "10px",
            }}
          >
            Sales Pipeline
          </h1>

          <p
            style={{
              color: "#94a3b8",
              fontSize: "15px",
            }}
          >
            Real-time lead workflow tracking
          </p>
        </div>

        {/* Pipeline */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns:
              "repeat(4,minmax(280px,1fr))",
            gap: "24px",
            alignItems: "start",
          }}
        >
          {Object.entries(pipelineData).map(
            ([status, leads]) => (
              <div
                key={status}
                style={{
                  background:
                    "rgba(255,255,255,0.05)",
                  border:
                    "1px solid rgba(255,255,255,0.08)",
                  borderRadius: "28px",
                  padding: "20px",
                  backdropFilter:
                    "blur(20px)",
                  minHeight: "650px",
                }}
              >
                {/* Column Header */}
                <div
                  style={{
                    display: "flex",
                    justifyContent:
                      "space-between",
                    alignItems: "center",
                    marginBottom: "22px",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "12px",
                    }}
                  >
                    <div
                      style={{
                        width: "14px",
                        height: "14px",
                        borderRadius: "50%",
                        background:
                          getColumnStyle(
                            status
                          ),
                      }}
                    />

                    <h3
                      style={{
                        margin: 0,
                        fontSize: "18px",
                      }}
                    >
                      {status}
                    </h3>
                  </div>

                  <span
                    style={{
                      background:
                        "rgba(255,255,255,0.08)",
                      padding:
                        "6px 12px",
                      borderRadius:
                        "999px",
                      fontSize: "13px",
                    }}
                  >
                    {leads.length}
                  </span>
                </div>

                {/* Cards */}
                <div
                  style={{
                    display: "flex",
                    flexDirection:
                      "column",
                    gap: "18px",
                  }}
                >
                  {leads.map(
                    (lead, index) => (
                      <motion.div
                        key={index}
                        whileHover={{
                          y: -6,
                          scale: 1.02,
                        }}
                        transition={{
                          duration: 0.2,
                        }}
                        style={{
                          background:
                            "rgba(255,255,255,0.08)",
                          border:
                            "1px solid rgba(255,255,255,0.08)",
                          borderRadius:
                            "22px",
                          padding: "20px",
                          cursor: "pointer",
                          boxShadow:
                            "0 10px 30px rgba(0,0,0,0.2)",
                        }}
                      >
                        {/* Avatar */}
                        <div
                          style={{
                            width: "56px",
                            height: "56px",
                            borderRadius:
                              "18px",
                            background:
                              "linear-gradient(135deg,#7c3aed 0%,#4f46e5 100%)",
                            display: "flex",
                            alignItems:
                              "center",
                            justifyContent:
                              "center",
                            marginBottom:
                              "18px",
                            fontSize:
                              "22px",
                          }}
                        >
                          <FiUser />
                        </div>

                        {/* Lead Info */}
                        <h2
                          style={{
                            margin: 0,
                            fontSize:
                              "20px",
                          }}
                        >
                          {lead.name}
                        </h2>

                        <p
                          style={{
                            color:
                              "#a5b4fc",
                            marginTop:
                              "8px",
                            marginBottom:
                              "18px",
                          }}
                        >
                          {lead.company}
                        </p>

                        <div
                          style={{
                            display:
                              "flex",
                            flexDirection:
                              "column",
                            gap: "12px",
                            color:
                              "#cbd5e1",
                            fontSize:
                              "14px",
                          }}
                        >
                          <div
                            style={{
                              display:
                                "flex",
                              alignItems:
                                "center",
                              gap: "10px",
                            }}
                          >
                            <FiMail />
                            {lead.email}
                          </div>

                          <div
                            style={{
                              display:
                                "flex",
                              alignItems:
                                "center",
                              gap: "10px",
                            }}
                          >
                            <FiPhone />
                            {lead.phone}
                          </div>
                        </div>

                        {/* Footer */}
                        <div
                          style={{
                            marginTop:
                              "20px",
                            display:
                              "flex",
                            justifyContent:
                              "space-between",
                            alignItems:
                              "center",
                          }}
                        >
                          <span
                            style={{
                              padding:
                                "8px 14px",
                              borderRadius:
                                "999px",
                              background:
                                "rgba(255,255,255,0.08)",
                              fontSize:
                                "12px",
                            }}
                          >
                            {lead.status}
                          </span>

                          <button
                            style={{
                              border:
                                "none",
                              padding:
                                "10px 16px",
                              borderRadius:
                                "14px",
                              background:
                                "linear-gradient(135deg,#7c3aed 0%,#4f46e5 100%)",
                              color:
                                "#fff",
                              cursor:
                                "pointer",
                              fontWeight:
                                "600",
                            }}
                          >
                            Open
                          </button>
                        </div>
                      </motion.div>
                    )
                  )}

                  {/* Empty State */}
                  {leads.length === 0 && (
                    <div
                      style={{
                        textAlign: "center",
                        color: "#94a3b8",
                        marginTop: "40px",
                      }}
                    >
                      No leads yet
                    </div>
                  )}
                </div>
              </div>
            )
          )}
        </div>
      </main>
    </div>
  );
}

export default Pipeline;