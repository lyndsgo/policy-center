import { useQuery } from "@tanstack/react-query";
import { QUERY_KEY } from "@/mocks/data/query-key";
import type { Whitelist } from "@/types/whitelist";

export const useGetWhitelist = () => {
  return useQuery({
    refetchOnMount: false,
    queryKey: [QUERY_KEY.whitelist],
    queryFn: async (): Promise<Whitelist> => {
      const response = await fetch("/whitelist");

      if (!response.ok) {
        throw new Error("There was an error when fetching whitelist");
      }

      return (await response.json()) as Whitelist;
    },
  });
};
