import React from "react";
import Container from "../components/Container";
import styles from "./QuestionPage.module.css";
import Writer from "../components/Writer";
import Answer from "../components/Answer";
import { useLocation, useParams } from "react-router-dom";
import DateText from "./../components/DateText";
import Avatar from "../components/Avatar";

function QuestionPage() {
  const props = useLocation();
  const { pathname, state } = props;
  return (
    <>
      <div className={styles.header}>
        <Container>
          <div className={styles.question}>
            <div className={styles.questionInfo}>
              <div className={styles.content}>
                <div className={styles.title}>{state.question.title}</div>
                <div className={styles.date}>
                  <DateText value={state.question.createdAt} />
                </div>
              </div>
              <Writer className={styles.author} state={{ state }} />
            </div>
            <p className={styles.content}>{state.question.content}</p>
          </div>
        </Container>
      </div>
      <Container className={styles.answers}>
        <h2 className={styles.count}>{state.question.answers.length}개 답변</h2>
        <Answer state={{ state }} />
      </Container>
    </>
  );
}

export default QuestionPage;
