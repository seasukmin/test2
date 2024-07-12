import React from "react";
import Input from "./Input";
import styled from "styled-components";

const Container = styled.div`
  ${Input} {
    margin: 10px;
  }
`;

export function Practice(props) {
  return (
    <Container>
      <h2>Size</h2>
      <Input size="small" />
      <Input size="medium" />
      <Input size="large" />
      <h2>Round</h2>
      <Input $round />
      <h2>Error</h2>
      <Input $color />
    </Container>
  );
}
// 이렇게 해야 as로 이름 바꿔쓸수잇음
