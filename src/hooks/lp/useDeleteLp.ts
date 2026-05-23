import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteLp } from "../../apis/lp";

export function useDeleteLp() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (lpId: number) => deleteLp(lpId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["lps"] });
    },
  });
}
