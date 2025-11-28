import Pagination from 'react-bootstrap/Pagination';
import type { Dispatch, SetStateAction } from 'react';

interface TablePaginationProps {
  totalPages: number;
  currentPage: number;
  setCurrentPage: Dispatch<SetStateAction<number>>;
}

function TablePagination({ totalPages, currentPage, setCurrentPage }: TablePaginationProps) {
  // Validate totalPages to prevent rendering with invalid values
  const isValidTotalPages = Number.isFinite(totalPages) && totalPages > 0;
  const safeTotalPages = isValidTotalPages ? totalPages : 1;

  // Ensure currentPage is within valid bounds
  const safeCurrentPage = Math.max(1, Math.min(currentPage, safeTotalPages));

  const isFirstPage = safeCurrentPage === 1;
  const isLastPage = safeCurrentPage === safeTotalPages;

  // Don't render pagination if totalPages is invalid
  if (!isValidTotalPages) {
    return null;
  }

  return (
    <Pagination>

      <Pagination.First
        onClick={() => setCurrentPage(1)}
        disabled={isFirstPage}
      />
      <Pagination.Prev
        onClick={() => setCurrentPage(prevPage => Math.max(1, prevPage - 1))}
        disabled={isFirstPage}
      />

      {/* Pagination numbers */}
      {[...Array(safeTotalPages)].map((_, i) => (
        <Pagination.Item
          key={i + 1}
          active={safeCurrentPage === i + 1}
          onClick={() => setCurrentPage(i + 1)}
        >
          {i + 1}
        </Pagination.Item>
      ))}

      <Pagination.Next
        onClick={() => setCurrentPage(prevPage => Math.min(safeTotalPages, prevPage + 1))}
        disabled={isLastPage}
      />
      <Pagination.Last
        onClick={() => setCurrentPage(safeTotalPages)}
        disabled={isLastPage}
      />
    </Pagination>
  );
}

export default TablePagination;