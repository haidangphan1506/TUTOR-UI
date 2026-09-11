import type { Language } from "@/types";

export type CommonDictionary = {
  actions: {
    save: string;
    cancel: string;
    delete: string;
    edit: string;
    add: string;
    create: string;
    search: string;
    searchPlaceholder: string;
    confirm: string;
    close: string;
    back: string;
    loading: string;
    processing: string;
    submit: string;
    filter: string;
    view: string;
    viewDetail: string;
    retry: string;
    export: string;
    upload: string;
    download: string;
    all: string;
  };
  table: {
    loadError: string;
    noData: string;
  };
  pagination: {
    previous: string;
    next: string;
    rowsPerPage: string;
  };
  confirmDialog: {
    deleteTitle: string;
    confirm: string;
    cancel: string;
  };
};

const vi: CommonDictionary = {
  actions: {
    save: "Lưu",
    cancel: "Hủy",
    delete: "Xóa",
    edit: "Chỉnh sửa",
    add: "Thêm",
    create: "Tạo mới",
    search: "Tìm kiếm",
    searchPlaceholder: "Tìm kiếm...",
    confirm: "Xác nhận",
    close: "Đóng",
    back: "Quay lại",
    loading: "Đang tải…",
    processing: "Đang xử lý…",
    submit: "Gửi",
    filter: "Bộ lọc",
    view: "Xem",
    viewDetail: "Xem chi tiết",
    retry: "Thử lại",
    export: "Xuất file",
    upload: "Tải lên",
    download: "Tải xuống",
    all: "Tất cả",
  },
  table: {
    loadError: "Không thể tải dữ liệu.",
    noData: "Không có dữ liệu.",
  },
  pagination: {
    previous: "Trước",
    next: "Sau",
    rowsPerPage: "Số dòng/trang:",
  },
  confirmDialog: {
    deleteTitle: "Xác nhận xóa",
    confirm: "Xóa",
    cancel: "Hủy",
  },
};

const en: CommonDictionary = {
  actions: {
    save: "Save",
    cancel: "Cancel",
    delete: "Delete",
    edit: "Edit",
    add: "Add",
    create: "Create",
    search: "Search",
    searchPlaceholder: "Search...",
    confirm: "Confirm",
    close: "Close",
    back: "Back",
    loading: "Loading…",
    processing: "Processing…",
    submit: "Submit",
    filter: "Filter",
    view: "View",
    viewDetail: "View details",
    retry: "Retry",
    export: "Export",
    upload: "Upload",
    download: "Download",
    all: "All",
  },
  table: {
    loadError: "Unable to load data.",
    noData: "No data.",
  },
  pagination: {
    previous: "Previous",
    next: "Next",
    rowsPerPage: "Rows per page:",
  },
  confirmDialog: {
    deleteTitle: "Confirm delete",
    confirm: "Delete",
    cancel: "Cancel",
  },
};

export const commonDictionary: Record<Language, CommonDictionary> = { vi, en };
