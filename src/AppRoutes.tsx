import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "@/layouts/PageLayout/PageLayout";
import { RoutesList } from "./routes/routeList";
import DevicePolicyPage from "./pages/DevicePolicyPage/DevicePolicyPage";
import PatchRulesPage from "./pages/PatchRulesPage/PatchRulesPage";
import FirewallPage from "./pages/FirewallPage/FirewallPage";
import HomePage from "./pages/HomePage/HomePage";

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={RoutesList.HomePage} element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route
            path={RoutesList.DevicePolicy}
            element={<DevicePolicyPage />}
          />
          <Route path={RoutesList.PatchRules} element={<PatchRulesPage />} />
          <Route path={RoutesList.Firewall} element={<FirewallPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;
