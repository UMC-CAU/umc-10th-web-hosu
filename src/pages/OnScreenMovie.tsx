import { useEffect } from "react";
import MoviePosterGrid from "../components/MoviePosterGrid";
import { useMovies } from "../contexts/MovieContext";

function OnScreenMovie() {
  const { setMovieType } = useMovies();

  useEffect(() => {
    setMovieType('now_playing');
  }, []);

  return <MoviePosterGrid />;
}

export default OnScreenMovie;
