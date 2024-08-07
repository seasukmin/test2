import React, { useState } from "react";
import "./FoodList.css";
import FileInput from "./FileInput";
import FoodForm from "./FoodForm";
import { collection } from "firebase/firestore";
import useTranslate from "../hooks/useTranslate";
import { useSelector, useDispatch } from "react-redux";
import { addItems, fetchItems } from "../store/foodSlice";

function formatDate(value) {
  const date = new Date(value);
  return `${date.getFullYear()}. ${date.getMonth() + 1}. ${date.getDate()}`;
}
function FoodListItem({ Items, handleDelete, handleEdit }) {
  const { id, imgUrl, title, content, createdAt, calorie, docId } = Items;
  const t = useTranslate();

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
              {t("edit button")}
            </button>
            <button
              className="FoodListItem-delete-button"
              onClick={handleDeleteClick}
            >
              {t("delete button")}
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

    const handleSubmit = (collectionName, updateInfoObj) => {
      const result = onUpdate(collectionName, docId, updateInfoObj, imgUrl);
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
      <li>
        <FoodListItem
          Items={Items}
          handleDelete={handleDelete}
          handleEdit={setEditingId}
        />
      </li>
    </ul>
  );
}

export default FoodList;
