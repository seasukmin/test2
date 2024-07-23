import React from "react";
import "./FoodList.css";
import FileInput from "./FileInput";

function formatDate(value) {
  const date = new Date(value);
  return `${date.getFullYear()}. ${date.getMonth() + 1}. ${date.getDate()}`;
}
function FoodList({ Items }) {
  const { id, imgUrl, title, content, createdAt, calorie } = Items;
  return (
    <div className="FoodListItem">
      <img className="FoodListItemImg" />
      <div className="FoodListItemRows">
        <FileInput photoUrl={imgUrl} />
        <div className="FoodListItemRow">
          <div className="FoodListItemHeader">
            <h2 className="FoodListItemTitle">{title}</h2>
            <p className="FoodListItemCal">{calorie}Kcal</p>
          </div>
          <p className="FoodListItemNum">{content}</p>
          <div className="FoodListItemBottom">
            <p className="FoodListItemDate">{formatDate(Items.createdAt)}</p>
            <div className="FoodListItemButton">
              <button className="FoodListItemEditButton">수정</button>
              <button className="FoodListItemDeleteButton">삭제</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FoodList;
