import React from "react";
import Button from "./Button";
import "./DiaryItem.css";
import { Link, useNavigate } from "react-router-dom";

function formatDate(value) {
  const date = new Date(value);
  return `${date.getFullYear()}. ${date.getMonth() + 1}. ${date.getDate()}`;
}
// new Date(date).toLocaleDateString()
function DiaryItem({ value }) {
  const Navigate = useNavigate();
  const { content, date, emotion, docId, id } = value;
  const goDetail = () => {
    Navigate(`/diary/${value.id}`);
  };
  const goDetail2 = () => {
    Navigate(`/edit/${value.id}`);
  };
  return (
    <div className="diaryItem">
      <div
        className={`emotion_img_wrapper emotion_img_wrapper_${emotion}`}
        onClick={goDetail}
      >
        <img src={`assets/emotion${emotion}.png`} />
      </div>
      <div className="info_wrapper" onClick={goDetail}>
        <div className="diary_date">{formatDate(date)}</div>
        <div className="diary_content_preview">
          {`${content.slice(0, 25)}...`}
        </div>
      </div>
      <Button text={"수정하기"} onClick={goDetail2} />
    </div>
  );
}

export default DiaryItem;
