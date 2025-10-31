import { useGetFirewall } from "@/hooks/useGetFirewall";
import { useToggleFirewall } from "@/hooks/useToggleFirewall";
import { useToggleFirewallApplication } from "@/hooks/useToggleFirewallApplication";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import ToggleInput from "@/components/ToggleInput/ToggleInput";
import FormGroup from "@mui/material/FormGroup";
import Alert from "@mui/material/Alert";
import CircularProgress from "@mui/material/CircularProgress";

const FirewallPage = () => {
  const { data: firewall, isLoading, isError } = useGetFirewall();

  const toggleFirewall = useToggleFirewall();
  const toggleFirewallApplication = useToggleFirewallApplication();

  const onToggleFirewall = (_: string, value: boolean) => {
    toggleFirewall.mutate({ value });
  };

  const onToggleFirewallApplication = (id: string, value: boolean) => {
    toggleFirewallApplication.mutate({ id, value });
  };

  //!TODO: proper/better error handling
  if (isError) return <Alert severity="error">Error fetching firewall</Alert>;

  return isLoading || !firewall ? (
    <CircularProgress />
  ) : (
    <Box>
      <Typography variant="h5" component="h1">
        Firewall
      </Typography>
      <ToggleInput
        id="firewall-all"
        label="Enable firewall"
        value={firewall.firewall}
        onChange={onToggleFirewall}
      />

      {firewall.firewall && (
        <>
          <Typography component="p" className="mt-2">
            The firewall is turned on and configured to prevent unauthorised
            applications and services from accepting incoming connections.
          </Typography>

          <Typography variant="h6" component="h2" className="mt-6">
            Application Access
          </Typography>
          <Typography component="p" className="mt-2">
            The following applications will bypass the firewall rules:
          </Typography>
          <FormGroup className="w-full">
            {firewall.apps.map((app) => {
              return (
                <Box
                  key={app.id}
                  className="flex w-full items-center justify-between border-b border-gray-300 last:border-b-0"
                >
                  <ToggleInput
                    id={app.id}
                    label={app.name}
                    value={app.firewall}
                    onChange={onToggleFirewallApplication}
                  />
                </Box>
              );
            })}
          </FormGroup>
        </>
      )}
    </Box>
  );
};

export default FirewallPage;
