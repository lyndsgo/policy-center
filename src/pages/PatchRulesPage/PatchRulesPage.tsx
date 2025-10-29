// import { useSecuritySettings } from "@/hooks/useSecuritySettings";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

const PatchRulesPage = () => {
  // const { data: securitySettings, isLoading } = useSecuritySettings();

  return (
    <Box>
      <Typography variant="h5" component="h1" sx={{ mb: 2 }}>
        Patch Rules
      </Typography>
      <Typography component="p" sx={{ mb: 2 }}>
        This page is a placeholder, I've started thinking about the data
        structure and you can see how I'd interact with the API.
      </Typography>
      <Typography component="p">
        I'd use the same technique for the security updates here as I did for
        the firewall updates.
      </Typography>
    </Box>
  );
};

export default PatchRulesPage;
