import React, { useState } from 'react';
import FileInput from './FileInput';
import RatingInput from './RatingInput';
import './ReviewForm.css';

function ReviewForm({addData}) {
  const [values, setValues] = useState({});

  const handleChange = (name, value) => {
    setValues((prevValues) => ({ ...prevValues, [name]: value }));
  };
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    handleChange(name, value);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    const result = await addData("movie", values);
  }

  return (
    <form className='ReviewForm' onSubmit={handleSubmit}>
      <div>
        <FileInput
          inputName='imgUrl'
          setFile={handleChange}
          value={values.imgUrl}
        />
      </div>
      <div className='Form-container'>
        <input
          type='text'
          name='title'
          placeholder='제목을 입력해주세요.'
          onChange={handleInputChange}
        />
        <RatingInput
          inputName='rating'
          setRating={handleChange}
          value={values.rating}
        />
        <textarea
          name='content'
          placeholder='내용을 입력해주세요.'
          onChange={handleInputChange}
        />
        <button type='submit'>확인</button>
      </div>
    </form>
  );
}

export default ReviewForm;
