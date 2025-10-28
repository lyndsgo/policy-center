import { useUserData } from "@/hooks/useUserData";
import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";

const ProtectedRoutes = () => {
  const { data: userData } = useUserData();

  const [initialized, setInitialized] = useState(false);

  useEffect(() => {
    function init() {
      if (initialized || !userData?.id) return;

      try {
        setInitialized(true);
      } catch (error) {
        console.error("Error during initialisation:", error);
      }
    }
    init();
  }, [initialized, userData?.id]);

  // while initialisation is in progress, show a loading state.
  if (!initialized) {
    return <>Loading</>;
  }

  // after initialisation is done, render the protected routes
  return <Outlet />;
};

export default ProtectedRoutes;
