export const pageStyle = {
  minHeight: "100vh",
  display: "flex",
  background:
    "linear-gradient(135deg,#09090f 0%,#111827 50%,#1e1b4b 100%)",
  fontFamily:
    'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
  color: "white",
  overflow: "hidden",
};

export const input = {
  width: "100%",
  padding: "16px",
  borderRadius: "18px",
  border: "1px solid rgba(255,255,255,0.08)",
  background: "rgba(17,24,39,0.95)",
  color: "#fff",
  outline: "none",
  fontSize: "14px",
};

export const orb1 = {
  position: "fixed" as const,
  width: "500px",
  height: "500px",
  borderRadius: "50%",
  background: "rgba(99,102,241,0.18)",
  filter: "blur(120px)",
  top: "-150px",
  left: "-120px",
};

export const orb2 = {
  position: "fixed" as const,
  width: "400px",
  height: "400px",
  borderRadius: "50%",
  background: "rgba(168,85,247,0.16)",
  filter: "blur(120px)",
  bottom: "-120px",
  right: "-80px",
};

export const sidebar = {
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

export const logo = {
  margin: 0,
  fontSize: "30px",
  fontWeight: 700,
  letterSpacing: "-0.04em",
};

export const logoSub = {
  color: "#94a3b8",
  marginTop: "6px",
  fontSize: "13px",
};

export const navContainer = {
  marginTop: "50px",
  display: "flex",
  flexDirection: "column" as const,
  gap: "12px",
};

export const navItem = {
  padding: "14px 18px",
  borderRadius: "16px",
  color: "#cbd5e1",
  cursor: "pointer",
  transition: "0.2s",
};

export const activeNavItem = {
  ...navItem,
  background: "rgba(255,255,255,0.1)",
  border: "1px solid rgba(255,255,255,0.12)",
  color: "#fff",
};

export const mainContent = {
  flex: 1,
  padding: "32px",
  zIndex: 2,
  overflowY: "auto" as const,
};

export const cardStyle = {
  background: "rgba(255,255,255,0.06)",
  border: "1px solid rgba(255,255,255,0.08)",
  backdropFilter: "blur(20px)",
  borderRadius: "24px",
  padding: "24px",
  marginTop: "24px",
};

export const statGrid = {
  display: "grid",
  gridTemplateColumns: "repeat(4,1fr)",
  gap: "20px",
  marginTop: "24px",
};

export const statCard = {
  padding: "24px",
  borderRadius: "24px",
  background: "rgba(255,255,255,0.08)",
  border: "1px solid rgba(255,255,255,0.08)",
};

export const pipelineGrid = {
  display: "grid",
  gridTemplateColumns: "repeat(4,1fr)",
  gap: "20px",
  marginTop: "24px",
};

export const pipelineColumn = {
  background: "rgba(255,255,255,0.06)",
  borderRadius: "24px",
  padding: "20px",
  minHeight: "300px",
  border: "1px solid rgba(255,255,255,0.08)",
};

export const pipelineCard = {
  background: "rgba(255,255,255,0.08)",
  padding: "16px",
  borderRadius: "16px",
  marginTop: "16px",
};

export const leadCard = {
  padding: "18px",
  borderBottom: "1px solid rgba(255,255,255,0.08)",
};