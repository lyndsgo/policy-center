import type { Device, DevicePolicy } from "@/types/device";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useUpdatePolicy = (
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
      await context.client.cancelQueries({ queryKey: ["deviceData"] });

      // snapshot previous value
      const previousDeviceData = queryClient.getQueryData(["deviceData"]);

      // optimistically update to the new value
      queryClient.setQueryData(["deviceData"], (old: Device) => ({
        ...old,
        policies: old.policies.map((p: DevicePolicy) =>
          p.id === id ? { ...p, value } : p,
        ),
      }));

      return { previousDeviceData };
    },
    onError: (_err, _newDevice, onMutateResult, context) => {
      context.client.setQueryData(
        ["deviceData"],
        onMutateResult?.previousDeviceData,
      );
      onError?.();
      console.log("onError", onMutateResult?.previousDeviceData);
    },
    onSuccess: (updatedDevice) => {
      queryClient.setQueryData(["deviceData"], updatedDevice);
      onSuccess?.();
    },
    // adding onSettled is best practise (according to the docs)
    // but if i leave this in it reverts back to the mock data since it's all mock apis
    // onSettled: (_data, _error, _variables, _mutateContext, context) =>
    //   context.client.invalidateQueries({ queryKey: ["deviceData"] }),
  });
};
