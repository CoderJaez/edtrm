"use client";
import { useSearchParams } from "next/navigation";
import React from "react";
import Link from "next/link";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  baseUrl: string;
}

export function Pagination({
  currentPage,
  totalPages,
  baseUrl,
}: PaginationProps) {
  const prev: number = Number(currentPage) - Number(1);
  const next: number = Number(currentPage) + Number(1);
  const params = useSearchParams();
  const division_code = params.get("division_code")
    ? `&division_code=${params.get("division_code")}`
    : null;
  const time_inout = params.get("time_inout")
    ? `&time_inout=${params.get("time_inout")}`
    : null;
  const employee = params.get("employee")
    ? `&employee=${params.get("employee")}`
    : null;

  return (
    <div className="mt-4 flex justify-center space-x-2">
      {currentPage > 1 && (
        <Link
          href={`${baseUrl}?page=${prev}${division_code ?? division_code}${time_inout ?? time_inout}${employee ?? employee}`}
          className="rounded bg-blue-500 px-3 py-2 text-white"
        >
          Previous
        </Link>
      )}
      <span className="px-3 py-2">
        Page {currentPage} of {totalPages}
      </span>
      {currentPage < totalPages && (
        <Link
          href={`${baseUrl}?page=${next}${division_code ?? division_code}${time_inout ?? time_inout}${employee ?? employee}`}
          className="rounded bg-blue-500 px-3 py-2 text-white"
        >
          Next
        </Link>
      )}
    </div>
  );
}
