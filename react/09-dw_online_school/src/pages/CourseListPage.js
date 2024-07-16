import React from "react";
import ListPage from "../components/ListPage";

const name = "모든 제작";
const summer = "자체 제작된 코스들로 기초를 쌓으세요.";
const background = "catalog";

function CourseListPage(props) {
  return <ListPage name={name} summer={summer} back={background}></ListPage>;
}

export default CourseListPage;
