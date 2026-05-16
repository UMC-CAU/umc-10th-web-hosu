import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createComment } from "../../apis/comment";

export function useCreateComment(lpId: number) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (content: string) => createComment(lpId, content),
    onSuccess: () =>{
      queryClient.invalidateQueries({ queryKey: ["lpComments", lpId] });
    },
  });
}