import { useNotificationContext } from "@/contexts/NotificationContext";
import { useSecuritySettings } from "@/hooks/useSecuritySettings";
import { useUpdateFirewallAll } from "@/hooks/useUpdateFirewallAll";
import { useUpdateFirewallApp } from "@/hooks/useUpdateFirewallApp";

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import ToggleInput from "@/components/ToggleInput/ToggleInput";
import FormGroup from "@mui/material/FormGroup";

const FirewallPage = () => {
  const { data: securitySettings, isLoading } = useSecuritySettings();
  const { notify } = useNotificationContext();

  const handleSuccess = () => {
    notify("success", "Saved");
  };

  const handleError = () => {
    notify("error", "Please try again!");
  };

  const updateFirewallAll = useUpdateFirewallAll(handleSuccess, handleError);
  const updateFirwallSingleApp = useUpdateFirewallApp(
    handleSuccess,
    handleError,
  );

  const onAllFirewallValueChange = (_: string, value: string) => {
    updateFirewallAll.mutate({ value });
  };

  const onSingleAppFirewallValueChange = (id: string, value: string) => {
    updateFirwallSingleApp.mutate({ id, value });
  };

  return isLoading ? (
    <>Loading</>
  ) : (
    <Box>
      <Typography variant="h5" component="h1">
        Firewall
      </Typography>
      <ToggleInput
        id="firewall-all"
        label="Enable all by default"
        value={securitySettings?.firewall}
        onChange={onAllFirewallValueChange}
      />
      {securitySettings?.firewall === "false" ? (
        <>
          <Typography variant="h6" component="h2" className="mt-6">
            Advanced Rules
          </Typography>
          <Typography component="p" className="mt-4">
            Enable applications:
          </Typography>
          <FormGroup className="w-full">
            {securitySettings.apps.map((app) => {
              return (
                <Box
                  key={app.id}
                  className="flex w-full items-center justify-between border-b-1 border-gray-300 py-1"
                >
                  <ToggleInput
                    id={app.id}
                    label={app.name}
                    value={app.firewall}
                    onChange={onSingleAppFirewallValueChange}
                  />
                </Box>
              );
            })}
          </FormGroup>
        </>
      ) : (
        <Typography component="p" className="mt-6">
          Toggle the above to see advanced rules
        </Typography>
      )}
    </Box>
  );
};

export default FirewallPage;
