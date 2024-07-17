import React from "react";
import CourseIcon from "./CourseIcon";
import { Link } from "react-router-dom";
import styles from "./CourseItem.module.css";
import Card from "./Card";
import { styled } from "styled-components";
import getCourseColor from "./../utils/getCourseColor";

function CourseItem({ course }) {
  const { title, summary, language, photoUrl, difficulty, code } = course;
  const courseColor = getCourseColor(code);
  const thumbsStyle = {
    borderColor: courseColor,
  };
  const difficult = {
    1: "초급",
    2: "중급",
    3: "고급",
  };
  const level = difficult[difficulty];
  return (
    <Card className={styles.courseItem}>
      <div className={styles.thumb} style={thumbsStyle}>
        <CourseIcon photoUrl={photoUrl} />
      </div>
      <div className={styles.content}>
        <h2 className={styles.title}>
          <Link>{title}</Link>
        </h2>
        <p className={styles.description}>{summary}</p>
        <div>
          <ul className={styles.tags}>
            <li>{language}</li>
            <li>{level}</li>
          </ul>
        </div>
      </div>
    </Card>
  );
}

export default CourseItem;
