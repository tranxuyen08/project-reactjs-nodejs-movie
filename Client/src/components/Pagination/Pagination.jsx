import React from "react";
import "./Pagination.css";
const Pagination = (props) => {
  const { pagination, onPageChange } = props;
  const { _limit, _page, _totalMovie } = pagination;

  const totalPage = Math.ceil(Number(_totalMovie) / Number(_limit));
  console.log("totalPage", totalPage);
  const handleClick = (newPage) => {
    if (onPageChange) {
      onPageChange(newPage);
    }
  };

  return (
    <div className="pagination">
      <button disabled={_page <= 1} onClick={() => handleClick(_page - 1)}>
        prev
      </button>
      {Array.from({ length: totalPage }).map((_, index) => (
        <p
          key={index}
          href="#"
          className={_page === index + 1 ? "active" : ""}
          onClick={() => handleClick(index + 1)}
        >
          {index + 1}
        </p>
      ))}
      <button
        disabled={_page >= totalPage}
        onClick={() => handleClick(_page + 1)}
      >
        next
      </button>
    </div>
  );
};

export default Pagination;
