import { useQuery } from "@tanstack/react-query";
import type { User } from "@/types/user";

export const useUserData = () => {
  return useQuery({
    queryKey: ["userData"],
    queryFn: async (): Promise<User> => {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/user`);

      if (!response.ok) {
        throw new Error("There was an error when fetching user data");
      }

      return (await response.json()) as User;
    },
  });
};
