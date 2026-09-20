"use client";

import { useMemo, useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { Loader2, Pencil, Plus, Settings2, Trash2 } from "lucide-react";

import { AddFlowRequestDialog } from "./add-flow-request-dialog";
import { EditFlowRequestDialog } from "./edit-flow-request-dialog";
import {
  domainDotColor,
  getMethodTagStyle,
  getServiceBadgeStyle,
  NODE_META,
  NODE_POS,
  nodeMidpoints,
  SERVICE_STYLES,
} from "./flow-request-data";
import { SEED_FLOW_REQUESTS } from "./flow-request-seed-data";
import {
  useFlowRequestActions,
  FLOW_REQUESTS_QUERY_KEY,
} from "@/lib/services/flow-request.service";
import { getErrorMessage } from "@/lib/axios";
import { Button } from "@/components/ui/button.ui";
import { ConfirmDialog } from "@/components/ui/confirm-dialog.ui";
import { useFlowRequestsCopy } from "@/hooks/useFlowRequestsCopy.hook";
import { useCommonCopy } from "@/hooks/useCommonCopy.hook";
import type {
  ApiFlowRequest,
  FlowDiagramBoxId,
  FlowDiagramEdge,
  FlowDiagramGroup,
  FlowDiagramRowItem,
  FlowRequest,
  FlowRequestMethod,
  FlowRequestService,
} from "@/types";

/* ─── map API → UI shape (same mapping as the former table page) ─── */
function mapApiToFlowRequest(api: ApiFlowRequest): FlowRequest {
  return {
    id: api.id,
    method: (api.m as FlowRequestMethod) ?? "GET",
    fePath: api.fePath ?? "",
    gwPath: api.gwPath ?? "",
    topic: api.topic ?? "",
    service: (api.svc as FlowRequestService) ?? "direct",
    domain: api.domain ?? "",
    gwController: api.gwCtrl ?? "",
    chained: api.chained ?? [],
  };
}

const SERVICE_BOX_IDS: FlowDiagramBoxId[] = [
  "user-service",
  "tutor-service",
  "third-service",
];

function isServiceBox(id: FlowDiagramBoxId) {
  return (SERVICE_BOX_IDS as string[]).includes(id);
}

function svcColorOf(svc: FlowRequestService) {
  return SERVICE_STYLES[svc] ?? SERVICE_STYLES.direct;
}

/** Groups a source list by a domain-like key, preserving first-seen order. */
function groupByDomain<TSource>(
  source: TSource[],
  domainOf: (item: TSource) => string,
  mapItem: (item: TSource) => FlowDiagramRowItem,
): FlowDiagramGroup[] {
  const index = new Map<string, FlowDiagramGroup>();
  const groups: FlowDiagramGroup[] = [];
  source.forEach((entry) => {
    const domain = domainOf(entry);
    let group = index.get(domain);
    if (!group) {
      group = { domain, items: [] };
      index.set(domain, group);
      groups.push(group);
    }
    group.items.push(mapItem(entry));
  });
  return groups;
}

/** Port of the mockup's `buildGroups` — per-box row grouping (no search filter, dropped per product decision). */
function buildBoxGroups(
  boxId: FlowDiagramBoxId,
  requests: FlowRequest[],
  outboundGroupLabel: string,
): FlowDiagramGroup[] {
  if (boxId === "frontend") {
    return groupByDomain(
      requests,
      (r) => r.domain,
      (r) => ({
        id: r.id,
        m: r.method,
        mainText: r.fePath,
        showMethod: true,
        showTopic: false,
        showTarget: false,
      }),
    );
  }

  if (boxId === "gateway") {
    return groupByDomain(
      requests,
      (r) => r.gwController,
      (r) => ({
        id: r.id,
        m: r.method,
        mainText: r.gwPath,
        topic: r.topic,
        target: r.service,
        showMethod: true,
        showTopic: true,
        showTarget: true,
      }),
    );
  }

  if (boxId === "kafka") {
    const seen = new Map<string, FlowRequest>();
    requests.forEach((r) => {
      if (r.service === "direct") return;
      if (!seen.has(r.topic)) seen.set(r.topic, r);
    });
    const deduped = Array.from(seen.values());
    return groupByDomain(
      deduped,
      (r) => r.domain,
      (r) => ({
        id: r.id,
        mainText: r.topic,
        target: r.service,
        showMethod: false,
        showTopic: false,
        showTarget: true,
      }),
    );
  }

  // Service boxes: own requests, plus (for user-service only) Auth Outbound requests.
  const filtered = requests.filter(
    (r) => r.service === boxId || (boxId === "user-service" && r.domain === "Auth Outbound"),
  );
  return groupByDomain(
    filtered,
    (r) => (boxId === "user-service" && r.domain === "Auth Outbound" ? outboundGroupLabel : r.domain),
    (r) => ({
      id: r.id,
      mainText: r.topic,
      showMethod: false,
      showTopic: false,
      showTarget: false,
    }),
  );
}

function mainTextColor(boxId: FlowDiagramBoxId, boxColor: string): string | undefined {
  if (boxId === "kafka") return "#a855f7";
  if (isServiceBox(boxId)) return boxColor;
  return undefined;
}

export function FlowRequestDiagram() {
  const copy = useFlowRequestsCopy();
  const common = useCommonCopy();
  const queryClient = useQueryClient();

  const [activeId, setActiveId] = useState<string | null>(null);
  const [expanded, setExpanded] = useState<Record<string, boolean>>({});
  const [managerOpen, setManagerOpen] = useState(false);
  const [addOpen, setAddOpen] = useState(false);
  const [editing, setEditing] = useState<FlowRequest | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<FlowRequest | null>(null);

  const invalidate = () =>
    queryClient.invalidateQueries({ queryKey: FLOW_REQUESTS_QUERY_KEY });

  const { data: apiPayload, isPending, isError } = useFlowRequestActions({
    list: { page: 1, limit: 1000 },
  }).list;

  const apiRequests = useMemo(
    () => (apiPayload?.flowRequests ?? []).map(mapApiToFlowRequest),
    [apiPayload],
  );
  // `GET /flow-requests` isn't implemented on the backend yet (404) — fall back to
  // the real endpoint catalog so the diagram still renders. Add/Edit/Delete keep
  // calling the real API and will fail until that endpoint exists.
  const usingSeedData = isError || (!isPending && apiRequests.length === 0);
  const requests = usingSeedData ? SEED_FLOW_REQUESTS : apiRequests;

  const { update, delete: del } = useFlowRequestActions();

  const activeReq = useMemo(
    () => (activeId ? (requests.find((r) => r.id === activeId) ?? null) : null),
    [requests, activeId],
  );
  const isOutbound = activeReq?.domain === "Auth Outbound";
  const chainIds = useMemo(() => activeReq?.chained ?? [], [activeReq]);
  const allActiveIds = useMemo(
    () => (activeReq ? [activeReq.id, ...chainIds] : []),
    [activeReq, chainIds],
  );

  const boxes = useMemo(
    () =>
      NODE_META.map((meta) => {
        const groups = buildBoxGroups(meta.id, requests, copy.diagram.outboundGroupLabel);
        const count = groups.reduce((acc, g) => acc + g.items.length, 0);
        return { ...meta, groups, count };
      }),
    [requests, copy.diagram.outboundGroupLabel],
  );

  const edges = useMemo<FlowDiagramEdge[]>(() => {
    const nodeColor = (id: FlowDiagramBoxId) =>
      NODE_META.find((m) => m.id === id)?.color ?? "#94a3b8";

    const feR = nodeMidpoints("frontend").right;
    const gwL = nodeMidpoints("gateway").left;
    const gwR = nodeMidpoints("gateway").right;
    const kaL = nodeMidpoints("kafka").left;
    const kaR = nodeMidpoints("kafka").right;
    const usL = nodeMidpoints("user-service").left;
    const usR = nodeMidpoints("user-service").right;
    const tuL = nodeMidpoints("tutor-service").left;
    const thL = nodeMidpoints("third-service").left;
    const thR = nodeMidpoints("third-service").right;

    const wantTrunk = !!activeReq && !isOutbound;
    const wantSvc = (id: FlowDiagramBoxId) =>
      !!activeReq && !isOutbound && activeReq.service === id;
    const wantProduce = !!activeReq && (isOutbound || chainIds.length > 0);

    const mk = (
      points: string,
      active: boolean,
      color: string,
      label: string,
      lx: number,
      ly: number,
    ): FlowDiagramEdge => ({ points, active, color, label, lx, ly });

    return [
      mk(`${feR[0]},${feR[1]} ${gwL[0]},${gwL[1]}`, wantTrunk, "#a855f7", "HTTP", (feR[0] + gwL[0]) / 2, feR[1] - 6),
      mk(`${gwR[0]},${gwR[1]} ${kaL[0]},${kaL[1]}`, wantTrunk, "#a855f7", "Kafka RPC", (gwR[0] + kaL[0]) / 2, gwR[1] - 6),
      mk(`${kaR[0]},${kaR[1]} ${usL[0]},${usL[1]}`, wantSvc("user-service"), nodeColor("user-service"), "topic →", (kaR[0] + usL[0]) / 2, (kaR[1] + usL[1]) / 2 - 6),
      mk(`${kaR[0]},${kaR[1]} ${tuL[0]},${tuL[1]}`, wantSvc("tutor-service"), nodeColor("tutor-service"), "topic →", (kaR[0] + tuL[0]) / 2, (kaR[1] + tuL[1]) / 2 - 6),
      mk(
        `${kaR[0]},${kaR[1]} ${thL[0]},${thL[1]}`,
        wantSvc("third-service") || wantProduce,
        wantProduce ? "#f472b6" : nodeColor("third-service"),
        "topic →",
        (kaR[0] + thL[0]) / 2,
        (kaR[1] + thL[1]) / 2 - 6,
      ),
      mk(
        `${usR[0]},${usR[1]} 1180,${usR[1]} 1180,${thR[1]} ${thR[0]},${thR[1]}`,
        wantProduce,
        "#f472b6",
        "produce",
        1215,
        (usR[1] + thR[1]) / 2,
      ),
    ];
  }, [activeReq, isOutbound, chainIds]);

  const rowStyle = (id: string): React.CSSProperties => {
    if (allActiveIds.includes(id)) {
      return {
        borderColor: "#a855f7",
        backgroundColor: "rgba(168,85,247,.12)",
        boxShadow: "0 0 8px rgba(168,85,247,.25)",
      };
    }
    if (activeReq && !isOutbound) {
      return { opacity: 0.3 };
    }
    return { borderColor: "transparent" };
  };

  const handleReassign = (id: string, svc: FlowRequestService) => {
    update.mutate(
      { id, svc },
      {
        onSuccess: () => {
          invalidate();
          toast.success(copy.diagram.reassignSuccess);
        },
        onError: (err) => toast.error(getErrorMessage(err, copy.diagram.reassignError)),
      },
    );
  };

  const handleHeaderClick = (boxId: FlowDiagramBoxId) => {
    const reassignable =
      !!activeReq && !isOutbound && isServiceBox(boxId) && activeReq.service !== boxId;
    if (reassignable && activeReq) {
      handleReassign(activeReq.id, boxId as FlowRequestService);
      return;
    }
    setExpanded((prev) => ({ ...prev, [boxId]: !(prev[boxId] ?? true) }));
  };

  const handleConfirmDelete = () => {
    if (!deleteTarget) return;
    del.mutate(deleteTarget.id, {
      onSuccess: () => {
        invalidate();
        toast.success(copy.list.deleteSuccess);
        if (activeId === deleteTarget.id) setActiveId(null);
        setDeleteTarget(null);
      },
      onError: (err) => toast.error(getErrorMessage(err, copy.list.deleteError)),
    });
  };

  if (isPending) {
    return (
      <div className="flex min-h-screen w-full items-center justify-center bg-[#020617]">
        <Loader2 className="size-6 animate-spin text-[#a855f7]" />
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full bg-[#020617] font-mono text-[#e2e8f0]">
      {/* ── Seed-data notice (API not available yet) ── */}
      {usingSeedData && (
        <div className="fixed inset-x-0 top-0 z-30 border-b border-[#334155] bg-[#0f172a]/95 px-4 py-1.5 text-center text-[0.65rem] text-[#fbbf24]">
          {copy.diagram.seedDataNotice}
        </div>
      )}

      {/* ── Floating manage toggle ── */}
      <Button
        type="button"
        variant="outline"
        size="icon"
        title={copy.diagram.manageToggle}
        aria-label={copy.diagram.manageToggle}
        onClick={() => setManagerOpen((o) => !o)}
        className="fixed top-4 right-4 z-40 border-[#334155] bg-[#1e293b] text-[#e2e8f0] hover:border-[#a855f7] hover:text-[#a855f7]"
      >
        <Settings2 className="size-4" />
      </Button>

      {/* ── Floating manager panel (add/edit/delete) ── */}
      {managerOpen && (
        <div className="fixed top-16 right-4 z-40 flex max-h-[70vh] w-80 flex-col rounded-xl border border-[#334155] bg-[#0f172a] p-3 shadow-xl">
          <div className="mb-2 flex items-center justify-between gap-2">
            <span className="text-[0.72rem] tracking-wide text-[#a855f7] uppercase">
              {copy.diagram.managerTitle}
            </span>
            <Button
              type="button"
              size="sm"
              onClick={() => setAddOpen(true)}
              className="h-auto! w-auto! gap-1 rounded-md! px-2.5! py-1! text-xs"
            >
              <Plus className="size-3.5" />
              {copy.list.addButton}
            </Button>
          </div>

          <div className="flex-1 space-y-1 overflow-y-auto">
            {requests.length === 0 && (
              <p className="py-6 text-center text-xs text-[#64748b]">
                {copy.list.emptyState}
              </p>
            )}
            {requests.map((r) => (
              <div
                key={r.id}
                className="flex items-center gap-1.5 rounded-[5px] px-1.5 py-1 text-[0.66rem] hover:bg-white/5"
              >
                <span
                  className="shrink-0 rounded px-1.5 py-px text-[0.5rem] font-bold uppercase"
                  style={getMethodTagStyle(r.method)}
                >
                  {r.method}
                </span>
                <span className="flex-1 truncate text-[#e2e8f0]">{r.fePath}</span>
                <span className="max-w-[80px] shrink-0 truncate text-[0.6rem] text-[#a855f7]">
                  {r.topic}
                </span>
                <Button
                  type="button"
                  variant="ghost"
                  size="icon-xs"
                  title={common.actions.edit}
                  onClick={() => setEditing(r)}
                >
                  <Pencil className="size-3" />
                </Button>
                <Button
                  type="button"
                  variant="ghost"
                  size="icon-xs"
                  title={common.actions.delete}
                  onClick={() => setDeleteTarget(r)}
                >
                  <Trash2 className="size-3 text-destructive" />
                </Button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ── Network diagram ── */}
      <div className="w-full overflow-auto px-4 py-6">
        <div className="relative mx-auto" style={{ width: 1260, height: 820 }}>
          <svg
            viewBox="0 0 1260 820"
            className="pointer-events-none absolute inset-0 h-full w-full"
          >
            {edges.map((e, i) => (
              <g key={i}>
                <polyline
                  points={e.points}
                  style={{
                    stroke: e.active ? e.color : "#334155",
                    strokeWidth: e.active ? 2.5 : 1.5,
                    fill: "none",
                    opacity: e.active ? 0.95 : 0.35,
                  }}
                />
                <text
                  x={e.lx}
                  y={e.ly}
                  textAnchor="middle"
                  className="text-[9px]"
                  style={{ fill: e.active ? e.color : "#475569" }}
                >
                  {e.label}
                </text>
              </g>
            ))}
          </svg>

          {boxes.map((box) => {
            const pos = NODE_POS[box.id];
            const boxActiveGlow =
              !!activeReq &&
              ((isOutbound && (box.id === "user-service" || box.id === "kafka" || box.id === "third-service")) ||
                (!isOutbound &&
                  (box.id === "frontend" ||
                    box.id === "gateway" ||
                    (chainIds.length > 0 && isServiceBox(box.id)))));
            const boxDim = isOutbound && (box.id === "frontend" || box.id === "gateway");
            const reassignable =
              !!activeReq && !isOutbound && isServiceBox(box.id) && activeReq.service !== box.id;
            const isExpanded = expanded[box.id] !== false;

            const boxStyle: React.CSSProperties = {
              left: pos.x,
              top: pos.y,
              width: pos.w,
              height: pos.h,
              borderColor: reassignable ? "#f472b6" : box.color,
              borderStyle: reassignable ? "dashed" : "solid",
              opacity: boxDim ? 0.3 : undefined,
              boxShadow: reassignable
                ? "0 0 14px rgba(244,114,182,.5)"
                : boxActiveGlow
                  ? `0 0 18px ${box.color}66`
                  : undefined,
              zIndex: 2,
            };

            return (
              <div
                key={box.id}
                className="absolute box-border flex flex-col rounded-[10px] border-2 bg-[#0f172a]"
                style={boxStyle}
              >
                <div
                  className="flex shrink-0 cursor-pointer items-center gap-1.5 border-b border-[#334155] px-2.5 py-2 select-none"
                  onClick={() => handleHeaderClick(box.id)}
                >
                  <span className="text-base">{box.icon}</span>
                  <h3
                    className="m-0 flex-1 truncate text-[0.75rem] font-semibold"
                    style={{ color: box.color }}
                  >
                    {box.label}
                  </h3>
                  <span
                    className="rounded-full px-1.5 py-px text-[0.6rem] font-bold"
                    style={{ backgroundColor: box.bg, color: box.color }}
                  >
                    {box.count}
                  </span>
                </div>

                {isExpanded && (
                  <div className="flex-1 overflow-y-auto px-1.5 py-1">
                    {box.groups.map((group) => (
                      <div key={group.domain} className="mb-1.5">
                        <div className="mb-0.5 flex items-center gap-1 border-b border-[#334155] pt-1 pb-0.5 text-[0.55rem] tracking-wide text-[#64748b] uppercase">
                          <span
                            className="size-[5px] shrink-0 rounded-full"
                            style={{ backgroundColor: domainDotColor(group.domain) }}
                          />
                          {group.domain} ({group.items.length})
                        </div>
                        {group.items.map((item) => (
                          <div
                            key={item.id}
                            className="flex cursor-pointer items-center gap-1 rounded-[5px] border px-1.5 py-0.5 text-[0.65rem] hover:bg-white/5"
                            style={rowStyle(item.id)}
                            onClick={() =>
                              setActiveId((cur) => (cur === item.id ? null : item.id))
                            }
                          >
                            {item.showMethod && item.m && (
                              <span
                                className="shrink-0 min-w-[30px] rounded px-1.5 py-px text-center text-[0.5rem] font-bold uppercase"
                                style={getMethodTagStyle(item.m)}
                              >
                                {item.m}
                              </span>
                            )}
                            <span
                              className="flex-1 truncate"
                              style={{ color: mainTextColor(box.id, box.color) }}
                            >
                              {item.mainText}
                            </span>
                            {item.showTopic && item.topic && (
                              <span className="max-w-[110px] shrink-0 truncate text-[0.6rem] text-[#a855f7]">
                                {item.topic}
                              </span>
                            )}
                            {item.showTarget && item.target && (
                              <span
                                className="shrink-0 rounded px-1.5 py-px text-[0.5rem] font-semibold"
                                style={getServiceBadgeStyle(item.target as FlowRequestService)}
                              >
                                {item.target}
                              </span>
                            )}
                          </div>
                        ))}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* ── Selected-request detail panel ── */}
        {activeReq && (
          <div
            className="mx-auto mt-3 rounded-[10px] border border-[#334155] bg-[#0f172a] px-4 py-2.5 text-center text-[0.75rem]"
            style={{ maxWidth: 1260 }}
          >
            <div className="mb-1">
              <span
                className="rounded px-1.5 py-0.5 text-xs font-bold uppercase"
                style={getMethodTagStyle(activeReq.method)}
              >
                {activeReq.method}
              </span>
              <span
                className="ml-1.5 font-bold"
                style={{ color: svcColorOf(activeReq.service).color }}
              >
                {isOutbound ? activeReq.topic : activeReq.fePath}
              </span>
            </div>

            <div className="text-[0.65rem] text-[#94a3b8]">
              <span style={{ color: isOutbound ? "#10b981" : "#3b82f6" }}>
                {isOutbound ? "user-service" : "Gateway"}
              </span>
              <span className="mx-1 text-[#475569]">→</span>
              <span className="text-[#a855f7]">Topic: {activeReq.topic}</span>
              <span className="mx-1 text-[#475569]">→</span>
              <span
                style={{
                  color: svcColorOf(isOutbound ? "third-service" : activeReq.service).color,
                }}
              >
                {isOutbound ? "third-service" : activeReq.service}
              </span>
              <span className="mx-1 text-[#475569]">→</span>
              <span className="text-[#94a3b8]">handler()</span>
            </div>

            {chainIds.map((cid) => {
              const cr = requests.find((r) => r.id === cid);
              if (!cr) return null;
              return (
                <div key={cid} className="mt-1 border-t border-[#1e293b] pt-1">
                  <span
                    className="rounded px-1.5 py-0.5 text-[0.5rem] font-bold"
                    style={{ backgroundColor: "#78350f", color: "#fcd34d" }}
                  >
                    SEND
                  </span>
                  <span className="ml-1 text-[#a855f7]">{cr.topic}</span>
                  <span className="mx-1 text-[#475569]">→</span>
                  <span style={{ color: svcColorOf(cr.service).color }}>third-service</span>
                </div>
              );
            })}

            <div className="mt-2 flex flex-wrap items-center justify-center gap-1.5 border-t border-[#1e293b] pt-2">
              {!isOutbound && (
                <>
                  <span className="text-[0.6rem] text-[#64748b]">
                    {copy.diagram.reassignLabel}
                  </span>
                  {SERVICE_BOX_IDS.filter((id) => id !== activeReq.service).map((id) => {
                    const svc = id as FlowRequestService;
                    const sc = svcColorOf(svc);
                    const meta = NODE_META.find((m) => m.id === id);
                    return (
                      <Button
                        key={id}
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => handleReassign(activeReq.id, svc)}
                        className="h-auto! w-auto! gap-1 rounded-[5px]! px-2.5! py-1! text-[0.65rem]"
                        style={{ borderColor: sc.color, backgroundColor: sc.bg, color: sc.color }}
                      >
                        → {meta?.label ?? id}
                      </Button>
                    );
                  })}
                </>
              )}
              <Button
                type="button"
                variant="destructive"
                size="sm"
                onClick={() => setDeleteTarget(activeReq)}
                className="h-auto! w-auto! rounded-[5px]! px-2.5! py-1! text-[0.65rem]"
              >
                {copy.diagram.removeFromFlow}
              </Button>
            </div>
          </div>
        )}
      </div>

      {/* ── Add / Edit / Delete dialogs ── */}
      <AddFlowRequestDialog
        open={addOpen}
        onClose={() => setAddOpen(false)}
        onSaved={invalidate}
      />

      <EditFlowRequestDialog
        flowRequest={editing}
        open={!!editing}
        onClose={() => setEditing(null)}
        onSaved={invalidate}
      />

      <ConfirmDialog
        open={!!deleteTarget}
        onClose={() => setDeleteTarget(null)}
        onConfirm={handleConfirmDelete}
        loading={del.isPending}
        description={
          <>
            <p>
              {copy.deleteDialog.descriptionPrefix}{" "}
              <span className="font-semibold text-foreground">
                {deleteTarget?.fePath ?? deleteTarget?.topic ?? "—"}
              </span>
              {copy.deleteDialog.descriptionSuffix}?
            </p>
            <p className="mt-1">{copy.deleteDialog.warningText}</p>
          </>
        }
      />
    </div>
  );
}
