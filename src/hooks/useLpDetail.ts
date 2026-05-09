import { useQuery } from "@tanstack/react-query";
import { getLpById } from "../apis/lp";
import { QUERY_STALE_TIME, QUERY_GC_TIME } from "../constants";

export function useLpDetail(lpId: number) {
  return useQuery({
    queryKey: ["lp", lpId],
    queryFn: () => getLpById(lpId),
    staleTime: QUERY_STALE_TIME,
    gcTime: QUERY_GC_TIME,
  });
}
