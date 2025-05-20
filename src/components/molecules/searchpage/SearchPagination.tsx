"use client"

import { useCallback } from "react";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";

interface SearchPaginationProps {
  totalPages: number;
  currentPage: number;
}

export default function SearchPagination({ totalPages, currentPage }: SearchPaginationProps) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const isBelowFive = totalPages <= 5;
  const isCloseToStartPage = currentPage <= 3;
  const isCloseToEndPage = totalPages - currentPage <= 2;

  const getVisiblePages = (total: number, current: number): number[] => {
    if (total <= 5) return Array.from({ length: total }, (_, i) => i + 1);
    if (current <= 3) return [2, 3, 4, 5];
    if (total - current <= 2) return [total - 4, total - 3, total - 2, total - 1];
    return [current - 2, current - 1, current, current + 1, current + 2];
  }

  const handlePageChange = useCallback((page: number) => {
    if (page < 1 || page > totalPages) return;
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", page.toString());
    router.replace(`/search?${params}`);
  }, [router, searchParams, totalPages]);

  return (
    <Pagination className="mt-8 mb-2">
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious onClick={() => handlePageChange(currentPage - 1)} />
        </PaginationItem>
        {isBelowFive ? (
          <>
            {Array.from({ length: totalPages }, (_, index) => (
              <PaginationItem key={index}>
                <PaginationLink isActive={currentPage === index + 1} onClick={() => handlePageChange(index + 1)}>{index + 1}</PaginationLink>
              </PaginationItem>
            ))}
          </>
        ) : (
          <>
            <PaginationItem>
              <PaginationLink isActive={currentPage === 1} onClick={() => handlePageChange(1)}>1</PaginationLink>
            </PaginationItem>
            {!isCloseToStartPage && (
              <PaginationItem>
                <PaginationEllipsis />
              </PaginationItem>
            )}
            {getVisiblePages(totalPages, currentPage).map((page) => (
              <PaginationItem key={page}>
                <PaginationLink isActive={currentPage === page} onClick={() => handlePageChange(page)}>{page}</PaginationLink>
              </PaginationItem>
            ))}
            {!isCloseToEndPage && (
              <PaginationItem>
                <PaginationEllipsis />
              </PaginationItem>
            )}
            <PaginationItem>
              <PaginationLink isActive={currentPage === totalPages} onClick={() => handlePageChange(totalPages)}>{totalPages}</PaginationLink>
            </PaginationItem>
          </>
        )}
        <PaginationItem>
          <PaginationNext onClick={() => handlePageChange(currentPage + 1)} />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  )
}
