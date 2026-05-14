import { useEffect, useRef, useState } from "react";
import { type LpOrder } from "../apis/lp";
import { useLps } from "../hooks/useLps";
import LpCard from "../components/LpCard";
import LpCardSkeleton from "../components/LpCardSkeleton";
import { ErrorMessage } from "../components/LoadingSpinner";

export default function Homepage() {
  const [sort, setSort] = useState<LpOrder>("asc");
  const { data, isPending, isError, refetch, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useLps(sort);

  const hasNextPageRef = useRef(hasNextPage);
  const isFetchingNextPageRef = useRef(isFetchingNextPage);
  const fetchNextPageRef = useRef(fetchNextPage);

  useEffect(() => { hasNextPageRef.current = hasNextPage; }, [hasNextPage]);
  useEffect(() => { isFetchingNextPageRef.current = isFetchingNextPage; }, [isFetchingNextPage]);
  useEffect(() => { fetchNextPageRef.current = fetchNextPage; }, [fetchNextPage]);

  // 스크롤 없이 뷰포트가 꽉 차지 않으면 자동으로 다음 페이지 로드
  useEffect(() => {
    if (isFetchingNextPage || isPending || !hasNextPage) return;
    const { scrollHeight, clientHeight } = document.documentElement;
    if (scrollHeight <= clientHeight + 200) {
      fetchNextPage();
    }
  }, [isFetchingNextPage, isPending, hasNextPage, fetchNextPage]);

  useEffect(() => {
    if (isPending) return;

    const handleScroll = () => {
      const { scrollY, innerHeight } = window;
      const { scrollHeight } = document.documentElement;

      if (scrollY + innerHeight >= scrollHeight - 200) {
        if (hasNextPageRef.current && !isFetchingNextPageRef.current) {
          fetchNextPageRef.current();
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isPending]);

  const lps = data?.pages.flatMap((page) => page.data) ?? [];

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

      {isError && <ErrorMessage onRetry={refetch} />}

      <div className="grid grid-cols-5 gap-2 mt-4">
        {isPending
          ? Array.from({ length: 10 }).map((_, i) => <LpCardSkeleton key={i} />)
          : lps.map((lp) => <LpCard key={lp.id} lp={lp} />)
        }
        {isFetchingNextPage &&
          Array.from({ length: 10 }).map((_, i) => <LpCardSkeleton key={`next-${i}`} />)
        }
      </div>

      <button className="fixed bottom-8 right-8 bg-pink-500 hover:bg-pink-600 transition rounded-full w-14 h-14 text-3xl text-white shadow-lg flex items-center justify-center">
        +
      </button>
    </>
  );
}
