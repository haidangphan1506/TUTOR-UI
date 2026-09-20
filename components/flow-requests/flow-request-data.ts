import type {
  FlowDiagramBox,
  FlowDiagramBoxId,
  FlowRequestMethod,
  FlowRequestService,
} from "@/types";

/** Colour palette per HTTP method — matches the original HTML diagram. */
export const METHOD_TAG_STYLES: Record<
  FlowRequestMethod,
  { bg: string; text: string }
> = {
  GET: { bg: "#14532d", text: "#86efac" },
  POST: { bg: "#1e3a8a", text: "#93c5fd" },
  PUT: { bg: "#78350f", text: "#fcd34d" },
  DELETE: { bg: "#7f1d1d", text: "#fca5a5" },
  PATCH: { bg: "#581c87", text: "#d8b4fe" },
  SEND: { bg: "#78350f", text: "#fcd34d" },
};

/** Colour palette per backend service. */
export const SERVICE_STYLES: Record<
  FlowRequestService,
  { color: string; bg: string }
> = {
  "user-service": { color: "#10b981", bg: "#022c22" },
  "tutor-service": { color: "#f59e0b", bg: "#451a03" },
  "third-service": { color: "#ef4444", bg: "#450a0a" },
  direct: { color: "#6b7280", bg: "#1f2937" },
};

/** Method options for Select component. */
export const METHOD_OPTIONS = [
  { label: "GET", value: "GET" },
  { label: "POST", value: "POST" },
  { label: "PUT", value: "PUT" },
  { label: "PATCH", value: "PATCH" },
  { label: "DELETE", value: "DELETE" },
  { label: "SEND", value: "SEND" },
];

/** Service options for Select component. */
export const SERVICE_OPTIONS = [
  { label: "user-service", value: "user-service" },
  { label: "tutor-service", value: "tutor-service" },
  { label: "third-service", value: "third-service" },
  { label: "direct", value: "direct" },
];

/** Map a FlowRequestMethod to inline tag styles (for table cells). */
export function getMethodTagStyle(m: FlowRequestMethod): React.CSSProperties {
  const s = METHOD_TAG_STYLES[m] ?? METHOD_TAG_STYLES.GET;
  return { backgroundColor: s.bg, color: s.text };
}

/** Map a FlowRequestService to inline badge styles (for table cells). */
export function getServiceBadgeStyle(
  svc: FlowRequestService,
): React.CSSProperties {
  const s = SERVICE_STYLES[svc] ?? SERVICE_STYLES.direct;
  return { backgroundColor: s.bg, color: s.color };
}

/* ─── Network diagram — fixed topology nodes/layout/colors (port of the
   reference mockup, Main.dc.html) ─── */

/** Static metadata (label/icon/color) for each of the 6 diagram nodes. */
export const NODE_META: Omit<FlowDiagramBox, "groups" | "count">[] = [
  { id: "frontend", label: "Frontend", icon: "💻", color: "#8b5cf6", bg: "#2e1065" },
  { id: "gateway", label: "Gateway", icon: "🌐", color: "#3b82f6", bg: "#172554" },
  { id: "kafka", label: "Kafka Broker", icon: "📡", color: "#a855f7", bg: "#3b0764" },
  { id: "user-service", label: "User Service", icon: "👤", color: "#10b981", bg: "#022c22" },
  { id: "tutor-service", label: "Tutor Service", icon: "📚", color: "#f59e0b", bg: "#451a03" },
  { id: "third-service", label: "Third Service", icon: "🔔", color: "#ef4444", bg: "#450a0a" },
];

/** Fixed pixel layout (within the 1260x820 viewBox) for each diagram node. */
export const NODE_POS: Record<
  FlowDiagramBoxId,
  { x: number; y: number; w: number; h: number }
> = {
  frontend: { x: 10, y: 250, w: 210, h: 340 },
  gateway: { x: 265, y: 250, w: 210, h: 340 },
  kafka: { x: 520, y: 250, w: 210, h: 340 },
  "user-service": { x: 850, y: 10, w: 260, h: 230 },
  "tutor-service": { x: 850, y: 295, w: 260, h: 230 },
  "third-service": { x: 850, y: 580, w: 260, h: 230 },
};

/** Dot color per request domain, shown next to each group title. */
export const DOMAIN_DOT_COLORS: Record<string, string> = {
  Auth: "#10b981",
  "Auth Outbound": "#f472b6",
  "Outbound (produces)": "#f472b6",
  Users: "#3b82f6",
  Students: "#06b6d4",
  Admin: "#8b5cf6",
  Classes: "#f59e0b",
  Curriculum: "#14b8a6",
  Chapter: "#f97316",
  Lesson: "#ec4899",
  Sessions: "#6366f1",
  Exercise: "#84cc16",
  Tuition: "#eab308",
  Schedule: "#0ea5e9",
  Attendance: "#a78bfa",
  Dashboard: "#f472b6",
  Reports: "#34d399",
  Notification: "#fb923c",
  Upload: "#22d3ee",
  Email: "#fbbf24",
  "AI Chat": "#c084fc",
  Redis: "#f87171",
};

export const domainDotColor = (domain: string) =>
  DOMAIN_DOT_COLORS[domain] ?? "#94a3b8";

/** Left/right anchor midpoints of a node's box, used to draw SVG edges. */
export const nodeMidpoints = (id: FlowDiagramBoxId) => {
  const p = NODE_POS[id];
  return {
    left: [p.x, p.y + p.h / 2] as const,
    right: [p.x + p.w, p.y + p.h / 2] as const,
  };
};
