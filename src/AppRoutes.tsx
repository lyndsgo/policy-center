import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "@/layouts/PageLayout/PageLayout";
import DevicePolicyPage from "./pages/DevicePolicyPage/DevicePolicyPage";
import PatchRulesPage from "./pages/PatchRulesPage/PatchRulesPage";
import FirewallPage from "./pages/FirewallPage/FirewallPage";
import HomePage from "./pages/HomePage/HomePage";
import WhitelistPage from "./pages/WhitelistPage/WhitelistPage";

import { ROUTES } from "./routes/routeList";

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={ROUTES.homePage} element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path={ROUTES.devicePolicy} element={<DevicePolicyPage />} />
          <Route path={ROUTES.patchRules} element={<PatchRulesPage />} />
          <Route path={ROUTES.firewall} element={<FirewallPage />} />
          <Route path={ROUTES.whitelist} element={<WhitelistPage />} />
          <Route path="*" element={<>Not found</>} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;
