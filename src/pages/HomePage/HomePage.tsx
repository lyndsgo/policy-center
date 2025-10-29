import LinkCard from "@/components/LinkCard/LinkCard";
import { useAuthContext } from "@/contexts/AuthContext";
import { RoutesList } from "@/routes/routeList";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

import PolicyIcon from "@mui/icons-material/Policy";
import SecurityUpdateWarningIcon from "@mui/icons-material/SecurityUpdateWarning";
import LocalFireDepartmentIcon from "@mui/icons-material/LocalFireDepartment";
import Grid from "@mui/material/Grid";

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

const HomePage = () => {
  const { userData } = useAuthContext();

  return (
    <Box>
      <Typography variant="h5" component="h1">
        Hello, {userData?.firstname}!
      </Typography>
      <Typography component="p" className="mt-2">
        Check out your security policies
      </Typography>
      <Grid container spacing={2} className="mt-6">
        {navItems.map((item) => (
          <Grid size={6} key={item.title}>
            <LinkCard key={item.title} {...item} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default HomePage;
