import ToggleInput from "@/components/ToggleInput/ToggleInput";
import { useGetPatchRules } from "@/hooks/useGetPatchRules";
import { useTogglePatchRules } from "@/hooks/useTogglePatchRules";
import { useTogglePatchRuleApplication } from "@/hooks/useTogglePatchRuleApplication";
import { formateDate } from "@/utils/formate-date";
import Box from "@mui/material/Box";
import FormGroup from "@mui/material/FormGroup";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Alert from "@mui/material/Alert";
import CircularProgress from "@mui/material/CircularProgress";

const PatchRulesPage = () => {
  const { data: patchRules, isLoading, isError } = useGetPatchRules();

  const toggleAutoUpdate = useTogglePatchRules();
  const toggleAutoUpdateApplication = useTogglePatchRuleApplication();

  const onToggleAutoUpdate = (_: string, value: boolean) => {
    toggleAutoUpdate.mutate({ value });
  };

  const onToggleAutoUpdateApplication = (id: string, value: boolean) => {
    toggleAutoUpdateApplication.mutate({ id, value });
  };

  //!TODO: proper/better error handling
  if (isError)
    return <Alert severity="error">Error fetching patch rules</Alert>;

  return isLoading || !patchRules ? (
    <CircularProgress />
  ) : (
    <Box>
      <Typography variant="h5" component="h1">
        Patch Rules
      </Typography>
      <ToggleInput
        id="auto-update-all"
        label="Enable auto-update for all applications"
        value={patchRules.autoUpdate}
        onChange={onToggleAutoUpdate}
      />
      {patchRules.autoUpdate ? (
        <Typography component="p" className="mt-2">
          Toggle the above for more granular control over your applications
        </Typography>
      ) : (
        <>
          <Typography variant="body1" component="h2" className="mt-2">
            Toggle by application:
          </Typography>
          <FormGroup className="mt-2 w-full">
            {patchRules.apps.map((app) => {
              return (
                <Grid
                  key={app.id}
                  className="spacing-4 border-b border-gray-300 py-1 last:border-b-0"
                  container
                >
                  <Grid size={4}>
                    <h3>{app.name}</h3>
                  </Grid>
                  <Grid size={6} height="min-content">
                    <dl className="text-sm">
                      <dt>Current Version:</dt>
                      <dd>{app.currentVersion}</dd>

                      <dt>Last Updated:</dt>
                      <dd>{formateDate(app.lastUpdateDate)}</dd>
                    </dl>
                  </Grid>
                  <Grid size={2} className="text-right">
                    <ToggleInput
                      id={app.id}
                      label={app.name}
                      value={app.autoUpdate}
                      onChange={onToggleAutoUpdateApplication}
                      hideLabel
                      className="w-auto"
                    />
                  </Grid>
                </Grid>
              );
            })}
          </FormGroup>
        </>
      )}
    </Box>
  );
};

export default PatchRulesPage;
