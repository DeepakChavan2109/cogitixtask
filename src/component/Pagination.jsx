import React from "react";

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  return (
    <div className="flex justify-center items-center mt-8 space-x-2">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="px-4 py-1 bg-blue-500 text-white rounded disabled:opacity-50"
      >
        Previous
      </button>

      {Array.from({ length: totalPages }, (_, index) => (
        <button
          key={index + 1}
          onClick={() => onPageChange(index + 1)}
          className={`px-4 py-1 rounded ${
            currentPage === index + 1 ? "bg-blue-500 text-white" : "bg-gray-300"
          }`}
        >
          {index + 1}
        </button>
      ))}

      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="px-4 py-1 bg-blue-500 text-white rounded disabled:opacity-50"
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
