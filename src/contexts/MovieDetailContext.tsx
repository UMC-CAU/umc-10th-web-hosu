import { createContext, useContext } from "react";
import { useParams } from "react-router-dom";
import type { MovieDetailData, Cast, Crew } from "../types/Movie";
import useCustomFetch from "../hooks/useCustomFetch";

interface CreditsResponse {
  cast: Cast[];
  crew: Crew[];
}

interface MovieDetailContextType {
  movie: MovieDetailData | null;
  cast: Cast[];
  crew: Crew[];
  isLoading: boolean;
  isError: boolean;
}

const MovieDetailContext = createContext<MovieDetailContextType>({
  movie: null,
  cast: [],
  crew: [],
  isLoading: false,
  isError: false,
});

export const MovieDetailProvider = ({ children }: { children: React.ReactNode }) => {
  const { movieId } = useParams();
  
  const { data: movie, isLoading: movieLoading, isError: movieError } = useCustomFetch<MovieDetailData>(
    `https://api.themoviedb.org/3/movie/${movieId}?language=ko-KR`
  );

  const { data: credits, isLoading: creditsLoading, isError: creditsError } = useCustomFetch<CreditsResponse>(
    `https://api.themoviedb.org/3/movie/${movieId}/credits?language=ko-KR`
  );

  const cast = credits?.cast.slice(0, 10) ?? [];
  const crew = credits?.crew.filter((c) => c.job === "Director") ?? [];
  const isLoading = movieLoading || creditsLoading;
  const isError = movieError || creditsError;

  return (
    <MovieDetailContext.Provider value={{ movie, cast, crew, isLoading, isError }}>
      {children}
    </MovieDetailContext.Provider>
  );
};

export const useMovieDetail = () => useContext(MovieDetailContext);
