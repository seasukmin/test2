import React from "react";
import Container from "./Container";
import person from "../assets/person.png";
import styles from "./QuestionItem.module.css";

function QuestionItem({ question }) {
  const { title, createdAt } = question;
  return (
    <Container>
      <div className={styles.questionBox}>
        <h2 className={styles.questionTitle}>{title}</h2>
        <p className={styles.questionDate}>
          {createdAt.split("T")[0].split("-").join(". ")}
        </p>
        <img src={person} className={styles.personImg} />
      </div>
    </Container>
  );
}

export default QuestionItem;
