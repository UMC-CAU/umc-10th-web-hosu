import { useMovieDetail } from "../contexts/MovieDetailContext";

function CreditList() {
  const { cast, crew } = useMovieDetail();

  return (
    <div className="px-16 py-10">
      <h2 className="text-2xl font-bold text-black mb-6">감독/출연</h2>
      <div className="flex gap-6 flex-wrap">
        {crew.map((person) => (
          <div key={person.id} className="flex flex-col items-center w-24">
            <img
              src={
                person.profile_path
                  ? `https://image.tmdb.org/t/p/w200${person.profile_path}`
                  : "https://via.placeholder.com/200x200?text=No+Image"
              }
              className="w-20 h-20 rounded-full object-cover"
            />
            <p className="text-black text-sm mt-2 text-center">{person.name}</p>
            <p className="text-gray-400 text-xs text-center">감독</p>
          </div>
        ))}

        {cast.map((person) => (
          <div key={person.id} className="flex flex-col items-center w-24">
            <img
              src={
                person.profile_path
                  ? `https://image.tmdb.org/t/p/w200${person.profile_path}`
                  : "https://via.placeholder.com/200x200?text=No+Image"
              }
              className="w-20 h-20 rounded-full object-cover"
            />
            <p className="text-black text-sm mt-2 text-center">{person.name}</p>
            <p className="text-gray-400 text-xs text-center">{person.character} 역</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default CreditList;
