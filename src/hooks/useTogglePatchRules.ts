import type { PatchRules } from "@/types/patch-rules";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNotificationContext } from "@/contexts/NotificationContext";
import { QUERY_KEY } from "@/mocks/data/query-key";

export const useTogglePatchRules = () => {
  const queryClient = useQueryClient();
  const { notifySaved, notifyError } = useNotificationContext();

  return useMutation({
    mutationFn: async ({ value }: { value: boolean }) => {
      console.log(value);
      const response = await fetch(`/patch-rules`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ value }),
      });
      if (!response.ok) throw new Error("Failed to update the patch rules");

      return (await response.json()) as PatchRules;
    },
    onMutate: async ({ value }, context) => {
      console.log("onMutate", value);
      // cancel any outgoing refetches (so they don't overwrite our optimistic update)
      await context.client.cancelQueries({ queryKey: [QUERY_KEY.patchRules] });

      // snapshot previous value
      const previousSettings = queryClient.getQueryData([QUERY_KEY.patchRules]);

      // optimistically update to the new value
      queryClient.setQueryData([QUERY_KEY.patchRules], (old: PatchRules) => ({
        ...old,
        autoUpdate: value,
      }));

      return { previousSettings };
    },
    onError: (_err, _newSettings, onMutateResult, context) => {
      console.log("onError");
      context.client.setQueryData(
        [QUERY_KEY.patchRules],
        onMutateResult?.previousSettings,
      );
      notifyError();
    },
    onSuccess: (updatedSettings) => {
      console.log("onSuccess", updatedSettings);
      queryClient.setQueryData([QUERY_KEY.patchRules], updatedSettings);

      notifySaved();
    },
    // adding onSettled is best practise (according to the docs)
    // but if i leave this in it reverts back to the mock data since it's all mock apis
    // onSettled: (_data, _error, _variables, _mutateContext, context) =>
    //   context.client.invalidateQueries({ queryKey: [QUERY_KEY.patchRules] }),
  });
};
