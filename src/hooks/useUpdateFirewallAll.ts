import type { SecuritySettings } from "@/types/security-settings";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useUpdateFirewallAll = (
  onSuccess?: () => void,
  onError?: () => void,
) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ value }: { value: boolean | number | string }) => {
      const response = await fetch(`/security-settings/firewall`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ value }),
      });
      if (!response.ok) throw new Error("Failed to update firewall");

      return (await response.json()) as SecuritySettings;
    },
    onMutate: async ({ value }, context) => {
      // cancel any outgoing refetches (so they don't overwrite our optimistic update)
      await context.client.cancelQueries({ queryKey: ["securitySettings"] });

      // snapshot previous value
      const previousSettings = queryClient.getQueryData(["securitySettings"]);

      // optimistically update to the new value
      queryClient.setQueryData(
        ["securitySettings"],
        (old: SecuritySettings) => ({
          ...old,
          firewall: value,
        }),
      );

      return { previousSettings };
    },
    onError: (_err, _newSettings, onMutateResult, context) => {
      context.client.setQueryData(
        ["securitySettings"],
        onMutateResult?.previousSettings,
      );
      onError?.();
    },
    onSuccess: (updatedSettings) => {
      queryClient.setQueryData(["securitySettings"], updatedSettings);

      onSuccess?.();
    },
    // adding onSettled is best practise (according to the docs)
    // but if i leave this in it reverts back to the mock data since it's all mock apis
    // onSettled: (_data, _error, _variables, _mutateContext, context) =>
    //   context.client.invalidateQueries({ queryKey: ["securitySettings"] }),
  });
};
