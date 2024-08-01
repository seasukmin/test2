import React from "react";
import Button from "./Button";
import "./DiaryItem.css";
import { Link } from "react-router-dom";

function formatDate(value) {
  const date = new Date(value);
  return `${date.getFullYear()}. ${date.getMonth() + 1}. ${date.getDate()}`;
}
// new Date(date).toLocaleDateString()
function DiaryItem({ value }) {
  const { content, date, emotion, docId } = value;
  return (
    <div className="diaryItem">
      <div className={`emotion_img_wrapper emotion_img_wrapper_${emotion}`}>
        <img src={`assets/emotion${emotion}.png`} />
      </div>
      <div className="info_wrapper">
        <div className="diary_date">{formatDate(date)}</div>
        <div className="diary_content_preview">
          {`${content.slice(0, 25)}...`}
        </div>
      </div>
      <Link to={`/new/${docId}`} className="btn_wrapper">
        <Button text={"수정하기"} />
      </Link>
    </div>
  );
}

export default DiaryItem;
