import { useQuery } from "@tanstack/react-query";
import type { User } from "@/types/user";
import { QUERY_KEY } from "@/mocks/data/query-key";

export const useGetUserData = () => {
  return useQuery({
    queryKey: [QUERY_KEY.userData],
    queryFn: async (): Promise<User> => {
      const response = await fetch("/user");

      if (!response.ok) {
        throw new Error("There was an error when fetching user data");
      }

      return (await response.json()) as User;
    },
  });
};
