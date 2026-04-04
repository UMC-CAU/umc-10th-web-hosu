import { useEffect } from "react";
import MoviePosterGrid from "../components/MoviePosterGrid";
import { useMovies } from "../contexts/MovieContext";

function HighRateMovie() {
  const { setMovieType } = useMovies();

  useEffect(() => {
    setMovieType('top_rated');
  }, []);

  return <MoviePosterGrid />;
}

export default HighRateMovie;
