import { useQuery } from "@tanstack/react-query";
import type { SecuritySettings } from "@/types/security-settings";

export const useSecuritySettings = () => {
  return useQuery({
    refetchOnMount: false,
    queryKey: ["securitySettings"],
    queryFn: async (): Promise<SecuritySettings> => {
      const response = await fetch(`/security-settings`);

      if (!response.ok) {
        throw new Error("There was an error when fetching security settings");
      }

      return (await response.json()) as SecuritySettings;
    },
  });
};
