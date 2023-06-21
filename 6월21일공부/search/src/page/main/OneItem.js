import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const OneItem = ({ data }) => {
  const { id } = data;
  // console.log('oneitem', data)
  const navigate = useNavigate();

  const onClickDetail = () => {
    navigate(`/pageDetail/${id}`);
  };

  return (
    <S.Wrapper onClick={onClickDetail}>
      <S.Id>넘버 : {"#" + id}</S.Id>
    </S.Wrapper>
  );
};
export default OneItem;

const Wrapper = styled.div`
  width: 70%;
  height: 200px;
  margin-top: 15px;
  margin-bottom: 15px;
  border-radius: 20px;
  border: 0.1rem solid #888;
  padding: 20px;
  overflow: hidden;
  color: white;
  font-size: 17px;
  :hover {
    background-color: #444;
  }
`;

const Id = styled.div``;

const S = {
  Wrapper,
  Id,
};
