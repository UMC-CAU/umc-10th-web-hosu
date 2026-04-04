import "../index.css";

interface MoviePosterProps {
  id: number;
  poster_path: string;
  title: string;
  overview: string;
}

function MoviePoster({ id, poster_path, title, overview }: MoviePosterProps) {
  return (
    <li key={id} className="relative group">
      <img
        src={`https://image.tmdb.org/t/p/original${poster_path}`}
        className="w-full rounded-xl group-hover:blur-sm transition duration-100" 
      />
      <div className="absolute inset-0 flex flex-col justify-center items-center
        opacity-0 group-hover:opacity-100 transition duration-300">
        <h1 className="text-white text-2xl font-bold text-center">{title}</h1>
        <p className="text-white text-xs">{overview?.slice(0, 100)}...</p>
      </div>
    </li>
  )
}

export default MoviePoster;