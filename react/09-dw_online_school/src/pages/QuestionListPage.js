import React from "react";
import ListPage from "../components/ListPage";

const name = ["커뮤니티"];
const summer = ["DW 온라인스쿨의 2만 수강생들과 함께 공부해봐요."];
const background = "community";

function QuestionListPage(props) {
  return <ListPage name={name} summer={summer} back={background}></ListPage>;
}

export default QuestionListPage;
