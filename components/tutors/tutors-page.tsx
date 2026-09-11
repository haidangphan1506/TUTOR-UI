"use client";

import { useState } from "react";
import { Loader2, Plus, Search, ShieldOff } from "lucide-react";

import { getErrorMessage } from "@/lib/axios";
import { useCurrentUserRole } from "@/hooks/useCurrentUserRole";
import { useAdminTutors } from "@/hooks/useAdminUsers.hook";
import { Button } from "@/components/ui/button.ui";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table.ui";
import { AddTutorDialog } from "@/components/tutors/add-tutor-dialog";
import UsageGuides, {
  type UsageGuideStep,
} from "@/components/ui/usage-guide.ui";
import type { ApiManagedUser } from "@/types";

const PAGE_SIZE = 10;

const USAGE_GUIDE_STEPS: UsageGuideStep[] = [
  {
    n: 1,
    title: "Tìm gia sư",
    body: "Gõ tên hoặc email vào ô tìm kiếm ở góc trên bên phải để lọc danh sách.",
  },
  {
    n: 2,
    title: "Thêm gia sư",
    body: (
      <>
        Nhấn <span className="font-semibold text-[#0E9F8E]">Thêm gia sư</span>{" "}
        để tạo tài khoản gia sư mới.
      </>
    ),
  },
  {
    n: 3,
    title: "Thông tin nhanh",
    body: "Cột Môn dạy, SĐT, Sĩ số lớp và Học sinh cho biết khối lượng công việc của từng gia sư.",
  },
  {
    n: 4,
    title: "Trạng thái tài khoản",
    body: (
      <>
        Nhãn <span className="font-semibold text-[#0B7A6D]">Hoạt động</span>{" "}
        / <span className="font-semibold text-[#DC2626]">Đã khoá</span> cho
        biết gia sư có đang đăng nhập được không.
      </>
    ),
  },
];

function initials(firstName?: string | null, lastName?: string | null): string {
  const f = firstName?.trim().charAt(0) ?? "";
  const l = lastName?.trim().charAt(0) ?? "";
  return (f + l).toUpperCase() || "G";
}

function fullName(t: ApiManagedUser): string {
  return [t.firstName, t.lastName].filter(Boolean).join(" ") || "Chưa đặt tên";
}

const COLUMNS = ["STT", "GIA SƯ", "MÔN DẠY", "SĐT", "SĨ SỐ LỚP", "HỌC SINH", "TRẠNG THÁI"];

