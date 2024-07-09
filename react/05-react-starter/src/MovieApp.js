import React, { useEffect, useState } from "react";
import Novie from "./Novie";
import "./MovieApp.css";

function MovieApp(props) {
  const [movies, setmovies] = useState([]);
  const url =
    "https://yts.mx/api/v2/list_movies.json?minimum_rating=8&sort_by=year";
  const getMovies = async () => {
    const response = await fetch(url);
    const data = await response.json();
    const moviesArr = data.data.movies;
    setmovies(moviesArr);
    console.log(movies);
  };
  useEffect(() => {
    getMovies();
  }, []);
  return (
    <div className="container">
      <div className="movies">
        {movies.map((arrNum) => (
          <Novie
            key={arrNum.id}
            img={arrNum.medium_cover_image}
            title={arrNum.title}
            year={arrNum.year}
            summary={arrNum.summary}
            genres={arrNum.genres}
          />
        ))}
      </div>
    </div>
  );
}

export default MovieApp;
