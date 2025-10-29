import { useQuery } from "@tanstack/react-query";
import type { Device } from "@/types/device";

export const useDeviceData = () => {
  return useQuery({
    refetchOnMount: false,
    queryKey: ["deviceData"],
    queryFn: async (): Promise<Device> => {
      const response = await fetch(`/device`);

      if (!response.ok) {
        throw new Error("There was an error when fetching device data");
      }

      return (await response.json()) as Device;
    },
  });
};
