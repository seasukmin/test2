import React, { useEffect, useState } from "react";
import ListPage from "../components/ListPage";
import styles from "./QuestionListPage.module.css";
import searchImg from "../assets/search.svg";
import { getDatas } from "../api/firebase";
import Warn from "../components/Warn";
import CourseItem from "../components/CourseItem";
import QuestionItem from "../components/QuestionItem";

let Quetionlist;

function QuestionListPage(props) {
  const [items, setItems] = useState([]);
  const [keyword, setkeyword] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const handlekeywordChange = (e) => {
    // 사용자가 입력한 키워드를 state에 저장한다.
    setkeyword(e.target.value);
  };
  const etargetArr = [];
  const handleSubmit = (e) => {
    e.preventDefault();
    // 전체 데이터를 가지고 있는 listItems를 활용해

    // 사용자가 입력한 키워드를 title에 포함하고 있는 객체를 원소로 가지는 배열을 만든다.
    const searchItems = Quetionlist.filter(function (item) {
      return item.title.includes(keyword);
    });
    // 만든 배열을 items state에 set 해준다.
    setItems(searchItems);
    setItems(Quetionlist.filter(({ title }) => title.includes(keyword)));
  };

  const handleLoad = async () => {
    setIsLoading(true);
    // 파이어베이스의 courses 컬렉션의 데이터를 가져온다.
    const resultData = await getDatas("Question");
    // 가져온 데이터 콘솔로 확인.
    // 전체데이터 변수에 저장
    Quetionlist = resultData;
    // items state에 set 해준다.
    setItems(resultData);
    setIsLoading(false);
  };
  useEffect(() => {
    handleLoad();
  }, []);

  return (
    <ListPage back={"community"}>
      <form className={styles.form} onSubmit={handleSubmit}>
        <input
          onChange={handlekeywordChange}
          placeholder="검색으로 질문 찾기"
        />
        <button>
          <img src={searchImg} />
        </button>
      </form>
      <p className={styles.count}>총 {items.length}개 코스</p>
      {items.length === 0 && !isLoading ? (
        <Warn
          className={styles.emptyList}
          title="조건에 맞는 코스가 없어요."
          description="올바른 검색어가 맞는지 다시 한 번 확인해 주세요."
        />
      ) : (
        <div className={styles.courseList}>
          {items.map((question) => {
            return <QuestionItem key={question.docId} question={question} />;
          })}
        </div>
      )}
    </ListPage>
  );
}

export default QuestionListPage;
