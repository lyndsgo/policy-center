import type { Whitelist, WhitelistItem } from "@/types/whitelist";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNotificationContext } from "@/contexts/NotificationContext";
import { QUERY_KEY } from "@/mocks/data/query-key";
import type { MutationOptions } from "./types";

export const useUpdateWhitelistItem = (options?: MutationOptions) => {
  const queryClient = useQueryClient();
  const { notifySaved, notifyError } = useNotificationContext();

  return useMutation({
    mutationFn: async ({ id, ip }: { id: string; ip: string }) => {
      const response = await fetch(`/whitelist/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, ip }),
      });
      if (!response.ok)
        throw new Error(`Failed to update whitelist item for ${id} / ${ip}`);

      return (await response.json()) as WhitelistItem;
    },
    onMutate: async ({ id, ip }, context) => {
      // cancel any outgoing refetches (so they don't overwrite our optimistic update)
      await context.client.cancelQueries({ queryKey: [QUERY_KEY.whitelist] });

      // snapshot previous value
      const previousWhitelist = queryClient.getQueryData([QUERY_KEY.whitelist]);

      // optimistically update to the new value
      queryClient.setQueryData([QUERY_KEY.whitelist], (cache: Whitelist) =>
        cache.map((item: WhitelistItem) =>
          item.id === id ? { id, ip } : item,
        ),
      );

      return { previousWhitelist };
    },
    onError: (_err, _newData, onMutateResult, context) => {
      context.client.setQueryData(
        [QUERY_KEY.whitelist],
        onMutateResult?.previousWhitelist,
      );
      options?.onError?.();
      notifyError();
    },
    onSuccess: (updatedItem) => {
      queryClient.setQueryData<Whitelist>([QUERY_KEY.whitelist], (cache = []) =>
        cache.map((item) => (item.id === updatedItem.id ? updatedItem : item)),
      );
      options?.onSuccess?.();
      notifySaved();
    },
    // adding onSettled is best practise (according to the docs)
    // but if i leave this in it reverts back to the mock data since it's all mock apis
    // onSettled: (_data, _error, _variables, _mutateContext, context) =>
    //   context.client.invalidateQueries({ queryKey: [QUERY_KEY.whitelist] }),
  });
};