export function TutorsPage() {
  const role = useCurrentUserRole();
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);

  const params: { page: number; limit: number; search?: string } = {
    page,
    limit: PAGE_SIZE,
  };
  if (search.trim()) params.search = search.trim();

  const { data, isPending, isError, error, refetch } = useAdminTutors(
    params,
    role === "ADMIN",
  );

  if (role !== "ADMIN") {
    return (
      <div className="flex flex-col items-center justify-center gap-3 rounded-xl border border-[#E7EEEC] bg-white py-24 text-center shadow-sm">
        <span className="flex size-12 items-center justify-center rounded-full bg-[#FFF0E6]">
          <ShieldOff className="size-6 text-[#E85D24]" />
        </span>
        <h2 className="text-lg font-bold text-[#16302b]">
          Không có quyền truy cập
        </h2>
        <p className="max-w-sm text-sm text-[#8AA09B]">
          Chỉ quản trị viên mới có thể xem và quản lý danh sách gia sư.
        </p>
      </div>
    );
  }

  const tutors = data?.tutors ?? [];
  const total = data?.pagination.total ?? 0;
  const totalPages = data?.pagination.totalPages ?? 1;

  return (
    <div className="flex flex-col gap-5">
      {/* ── Page header ── */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <h1 className="text-2xl font-bold text-[#16302b]">Gia sư</h1>
          {!isPending && !isError ? (
            <span className="rounded-full bg-[#E4F6EF] px-3 py-0.5 text-sm font-semibold text-[#0E9F8E]">
              {total} gia sư
            </span>
          ) : null}
        </div>
        <div className="flex items-center gap-3">
          <div className="relative">
            <Search className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 size-3.5 text-[#9AAEA9]" />
            <input
              type="search"
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setPage(1);
              }}
              placeholder="Tìm theo tên, email..."
              className="h-9 w-56 rounded-lg border border-[#E7EEEC] bg-white pl-9 pr-3 text-sm text-[#16302b] placeholder:text-[#9AAEA9] focus:outline-none focus:ring-2 focus:ring-[#0E9F8E]/30 focus:border-[#0E9F8E] transition-colors"
            />
          </div>
          <Button
            type="button"
            size="lg"
            onClick={() => setIsAddOpen(true)}
            className="w-auto! gap-1.5 px-4"
          >
            <Plus className="size-4" />
            Thêm gia sư
          </Button>
        </div>
      </div>

      <AddTutorDialog
        open={isAddOpen}
        onClose={() => setIsAddOpen(false)}
        onCreated={() => {
          setPage(1);
          void refetch();
        }}
      />

      {/* ── Table ── */}
      <div className="overflow-hidden rounded-xl border border-[#E7EEEC] bg-white shadow-sm">
        <Table>
          <TableHeader>
            <TableRow className="border-b border-[#E7EEEC] bg-[#F3F7F5]">
              {COLUMNS.map((col, i) => (
                <TableHead
                  key={col}
                  className={`h-auto px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-[#9AAEA9] ${
                    i === 0 ? "w-14" : ""
                  }`}
                >
                  {col}
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {tutors.map((t, i) => (
              <TableRow
                key={t.id}
                className="border-b border-[#EEF3F1] last:border-0 hover:bg-[#F1FBF9]"
              >
                <TableCell className="px-4 py-3.5 font-medium text-[#9AAEA9]">
                  {String((page - 1) * PAGE_SIZE + i + 1).padStart(2, "0")}
                </TableCell>

                <TableCell className="px-4 py-3.5">
                  <div className="flex items-center gap-3">
                    {t.avatar ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={t.avatar}
                        alt={fullName(t)}
                        className="size-9 shrink-0 rounded-full object-cover"
                      />
                    ) : (
                      <span
                        className="flex size-9 shrink-0 items-center justify-center rounded-full text-xs font-bold text-white"
                        style={{ backgroundColor: "#0E9F8E" }}
                      >
                        {initials(t.firstName, t.lastName)}
                      </span>
                    )}
                    <div className="min-w-0">
                      <p className="truncate font-semibold leading-tight text-[#16302b]">
                        {fullName(t)}
                      </p>
                      <p className="mt-0.5 truncate text-xs text-[#8AA09B]">
                        {t.email || "—"}
                      </p>
                    </div>
                  </div>
                </TableCell>

                <TableCell className="px-4 py-3.5">
                  {t.subjects && t.subjects.length ? (
                    <div className="flex flex-wrap gap-1">
                      {t.subjects.map((s) => (
                        <span
                          key={s}
                          className="rounded-md bg-[#E4F6EF] px-2 py-0.5 text-xs font-medium text-[#0B7A6D]"
                        >
                          {s}
                        </span>
                      ))}
                    </div>
                  ) : (
                    <span className="text-[#9AAEA9]">—</span>
                  )}
                </TableCell>

                <TableCell className="px-4 py-3.5 text-[#16302b]">
                  {t.phone || "—"}
                </TableCell>

                <TableCell className="px-4 py-3.5 text-center text-[#16302b]">
                  {t.classCount ?? "—"}
                </TableCell>

                <TableCell className="px-4 py-3.5 text-center text-[#16302b]">
                  {t.studentCount ?? "—"}
                </TableCell>

                <TableCell className="px-4 py-3.5">
                  <span
                    className={`rounded-md px-2.5 py-0.5 text-xs font-semibold ${
                      t.isActive
                        ? "bg-[#E4F6EF] text-[#0B7A6D]"
                        : "bg-[#FEE2E2] text-[#DC2626]"
                    }`}
                  >
                    {t.isActive ? "Hoạt động" : "Đã khoá"}
                  </span>
                </TableCell>
              </TableRow>
            ))}

            {!isPending && !isError && tutors.length === 0 && (
              <TableRow>
                <TableCell
                  colSpan={COLUMNS.length}
                  className="py-14 text-center text-[#9AAEA9]"
                >
                  Chưa có gia sư phù hợp.
                </TableCell>
              </TableRow>
            )}
            {isPending && (
              <TableRow>
                <TableCell
                  colSpan={COLUMNS.length}
                  className="py-14 text-center text-[#9AAEA9]"
                >
                  <Loader2 className="mx-auto size-5 animate-spin" />
                </TableCell>
              </TableRow>
            )}
            {isError && (
              <TableRow>
                <TableCell
                  colSpan={COLUMNS.length}
                  className="py-14 text-center text-red-500"
                >
                  {getErrorMessage(error, "Không thể tải danh sách gia sư.")}
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex items-center justify-end gap-1 border-t border-[#EEF3F1] px-4 py-3">
            <button
              type="button"
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={page === 1}
              className="rounded-lg px-3 py-1.5 text-sm text-[#16302b] hover:bg-[#F3F7F5] disabled:cursor-not-allowed disabled:opacity-40 transition-colors"
            >
              Trước
            </button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
              <button
                key={p}
                type="button"
                onClick={() => setPage(p)}
                className="size-8 rounded-lg text-sm font-medium transition-colors"
                style={
                  p === page
                    ? { background: "#0E9F8E", color: "#fff" }
                    : { color: "#16302b" }
                }
              >
                {p}
              </button>
            ))}
            <button
              type="button"
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              disabled={page === totalPages}
              className="rounded-lg px-3 py-1.5 text-sm text-[#16302b] hover:bg-[#F3F7F5] disabled:cursor-not-allowed disabled:opacity-40 transition-colors"
            >
              Sau
            </button>
          </div>
        )}
      </div>

      <UsageGuides steps={USAGE_GUIDE_STEPS} />
    </div>
  );
}
