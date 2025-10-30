import type { PatchRulesApp, PatchRules } from "@/types/patch-rules";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNotificationContext } from "@/contexts/NotificationContext";
import { QUERY_KEY } from "@/mocks/data/query-key";

export const useTogglePatchRuleApplication = () => {
  const queryClient = useQueryClient();
  const { notifySaved, notifyError } = useNotificationContext();

  return useMutation({
    mutationFn: async ({
      id,
      value,
    }: {
      id: string;
      value: boolean | number | string;
    }) => {
      const response = await fetch(`/patch-rules/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ value }),
      });
      if (!response.ok)
        throw new Error(`Failed to update patch rule for ${id}`);

      return (await response.json()) as PatchRules;
    },
    onMutate: async ({ id, value }, context) => {
      // cancel any outgoing refetches (so they don't overwrite our optimistic update)
      await context.client.cancelQueries({ queryKey: [QUERY_KEY.patchRules] });

      // snapshot previous value
      const previousSettings = queryClient.getQueryData([QUERY_KEY.patchRules]);

      // optimistically update to the new value
      queryClient.setQueryData([QUERY_KEY.patchRules], (old: PatchRules) => ({
        ...old,
        apps: old.apps.map((a: PatchRulesApp) =>
          a.id === id ? { ...a, autoUpdate: value } : a,
        ),
      }));

      return { previousSettings };
    },
    onError: (_err, _newApp, onMutateResult, context) => {
      context.client.setQueryData(
        [QUERY_KEY.patchRules],
        onMutateResult?.previousSettings,
      );
      notifyError();
    },
    onSuccess: (updatedSettings) => {
      queryClient.setQueryData([QUERY_KEY.patchRules], (old: PatchRules) => ({
        ...old,
        apps: updatedSettings.apps,
        autoUpdate: old.autoUpdate, // do not override global autoUpdate on app specific updates
      }));

      notifySaved();
    },
    // adding onSettled is best practise (according to the docs)
    // but if i leave this in it reverts back to the mock data since it's all mock apis
    // onSettled: (_data, _error, _variables, _mutateContext, context) =>
    //   context.client.invalidateQueries({ queryKey: [QUERY_KEY.patchRules] }),
  });
};
