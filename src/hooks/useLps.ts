import { useQuery } from "@tanstack/react-query";
import { getLps, type LpOrder } from "../apis/lp";
import { QUERY_STALE_TIME, QUERY_GC_TIME } from "../constants";

export function useLps(order: LpOrder) {
  return useQuery({
    queryKey: ["lps", order],
    queryFn: () => getLps({ order }),
    staleTime: QUERY_STALE_TIME,
    gcTime: QUERY_GC_TIME,
  });
}
