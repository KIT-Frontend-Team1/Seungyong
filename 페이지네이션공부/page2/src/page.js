import React, { useState } from "react";

const Pagination = ({ itemsPerPage, data }) => {
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(data.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const items = data.slice(startIndex, endIndex);

  const handleClick = (page) => {
    setCurrentPage(page);
  };

  return (
    <div>
      <ul>
        {items.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
      <div className="pagination">
        {Array.from({ length: totalPages }, (_, index) => index + 1).map(
          (page) => (
            <a
              key={page}
              href="#"
              className={currentPage === page ? "active" : ""}
              onClick={() => handleClick(page)}
            >
              {page}
            </a>
          )
        )}
      </div>
    </div>
  );
};

export default Pagination;
