import React from "react";
import Container from "./Container";
import styles from "./ListPage.module.css";
import cn from "classnames";
import caltalogImg from "../assets/catalog.svg";
import communityImg from "../assets/community.svg";
import QuestionListPage from "./../pages/QuestionListPage";

const community = {
  name: "커뮤니티",
  summer: "DW 온라인스쿨의 2만 수강생들과 함께 공부해봐요.",
  background: "community",
};
const catalog = {
  name: "모든 제작",
  summer: "자체 제작된 코스들로 기초를 쌓으세요.",
  background: "catalog",
};

const dataDict = {
  community: community,
  catalog: catalog,
};

function ListPage({ back, children }) {
  const { name, summer } = dataDict[back];
  return (
    <>
      <div className={cn(styles.bg, styles[back])}>
        <img
          className={styles.icon}
          src={back === "catalog" ? caltalogImg : communityImg}
        />
        <div className={styles.texts}>
          <h1 className={styles.heading}>{name}</h1>
          <p className={styles.description}>{summer}</p>
        </div>
      </div>
      <Container className={styles.container}>{children}</Container>
    </>
  );
}

export default ListPage;
