import React, { useState, useEffect } from "react";
import {
  FaAngleDoubleLeft,
  FaAngleLeft,
  FaAngleRight,
  FaAngleDoubleRight,
} from "react-icons/fa";

const PaginationWrapper = ({ children }) => {
  return <div>{children}</div>;
};

const PageButton = ({ onClick, ariaCurrent, children }) => {
  return (
    <button onClick={onClick} aria-current={ariaCurrent}>
      {children}
    </button>
  );
};

const ButtonWrapper = ({ children }) => {
  return <div>{children}</div>;
};

const sliceArrayByLimit = (totalPage, limit) => {
  const totalPageArray = Array(totalPage)
    .fill()
    .map((_, i) => i + 1);
  return Array(Math.ceil(totalPage / limit))
    .fill()
    .map(() => totalPageArray.splice(0, limit));
};

const Pagination = ({ totalPage, limit, page, setPage }) => {
  const [currentPageArray, setCurrentPageArray] = useState([]);
  const [totalPageArray, setTotalPageArray] = useState([]);

  useEffect(() => {
    const slicedPageArray = sliceArrayByLimit(totalPage, limit);
    setTotalPageArray(slicedPageArray);
    setCurrentPageArray(slicedPageArray[0]);
  }, [totalPage, limit]);

  useEffect(() => {
    if (page % limit === 1) {
      setCurrentPageArray(totalPageArray[Math.floor(page / limit)]);
    } else if (page % limit === 0) {
      setCurrentPageArray(totalPageArray[Math.floor(page / limit) - 1]);
    }
  }, [page, limit, totalPageArray]);

  return (
    <PaginationWrapper>
      <FaAngleDoubleLeft onClick={() => setPage(1)} disabled={page === 1} />
      <FaAngleLeft onClick={() => setPage(page - 1)} disabled={page === 1} />
      <ButtonWrapper>
        {currentPageArray?.map((i) => (
          <PageButton
            key={i}
            onClick={() => setPage(i)}
            ariaCurrent={page === i ? "page" : null}
          >
            {i}
          </PageButton>
        ))}
      </ButtonWrapper>
      <FaAngleRight
        onClick={() => setPage(page + 1)}
        disabled={page === totalPage}
      />
      <FaAngleDoubleRight
        onClick={() => setPage(totalPage)}
        disabled={page === totalPage}
      />
    </PaginationWrapper>
  );
};

export default Pagination;
