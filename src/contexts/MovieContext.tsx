import { createContext, useContext, useEffect, useState } from "react";
import type { Movie, MovieResponse } from "../types/Movie";
import axios from "axios";

type MovieType = 'popular' | 'now_playing' | 'top_rated' | 'upcoming';

interface MovieContextType {
  movies: Movie[];
  movieType: MovieType;
  setMovieType: (type: MovieType) => void;
  isLoading: boolean;
}

const MovieContext = createContext<MovieContextType>({
  movies: [],
  movieType: 'popular',
  setMovieType: () => {},
  isLoading: false,
});

export const MovieProvider = ({ children }: { children: React.ReactNode }) => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [movieType, setMovieType] = useState<MovieType>('popular');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchMovies = async () => {
      setIsLoading(true); // 로딩중
      const pages = [1, 2, 3];
      const responses = await Promise.all(
        pages.map((page) =>
          axios.get<MovieResponse>(
            `https://api.themoviedb.org/3/movie/${movieType}?language=en-US&page=${page}`,
            {
              headers: {
                Authorization: `Bearer ${import.meta.env.VITE_TMDB_TOKEN}`,
              },
            }
          )
        )
      );
      setMovies(responses.flatMap((res) => res.data.results));
      setIsLoading(false); // 로딩완료
    };

    fetchMovies();
  }, [movieType]);

  return (
    <MovieContext.Provider value={{ movies, movieType, setMovieType, isLoading }}>
      {children}
    </MovieContext.Provider>
  );
};

export const useMovies = () => useContext(MovieContext);
