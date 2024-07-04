import React, { useState } from "react";
import FileInput from "./FileInput";
import RatingInput from "./RatingInput";
import "./ReviewForm.css";

function ReviewForm(props) {
  const [values, setValues] = useState({});

  const handleChange = (e) => {
    console.log(e.target.name, e.target.value);
  };

  return (
    <form className="ReviewForm">
      <div>
        <FileInput />
      </div>
      <div className="Form-container">
        <input
          type="text"
          name="title"
          placeholder="제목을 입력해주세요."
          onChange={handleChange}
        />
        <RatingInput />
        <textarea
          name="content"
          placeholder="내용을 입력해주세요."
          onChange={handleChange}
        />
        <button>확인</button>
      </div>
    </form>
  );
}

export default ReviewForm;
