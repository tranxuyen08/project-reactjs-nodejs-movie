// ./Pagination/Pagination.js
import React from "react";
import "./Pagination.css";

const Pagination = ({ pagination, handleOnPageChange }) => {
  const totalPage = Math.ceil(
    Number(pagination?._totalMovie) / Number(pagination?._limit)
  );

  const handleClick = (newPage) => {
    if (handleOnPageChange) {
      handleOnPageChange(newPage);
    }
  };

  return (
    <div className="pagination">
      <button
        disabled={pagination?._page <= 1}
        onClick={() => handleClick(pagination?._page - 1)}
        className="btn btn-action"
      >
        prev
      </button>
      {Array.from({ length: totalPage }).map((_, index) => (
        <p
          key={index}
          href="#"
          className={`number-pagination ${
            pagination?._page === index + 1 ? "active" : ""
          }`}
          onClick={() => handleClick(index + 1)}
        >
          {index + 1}
        </p>
      ))}
      <button
        disabled={pagination?._page >= totalPage}
        onClick={() => handleClick(pagination?._page + 1)}
        className="btn btn-action"
      >
        next
      </button>
    </div>
  );
};

export default Pagination;
