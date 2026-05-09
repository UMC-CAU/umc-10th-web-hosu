import { useInfiniteQuery } from "@tanstack/react-query";
import { getComments, type LpOrder } from "../apis/lp";

export function useComments(lpId: number, order: LpOrder) {
  return useInfiniteQuery({
    queryKey: ["lpComments", lpId, order],
    queryFn: ({ pageParam }) => getComments(lpId, { order, cursor: pageParam }),
    initialPageParam: undefined as number | undefined,
    getNextPageParam: (lastPage) =>
      lastPage.hasNext ? lastPage.nextCursor : undefined,
    enabled: !!lpId,
  });
}
