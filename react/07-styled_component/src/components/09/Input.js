import styled from "styled-components";

const SIZES = {
  large: 30,
  medium: 25,
  small: 20,
};

const Input = styled.input`
  font-size: ${({ size }) => SIZES[size] ?? SIZES["medium"]}px;
  height: 40px;
  border: none;
  border-bottom: 3px solid #eeeeee;
  border-radius: ${({ $round }) => ($round ? "9999px" : "3px")};
  outline: none;

  &:focus {
    border-color: ${({ $color }) => ($color ? "#7760b4" : "")};
  }

  &::placeholder {
    color: #c4c5cd;
  }
`;

export default Input;
