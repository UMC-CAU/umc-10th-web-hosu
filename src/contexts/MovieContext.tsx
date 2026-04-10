import { createContext, useContext, useState } from "react";
import type { Movie, MovieResponse } from "../types/Movie";
import useCustomFetch from "../hooks/useCustomFetch";

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
  const [movieType, setMovieType] = useState<MovieType>('popular');
  const [page, setPage] = useState(1);

  const { data, isLoading, isError } = useCustomFetch<MovieResponse>(
    `https://api.themoviedb.org/3/movie/${movieType}?language=en-US&page=${page}`
  );

  const movies: Movie[] = data?.results ?? [];

  return (
    <MovieContext.Provider value={{ movies, movieType, setMovieType, isLoading, isError, page, setPage }}>
      {children}
    </MovieContext.Provider>
  );
};

export const useMovies = () => useContext(MovieContext);
