import styled from "styled-components";

const SIZES = {
  large: 30,
  medium: 25,
  small: 20,
};

const Input = styled.input`
  font-size: ${({ size }) => SIZES[size] ?? SIZES["medium"]}px;
  height: 40px;
  border: 2px solid ${({ $color }) => ($color ? "#f44336" : "#eeeeee")};
  border-radius: ${({ $round }) => ($round ? "9999px" : "3px")};
  padding: 16px;
  outline: none;

  &:focus {
    border-color: ${({ $color }) => ($color ? "#f44336" : " #7760b4")};
  }
`;

export default Input;
