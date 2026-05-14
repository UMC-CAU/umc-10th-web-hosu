import { useInfiniteQuery } from "@tanstack/react-query";
import { getLps, type LpOrder } from "../apis/lp";
import { QUERY_STALE_TIME, QUERY_GC_TIME } from "../constants";

export function useLps(order: LpOrder) {
  return useInfiniteQuery({
    queryKey: ["lps", order],
    queryFn: ({ pageParam }) => getLps({ order, cursor: pageParam }),
    initialPageParam: undefined as number | undefined,
    getNextPageParam: (lastPage) =>
      lastPage.hasNext ? lastPage.nextCursor : undefined,
    staleTime: QUERY_STALE_TIME,
    gcTime: QUERY_GC_TIME,
  });
}
