import MovieRender from "../../UI/MovieRender/MovieRender";

// Tao Data de truyen props
const API_KEY = "RYoOcWM4JW";
const data = [
  {
    title: "Original",
    fetch: `trending?token=${API_KEY}&page=2`,
    isHorizontal: false,
  },
  {
    title: "Trending",
    fetch: `trending?token=${API_KEY}`,
    isHorizontal: true,
  },
  {
    title: "Top Rated",
    fetch: `top-rate?token=${API_KEY}`,
    isHorizontal: true,
  },
  {
    title: "Action",
    fetch: `discover?token=${API_KEY}&genre=28`,
    isHorizontal: true,
  },
  {
    title: "Comedy",
    fetch: `discover?token=${API_KEY}&genre=35`,
    isHorizontal: true,
  },
  {
    title: "Horror",
    fetch: `discover?token=${API_KEY}&genre=27`,
    isHorizontal: true,
  },
  {
    title: "Romance",
    fetch: `discover?token=${API_KEY}&genre=10749`,
    isHorizontal: true,
  },
  {
    title: "Documentaries",
    fetch: `discover?token=${API_KEY}&genre=99`,
    isHorizontal: true,
  },
];

const MovieList = () => {
  //Dung data ben tren de truyen props vao component MovieRender
  return (
    <>
      {data.map((e) => {
        return (
          <MovieRender
            key={e.title}
            title={e.title}
            fetchURL={e.fetch}
            isHorizontal={e.isHorizontal}
          />
        );
      })}
    </>
  );
};

export default MovieList;
