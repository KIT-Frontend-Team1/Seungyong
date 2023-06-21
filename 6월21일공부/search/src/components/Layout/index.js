import { Outlet } from "react-router-dom";
import Header from "./Header";
import styled from "styled-components";
import TopButton from "./TopButton";
const Layout = () => {
  return (
    <Wrapper>
      <Header />
      <TopButton />
      <Outlet />
    </Wrapper>
  );
};
export default Layout;

const Wrapper = styled.div`
  width: 100%;
  background-color: white;
`;
