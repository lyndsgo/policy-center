import type { Device, DevicePolicy } from "@/types/device";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNotificationContext } from "@/contexts/NotificationContext";
import { QUERY_KEY } from "@/mocks/data/query-key";

export const useTogglePolicy = () => {
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
      const response = await fetch(`/device/policies/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ value }),
      });
      if (!response.ok) throw new Error("Failed to update policy");

      return (await response.json()) as Device;
    },
    onMutate: async ({ id, value }, context) => {
      // cancel any outgoing refetches (so they don't overwrite our optimistic update)
      await context.client.cancelQueries({ queryKey: [QUERY_KEY.device] });

      // snapshot previous value
      const previousDeviceData = queryClient.getQueryData([QUERY_KEY.device]);

      // optimistically update to the new value
      queryClient.setQueryData([QUERY_KEY.device], (old: Device) => ({
        ...old,
        policies: old.policies.map((p: DevicePolicy) =>
          p.id === id ? { ...p, value } : p,
        ),
      }));

      return { previousDeviceData };
    },
    onError: (_err, _newDevice, onMutateResult, context) => {
      context.client.setQueryData(
        [QUERY_KEY.device],
        onMutateResult?.previousDeviceData,
      );
      notifyError();
    },
    onSuccess: (updatedDevice) => {
      queryClient.setQueryData([QUERY_KEY.device], updatedDevice);
      notifySaved();
    },
    // adding onSettled is best practise (according to the docs)
    // but if i leave this in it reverts back to the mock data since it's all mock apis
    // onSettled: (_data, _error, _variables, _mutateContext, context) =>
    //   context.client.invalidateQueries({ queryKey: [QUERY_KEY.device] }),
  });
};
