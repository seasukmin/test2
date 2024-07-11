import React from "react";
import Wrapper from "./Wrapper";
import Input from "./Input";
import Div from "./Div";

function InputPrac(props) {
  return (
    <Div>
      <Wrapper>
        <h1>로그인</h1>
      </Wrapper>
      <form>
        <Wrapper>
          <label htmlFor="email">Email</label>
          <Input id="email" placeholder="Email" />
          <label htmlFor="password">Password</label>
          <Input id="password" placeholder="Password" />
        </Wrapper>
      </form>
    </Div>
  );
}

export default InputPrac;
