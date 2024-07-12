import React from "react";
import Input from "./Input";
import search from "./search.png";
import styled from "styled-components";

const SearchInput = styled(Input)`
  background-image: url(${search});
  background-size: 16px;
  background-repeat: no-repeat;
  background-position: 12px 50%;
  padding-left: 40px;
`;

export function Practice(props) {
  return (
    <div>
      <h2>Input</h2>
      <Input size="medium" />
      <h2>Search Input</h2>
      <SearchInput />
    </div>
  );
}
