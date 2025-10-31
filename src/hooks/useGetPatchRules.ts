import { useQuery } from "@tanstack/react-query";
import type { PatchRules } from "@/types/patch-rules";
import { QUERY_KEY } from "@/mocks/data/query-key";

export const useGetPatchRules = () => {
  return useQuery({
    refetchOnMount: false,
    queryKey: [QUERY_KEY.patchRules],
    queryFn: async (): Promise<PatchRules> => {
      const response = await fetch("/patch-rules");

      if (!response.ok) {
        throw new Error("There was an error when fetching patch rules");
      }

      return (await response.json()) as PatchRules;
    },
  });
};
