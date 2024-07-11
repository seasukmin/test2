import React from "react";
import Wrapper from "./Wrapper";
import BoxOne from "./BoxOne";
import Boxtwo from "./Boxtwo";
import Box from "./Box";
import Circle from "./Circle";
import Input from "./Input";
import Button from "./Button";

function HelloStyled(props) {
  return (
    <div>
      {/* <button>Hello Styled!!</button> */}
      <Wrapper>
        <Box bgColor="#cf6a87">
          <span>🎄</span>
        </Box>
        <Box as="button" bgColor="#574b90" />
        <Circle bgColor="blue" />
      </Wrapper>
      <form>
        <Wrapper>
          <Input />
          <Input />
          <Input />
          <input type="text" required />
          <Button>제출</Button>
        </Wrapper>
      </form>
      <Wrapper>
        <Circle bgColor="yellow" />
      </Wrapper>
    </div>
  );
}

export default HelloStyled;
