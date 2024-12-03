"use client";

import React, { useState } from "react";

export interface ColumnConfig<T> {
  key: keyof T;
  label: string;
  render?: (value: any, row: T) => any;
}

interface CustomTableProps<T> {
  data: T[];
  columns: ColumnConfig<T>[];
  itemsPerPage?: number;
}

const CustomTable = <T extends {}>({
  data,
  columns,
  itemsPerPage = 10
}: CustomTableProps<T>) => {
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(data.length / itemsPerPage);

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const paginatedData = data.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  /* WIP: Just to showcase the possibilities. */
  const renderPageNumbers = () => {
    const pageNumbers: (string | number)[] = [];
    const maxPageButtons = 5;

    if (totalPages <= maxPageButtons) {
      for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
      }
    } else {
      if (currentPage <= 3) {
        pageNumbers.push(1, 2, 3, "...", totalPages);
      } else if (currentPage >= totalPages - 2) {
        pageNumbers.push(1, "...", totalPages - 2, totalPages - 1, totalPages);
      } else {
        pageNumbers.push(
          1,
          "...",
          currentPage - 1,
          currentPage,
          currentPage + 1,
          "...",
          totalPages
        );
      }
    }

    return pageNumbers.map((page, index) =>
      typeof page === "number" ? (
        <button
          key={index}
          onClick={() => handlePageChange(page)}
          className={`px-3 py-1 rounded ${
            page === currentPage ? "bg-blue-500 text-white" : "bg-gray-200"
          }`}
        >
          {page}
        </button>
      ) : (
        <span key={index} className="px-3 py-1 text-gray-500">
          {page}
        </span>
      )
    );
  };

  return (
    <div className="w-full">
      {/* Header */}
      <div className="hidden lg:flex bg-gray-50 border-b border-gray-200">
        {columns.map(column => (
          <div
            key={String(column.key)}
            className="flex-1 px-4 py-2 text-left text-sm font-medium text-gray-600"
          >
            {column.label}
          </div>
        ))}
      </div>

      {/* Rows */}
      <div className="space-y-4">
        {paginatedData.map((row, rowIndex) => (
          <div
            key={rowIndex}
            className="flex flex-col lg:flex-row lg:items-center bg-white shadow rounded border border-gray-200"
          >
            {/* Regular table row for large screens */}
            {columns.map(column => (
              <div
                key={String(column.key)}
                className="flex-1 px-4 py-2 text-sm text-gray-800 hidden lg:block"
              >
                {column.render
                  ? column.render(row[column.key], row)
                  : row[column.key]}
              </div>
            ))}

            {/* Card-style row for small screens */}
            <div className="block lg:hidden w-full">
              {columns.map(column => (
                <div
                  key={String(column.key)}
                  className="flex items-center px-4 py-2 border-b last:border-b-0"
                >
                  <div className="w-1/3 text-sm font-medium text-gray-600">
                    {column.label}
                  </div>
                  <div className="w-2/3 text-sm text-gray-800">
                    {column.render
                      ? column.render(row[column.key], row)
                      : row[column.key]}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className="flex justify-center items-center mt-4 space-x-2">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="px-3 py-1 bg-gray-200 text-gray-600 rounded disabled:opacity-50 disabled:cursor-not-allowed"
        >
          &larr;
        </button>
        {renderPageNumbers()}
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="px-3 py-1 bg-gray-200 text-gray-600 rounded disabled:opacity-50 disabled:cursor-not-allowed"
        >
          &rarr;
        </button>
      </div>
    </div>
  );
};

export default CustomTable;
