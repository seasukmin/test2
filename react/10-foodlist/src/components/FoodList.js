import React, { useState } from "react";
import "./FoodList.css";
import FileInput from "./FileInput";
import FoodForm from "./FoodForm";
import { collection } from "firebase/firestore";

function formatDate(value) {
  const date = new Date(value);
  return `${date.getFullYear()}. ${date.getMonth() + 1}. ${date.getDate()}`;
}

function FoodListItem({ Items, handleDelete, handleEdit }) {
  const { id, imgUrl, title, content, createdAt, calorie, docId } = Items;

  const handleDeleteClick = () => {
    handleDelete(Items.docId, imgUrl);
  };

  const handleEditClick = (e) => {
    handleEdit(id);
  };
  return (
    <div className="FoodListItem">
      {/* <img className="FoodListItem-preview" /> */}
      <FileInput className="FoodListItem-preview" photoUrl={imgUrl} />
      <div className="FoodListItem-rows">
        <div className="FoodListItem-title-calorie">
          <h1 className="FoodListItem-title">{title}</h1>
          <span className="FoodListItem-calorie">{calorie}Kcal</span>
        </div>
        <p className="FoodListItem-content">{content}</p>
        <div className="FoodListItem-date-buttons">
          <p className="FoodListItem-date">{formatDate(Items.createdAt)}</p>
          <div className="FoodListItem-buttons">
            <button
              className="FoodListItem-edit-button"
              onClick={handleEditClick}
            >
              수정
            </button>
            <button
              className="FoodListItem-delete-button"
              onClick={handleDeleteClick}
            >
              삭제
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function FoodList({ Items, handleUpdateSuccess, handleDelete, onUpdate }) {
  const [editngId, setEditingId] = useState(null);
  if (Items.id === editngId) {
    const { id, imgUrl, title, content, createdAt, calorie, docId } = Items;
    const initialValues = { title, calorie, content, imgUrl: null };

    const handleSubmit = (collectionName, dataObj) => {
      const result = onUpdate(collectionName, docId, dataObj);
      return result;
    };
    const handleSubmitSuccess = (result) => {
      handleUpdateSuccess(result);
      setEditingId(null);
    };
    return (
      <li key={Items.id} className="FoodList-FoodForm">
        <FoodForm
          initialValues={initialValues}
          initialPreview={imgUrl}
          handleCancel={setEditingId}
          onSubmit={handleSubmit}
          handleSubmitSuccess={handleSubmitSuccess}
        />
      </li>
    );
  }
  return (
    <ul className="FoodList">
      <li key={Items.id}>
        <FoodListItem
          Items={Items}
          handleDelete={handleDelete}
          handleEdit={setEditingId}
        />
      </li>
    </ul>

    // <div className="FoodListItem">
    //   <img className="FoodListItemImg" />
    //   <div className="FoodListItemRows">
    //     <div>
    //       <FileInput photoUrl={imgUrl} />
    //     </div>
    //     <div className="FoodListItemRow">
    //       <div className="FoodListItemHeader">
    //         <h2 className="FoodListItemTitle">{title}</h2>
    //         <p className="FoodListItemCal">{calorie}Kcal</p>
    //       </div>
    //       <p className="FoodListItemNum">{content}</p>
    //       <div className="FoodListItemBottom">
    //         <p className="FoodListItemDate">{formatDate(Items.createdAt)}</p>
    //         <div className="FoodListItemButton">
    //           <button className="FoodListItemEditButton">수정</button>
    //           <button
    //             onClick={handleDelete}
    //             className="FoodListItemDeleteButton"
    //           >
    //             삭제
    //           </button>
    //         </div>
    //       </div>
    //     </div>
    //   </div>
    // </div>
  );
}

export default FoodList;
