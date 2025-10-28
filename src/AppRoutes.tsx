import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "@/layouts/PageLayout/Layout";
import ProtectedRoutes from "@/routes/ProtectedRoutes";

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<ProtectedRoutes />}>
          <Route path="/" element={<Layout />}>
            <Route index element={<>Home</>} />
            <Route path="/device-policy" element={<>Device Policy</>} />
            <Route path="/patch-rules" element={<>Patch Rules</>} />
            <Route path="/firewall" element={<>Firewall</>} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;
