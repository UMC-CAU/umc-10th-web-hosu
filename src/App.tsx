import { useEffect, useState } from "react";
import type { Movie, MovieResponse } from "./types/Movie";
import axios from "axios";
import "./index.css";
import MoviePoster from "./components/MoviePoster";

function App() {
  const [movies, setMovies] = useState<Movie[]>([]);
  
  useEffect(() => {
    const fetchMovies = async () => {
      const pages = [1, 2, 3];
      const responses = await Promise.all( // 여러 비동기 작업을 동시에 실행하고, 전부 완료될 때까지 기다리는 메서드
        pages.map((page) =>
        axios.get<MovieResponse>(
          `https://api.themoviedb.org/3/movie/popular?language=en-US&page=${page}`,
            {
              headers: {
                Authorization: `Bearer ${import.meta.env.VITE_TMDB_TOKEN}`,
              },
            }
          )
        )
      );
      setMovies(responses.flatMap((res) => res.data.results)); // 2차원 배열을 1차원 배열로 변환해줌
    };

    fetchMovies();
  }, []);
  return (
    <ul className="grid grid-cols-5 gap-4 list-none p-0 mx-50 my-10">
      {movies?.map((movie) => (
        <MoviePoster id={movie.id} poster_path={movie.poster_path} title={movie.title} overview={movie.overview} />
      ))}
    </ul>
  )
}



export default App;
