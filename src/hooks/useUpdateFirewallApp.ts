import type { App, SecuritySettings } from "@/types/security-settings";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useUpdateFirewallApp = (
  onSuccess?: () => void,
  onError?: () => void,
) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      id,
      value,
    }: {
      id: string;
      value: boolean | number | string;
    }) => {
      const response = await fetch(`/security-settings/firewall/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ value }),
      });
      if (!response.ok) throw new Error(`Failed to update firewall for ${id}`);

      return (await response.json()) as SecuritySettings;
    },
    onMutate: async ({ id, value }, context) => {
      // cancel any outgoing refetches (so they don't overwrite our optimistic update)
      await context.client.cancelQueries({ queryKey: ["securitySettings"] });

      // snapshot previous value
      const previousSettings = queryClient.getQueryData(["securitySettings"]);

      // optimistically update to the new value
      queryClient.setQueryData(
        ["securitySettings"],
        (old: SecuritySettings) => ({
          ...old,
          apps: old.apps.map((a: App) =>
            a.id === id ? { ...a, firewall: value } : a,
          ),
        }),
      );

      return { previousSettings };
    },
    onError: (_err, _newApp, onMutateResult, context) => {
      context.client.setQueryData(
        ["securitySettings"],
        onMutateResult?.previousSettings,
      );
      onError?.();
    },
    onSuccess: (updatedSettings) => {
      queryClient.setQueryData(
        ["securitySettings"],
        (old: SecuritySettings) => ({
          ...old,
          apps: updatedSettings.apps,
          firewall: old.firewall, // do not override global firewall on app updates
        }),
      );

      onSuccess?.();
    },
    // adding onSettled is best practise (according to the docs)
    // but if i leave this in it reverts back to the mock data since it's all mock apis
    // onSettled: (_data, _error, _variables, _mutateContext, context) =>
    //   context.client.invalidateQueries({ queryKey: ["securitySettings"] }),
  });
};
