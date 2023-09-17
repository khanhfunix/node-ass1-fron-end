import { useEffect, useCallback, useState } from "react";
import classes from "./Banner.module.css";
const API_KEY = "8qlOkxz4wq";
const Banner = (props) => {
  // Dung state de luu data fetch
  const [movie, setMovie] = useState({});

  // Ham fetch Data (Su dung useEffect de ko bi render lai component)
  useEffect(() => {
    const fetchTrending = async () => {
      try {
        const response = await fetch(
          `http://localhost:3001/api/movie/trending?token=${API_KEY}`
        );
        if (!response.ok) {
          throw new Error("Something went wrong!");
        }
        const data = await response.json();
        // dung movieRandom de render hinh anh cho banner
        const movieRandom =
          data.results[Math.floor(Math.random() * data.results.length - 1)];

        setMovie(movieRandom);
        console.log(movieRandom);
      } catch (error) {
        console.log(error);
      }
    };
    fetchTrending();
  }, []);

  // Tao inline constant de setup hinh anh cho banner
  const inlineBackground = {
    backgroundImage:
      "url(" +
      "https://image.tmdb.org/t/p/original" +
      `${
        movie.backdrop_path === null ? movie.poster_path : movie.backdrop_path
      }` +
      ")",
    backgroundPosition: "center",
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    opacity: "0.9",
  };

  return (
    <div className={classes.Banner} style={inlineBackground}>
      <div className={classes.BannerContent}>
        <h1>{movie.name}</h1>
        <div>
          <button>Play</button>
          <button>My List</button>
        </div>
        <p>{movie.overview}</p>
      </div>
    </div>
  );
};

export default Banner;
