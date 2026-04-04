import { useMovieDetail } from "../contexts/MovieDetailContext";
import MovieBanner from "../components/MovieBanner";
import CreditList from "../components/CreditList";

function MovieDetail() {
  const { movie, isLoading, isError } = useMovieDetail();

  if (isError) {
    return <h1>영화 정보를 불러오는 중 에러가 발생했습니다.</h1>;
  }

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-96">
        <div className="w-12 h-12 border-4 border-gray-300 border-t-purple-300 rounded-full animate-spin" />
      </div>
    );
  }

  if (!movie) {
    return <h1>영화 정보를 불러올 수 없습니다.</h1>;
  }

  return (
    <>
      <MovieBanner />
      <CreditList />
    </>
  );
}

export default MovieDetail;
