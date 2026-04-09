import { createContext, useContext, useEffect, useState } from "react";
import type { Movie, MovieResponse } from "../types/Movie";
import axios from "axios";

type MovieType = 'popular' | 'now_playing' | 'top_rated' | 'upcoming';

interface MovieContextType {
  movies: Movie[];
  movieType: MovieType;
  setMovieType: (type: MovieType) => void;
  isLoading: boolean;
  isError: boolean;
  page: number;
  setPage: (page: number) => void;
}

const MovieContext = createContext<MovieContextType>({
  movies: [],
  movieType: 'popular',
  setMovieType: () => {},
  isLoading: false,
  isError: false,
  page: 1,
  setPage: () => {},
});

export const MovieProvider = ({ children }: { children: React.ReactNode }) => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [movieType, setMovieType] = useState<MovieType>('popular');
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [page, setPage] = useState(1);

  useEffect(() => {
    const fetchMovies = async () => {
      setIsLoading(true);
      setIsError(false);
      try {
        const response = await axios.get<MovieResponse>(
          `https://api.themoviedb.org/3/movie/${movieType}?language=en-US&page=${page}`,
          {
            headers: {
              Authorization: `Bearer ${import.meta.env.VITE_TMDB_TOKEN}`,
            },
          }
        );
        setMovies(response.data.results);
      } catch (error) {
        console.error(error);
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    };

    fetchMovies();
  }, [movieType, page]);

  return (
    <MovieContext.Provider value={{ movies, movieType, setMovieType, isLoading, isError, page, setPage }}>
      {children}
    </MovieContext.Provider>
  );
};

export const useMovies = () => useContext(MovieContext);
