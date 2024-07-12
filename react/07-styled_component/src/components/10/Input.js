import styled from "styled-components";

const Button = styled.button`
  width: 300px;
  height: 50px;
  border: none;
  border-radius: 5%;
  &:hover {
    background-color: ${({ $choice }) => ($choice ? "red" : "black")};
  }
`;

export default Button;
