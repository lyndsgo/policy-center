import type { Whitelist } from "@/types/whitelist";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNotificationContext } from "@/contexts/NotificationContext";
import { QUERY_KEY } from "@/mocks/data/query-key";
import type { MutationOptions } from "./types";

export const useDeleteWhitelistItem = (options?: MutationOptions) => {
  const queryClient = useQueryClient();
  const { notifySaved, notifyError } = useNotificationContext();

  return useMutation({
    mutationFn: async ({ id }: { id: string }) => {
      const response = await fetch(`/whitelist/${id}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });
      if (!response.ok)
        throw new Error(`Failed to delete whitelist item for ${id}`);

      return { id };
    },
    onMutate: async ({ id }, context) => {
      // cancel any outgoing refetches (so they don't overwrite our optimistic update)
      await context.client.cancelQueries({ queryKey: [QUERY_KEY.whitelist] });

      // snapshot previous value
      const previousWhitelist = queryClient.getQueryData([QUERY_KEY.whitelist]);

      // optimistically remove the item from the cache
      queryClient.setQueryData<Whitelist>([QUERY_KEY.whitelist], (cache = []) =>
        cache.filter((item) => item.id !== id),
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
    onSuccess: () => {
      // already removed it optimistically, nothing else needed

      options?.onSuccess?.();
      notifySaved();
    },
    // adding onSettled is best practise (according to the docs)
    // but if i leave this in it reverts back to the mock data since it's all mock apis
    // onSettled: (_data, _error, _variables, _mutateContext, context) =>
    //   context.client.invalidateQueries({ queryKey: [QUERY_KEY.whitelist] }),
  });
};
