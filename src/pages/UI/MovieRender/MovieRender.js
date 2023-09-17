import { useState, useEffect } from "react";

import classes from "./MovieRender.module.css";
import MovieDetail from "../MovieDetail/MovieDetail";
// Component hien thi movielist
const MovieRender = (props) => {
  const [movie, setMovie] = useState([]);
  const [movieId, setMovieId] = useState("");
  const [original_title, setOriginal_title] = useState("");
  const [release_date, setRelease_date] = useState("");
  const [vote_average, setVote_average] = useState("");
  const [overview, setOverview] = useState("");
  const [image, setImage] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  // ham fetch su dung props
  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const response = await fetch(
          `http://localhost:3001/api/movie/${props.fetchURL}`
        );
        if (!response.ok) {
          throw new Error("Something went wrong!");
        }
        const data = await response.json();

        setMovie(data.results);
      } catch (error) {
        console.log(error);
      }
    };
    fetchMovie();
  }, []);

  const clickHandler = (
    // Lay ra cac state de truyen len movielist
    id,
    original_title,
    release_date,
    vote_average,
    overview,
    imgFit
  ) => {
    setMovieId(id);
    setOriginal_title(original_title);
    setRelease_date(release_date);
    setVote_average(vote_average);
    setOverview(overview);
    setImage(imgFit);
    setIsOpen(movieId === id ? !isOpen : true);
  };

  return (
    <>
      <h1>{props.title}</h1>
      <div
        // logic hien thi class hinh anh theo chieu doc hay ngang
        className={props.isHorizontal ? classes.Horizontal : classes.Vertical}
      >
        {movie.map((e) => {
          return (
            <img
              key={e.id}
              alt={e.original_title}
              src={
                props.isHorizontal
                  ? // hien thi backdrop hay poster
                    `https://image.tmdb.org/t/p/original${e.backdrop_path}`
                  : `https://image.tmdb.org/t/p/original${e.poster_path}`
              }
              onClick={() =>
                clickHandler(
                  e.id,
                  e.original_title,
                  e.release_date,
                  e.vote_average,
                  e.overview,
                  e.backdrop_path ? e.backdrop_path : e.poster_path
                )
              }
            ></img>
          );
        })}
      </div>
      {isOpen && (
        // logic hien thi moviedetail
        <MovieDetail
          movieId={movieId}
          original_title={original_title}
          release_date={release_date}
          vote_average={vote_average}
          overview={overview}
          replaceImg={image}
        />
      )}
    </>
  );
};

export default MovieRender;
