import React, { useState } from "react";
import Rating from "./Rating";

function RatingInput({ inputName, setRating, value }) {
  // ratingValue State는 별을 색힐하는 용도의 점수이다.
  const [ratingValue, setRatingValue] = useState(0);
  // 실제 values.rating을 바꾸는 함수는 setRating 이고,
  // d이 함수를 실행하는 시기는 Star 컴포넌트의 onClick 시점이다.
  const handleSelect = (nextValue) => {
    setRating(inputName, nextValue);
  };
  const handleMouseOut = () => {
    setRatingValue(value);
  };

  return (
    <div>
      <Rating
        selectRating={handleSelect}
        hoverRating={ratingValue}
        onHover={setRatingValue}
        onMouseout={handleMouseOut}
      />
    </div>
  );
}

export default RatingInput;
