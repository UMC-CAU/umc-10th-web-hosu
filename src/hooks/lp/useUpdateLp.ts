import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateLp, type UpdateLpRequest } from "../../apis/lp";

export function useUpdateLp(lpId: number) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (body: UpdateLpRequest) => updateLp(lpId, body),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["lp", lpId] });
    },
  });
}
