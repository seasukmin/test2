import styled, { css } from "styled-components";
import React from "react";
const SIZES = {
  large: 24,
  medium: 20,
  small: 16,
};

const fontSize = css`
  font-size: ${({ size }) => SIZES[size] ?? SIZES["medium"]}px;
`;

const Button = styled.button`
  background-color: #6750a4;
  border: none;
  color: #fff;
  padding: 16px;
  /* font-size: ${({ size }) => SIZES[size] ?? SIZES["medium"]}px; */
  ${fontSize}
`;
// ?? 앞에가 false면 뒤에껄 하겠따!
// 비표준 변수에 $붙여주면 오류가 안생긴다!

const Input = styled.input`
  /* font-size: ${({ size }) => SIZES[size] ?? SIZES["medium"]}px; */
  border: 2px solid #eeeeee;
  border-radius: 4px;
  padding: 16px;
  outline: none;
  ${fontSize}
`;

const Container = styled.div`
  ${Button}, ${Input} {
    margin: 10px;
  }
`;

function Reuse(props) {
  return (
    <Container>
      <h2>Button</h2>
      <Button size="small">small</Button>
      <Button size="medium">medium</Button>
      <Button size="large">large</Button>
      <h2>Input</h2>
      <Input size="small" />
      <Input size="medium" />
      <Input size="large" />
    </Container>
  );
}

export default Reuse;
