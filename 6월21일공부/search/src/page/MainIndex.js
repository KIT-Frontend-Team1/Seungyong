import { useSelector } from "react-redux";
import ItemList from "./main/ItemList";
import styled from "styled-components";

const MainIndex = () => {
  const movies = useSelector((state) => state.movie);
  return (
    <LULU>
      <ItemList data={movies} />
    </LULU>
  );
};

const LULU = styled.div`
  background-color: gray;
`;
export default MainIndex;
