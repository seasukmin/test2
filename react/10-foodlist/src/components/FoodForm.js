import React, { useEffect, useState } from "react";
import FileInput from "./FileInput";
import "./FoodForm.css";
import photoUrl from "../assets/preview-placeholder.png";
import { addDatas } from "../api/firebase";
import useTranslate from "../hooks/useTranslate";
import useAsync from "../hooks/useAsync";

const INITIAL_VALUE = {
  title: "",
  calorie: 0,
  content: "",
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

function FoodForm({
  handleSubmitSuccess,
  initialPreview,
  initialValues = INITIAL_VALUE,
  onSubmit,
  handleCancel,
  handleAddSuccess,
}) {
  const [values, setValues] = useState(initialValues);
  // const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitting, submittingError, onSubmitAsync] = useAsync(onSubmit);

  const handleChange = (name, value) => {
    setValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };
  const t = useTranslate();

  const handleInputChange = (e) => {
    const { name, value, type } = e.target;
    handleChange(name, sanitize(type, value));
  };
  // 이해가 안댐.. change 함수의 e.target 해당 value값이 넘어오는데..
  // name, value, type은 무슨소리지?
  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await onSubmitAsync("food", values);

    {
      onSubmit === addDatas
        ? handleAddSuccess(result)
        : handleSubmitSuccess(result);
    }
    setValues(initialValues);
  };

  return (
    <form className="FoodForm" onSubmit={handleSubmit}>
      <FileInput
        className="FoodForm-preview"
        photoUrl={photoUrl}
        onChange={handleChange}
        name="imgUrl"
        value={values.imgUrl}
        initialPreview={initialPreview}
      />
      <div className="FoodForm-rows">
        <div className="FoodForm-title-calorie">
          <input
            className="FoodForm-title"
            type="text"
            placeholder={t("title placeholder")}
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
          {handleCancel && (
            <button
              onClick={() => handleCancel(null)}
              className="FoodForm-cancel-button"
              type="button"
            >
              {t("cancel button")}
            </button>
          )}

          <button
            className="FoodForm-submit-button"
            type="submit"
            // disabled={isSubmitting}
          >
            {t("confirm button")}
          </button>
        </div>
        <textarea
          className="FoodForm-content"
          placeholder={t("content placeholder")}
          onChange={handleInputChange}
          name="content"
          value={values.content}
        />
      </div>
    </form>
  );
}

export default FoodForm;
