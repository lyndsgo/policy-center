import type { Firewall } from "@/types/firewall";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNotificationContext } from "@/contexts/NotificationContext";
import { QUERY_KEY } from "@/mocks/data/query-key";

export const useToggleFirewall = () => {
  const queryClient = useQueryClient();
  const { notifySaved, notifyError } = useNotificationContext();

  return useMutation({
    mutationFn: async ({ value }: { value: boolean | number | string }) => {
      const response = await fetch(`/firewall`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ value }),
      });
      if (!response.ok) throw new Error("Failed to update firewall");

      return (await response.json()) as Firewall;
    },
    onMutate: async ({ value }, context) => {
      // cancel any outgoing refetches (so they don't overwrite our optimistic update)
      await context.client.cancelQueries({ queryKey: [QUERY_KEY.firewall] });

      // snapshot previous value
      const previousSettings = queryClient.getQueryData([QUERY_KEY.firewall]);

      // optimistically update to the new value
      queryClient.setQueryData([QUERY_KEY.firewall], (old: Firewall) => ({
        ...old,
        firewall: value,
      }));

      return { previousSettings };
    },
    onError: (_err, _newSettings, onMutateResult, context) => {
      context.client.setQueryData(
        [QUERY_KEY.firewall],
        onMutateResult?.previousSettings,
      );
      notifyError();
    },
    onSuccess: (updatedSettings) => {
      queryClient.setQueryData([QUERY_KEY.firewall], updatedSettings);

      notifySaved();
    },
    // adding onSettled is best practise (according to the docs)
    // but if i leave this in it reverts back to the mock data since it's all mock apis
    // onSettled: (_data, _error, _variables, _mutateContext, context) =>
    //   context.client.invalidateQueries({ queryKey: [QUERY_KEY.firewall] }),
  });
};
