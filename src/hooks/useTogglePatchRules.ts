import type { PatchRules } from "@/types/patch-rules";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNotificationContext } from "@/contexts/NotificationContext";
import { QUERY_KEY } from "@/mocks/data/query-key";

export const useTogglePatchRules = () => {
  const queryClient = useQueryClient();
  const { notifySaved, notifyError } = useNotificationContext();

  return useMutation({
    mutationFn: async ({ value }: { value: boolean }) => {
      const response = await fetch("/patch-rules", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ value }),
      });
      if (!response.ok) throw new Error("Failed to update the patch rules");

      return (await response.json()) as PatchRules;
    },
    onMutate: async ({ value }, context) => {
      // cancel any outgoing refetches (so they don't overwrite our optimistic update)
      await context.client.cancelQueries({ queryKey: [QUERY_KEY.patchRules] });

      // snapshot previous value
      const previousPatchRules = queryClient.getQueryData([
        QUERY_KEY.patchRules,
      ]);

      // optimistically update to the new value
      queryClient.setQueryData([QUERY_KEY.patchRules], (cache: PatchRules) => ({
        ...cache,
        autoUpdate: value,
      }));

      return { previousPatchRules };
    },
    onError: (_err, _newData, onMutateResult, context) => {
      context.client.setQueryData(
        [QUERY_KEY.patchRules],
        onMutateResult?.previousPatchRules,
      );
      notifyError();
    },
    onSuccess: (updatedPatchRules) => {
      queryClient.setQueryData([QUERY_KEY.patchRules], updatedPatchRules);
      notifySaved();
    },
    // adding onSettled is best practise (according to the docs)
    // but if i leave this in it reverts back to the mock data since it's all mock apis
    // onSettled: (_data, _error, _variables, _mutateContext, context) =>
    //   context.client.invalidateQueries({ queryKey: [QUERY_KEY.patchRules] }),
  });
};
