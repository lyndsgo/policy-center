import { useQuery } from "@tanstack/react-query";
import type { Firewall } from "@/types/firewall";
import { QUERY_KEY } from "@/mocks/data/query-key";

export const useFirewall = () => {
  return useQuery({
    refetchOnMount: false,
    queryKey: [QUERY_KEY.firewall],
    queryFn: async (): Promise<Firewall> => {
      const response = await fetch(`/firewall`);

      if (!response.ok) {
        throw new Error("There was an error when fetching security settings");
      }

      return (await response.json()) as Firewall;
    },
  });
};
