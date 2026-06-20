"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  FunnelChart,
  Funnel,
  LabelList,
} from "recharts";

import {
  pageStyle,
  sidebar,
  mainContent,
  navContainer,
  navItem,
  activeNavItem,
  logo,
  logoSub,
  statGrid,
  statCard,
  orb1,
  orb2,
  cardStyle,
} from "../style";

function Analytics() {
  const [leads, setLeads] = useState([]);

  // LOAD REAL CRM DATA
  useEffect(() => {
    const storedLeads = JSON.parse(
      localStorage.getItem("crm_leads") || "[]"
    );

    setLeads(storedLeads);
  }, []);

  // DYNAMIC COUNTS
  const totalLeads = leads.length;

  const newLeads = leads.filter(
    (lead) => lead.status === "New"
  ).length;

  const contacted = leads.filter(
    (lead) => lead.status === "Contacted"
  ).length;

  const qualified = leads.filter(
    (lead) => lead.status === "Qualified"
  ).length;

  const converted = leads.filter(
    (lead) => lead.status === "Converted"
  ).length;

  const lost = leads.filter(
    (lead) => lead.status === "Lost"
  ).length;

  const conversionRate =
    totalLeads > 0
      ? ((converted / totalLeads) * 100).toFixed(1)
      : 0;

  // PIE CHART DATA
  const pieData = [
    {
      name: "New",
      value: newLeads,
    },

    {
      name: "Contacted",
      value: contacted,
    },

    {
      name: "Qualified",
      value: qualified,
    },

    {
      name: "Converted",
      value: converted,
    },

    {
      name: "Lost",
      value: lost,
    },
  ];

  // FUNNEL DATA
  const funnelData = [
    {
      value: newLeads,
      name: "New",
    },

    {
      value: contacted,
      name: "Contacted",
    },

    {
      value: qualified,
      name: "Qualified",
    },

    {
      value: converted,
      name: "Converted",
    },
  ];

  const COLORS = [
    "#8b5cf6",
    "#3b82f6",
    "#06b6d4",
    "#10b981",
    "#ef4444",
  ];

  return (
    <div style={pageStyle}>
      <div style={orb1}></div>
      <div style={orb2}></div>

      {/* SIDEBAR */}
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
              <div style={activeNavItem}>
                Analytics
              </div>
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

      {/* MAIN */}
      <main style={mainContent}>
        <h1
          style={{
            fontSize: "38px",
            marginBottom: "12px",
          }}
        >
          Analytics Dashboard
        </h1>

        <p
          style={{
            color: "#94a3b8",
            marginBottom: "32px",
          }}
        >
          Real-time CRM insights and lead
          performance metrics
        </p>

        {/* STATS */}
        <div style={statGrid}>
          <div style={statCard}>
            <h3>Total Leads</h3>

            <p
              style={{
                fontSize: "34px",
                fontWeight: "700",
              }}
            >
              {totalLeads}
            </p>
          </div>

          <div style={statCard}>
            <h3>Converted</h3>

            <p
              style={{
                fontSize: "34px",
                fontWeight: "700",
              }}
            >
              {converted}
            </p>
          </div>

          <div style={statCard}>
            <h3>Qualified</h3>

            <p
              style={{
                fontSize: "34px",
                fontWeight: "700",
              }}
            >
              {qualified}
            </p>
          </div>

          <div style={statCard}>
            <h3>Conversion Rate</h3>

            <p
              style={{
                fontSize: "34px",
                fontWeight: "700",
              }}
            >
              {conversionRate}%
            </p>
          </div>
        </div>

        {/* CHART SECTION */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "28px",
            marginTop: "40px",
          }}
        >
          {/* FUNNEL */}
          {/* CUSTOM FUNNEL */}
<div style={cardStyle}>
  <h2
    style={{
      marginBottom: "28px",
    }}
  >
    Sales Funnel
  </h2>

  <div
    style={{
      display: "flex",
      flexDirection: "column",
      gap: "18px",
      marginTop: "20px",
    }}
  >
    {/* NEW */}
    <div
      style={{
        width: "100%",
        padding: "20px",
        background:
          "linear-gradient(90deg,#8b5cf6,#a855f7)",
        clipPath:
          "polygon(5% 0%, 100% 0%, 95% 100%, 0% 100%)",
        color: "white",
        fontWeight: "700",
        fontSize: "18px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <span>New Leads</span>

      <span>{newLeads}</span>
    </div>

    {/* CONTACTED */}
    <div
      style={{
        width: "88%",
        margin: "0 auto",
        padding: "20px",
        background:
          "linear-gradient(90deg,#ec4899,#d946ef)",
        clipPath:
          "polygon(5% 0%, 100% 0%, 95% 100%, 0% 100%)",
        color: "white",
        fontWeight: "700",
        fontSize: "18px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <span>Contacted</span>

      <span>{contacted}</span>
    </div>

    {/* QUALIFIED */}
    <div
      style={{
        width: "74%",
        margin: "0 auto",
        padding: "20px",
        background:
          "linear-gradient(90deg,#06b6d4,#3b82f6)",
        clipPath:
          "polygon(5% 0%, 100% 0%, 95% 100%, 0% 100%)",
        color: "white",
        fontWeight: "700",
        fontSize: "18px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <span>Qualified</span>

      <span>{qualified}</span>
    </div>

    {/* CONVERTED */}
    <div
      style={{
        width: "58%",
        margin: "0 auto",
        padding: "20px",
        background:
          "linear-gradient(90deg,#3b82f6,#6366f1)",
        clipPath:
          "polygon(5% 0%, 100% 0%, 95% 100%, 0% 100%)",
        color: "white",
        fontWeight: "700",
        fontSize: "18px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <span>Converted</span>

      <span>{converted}</span>
    </div>

    {/* LOST */}
    <div
      style={{
        width: "42%",
        margin: "0 auto",
        padding: "18px",
        background:
          "linear-gradient(90deg,#64748b,#94a3b8)",
        clipPath:
          "polygon(5% 0%, 100% 0%, 95% 100%, 0% 100%)",
        color: "white",
        fontWeight: "700",
        fontSize: "16px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <span>Lost</span>

      <span>{lost}</span>
    </div>
  </div>
</div>

          {/* PIE CHART */}
          <div style={cardStyle}>
            <h2
              style={{
                marginBottom: "20px",
              }}
            >
              Lead Distribution
            </h2>

            <div
              style={{
                width: "100%",
                height: 400,
              }}
            >
              <ResponsiveContainer>
                <PieChart>
                  <Pie
  data={pieData}
  cx="50%"
  cy="50%"
  outerRadius={130}
  dataKey="value"
  label={({ name, value }) =>
    `${name} - ${value}`
  }
>
                    {pieData.map(
                      (entry, index) => (
                        <Cell
                          key={`cell-${index}`}
                          fill={
                            COLORS[
                              index % COLORS.length
                            ]
                          }
                        />
                      )
                    )}
                  </Pie>

                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* INSIGHTS */}
        <div
          style={{
            ...cardStyle,
            marginTop: "30px",
          }}
        >
          <h2
            style={{
              marginBottom: "18px",
            }}
          >
            CRM Insights
          </h2>

          <div
            style={{
              display: "grid",
              gridTemplateColumns:
                "repeat(2,1fr)",
              gap: "18px",
            }}
          >
            <div
              style={{
                padding: "20px",
                borderRadius: "16px",
                background:
                  "rgba(255,255,255,0.04)",
              }}
            >
              <h3>Total Leads</h3>

              <p
                style={{
                  fontSize: "28px",
                  fontWeight: "700",
                }}
              >
                {totalLeads}
              </p>
            </div>

            <div
              style={{
                padding: "20px",
                borderRadius: "16px",
                background:
                  "rgba(255,255,255,0.04)",
              }}
            >
              <h3>Conversion Rate</h3>

              <p
                style={{
                  fontSize: "28px",
                  fontWeight: "700",
                }}
              >
                {conversionRate}%
              </p>
            </div>

            <div
              style={{
                padding: "20px",
                borderRadius: "16px",
                background:
                  "rgba(255,255,255,0.04)",
              }}
            >
              <h3>Qualified Leads</h3>

              <p
                style={{
                  fontSize: "28px",
                  fontWeight: "700",
                }}
              >
                {qualified}
              </p>
            </div>

            <div
              style={{
                padding: "20px",
                borderRadius: "16px",
                background:
                  "rgba(255,255,255,0.04)",
              }}
            >
              <h3>Lost Leads</h3>

              <p
                style={{
                  fontSize: "28px",
                  fontWeight: "700",
                }}
              >
                {lost}
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default Analytics;