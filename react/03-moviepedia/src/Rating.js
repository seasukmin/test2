import React from "react";

const RATINGS = [1, 2, 3, 4, 5];

function Star() {
  return <span>★</span>;
}

function Rading(props) {
  return (
    <div>
      {RATINGS.map((arrNum) => (
        <Star key={arrNum} />
      ))}
    </div>
  );
}

export default Rading;
