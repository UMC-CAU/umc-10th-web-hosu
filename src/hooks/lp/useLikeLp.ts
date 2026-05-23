import { useMutation, useQueryClient } from "@tanstack/react-query";
import { likeLp, unlikeLp, type LpDetail } from "../../apis/lp";

export function useLikeLp(lpId: number, myId: number | undefined) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (isLiked: boolean) => (isLiked ? unlikeLp(lpId) : likeLp(lpId)),
    onMutate: async (isLiked: boolean) => {
      await queryClient.cancelQueries({ queryKey: ["lp", lpId] });
      const previous = queryClient.getQueryData<LpDetail>(["lp", lpId]);

      queryClient.setQueryData<LpDetail>(["lp", lpId], (old) => {
        if (!old || !myId) return old;
        const likes = isLiked
          ? old.likes.filter((l) => l.userId !== myId)
          : [...old.likes, { id: Date.now(), userId: myId, lpId }];
        return { ...old, likes };
      });

      return { previous };
    },
    onError: (_err, _vars, context) => {
      if (context?.previous) {
        queryClient.setQueryData(["lp", lpId], context.previous);
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["lp", lpId] });
    },
  });
}
