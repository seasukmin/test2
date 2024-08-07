import React, { useContext, useEffect, useState } from "react";
import Header from "../components/Header";
import Button from "../components/Button";
import { useNavigate, useParams } from "react-router-dom";
import { DiaryStateContext } from "./../App";
import { emotionList } from "../util/Emotion";
import "./DiaryPage.css";
import { changeTitle } from "../util/changeTitle";
import { useSelector } from "react-redux";

function DiaryPage(props) {
  const { id } = useParams();
  // const { diaryList } = useContext(DiaryStateContext);
  const items = useSelector((state) => state.diary.items);
  const isAuthenticated = useSelector((state) => state.user.isAuthenticated);
  const [data, setData] = useState();
  const Navigate = useNavigate();
  const goDetail = () => {
    Navigate(`/edit/${id}`);
  };
  useEffect(() => {
    changeTitle(`감정 일기장 - ${id}번 일기`);
  }, []);

  useEffect(() => {
    if (items.length > 0) {
      // targetDiary 를 찾는 방법
      // 전체 diaryList 를 확인해서 useParams로 가져온 id 와 같은 diary data를 뽑아서
      // filter, findIndex, find
      const targetDiary = items.find((diary) => diary.id == id);

      if (targetDiary) {
        // data state에 set 해준다.
        setData(targetDiary);
      } else {
        alert("없는 일기입니다.");
        Navigate("/", { replace: true });
      }
    }
  }, [items]);

  if (!data) {
    return <div className="diaryPage"></div>;
  } else {
    const emotionData = emotionList.find(
      (emotion) => emotion.emotion_id == data.emotion
    );

    return (
      <div className="diaryPage">
        <Header
          headText={`${new Date(data.date).toISOString().split("T")[0]} 기록`}
          leftChild={
            <Button text={"< 뒤로가기"} onClick={() => Navigate(-1)} />
          }
          rightChild={
            isAuthenticated && (
              <Button
                isAuthenticated={isAuthenticated}
                text={"수정하기"}
                onClick={() => Navigate(`/edit/${id}`)}
              />
            )
          }
        />
        <article>
          <section>
            <h4>오늘의 감정</h4>
            <div
              className={`diary_img_wrapper diary_img_wrapper_${data.emotion}`}
            >
              <img src={`/assets/emotion${data.emotion}.png`} />
              <div className="emotion_description">
                {emotionData.emotion_description}
              </div>
            </div>
          </section>
          <section>
            <h4>오늘의 일기</h4>
            <div className="diary_content_wrapper">
              <p>{data.content}</p>
            </div>
          </section>
        </article>
      </div>
    );
  }
}

export default DiaryPage;
