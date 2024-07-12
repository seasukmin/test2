import styled from "styled-components";

const SIZES = {
  large: 24,
  medium: 20,
  small: 16,
};

const Button = styled.button`
  background-color: #6750a4;
  border: none;
  color: #fff;
  padding: 16px;
  font-size: ${({ size }) => SIZES[size] ?? SIZES["medium"]}px;
  border-radius: ${({ $round }) => ($round ? "9999px" : "3px")};

  &:hover {
    background-color: #463770;
  }
`;
// ?? 앞에가 false면 뒤에껄 하겠따!
// 비표준 변수에 $붙여주면 오류가 안생긴다!
export default Button;
