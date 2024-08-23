// components/Pagination.tsx
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
  const prev: number = currentPage - 1;
  const next: number = currentPage + 1;
  return (
    <div className="mt-4 flex justify-center space-x-2">
      {currentPage > 1 && (
        <Link
          href={`${baseUrl}?page=${prev}`}
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
          href={`${baseUrl}?page=${next}`}
          className="rounded bg-blue-500 px-3 py-2 text-white"
        >
          Next
        </Link>
      )}
    </div>
  );
}
