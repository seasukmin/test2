import React, { useEffect, useState } from "react";
import Container from "../components/Container";
import CourseIcon from "../components/CourseIcon";
import Button from "../components/Button";
import Card from "../components/Card";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import getCourseColor from "../utils/getCourseColor";
import { getData } from "../api/firebase";
import styles from "./CoursePage.module.css";
import CourseItem from "../components/CourseItem";

function CoursePage() {
  const props = useLocation();
  const { pathname, state } = props;
  const { courseSlug } = useParams();
  const navigate = useNavigate();

  const [course, setCourse] = useState();
  // undefined.code
  // undefined 여기서 그냥 끝
  //   if(course) {
  //     getCourseColor(course.code)
  //   }
  const courseColor = getCourseColor(course?.code);
  const headerStyle = {
    borderColor: courseColor,
  };
  const handleLoad = async () => {
    const resultData = await getData("coureses", {
      field: "slug",
      condition: "==",
      value: courseSlug,
    });
    setCourse(resultData);
  };

  const handleAddWishlistClick = (e) => {
    const member = JSON.parse(localStorage.getItem("member"));
    console.log({ course });
    if (member) {
      navigate("/wishlist");
    } else {
      alert("로그인을 해주세요.");
      navigate("/login", { state: pathname });
      // /가 없으면 끝에 부분 주소가 바뀐다.  있어야 절대 경로로 3000/login이된다.
    }
  };

  useEffect(() => {
    handleLoad();
  }, []);

  return (
    <>
      <div className={styles.header} style={headerStyle}>
        <Container className={styles.content}>
          <CourseIcon photoUrl={course?.photoUrl} />
          <h1 className={styles.title}>{course?.title}</h1>
          <Button onClick={handleAddWishlistClick} variant="round">
            + 코스 담기
          </Button>
          <p className={styles.summary}>{course?.summary}</p>
        </Container>
      </div>
      <Container className={styles.topics}>
        {course?.topics.map(({ topic }) => {
          return (
            <Card key={topic.slug} className={styles.topic}>
              <h3 className={styles.title}>{topic.title}</h3>
              <p className={styles.summary}>{topic.summary}</p>
            </Card>
          );
        })}
      </Container>
    </>
  );
}

export default CoursePage;
