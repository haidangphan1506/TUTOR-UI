import type { Language } from "@/types";

export type ScheduleDictionary = {
  heading: string;
  searchPlaceholder: string;
  addButton: string;
  todayButton: string;
  calendar: {
    monthLabel: string;
    viewMonth: string;
    viewWeek: string;
    viewDay: string;
    todayBadge: string;
    overflowSuffix: string;
    weekRange: string;
    dayRange: string;
    noSessions: string;
  };
  emptyState: string;
  emptyHint: string;
  legendPrefix: string;
  dayHeaders: string[];
  dayShortHeaders: string[];
  dayLabels: Record<string, string>;
  hoverCard: {
    weeklyPrefix: string;
    onlineLabel: string;
    offlineLabel: string;
    offlineFallback: string;
    subjectLabel: string;
    codeSeparator: string;
    timeLabel: string;
    formatLabel: string;
    locationLabel: string;
    classCodeLabel: string;
  };
  form: {
    createTitle: string;
    createSubtitle: string;
    editTitle: string;
    editSubtitle: string;
    submitCreate: string;
    submitEdit: string;
    classLabel: string;
    classPlaceholder: string;
    dayLabel: string;
    dayPlaceholder: string;
    startTimeLabel: string;
    endTimeLabel: string;
    formatLabel: string;
    formatOnline: string;
    formatOffline: string;
    locationLabel: string;
    locationPlaceholder: string;
    toastCreateSuccess: string;
    toastCreateError: string;
    toastEditSuccess: string;
    toastEditError: string;
    errClassRequired: string;
    errDayRequired: string;
    errStartTimeRequired: string;
    errEndTimeRequired: string;
    errEndTimeAfterStart: string;
  };
  deleteDialog: {
    title: string;
    description: string;
    warning: string;
    toastSuccess: string;
    toastError: string;
  };
  guide: {
    title: string;
    step1Title: string;
    step1Body: string;
    step2Title: string;
    step2Body: string;
    step3Title: string;
    step3Body: string;
    step4Title: string;
    step4Body: string;
    noteLabel: string;
    noteBody: string;
  };
};

const vi: ScheduleDictionary = {
  heading: "Lịch học",
  searchPlaceholder: "Tìm buổi học...",
  addButton: "Thêm buổi học",
  todayButton: "Hôm nay",
  calendar: {
    monthLabel: "Tháng",
    viewMonth: "Tháng",
    viewWeek: "Tuần",
    viewDay: "Ngày",
    todayBadge: "Hôm nay",
    overflowSuffix: "buổi nữa",
    weekRange: "Tuần {start} – {end}, {year}",
    dayRange: "{day}, {month} {date}, {year}",
    noSessions: "Không có buổi học nào trong ngày này.",
  },
  emptyState: "Chưa có lịch học nào.",
  emptyHint: "Tạo lớp học để thêm lịch.",
  legendPrefix: "Lớp",
  dayHeaders: ["Thứ 2", "Thứ 3", "Thứ 4", "Thứ 5", "Thứ 6", "Thứ 7", "Chủ nhật"],
  dayShortHeaders: ["T2", "T3", "T4", "T5", "T6", "T7", "CN"],
  dayLabels: {
    MONDAY: "Thứ 2",
    TUESDAY: "Thứ 3",
    WEDNESDAY: "Thứ 4",
    THURSDAY: "Thứ 5",
    FRIDAY: "Thứ 6",
    SATURDAY: "Thứ 7",
    SUNDAY: "Chủ nhật",
  },
  hoverCard: {
    weeklyPrefix: "Hàng tuần vào",
    onlineLabel: "Học online",
    offlineLabel: "Học offline",
    offlineFallback: "Học offline",
    subjectLabel: "Môn",
    codeSeparator: " · ",
    timeLabel: "Giờ học",
    formatLabel: "Hình thức",
    locationLabel: "Địa điểm",
    classCodeLabel: "Mã lớp",
  },
  form: {
    createTitle: "Thêm buổi học mới",
    createSubtitle: "Tạo lịch học hàng tuần cho lớp.",
    editTitle: "Chỉnh sửa buổi học",
    editSubtitle: "Cập nhật thông tin buổi học.",
    submitCreate: "Tạo lịch học",
    submitEdit: "Lưu thay đổi",
    classLabel: "Lớp học",
    classPlaceholder: "Chọn lớp học...",
    dayLabel: "Thứ trong tuần",
    dayPlaceholder: "Chọn ngày...",
    startTimeLabel: "Giờ bắt đầu",
    endTimeLabel: "Giờ kết thúc",
    formatLabel: "Hình thức",
    formatOnline: "Online",
    formatOffline: "Offline",
    locationLabel: "Địa điểm",
    locationPlaceholder: "VD: Phòng 101,张三 nhà...",
    toastCreateSuccess: "Tạo lịch học thành công!",
    toastCreateError: "Tạo lịch học thất bại",
    toastEditSuccess: "Cập nhật lịch học thành công!",
    toastEditError: "Cập nhật lịch học thất bại",
    errClassRequired: "Vui lòng chọn lớp học",
    errDayRequired: "Vui lòng chọn thứ trong tuần",
    errStartTimeRequired: "Vui lòng chọn giờ bắt đầu",
    errEndTimeRequired: "Vui lòng chọn giờ kết thúc",
    errEndTimeAfterStart: "Giờ kết thúc phải sau giờ bắt đầu",
  },
  deleteDialog: {
    title: "Xóa buổi học",
    description: "Bạn có chắc muốn xóa lịch học này?",
    warning: "Lịch học sẽ bị xóa vĩnh viễn. Hành động này không thể hoàn tác.",
    toastSuccess: "Xóa lịch học thành công!",
    toastError: "Xóa lịch học thất bại",
  },
  guide: {
    title: "Hướng dẫn sử dụng",
    step1Title: "Xem lịch theo tháng",
    step1Body: "Lịch hiển thị tất cả buổi học hàng tuần của từng lớp theo ngày trong tháng.",
    step2Title: "Di chuyển giữa các tháng",
    step2Body: "Dùng nút mũi tên trái/phải để chuyển tháng, hoặc nhấn Hôm nay để quay lại tháng hiện tại.",
    step3Title: "Tìm kiếm buổi học",
    step3Body: "Gõ tên lớp vào ô tìm kiếm để lọc nhanh các buổi học trên lịch.",
    step4Title: "Xem chi tiết buổi học",
    step4Body: "Di chuột vào buổi học để xem thông tin chi tiết: giờ học, hình thức (online/offline), địa điểm.",
    noteLabel: "Lưu ý:",
    noteBody:
      "Lịch học lặp lại hàng tuần theo cấu hình của từng lớp. Để thay đổi lịch, vui lòng chỉnh sửa trong quản lý lớp học.",
  },
};

