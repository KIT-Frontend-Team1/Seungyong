import { useState, useEffect } from "react";
import styled from "styled-components";
function TopButton() {
  const [showButton, setShowButton] = useState(false);

  const scrollToTop = () => {
    window.scroll({
      top: 0,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    const handleShowButton = () => {
      if (window.scrollY > 500) {
        setShowButton(true);
      } else {
        setShowButton(false);
      }
    };

    // console.log(window.scrollY)
    window.addEventListener("scroll", handleShowButton);
    return () => {
      window.removeEventListener("scroll", handleShowButton);
    };
  }, []);

  return (
    showButton && (
      <S.Wrapper onClick={scrollToTop} type="button">
        Top
      </S.Wrapper>
    )
  );
}
export default TopButton;

const Wrapper = styled.div`
  position: fixed;
  right: 50px;
  bottom: 50px;
  width: 60px;
  height: 60px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 0.15rem solid white;
  color: white;
  font-weight: 700;
  cursor: pointer;
  :hover {
    background-color: white;
    color: black;
  }
`;
const S = {
  Wrapper,
};
