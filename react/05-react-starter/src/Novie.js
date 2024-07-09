import React from "react";
import "./movie.css";
function Novie({ key, img, title, year, summary, genres }) {
  return (
    <div className="movie">
      <img className="movie-img" src={img} />
      <div>
        <h2 className="movie-title">
          <span>{title}</span>
        </h2>
        <h3 className="movie-year">{year}</h3>
        <p>{summary}</p>
        <ul className="movie-genres">
          <li>{genres}</li>
        </ul>
      </div>
    </div>
  );
}

export default Novie;
