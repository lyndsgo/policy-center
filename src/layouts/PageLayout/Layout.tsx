import { MdPolicy } from "react-icons/md";
import { Link, Outlet, useLocation } from "react-router-dom";
import { cn } from "@/utils/cn";
import { useUserData } from "@/hooks/useUserData";
import { RoutesList } from "@/routes/routeList";

const navItems = [
  { icon: MdPolicy, link: RoutesList.DevicePolicy, title: "Device Policy" },
  { icon: MdPolicy, link: RoutesList.PatchRules, title: "Patch Rules" },
  { icon: MdPolicy, link: RoutesList.Firewall, title: "Firewall" },
];

function Layout() {
  const { pathname } = useLocation();
  const data = useUserData();
  console.log(data);
  return (
    <div className="flex h-full p-10">
      <div className="h-full w-1/5 rounded-3xl bg-gray-700 p-4 text-white">
        <Link to="/" className="text-xl">
          PolicyCenter
        </Link>
        <nav className="mt-4">
          <ul>
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <li key={item.link}>
                  <Link
                    to={item.link}
                    className={cn(
                      "flex items-center gap-2 rounded-3xl px-3 py-2 hover:bg-gray-800",
                      pathname === item.link && "bg-red-500",
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
      </div>
      <main className="p-4">
        <Outlet />
      </main>
    </div>
  );
}

export default Layout;
