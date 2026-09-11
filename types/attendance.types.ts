/** Điểm danh (attendance) domain types — one row per (session, student). */

export type AttendanceRecord = {
  studentId: string;
  firstName: string;
  lastName: string;
  avatar: string | null;
  userCode: string | null;
  present: boolean;
  note: string | null;
  markedAt: string | null;
};

export type UpsertAttendancePayload = {
  sessionId: string;
  studentId: string;
  present: boolean;
  note?: string | null;
};

/** Raw upserted row returned by `PUT /attendances` (not the enriched `AttendanceRecord`). */
export type AttendanceUpsertResult = {
  id: string;
  sessionId: string;
  studentId: string;
  present: boolean;
  note: string | null;
  createdAt: string;
  updatedAt: string;
};
