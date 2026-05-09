import { useState } from "react";
import { type LpOrder } from "../apis/lp";
import { useLps } from "../hooks/useLps";
import LpCard from "../components/LpCard";
import { LoadingSpinner, ErrorMessage } from "../components/LoadingSpinner";

export default function Homepage() {
  const [sort, setSort] = useState<LpOrder>("asc");
  const { data, isPending, isError, refetch } = useLps(sort);

  return (
    <>
      <div className="flex justify-end gap-2">
        <button
          className={`border rounded px-3 py-1 ${sort === "asc" ? "bg-pink-500 text-white" : ""}`}
          onClick={() => setSort("asc")}
        >
          오래된순
        </button>
        <button
          className={`border rounded px-3 py-1 ${sort === "desc" ? "bg-pink-500 text-white" : ""}`}
          onClick={() => setSort("desc")}
        >
          최신순
        </button>
      </div>

      {isPending && <LoadingSpinner />}
      {isError && <ErrorMessage onRetry={refetch} />}

      <div className="grid grid-cols-5 gap-2 mt-4">
        {data?.data.map((lp) => (
          <LpCard key={lp.id} lp={lp} />
        ))}
      </div>

      <button className="fixed bottom-8 right-8 bg-pink-500 hover:bg-pink-600 transition rounded-full w-14 h-14 text-3xl text-white shadow-lg flex items-center justify-center">
        +
      </button>
    </>
  );
}
