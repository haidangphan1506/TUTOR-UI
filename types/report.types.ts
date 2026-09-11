export type LearningReportSummary = {
  activeClasses: number;
  avgAttendanceRate: number;
  avgCurriculumProgress: number;
  submissionRate: number;
};

export type ClassReportRow = {
  classId: string;
  className: string;
  tutorName: string;
  studentCount: number;
  attendanceRate: number;
  curriculumProgress: number;
  assignmentsSubmitted: number;
  assignmentsTotal: number;
  averageScore: number | null;
};

export type ClassReportsApiPayload = {
  data: ClassReportRow[];
  pagination: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
};

export type AttendanceTrendPoint = {
  month: string;
  rate: number;
};
