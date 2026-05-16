import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createLp, type CreateLpRequest } from "../../apis/lp";

export function useCreateLp() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (body: CreateLpRequest) => createLp(body),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["lps"] });
    },
  });
}
