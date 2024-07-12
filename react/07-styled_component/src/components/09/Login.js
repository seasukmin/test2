import React from "react";
import { Link } from "react-router-dom";
import Input from "./Input";
import Button from "./Button";
import styled from "styled-components";
import kakao from "./kakao.svg";

const Container = styled.div`
  width: 400px;
  height: 400px;
  display: flex;
  margin: 0 auto;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Container2 = styled.div`
  display: flex;
  gap: 10px;
  color: lightgray;
`;

const Container3 = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  color: lightgray;
  gap: 10px;
`;

const H1 = styled.h1`
  background-color: linear-gradient(135deg, aqua, purple);
  /* color: transparent; */
`;
const SearchButton = styled(Button)`
  background-image: url(${kakao});
  background-size: 30px;
  background-repeat: no-repeat;
  background-position: 28% 50%;
  padding-left: 40px;
`;

function Login(props) {
  return (
    <Container>
      <H1>DW 온라인스쿨</H1>
      <Container2>
        <h3>회원이 아니신가요?</h3>
        <Link to="/">
          <h3>회원가입 하기</h3>
        </Link>
      </Container2>
      <Container3>
        <label htmlFor="email">이메일</label>
        <Input id="email" $color placeholder="wekf@Dw.kr" />
        <label htmlFor="password">비밀번호</label>
        <Input id="password" $color placeholder="비밀번호" />
      </Container3>
      <Button $color>
        <h2>로그인 하기</h2>
      </Button>
      <SearchButton>
        <h2>카카오 로그인</h2>
      </SearchButton>
    </Container>
  );
}

export default Login;
