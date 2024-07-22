import React from "react";
import Container from "./Container";
import styles from "./QuestionItem.module.css";
import { Link } from "react-router-dom";
import Avatar from "./Avatar";
import DateText from "./DateText";

function QuestionItem({ question }) {
  const { title, createdAt, answers, docId, writer } = question;
  return (
    <Container>
      <div className={styles.questionBox}>
        <h2 className={styles.questionTitle}>
          <Link to={`/questions/${docId}`} state={{ question }}>
            {title}
          </Link>
          <span className={styles.questionSpan}>[{answers.length}]</span>
        </h2>
        <p className={styles.questionDate}>
          <DateText value={new Date(createdAt)} />
        </p>
        <div className={styles.personImg}>
          <Avatar photoUrl={writer.profile.photo} name={writer.name} />
        </div>
      </div>
    </Container>
  );
}

export default QuestionItem;
