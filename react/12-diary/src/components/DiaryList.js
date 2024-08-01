import React, { useContext, useEffect, useState } from "react";
import Button from "./Button";
import "./DiaryList.css";
import DiaryItem from "./DiaryItem";
import { useNavigate } from "react-router-dom";
import { DiaryStateContext } from "../App";

const sortOptionList = [
  { name: "최신순", value: "latest" },
  { name: "오래된 순", value: "oldest" },
];
const filterOptionList = [
  { name: "전부다", value: "all" },
  { name: "좋은 감정만", value: "good" },
  { name: "안좋은 감정만", value: "bad" },
];

function ControlMenu({ optionList, value, onChange }) {
  return (
    <select
      className="ControlMenu"
      value={value}
      onChange={(e) => onChange(e.target.value)}
    >
      {optionList.map((option, idx) => {
        return (
          <option key={idx} value={option.value}>
            {option.name}
          </option>
        );
      })}
    </select>
  );
}

function DiaryList({ diaryList }) {
  const navigate = useNavigate();
  const [order, setOrder] = useState("latest");
  const [filter, setFilter] = useState("all");

  const getSortedDiaryList = () => {
    // 필터링 함수
    const getFilteredList = (diary) => {
      console.log(diary);
      // filter state를 good이면 (emotion의 값이 3보다 작거나 같을 때)
      // filter state가 good이 아니면 (emotion의 값이 3보다 클 때)
      if (diary.emotion <= 3) {
        setFilter("good");
      } else {
        setFilter("bad");
      }
    };

    // 정렬 함수
    // [1,11,21].sort((a,b)=> b-a)
    const getOrderedList = (a, b) => {
      // order state가 latest이면 b-a
      // order state가 latest가 아니면 a-b
      if (order === "latest") {
        return b - a;
      } else {
        return a - b;
      }
    };
    const filteredList = diaryList.filter((diary) => {
      getFilteredList(diary);
    });
    console.log(filteredList);
    const sortedList = filteredList.sort(getOrderedList);
    return sortedList;
  };
  useEffect(() => {
    getSortedDiaryList();
  }, []);
  return (
    <div className="diaryList">
      <div className="menu_wrapper">
        <div className="control_menus">
          <ControlMenu
            optionList={sortOptionList}
            value={order}
            onChange={setOrder}
          />
          <ControlMenu
            optionList={filterOptionList}
            value={filter}
            onChange={setFilter}
          />
        </div>
        <div className="new_btn">
          <Button
            text={"새 일기쓰기"}
            type="positive"
            onClick={() => navigate("/new")}
          />
        </div>
      </div>
      {diaryList.map((value) => {
        return <DiaryItem value={value} key={value.id} />;
      })}
    </div>
  );
}

export default DiaryList;
