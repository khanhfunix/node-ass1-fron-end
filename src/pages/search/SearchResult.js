import { useState, useEffect } from "react";

import MovieDetail from "../UI/MovieDetail/MovieDetail";

import classes from "./SearchResult.module.css";

const API_KEY = "3545d00fdf25c7cb7e47140b30fc6d87";
const requests = {
  fetchTrending: `/trending/all/week?api_key=${API_KEY}&language=en-US`,
  fetchNetflixOriginals: `/discover/tv?api_key=${API_KEY}&with_network=123`,
  fetchTopRated: `/movie/top_rated?api_key=${API_KEY}&language=en-US`,
  fetchActionMovies: `/discover/movie?api_key=${API_KEY}&with_genres=28`,
  fetchComedyMovies: `/discover/movie?api_key=${API_KEY}&with_genres=35`,
  fetchHorrorMovies: `/discover/movie?api_key=${API_KEY}&with_genres=27`,
  fetchRomanceMovies: `/discover/movie?api_key=${API_KEY}&with_genres=10749`,
  fetchDocumentaries: `/discover/movie?api_key=${API_KEY}&with_genres=99`,
  fetchSearch: `/search/movie?api_key=${API_KEY}&language=en-US`,
};

const SearchResult = (props) => {
  const [movie, setMovie] = useState([]);
  const [movieId, setMovieId] = useState("");
  const [original_title, setOriginal_title] = useState("");
  const [release_date, setRelease_date] = useState("");
  const [vote_average, setVote_average] = useState("");
  const [overview, setOverview] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const fetchSearch = async () => {
      try {
        const response = await fetch(
          `https://api.themoviedb.org/3${requests.fetchSearch}&query=${props.searchResult}`
        );
        if (!response.ok) {
          throw new Error("Something went wrong!");
        }
        const data = await response.json();

        setMovie(data.results);

        // console.log(data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchSearch();
  }, [props.searchResult]);

  const clickHandler = (
    id,
    original_title,
    release_date,
    vote_average,
    overview
  ) => {
    setMovieId(id);
    setOriginal_title(original_title);
    setRelease_date(release_date);
    setVote_average(vote_average);
    setOverview(overview);
    setIsOpen(movieId === id ? !isOpen : true);
  };
  return (
    <>
      <h1>Results</h1>

      <div className={classes.Result}>
        {movie.map((e) => {
          return (
            <img
              key={e.id}
              alt={e.original_title}
              src={`https://image.tmdb.org/t/p/original${
                e.poster_path === null ? e.backdrop_path : e.poster_path
              }`}
              onClick={() =>
                clickHandler(
                  e.id,
                  e.original_title,
                  e.release_date,
                  e.vote_average,
                  e.overview
                )
              }
            ></img>
          );
        })}
      </div>
      {isOpen && (
        <MovieDetail
          movieId={movieId}
          original_title={original_title}
          release_date={release_date}
          vote_average={vote_average}
          overview={overview}
        />
      )}
    </>
  );
};

export default SearchResult;
