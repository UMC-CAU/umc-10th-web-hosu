import { useMovieDetail } from "../contexts/MovieDetailContext";

function MovieBanner() {
  const { movie } = useMovieDetail();

  if (!movie) return null;

  return (
    <div className="relative text-white">
      <img
        src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}
        className="w-full object-cover"
      />
      <div className="absolute inset-0 bg-black/60 flex flex-col justify-center px-16">
        <h1 className="text-4xl font-bold">{movie.title}</h1>
        <p className="mt-2 text-sm text-gray-300">
          평점 {movie.vote_average.toFixed(2)} • {movie.release_date?.slice(0, 4)} • {movie.runtime}분
        </p>
        <p className="mt-4 text-lg font-bold italic">{movie.tagline}</p>
        <p className="mt-4 text-sm text-gray-200 max-w-3xl">{movie.overview}</p>
      </div>
    </div>
  );
}

export default MovieBanner;
