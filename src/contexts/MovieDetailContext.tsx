import { createContext, useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import type { MovieDetailData, Cast, Crew } from "../types/Movie";

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
  const [movie, setMovie] = useState<MovieDetailData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [cast, setCast] = useState<Cast[]>([]);
  const [crew, setCrew] = useState<Crew[]>([]);

  useEffect(() => {
    const fetchMovie = async () => {
      setIsLoading(true);
      setIsError(false);
      try {
        const response = await axios.get<MovieDetailData>(
          `https://api.themoviedb.org/3/movie/${movieId}?language=ko-KR`,
          {
            headers: {
              Authorization: `Bearer ${import.meta.env.VITE_TMDB_TOKEN}`,
            },
          }
        );
        const creditResponse = await axios.get(
          `https://api.themoviedb.org/3/movie/${movieId}/credits?language=ko-KR`,
          {
            headers: {
              Authorization: `Bearer ${import.meta.env.VITE_TMDB_TOKEN}`,
            },
          }
        );
        setCast(creditResponse.data.cast.slice(0, 10));
        setCrew(creditResponse.data.crew.filter((c: Crew) => c.job === "Director"));
        setMovie(response.data);
      } catch (error) {
        console.error(error);
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    };
    fetchMovie();
  }, [movieId]);

  return (
    <MovieDetailContext.Provider value={{ movie, cast, crew, isLoading, isError }}>
      {children}
    </MovieDetailContext.Provider>
  );
};

export const useMovieDetail = () => useContext(MovieDetailContext);
