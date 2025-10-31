import type { Whitelist, WhitelistItem } from "@/types/whitelist";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNotificationContext } from "@/contexts/NotificationContext";
import { QUERY_KEY } from "@/mocks/data/query-key";
import type { MutationOptions } from "./types";

export const useCreateWhitelistItem = (options?: MutationOptions) => {
  const queryClient = useQueryClient();
  const { notifySaved, notifyError } = useNotificationContext();

  return useMutation({
    mutationFn: async ({ ip }: { ip: string }) => {
      const response = await fetch("/whitelist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ip }),
      });
      if (!response.ok)
        throw new Error(`Failed to add whitelist item for ${ip}`);

      return (await response.json()) as WhitelistItem;
    },
    onMutate: async ({ ip }, context) => {
      // cancel any outgoing refetches (so they don't overwrite our optimistic update)
      await context.client.cancelQueries({ queryKey: [QUERY_KEY.whitelist] });
      // snapshot previous value
      const previousWhitelist = queryClient.getQueryData([QUERY_KEY.whitelist]);
      // Create a temporary optimistic item
      const optimisticItem: WhitelistItem = {
        id: `temp-${crypto.randomUUID()}`, // temporary client-generated ID
        ip,
      };

      // optimistically update to the new value
      queryClient.setQueryData<Whitelist>(
        [QUERY_KEY.whitelist],
        (cache = []) => [...cache, optimisticItem],
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
    onSuccess: (newWhitelistItem) => {
      queryClient.setQueryData<Whitelist>(
        [QUERY_KEY.whitelist],
        (cache = []) => [
          ...cache.filter((item) => !item.id.startsWith("temp-")),
          newWhitelistItem,
        ],
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
