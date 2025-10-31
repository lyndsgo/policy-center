import ToggleInput from "@/components/ToggleInput/ToggleInput";
import { useGetDeviceData } from "@/hooks/useGetDeviceData";
import { useTogglePolicy } from "@/hooks/useTogglePolicy";
import type { DevicePolicy } from "@/types/device";
import Box from "@mui/material/Box";
import FormGroup from "@mui/material/FormGroup";
import Typography from "@mui/material/Typography";
import { formateDate } from "@/utils/formate-date";
import Alert from "@mui/material/Alert";
import CircularProgress from "@mui/material/CircularProgress";

interface PolicyInputProps extends DevicePolicy {
  onChange: (id: string, value: boolean) => void;
}

export const PolicyInput = ({
  type,
  id,
  name,
  value,
  onChange,
}: PolicyInputProps) => {
  switch (type) {
    case "string":
      return <>Text Field</>; //example of how i'd conditionally render different types of inputs
    case "number":
      return <>Number Input</>; //example of how i'd conditionally render different types of inputs
    case "boolean":
      return (
        <ToggleInput id={id} label={name} value={value} onChange={onChange} />
      );
  }
};

const DevicePolicyPage = () => {
  const { data: deviceData, isLoading, isError } = useGetDeviceData();

  const togglePolicy = useTogglePolicy();

  const onTogglePolicy = (id: string, value: boolean) => {
    togglePolicy.mutate({ id, value });
  };

  //!TODO: proper/better error handling
  if (isError)
    return <Alert severity="error">Error fetching device data</Alert>;

  return isLoading || !deviceData ? (
    <CircularProgress />
  ) : (
    <>
      <Typography variant="h5" component="h1">
        Device Policies
      </Typography>
      <Typography variant="h6" component="h2" className="mt-2">
        Device Details
      </Typography>
      <dl className="grid auto-cols-auto grid-cols-2">
        <dt>Name:</dt>
        <dd>{deviceData.name}</dd>
        <dt>Serial:</dt>
        <dd>{deviceData.serial}</dd>
        <dt>Status:</dt>
        <dd>{deviceData.protected ? "Protected" : "Unprotected"}</dd>
        <dt>Policy End:</dt>
        <dd>{formateDate(deviceData.policyEnd)}</dd>
      </dl>

      <Typography variant="h6" component="h2" className="mt-6">
        Rules
      </Typography>
      <FormGroup className="w-full">
        {deviceData.policies.map((policy) => {
          return (
            <Box
              key={policy.id}
              className="flex w-full items-center justify-between border-b border-gray-300 py-1 last:border-b-0"
            >
              <PolicyInput {...policy} onChange={onTogglePolicy} />
            </Box>
          );
        })}
      </FormGroup>
    </>
  );
};

export default DevicePolicyPage;
