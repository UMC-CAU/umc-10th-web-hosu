import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateComment } from "../../apis/comment";

export function useUpdateComment(lpId: number) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ commentId, content }: { commentId: number, content: string }) =>
      updateComment(lpId, commentId, content),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["lpComments", lpId] });
    },
  });
}