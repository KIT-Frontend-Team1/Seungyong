import OneItem from "./OneItem";
import styled from "styled-components";

const ItemList = ({ data }) => {
  return (
    <S.Wrapper>
      {data.map((item) => {
        return <OneItem key={item.id} data={item} />;
      })}
    </S.Wrapper>
  );
};

export default ItemList;

const Wrapper = styled.div`
  margin: 0 auto;
  width: 80%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const S = {
  Wrapper,
};
