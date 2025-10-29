import { useUserData } from "@/hooks/useUserData";
import type { User } from "@/types/user";
import { useContext, createContext, type PropsWithChildren } from "react";

interface AuthContextObject {
  userData?: User;
}

export const AuthContext = createContext<AuthContextObject>({});

export const AuthProvider = (props: PropsWithChildren) => {
  const { data: userData } = useUserData();

  //!TODO: could have login, logout, etc

  return (
    <AuthContext.Provider
      value={{
        userData,
      }}
      {...props}
    />
  );
};

export function useAuthContext() {
  return useContext(AuthContext);
}
