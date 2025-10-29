import ToggleInput from "@/components/ToggleInput/ToggleInput";
import { useNotificationContext } from "@/contexts/NotificationContext";
import { useDeviceData } from "@/hooks/useDeviceData";
import { useUpdatePolicy } from "@/hooks/useUpdatePolicy";
import type { DevicePolicy } from "@/types/device";
import Box from "@mui/material/Box";
import FormGroup from "@mui/material/FormGroup";
import Typography from "@mui/material/Typography";

interface PolicyInputProps extends DevicePolicy {
  onChange: (id: string, name: string) => void;
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
  const { data: deviceData, isLoading } = useDeviceData();
  const { notify } = useNotificationContext();

  const handleSuccess = () => {
    notify("success", "Saved");
  };

  const handleError = () => {
    notify("error", "Please try again!");
  };

  const updatePolicy = useUpdatePolicy(handleSuccess, handleError);

  const onPolicyValueChange = (id: string, value: string) => {
    updatePolicy.mutate({ id, value });
  };

  return isLoading ? (
    <>Loading</>
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
        <dd>{deviceData?.name}</dd>
        <dt>Serial:</dt>
        <dd>{deviceData?.serial}</dd>
        <dt>Status:</dt>
        <dd>{deviceData?.protected ? "Protected" : "Unprotected"}</dd>
        <dt>Policy End:</dt>
        <dd>{deviceData?.policyEnd}</dd>
      </dl>

      <Typography variant="h6" component="h2" className="mt-6">
        Rules
      </Typography>
      <FormGroup className="w-full">
        {deviceData?.policies.map((policy) => {
          return (
            <Box
              key={policy.id}
              className="flex w-full items-center justify-between border-b-1 border-gray-300 py-1"
            >
              <PolicyInput {...policy} onChange={onPolicyValueChange} />
            </Box>
          );
        })}
      </FormGroup>
    </>
  );
};

export default DevicePolicyPage;
