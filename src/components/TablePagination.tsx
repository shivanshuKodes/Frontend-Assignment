import Pagination from 'react-bootstrap/Pagination';
import type { Dispatch, SetStateAction } from 'react';

interface TablePaginationProps {
  totalPages: number;
  currentPage: number;
  setCurrentPage: Dispatch<SetStateAction<number>>;
}

function TablePagination({ totalPages, currentPage, setCurrentPage }: TablePaginationProps) {
  return (
    <Pagination>

      <Pagination.First onClick={() => setCurrentPage(1)} />
      <Pagination.Prev onClick={() => setCurrentPage(prevPage => Math.max(1, prevPage - 1))} />

      {/* Pagination numbers */}
      {[...Array(totalPages)].map((_, i) => (
        <Pagination.Item
          key={i + 1}
          active={currentPage === i + 1}
          onClick={() => setCurrentPage(i + 1)}
        >
          {i + 1}
        </Pagination.Item>
      ))}

      <Pagination.Next onClick={() => setCurrentPage(prevPage => Math.min(totalPages, prevPage + 1))} />
      <Pagination.Last onClick={() => setCurrentPage(totalPages)} />
    </Pagination>
  );
}

export default TablePagination;