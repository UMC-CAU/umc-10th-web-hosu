import { useEffect } from "react";
import MoviePosterGrid from "../components/MoviePosterGrid";
import { useMovies } from "../contexts/MovieContext";

function ComingSoonMovie() {
  const { setMovieType } = useMovies();

  useEffect(() => {
    setMovieType('upcoming');
  }, []);

  return <MoviePosterGrid />;
}

export default ComingSoonMovie;
