import React, { useState, useEffect } from "react";
import Pagination from "./Pagination";

const GroundPhotoList = () => {
  const [groundList, setGroundList] = useState([]);
  const [page, setPage] = useState(1);
  const listPerPage = 8;
  const totalPage = Math.ceil(groundList.length / listPerPage);

  // 실제 값 또는 변수를 위치와 검색어 입력에 맞게 제공해주세요
  const location = "원하는 위치";
  const searchInput = "검색어 입력";

  useEffect(() => {
    // 가상의 API 호출
    const fetchData = async () => {
      // 실제 API 호출로 대체해주세요
      const result = await fetch(
        `grounds?location=${location}&search=${searchInput}&offset=${
          (page - 1) * listPerPage
        }&count=${listPerPage}`
      );
      const data = await result.json();
      setGroundList(data.grounds);
    };

    fetchData();
  }, [page]);

  return (
    <>
      <Pagination
        totalPage={totalPage}
        limit={5}
        page={page}
        setPage={setPage}
      />
    </>
  );
};

export default GroundPhotoList;
