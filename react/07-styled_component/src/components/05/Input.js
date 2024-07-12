import styled from "styled-components";

const SIZES = {
  large: 300,
  medium: 250,
  small: 200,
};

const Input = styled.input`
  width: ${({ size }) => SIZES[size] ?? SIZES["medium"]}px;
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
