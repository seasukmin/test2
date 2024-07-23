import React, { useEffect, useState } from "react";
import FileInput from "./FileInput";
import "./FoodForm.css";
import photoUrl from "../assets/preview-placeholder.png";
import { addDatas } from "../api/firebase";

const INITIAL_VALUE = {
  title: "",
  content: "",
  calorie: 0,
  imgUrl: null,
};

function sanitize(type, value) {
  switch (type) {
    case "number":
      return Number(value) || 0;

    default:
      return value;
  }
}

function FoodForm({ onSubmit }) {
  const [values, setValues] = useState(INITIAL_VALUE);
  const [isSubmitting, setIsSubmitting] = useState(false);
  console.log(values);
  const handleChange = (name, value) => {
    setValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };
  const handleInputChange = (e) => {
    const { name, value, type } = e.target;
    handleChange(name, sanitize(type, value));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await addDatas("food", values);
    setValues(INITIAL_VALUE);
  };
  return (
    <form className="FoodForm" onSubmit={handleSubmit}>
      <FileInput
        className="FoodForm-preview"
        photoUrl={photoUrl}
        onChange={handleChange}
        name="imgUrl"
        value={values.imgUrl}
      />
      <div className="FoodForm-rows">
        <div className="FoodForm-title-calorie">
          <input
            className="FoodForm-title"
            type="text"
            placeholder="이름을 입력해주세요."
            onChange={handleInputChange}
            name="title"
            value={values.title}
          />
          <input
            className="FoodForm-calorie"
            type="number"
            onChange={handleInputChange}
            name="calorie"
            value={values.calorie}
          />
          <button className="FoodForm-submit-button" type="submit">
            확인
          </button>
        </div>
        <textarea
          className="FoodForm-content"
          placeholder="내용을 작성해 주세요."
          onChange={handleInputChange}
          name="content"
          value={values.content}
        />
      </div>
    </form>
  );
}

export default FoodForm;
