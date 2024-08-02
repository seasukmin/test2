import React, { useContext, useEffect, useRef, useState } from "react";
import Header from "./Header";
import Button from "./Button";
import { emotionList } from "../util/Emotion";
import EmotionItem from "./EmotionItem";
import "./DiaryEditor.css";
import { DiaryDispatchContext } from "../App";
import { Navigate, useNavigate } from "react-router-dom";

const INITIAL_VALUES = {
  date: "",
  content: "",
  emotion: 3,
};

function DiaryEditor({
  headText,
  button,
  originData = INITIAL_VALUES,
  isEdit,
}) {
  const { onCreate, onUpdate, onDelete } = useContext(DiaryDispatchContext);
  const contentRef = useRef();
  const Navigate = useNavigate();

  const [values, setValues] = useState(originData);
  const handleChange = (name, value) => {
    setValues((prevValues) => ({ ...prevValues, [name]: value }));
  };
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    handleChange(name, value);
  };
  const handleSubmit = () => {
    if (values.content.trim().length < 1) {
      handleChange("content", "");
      contentRef.current.focus();
      return;
    }
    if (
      window.confirm(
        isEdit ? "일기를 수정하시겠습니까?" : "새로운 일기를 저장하시겠습니까?"
      )
    ) {
      if (!isEdit) {
        onCreate(values);
      } else {
        onUpdate(values);
      }
      Navigate("/", { replace: true });
    }
  };
  const handleDeleteClick = () => {
    if (window.confirm("일기를 삭제하시겠습니까?")) {
      onDelete(values);
      Navigate("/", { replace: true });
    }
  };

  useEffect(() => {
    if (isEdit) {
      // 받아온 날짜 데이터를 밀리세컨즈 단위를 formattin 해주자(yyyy-mm-dd HH24:MM:ss)..
      handleChange(
        "date",
        new Date(originData.date).toISOString().split("T")[0]
      );
    }
  }, []);
  return (
    <div className="diaryEditor">
      <Header
        headText={isEdit ? "일기 수정하기" : "새 일기 작성하기"}
        leftChild={<Button text={"< 뒤로가기"} onClick={() => Navigate(-1)} />}
        rightChild={
          isEdit && (
            <Button
              text={"삭제하기"}
              type={"negative"}
              onClick={handleDeleteClick}
            />
          )
        }
      />
      <div>
        <section>
          <h4>오늘은 언제인가요?</h4>
          <div className="input_box">
            <input
              className="input_date"
              type="date"
              name="date"
              onChange={handleInputChange}
              value={values.date}
            />
          </div>
        </section>
        <section>
          <h4>오늘의 감정</h4>
          <div className="input_box emotion_list_wrapper">
            {emotionList.map((emotion) => {
              return (
                <EmotionItem
                  key={emotion.emotion_id}
                  {...emotion}
                  name="emotion"
                  onChange={handleChange}
                  isSelected={emotion.emotion_id === values.emotion}
                />
              );
            })}
          </div>
        </section>
        <section>
          <h4>오늘의 일기</h4>
          <div className="input_box text_wrapper">
            <textarea
              placeholder="오늘은 어땠나요"
              name="content"
              onChange={handleInputChange}
              value={values.content}
              ref={contentRef}
            />
          </div>
        </section>
        <section>
          <div className="control_box">
            <Button text={"취소하기"} />
            <Button
              text={"작성완료"}
              type={"positive"}
              onClick={handleSubmit}
            />
          </div>
        </section>
      </div>
    </div>
  );
}

export default DiaryEditor;
