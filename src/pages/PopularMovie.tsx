import { useEffect } from "react";
import MoviePosterGrid from "../components/MoviePosterGrid";
import { useMovies } from "../contexts/MovieContext";

function PopularMovie() {
  const { setMovieType } = useMovies();

  useEffect(() => {
    setMovieType('popular');
  }, []);

  return <MoviePosterGrid />;
}

export default PopularMovie;
