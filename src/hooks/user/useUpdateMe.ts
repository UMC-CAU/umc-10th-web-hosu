import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateMe, type MyProfile } from "../../apis/auth";

export function useUpdateMe() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateMe,
    onMutate: async (newData) => {
      await queryClient.cancelQueries({ queryKey: ["me"] });
      const previous = queryClient.getQueryData<MyProfile>(["me"]);
      queryClient.setQueryData<MyProfile>(["me"], (old) =>
        old ? { ...old, name: newData.name, bio: newData.bio, avatar: newData.avatar } : old
      );
      return { previous };
    },
    onError: (_err, _vars, context) => {
      if (context?.previous) {
        queryClient.setQueryData(["me"], context.previous);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["me"] });
    },
  });
}
