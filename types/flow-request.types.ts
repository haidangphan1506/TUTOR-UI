/** HTTP methods supported by flow requests. */
export type FlowRequestMethod = "GET" | "POST" | "PUT" | "PATCH" | "DELETE" | "SEND";

/** Backend services that handle flow requests. */
export type FlowRequestService =
  | "user-service"
  | "tutor-service"
  | "third-service"
  | "direct";

/** Form values for creating / editing a flow request (react-hook-form shape). */
export type FlowRequestFormValues = {
  method: FlowRequestMethod;
  fePath: string;
  gwPath: string;
  topic: string;
  service: FlowRequestService;
  domain: string;
  gwController: string;
};

/** UI representation of a single flow request. */
export type FlowRequest = {
  id: string;
  method: FlowRequestMethod;
  fePath: string;
  gwPath: string;
  topic: string;
  service: FlowRequestService;
  domain: string;
  gwController: string;
  chained: string[];
};

/** Raw shape returned by the API after unwrapApiData(). */
export type ApiFlowRequest = {
  id: string;
  m: FlowRequestMethod;
  fePath: string;
  gwPath: string;
  topic: string;
  svc: FlowRequestService;
  domain: string;
  gwCtrl: string;
  chained?: string[];
};

/** List payload returned by GET /flow-requests. */
export type FlowRequestsApiPayload = {
  flowRequests: ApiFlowRequest[];
  pagination: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
};

/** POST /flow-requests body. */
export type CreateFlowRequestPayload = {
  m: FlowRequestMethod;
  fePath: string;
  gwPath: string;
  topic: string;
  svc: FlowRequestService;
  domain: string;
  gwCtrl: string;
};

/** PUT /flow-requests/:id body. */
export type UpdateFlowRequestPayload = {
  id: string;
  m?: FlowRequestMethod;
  fePath?: string;
  gwPath?: string;
  topic?: string;
  svc?: FlowRequestService;
  domain?: string;
  gwCtrl?: string;
};

/** Props shared by the add / edit dialog components. */
export type FlowRequestDialogProps = {
  open: boolean;
  onClose: () => void;
  onSaved: () => void;
};

/** Props for the edit dialog — also receives the entity to edit. */
export type EditFlowRequestDialogProps = FlowRequestDialogProps & {
  flowRequest: FlowRequest | null;
};

/** Props for the delete dialog. */
export type DeleteFlowRequestDialogProps = {
  flowRequest: FlowRequest | null;
  onClose: () => void;
  onConfirm: (id: string) => void;
};

/** Box ids used by the flow-request network diagram (fixed topology nodes). */
export type FlowDiagramBoxId =
  | "frontend"
  | "gateway"
  | "kafka"
  | "user-service"
  | "tutor-service"
  | "third-service";

/** A single selectable row rendered inside a diagram box's group. */
export type FlowDiagramRowItem = {
  id: string;
  m?: FlowRequestMethod;
  mainText: string;
  topic?: string;
  target?: string;
  showMethod: boolean;
  showTopic: boolean;
  showTarget: boolean;
};

/** A domain-grouped bucket of rows inside a diagram box. */
export type FlowDiagramGroup = {
  domain: string;
  items: FlowDiagramRowItem[];
};

/** A single topology node (Frontend/Gateway/Kafka/3 services) in the diagram. */
export type FlowDiagramBox = {
  id: FlowDiagramBoxId;
  label: string;
  icon: string;
  color: string;
  bg: string;
  groups: FlowDiagramGroup[];
  count: number;
};

/** A polyline edge connecting two diagram boxes, with its label position. */
export type FlowDiagramEdge = {
  points: string;
  active: boolean;
  color: string;
  label: string;
  lx: number;
  ly: number;
};