const en: ScheduleDictionary = {
  heading: "Schedule",
  searchPlaceholder: "Search sessions...",
  addButton: "Add session",
  todayButton: "Today",
  calendar: {
    monthLabel: "Month",
    viewMonth: "Month",
    viewWeek: "Week",
    viewDay: "Day",
    todayBadge: "Today",
    overflowSuffix: "more",
    weekRange: "Week {start} – {end}, {year}",
    dayRange: "{day}, {month} {date}, {year}",
    noSessions: "No sessions scheduled for this day.",
  },
  emptyState: "No scheduled sessions yet.",
  emptyHint: "Create a class to add schedules.",
  legendPrefix: "Class",
  dayHeaders: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
  dayShortHeaders: ["M", "T", "W", "T", "F", "S", "S"],
  dayLabels: {
    MONDAY: "Monday",
    TUESDAY: "Tuesday",
    WEDNESDAY: "Wednesday",
    THURSDAY: "Thursday",
    FRIDAY: "Friday",
    SATURDAY: "Saturday",
    SUNDAY: "Sunday",
  },
  hoverCard: {
    weeklyPrefix: "Every",
    onlineLabel: "Online class",
    offlineLabel: "Offline class",
    offlineFallback: "Offline class",
    subjectLabel: "Subject",
    codeSeparator: " · ",
    timeLabel: "Time",
    formatLabel: "Format",
    locationLabel: "Location",
    classCodeLabel: "Class code",
  },
  form: {
    createTitle: "Add new session",
    createSubtitle: "Create a recurring weekly schedule for a class.",
    editTitle: "Edit session",
    editSubtitle: "Update the session information.",
    submitCreate: "Create schedule",
    submitEdit: "Save changes",
    classLabel: "Class",
    classPlaceholder: "Select a class...",
    dayLabel: "Day of week",
    dayPlaceholder: "Select a day...",
    startTimeLabel: "Start time",
    endTimeLabel: "End time",
    formatLabel: "Format",
    formatOnline: "Online",
    formatOffline: "Offline",
    locationLabel: "Location",
    locationPlaceholder: "e.g. Room 101, John's house...",
    toastCreateSuccess: "Schedule created successfully!",
    toastCreateError: "Failed to create schedule",
    toastEditSuccess: "Schedule updated successfully!",
    toastEditError: "Failed to update schedule",
    errClassRequired: "Please select a class",
    errDayRequired: "Please select a day of week",
    errStartTimeRequired: "Please select a start time",
    errEndTimeRequired: "Please select an end time",
    errEndTimeAfterStart: "End time must be after start time",
  },
  deleteDialog: {
    title: "Delete session",
    description: "Are you sure you want to delete this schedule?",
    warning: "The schedule will be permanently deleted. This action cannot be undone.",
    toastSuccess: "Schedule deleted successfully!",
    toastError: "Failed to delete schedule",
  },
  guide: {
    title: "Usage guide",
    step1Title: "Monthly view",
    step1Body: "The calendar shows all recurring weekly sessions for each class by day of the month.",
    step2Title: "Navigate months",
    step2Body: "Use the left/right arrows to switch months, or press Today to return to the current month.",
    step3Title: "Search sessions",
    step3Body: "Type a class name into the search box to quickly filter sessions on the calendar.",
    step4Title: "View session details",
    step4Body: "Hover over a session to see details: time, format (online/offline), and location.",
    noteLabel: "Note:",
    noteBody:
      "Schedules repeat weekly based on each class's configuration. To change a schedule, edit it in class management.",
  },
};

export const scheduleDictionary: Record<Language, ScheduleDictionary> = {
  vi,
  en,
};
