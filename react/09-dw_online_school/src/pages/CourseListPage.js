import React, { useEffect, useState } from "react";
import ListPage from "../components/ListPage";
import searchImg from "../assets/search.svg";
import styles from "./CourseListPage.module.css";
import CourseItem from "../components/CourseItem";
import { getDatas } from "../api/firebase";

function CourseListPage(props) {
  const [items, setItems] = useState([]);

  const handleLoad = async () => {
    // 파이어베이스의 courses 컬렉션의 데이터를 가져온다.
    const resultData = await getDatas("coureses");
    // 가져온 데이터 콘솔로 확인.
    console.log(resultData);
    // items state에 set 해준다.
    setItems(resultData);
  };

  useEffect(() => {
    handleLoad();
  }, []);

  return (
    <ListPage back="catalog">
      <form className={styles.form}>
        <input />
        <button>
          <img src={searchImg} />
        </button>
      </form>

      <p className={styles.count}>총 {items.length}개 코스</p>

      <div className={styles.courseList}>
        {items.map((course) => {
          return <CourseItem key={course.docId} items={course} />;
        })}
      </div>
    </ListPage>
  );
}

export default CourseListPage;
