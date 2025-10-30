import PolicyIcon from "@mui/icons-material/Policy";
import SecurityUpdateWarningIcon from "@mui/icons-material/SecurityUpdateWarning";
import LocalFireDepartmentIcon from "@mui/icons-material/LocalFireDepartment";
import { Link, Outlet, useLocation } from "react-router-dom";
import { cn } from "@/utils/cn";
import { RoutesList } from "@/routes/routeList";
import Box from "@mui/material/Box";

const navItems = [
  {
    icon: PolicyIcon,
    url: RoutesList.DevicePolicy,
    title: "Device Policy",
  },
  {
    icon: LocalFireDepartmentIcon,
    url: RoutesList.Firewall,
    title: "Firewall",
  },
  {
    icon: SecurityUpdateWarningIcon,
    url: RoutesList.PatchRules,
    title: "Patch Rules",
  },
];

export const PageLayout = () => {
  const { pathname } = useLocation();

  return (
    <>
      <a className="sr-only" href="#main">
        Skip to content
      </a>
      <Box className="bg-brand-light flex flex-wrap md:h-full md:p-10">
        <Box className="bg-brand-dark h-full w-full min-w-64 p-4 text-white md:w-1/5 md:rounded-3xl">
          <Link to="/" className="text-xl">
            PolicyCenter
          </Link>
          <nav className="mt-4">
            <ul>
              {navItems.map((item) => {
                const Icon = item.icon;
                return (
                  <li key={item.url}>
                    <Link
                      to={item.url}
                      className={cn(
                        "flex items-center gap-2 rounded-3xl px-3 py-2 text-nowrap hover:bg-gray-800",
                        pathname === item.url && "bg-brand-accent",
                      )}
                    >
                      <Icon aria-hidden />
                      {item.title}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>
        </Box>

        <Box
          id="main"
          component="main"
          className="grow p-4 md:h-full md:overflow-scroll"
        >
          <Box
            className={cn(
              pathname === RoutesList.HomePage
                ? "md:max-w-[700px]"
                : "md:max-w-[500px]",
            )}
          >
            <Outlet />
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default PageLayout;
