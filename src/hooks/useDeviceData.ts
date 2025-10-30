import { useQuery } from "@tanstack/react-query";
import type { Device } from "@/types/device";
import { QUERY_KEY } from "@/mocks/data/query-key";

export const useDeviceData = () => {
  return useQuery({
    refetchOnMount: false,
    queryKey: [QUERY_KEY.device],
    queryFn: async (): Promise<Device> => {
      const response = await fetch(`/device`);

      if (!response.ok) {
        throw new Error("There was an error when fetching device data");
      }

      return (await response.json()) as Device;
    },
  });
};
