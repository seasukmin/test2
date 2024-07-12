import styled from "styled-components";

const SIZES = {
  large: 24,
  medium: 20,
  small: 16,
};

const Button = styled.button`
  background-color: #6500c3;
  border: none;
  color: ${({ $color }) => ($color ? "white" : "black")};
  border-radius: ${({ $round }) => ($round ? "9999px" : "8px")};
  background-color: ${({ $color }) => ($color ? "#6500c3" : "yellow")};
  cursor: pointer;
  display: block;
  margin-top: 20px;
  width: 100%;
  font-size: 16px;

  &:hover {
    background-color: #7760b4;
  }
`;
// ?? 앞에가 false면 뒤에껄 하겠따!
// 비표준 변수에 $붙여주면 오류가 안생긴다!
export default Button;
