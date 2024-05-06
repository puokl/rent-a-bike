import React from "react";

interface Props {
  currentPage: number;
  totalPages: number;
  onPageChange: (pageNumber: number) => void;
}

const BikePaginator: React.FC<Props> = ({
  currentPage,
  totalPages,
  onPageChange,
}) => {
  const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <nav aria-label="Page navigation">
      <ul className="flex justify-center gap-2">
        {pageNumbers.map((pageNumber) => (
          <li
            key={pageNumber}
            className={`px-3 py-2 rounded-md text-sm font-medium ${
              currentPage === pageNumber
                ? "bg-gray-200 text-gray-700"
                : "text-gray-500 hover:text-gray-700 hover:bg-gray-100"
            }`}
          >
            <button
              onClick={() => onPageChange(pageNumber)}
              className="focus:outline-none"
            >
              {pageNumber}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default BikePaginator;
