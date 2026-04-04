import { useMovies } from "../contexts/MovieContext";
import MoviePoster from "./MoviePoster";

function MoviePosterGrid() {
  const { movies, isLoading } = useMovies();

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-96">
        <div className="w-12 h-12 border-4 border-gray-300 border-t-purple-300 rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <section className="grid grid-cols-5 gap-4 list-none p-0 mx-50 my-10">
      {movies?.map((movie) => (
        <MoviePoster key={movie.id} id={movie.id} poster_path={movie.poster_path} title={movie.title} overview={movie.overview} />
      ))}
    </section>
  );
}

export default MoviePosterGrid;
