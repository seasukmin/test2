import React from "react";
import TermsOfService from "./TermsOfService";
import Button from "./Button";
import styled from "styled-components";

const StyledTermsOfService = styled(TermsOfService)`
  background-color: #ededed;
  width: 400px;
  height: 400px;
  padding: 16px;
  margin: 0 auto;
`;

const SubmitButton = styled(Button)`
  background-color: #de117d;
  width: 200px;
  margin: 30px auto;
  display: block;
`;

// const Container = styled.div`
//   width: 100%;
//   height: 100%;
//   display: flex;
//   flex-direction: column;
//   justify-content: center;
//   align-items: center;
// `;

function Inheritance() {
  return (
    <div>
      <StyledTermsOfService />
      <SubmitButton>계속하기</SubmitButton>
    </div>
  );
}

export default Inheritance;
