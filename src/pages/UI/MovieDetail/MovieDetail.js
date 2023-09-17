import { useState } from "react";
import { useEffect } from "react";

import classes from "./MovieDetail.module.css";
const API_KEY = "8qlOkxz4wq";
// Component hien thi chi tiet movie
const MovieDetail = (props) => {
  const [movieDetail, setMovieDetail] = useState(undefined);
  // `https://api.themoviedb.org/3/movie/${props.movieId}/videos?api_key=3545d00fdf25c7cb7e47140b30fc6d87`
  useEffect(() => {
    const fetchMovieDetail = async () => {
      try {
        const response = await fetch(
          `http://localhost:3001/api/movie/videos?token=${API_KEY}&movieId=${props.movieId}`
        );
        if (!response.ok) {
          throw new Error("Something went wrong!");
        }
        const data = await response.json();
        console.log(data);

        let videoKey = "";
        // Logic hien thi video
        for (let i = 0; i < data.results.length; i++) {
          if (
            data.results[i].type === "Trailer" ||
            data.results[i].type === "Teaser"
          ) {
            videoKey = data.results[i].key;
            break;
          }
        }

        setMovieDetail(videoKey);
      } catch (error) {
        console.log(error);
      }
    };
    fetchMovieDetail();
  }, [props.movieId]);

  const videoSrc = `https://www.youtube.com/embed/${movieDetail}`;

  // render component
  return (
    <div className={classes.MovieDetail}>
      <div>
        <h1>{props.original_title}</h1>
        <h3> Release Date : {props.release_date}</h3>
        <h3> Vote : {props.vote_average} / 10</h3>
        <p>{props.overview}</p>
      </div>
      {movieDetail && (
        <iframe width="100%" height="400" src={videoSrc}></iframe>
      )}
      {!movieDetail && (
        <img
          width="100%"
          height="400"
          src={`https://image.tmdb.org/t/p/original${props.replaceImg}`}
        ></img>
      )}
    </div>
  );
};

export default MovieDetail;
