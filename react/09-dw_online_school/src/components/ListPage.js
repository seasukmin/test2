import React from "react";
import Container from "./Container";
import styles from "./ListPage.module.css";
import cn from "classnames";
import caltalogImg from "../assets/catalog.svg";
import communityImg from "../assets/community.svg";
import QuestionListPage from "./../pages/QuestionListPage";

function ListPage({ name, summer, back }) {
  console.log(back);
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
      <Container className={styles.container}></Container>
    </>
  );
}

export default ListPage;
