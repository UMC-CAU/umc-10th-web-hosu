import { useInfiniteQuery } from "@tanstack/react-query";
import { getLps, type LpOrder } from "../../apis/lp";
import { QUERY_STALE_TIME, QUERY_GC_TIME } from "../../constants";

export function useLps(order: LpOrder, search: string = "") {
  return useInfiniteQuery({
    queryKey: ["lps", order, search],
    queryFn: ({ pageParam }) =>
      getLps({ order, cursor: pageParam, search: search.trim() || undefined }),
    initialPageParam: undefined as number | undefined,
    getNextPageParam: (lastPage) =>
      lastPage.hasNext ? lastPage.nextCursor : undefined,
    enabled: search === "" || search.trim().length > 0,
    staleTime: QUERY_STALE_TIME,
    gcTime: QUERY_GC_TIME,
  });
}
