import type { Language } from "@/types";

export type FlowRequestsDictionary = {
  list: {
    heading: string;
    countSuffix: (count: number) => string;
    searchPlaceholder: string;
    addButton: string;
    tabs: {
      all: string;
    };
    tableHeaders: {
      stt: string;
      method: string;
      fePath: string;
      gwPath: string;
      topic: string;
      service: string;
      domain: string;
      actions: string;
    };
    emptyState: string;
    loadError: string;
    deleteSuccess: string;
    deleteError: string;
  };
  addDialog: {
    title: string;
    subtitle: string;
    submitText: string;
    methodLabel: string;
    fePathLabel: string;
    fePathPlaceholder: string;
    gwPathLabel: string;
    gwPathPlaceholder: string;
    topicLabel: string;
    topicPlaceholder: string;
    serviceLabel: string;
    servicePlaceholder: string;
    domainLabel: string;
    domainPlaceholder: string;
    gwControllerLabel: string;
    gwControllerPlaceholder: string;
    toastSuccess: string;
    toastError: string;
    errFePathRequired: string;
    errTopicRequired: string;
    errDomainRequired: string;
  };
  editDialog: {
    title: string;
    subtitle: string;
    submitText: string;
    toastSuccess: string;
    toastError: string;
  };
  deleteDialog: {
    descriptionPrefix: string;
    descriptionSuffix: string;
    warningText: string;
  };
  diagram: {
    manageToggle: string;
    managerTitle: string;
    reassignLabel: string;
    reassignSuccess: string;
    reassignError: string;
    removeFromFlow: string;
    outboundGroupLabel: string;
    seedDataNotice: string;
  };
};

const vi: FlowRequestsDictionary = {
  list: {
    heading: "Flow Requests",
    countSuffix: (count) => `${count} request`,
    searchPlaceholder: "Tìm theo path, topic, domain...",
    addButton: "Thêm request",
    tabs: {
      all: "Tất cả",
    },
    tableHeaders: {
      stt: "STT",
      method: "PHƯƠNG THỨC",
      fePath: "FE PATH",
      gwPath: "GW PATH",
      topic: "KAFKA TOPIC",
      service: "SERVICE",
      domain: "DOMAIN",
      actions: "THAO TÁC",
    },
    emptyState: "Không tìm thấy flow request phù hợp.",
    loadError: "Không thể tải danh sách flow request.",
    deleteSuccess: "Xóa flow request thành công!",
    deleteError: "Xóa flow request thất bại",
  },
  addDialog: {
    title: "Thêm Flow Request mới",
    subtitle: "Điền thông tin request để thêm vào sơ đồ flow.",
    submitText: "Thêm request",
    methodLabel: "Phương thức",
    fePathLabel: "FE Path",
    fePathPlaceholder: "VD: /classes/:id",
    gwPathLabel: "Gateway Path",
    gwPathPlaceholder: "VD: /classes/:id",
    topicLabel: "Kafka Topic",
    topicPlaceholder: "VD: class.create",
    serviceLabel: "Service",
    servicePlaceholder: "Chọn service...",
    domainLabel: "Domain",
    domainPlaceholder: "VD: Classes",
    gwControllerLabel: "Gateway Controller",
    gwControllerPlaceholder: "VD: Classes",
    toastSuccess: "Thêm flow request thành công!",
    toastError: "Thêm flow request thất bại",
    errFePathRequired: "FE Path là bắt buộc",
    errTopicRequired: "Kafka Topic là bắt buộc",
    errDomainRequired: "Domain là bắt buộc",
  },
  editDialog: {
    title: "Chỉnh sửa Flow Request",
    subtitle: "Cập nhật thông tin flow request.",
    submitText: "Lưu thay đổi",
    toastSuccess: "Cập nhật flow request thành công!",
    toastError: "Cập nhật flow request thất bại",
  },
  deleteDialog: {
    descriptionPrefix: "Bạn có chắc muốn xóa flow request",
    descriptionSuffix: "",
    warningText: "Hành động này không thể hoàn tác.",
  },
  diagram: {
    manageToggle: "Quản lý request",
    managerTitle: "Quản lý flow request",
    reassignLabel: "Chuyển service:",
    reassignSuccess: "Đã chuyển service thành công!",
    reassignError: "Chuyển service thất bại",
    removeFromFlow: "Xoá request",
    outboundGroupLabel: "Outbound (phát sinh)",
    seedDataNotice:
      "Backend /flow-requests chưa sẵn sàng — đang hiển thị dữ liệu mẫu (thêm/sửa/xoá sẽ lỗi cho tới khi có API).",
  },
};

const en: FlowRequestsDictionary = {
  list: {
    heading: "Flow Requests",
    countSuffix: (count) => `${count} request${count !== 1 ? "s" : ""}`,
    searchPlaceholder: "Search by path, topic, domain...",
    addButton: "Add request",
    tabs: {
      all: "All",
    },
    tableHeaders: {
      stt: "NO.",
      method: "METHOD",
      fePath: "FE PATH",
      gwPath: "GW PATH",
      topic: "KAFKA TOPIC",
      service: "SERVICE",
      domain: "DOMAIN",
      actions: "ACTIONS",
    },
    emptyState: "No matching flow requests found.",
    loadError: "Unable to load flow requests.",
    deleteSuccess: "Flow request deleted successfully!",
    deleteError: "Failed to delete flow request",
  },
  addDialog: {
    title: "Add new Flow Request",
    subtitle: "Fill in the request details to add it to the flow diagram.",
    submitText: "Add request",
    methodLabel: "Method",
    fePathLabel: "FE Path",
    fePathPlaceholder: "e.g. /classes/:id",
    gwPathLabel: "Gateway Path",
    gwPathPlaceholder: "e.g. /classes/:id",
    topicLabel: "Kafka Topic",
    topicPlaceholder: "e.g. class.create",
    serviceLabel: "Service",
    servicePlaceholder: "Select a service...",
    domainLabel: "Domain",
    domainPlaceholder: "e.g. Classes",
    gwControllerLabel: "Gateway Controller",
    gwControllerPlaceholder: "e.g. Classes",
    toastSuccess: "Flow request added successfully!",
    toastError: "Failed to add flow request",
    errFePathRequired: "FE Path is required",
    errTopicRequired: "Kafka Topic is required",
    errDomainRequired: "Domain is required",
  },
  editDialog: {
    title: "Edit Flow Request",
    subtitle: "Update the flow request information.",
    submitText: "Save changes",
    toastSuccess: "Flow request updated successfully!",
    toastError: "Failed to update flow request",
  },
  deleteDialog: {
    descriptionPrefix: "Are you sure you want to delete flow request",
    descriptionSuffix: "",
    warningText: "This action cannot be undone.",
  },
  diagram: {
    manageToggle: "Manage requests",
    managerTitle: "Manage flow requests",
    reassignLabel: "Reassign to:",
    reassignSuccess: "Service reassigned successfully!",
    reassignError: "Failed to reassign service",
    removeFromFlow: "Remove request",
    outboundGroupLabel: "Outbound (produces)",
    seedDataNotice:
      "The /flow-requests backend isn't ready yet — showing sample data (add/edit/delete will fail until the API exists).",
  },
};

export const flowRequestsDictionary: Record<
  Language,
  FlowRequestsDictionary
> = { vi, en };
