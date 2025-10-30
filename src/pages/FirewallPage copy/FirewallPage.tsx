import { useFirewall } from "@/hooks/useFirewall";
import { useToggleFirewall } from "@/hooks/useToggleFirewall";
import { useToggleFirewallApplication } from "@/hooks/useToggleFirewallApplication";

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import ToggleInput from "@/components/ToggleInput/ToggleInput";
import FormGroup from "@mui/material/FormGroup";
// import Button from "@mui/material/Button";
// import { useState } from "react";

// import Modal, { type ModalProps } from "@/components/Modal/Modal";
// import FormControl from "@mui/material/FormControl";
// import InputLabel from "@mui/material/InputLabel";
// import { type SelectChangeEvent } from "@mui/material/Select";
// import TextField from "@mui/material/TextField";

// type AddApplicationModalProps = Pick<ModalProps, "open" | "setOpen">;

// const AddApplicationModal = ({ open, setOpen }: AddApplicationModalProps) => {
//   const [value, setValue] = useState("");

//   const handleChange = (e: SelectChangeEvent) => {
//     setValue(e.target.value);
//   };

//   return (
//     <Modal
//       open={open}
//       setOpen={setOpen}
//       title="Add an Application"
//       description="Bypass the firewall rules"
//     >
//       <FormControl fullWidth>
//         <InputLabel id="select-an-application">
//           Select an application
//         </InputLabel>
//         <TextField id="outlined-basic" label="Outlined" variant="outlined" />
//       </FormControl>
//     </Modal>
//   );
// };

const FirewallPage = () => {
  const { data: firewall, isLoading } = useFirewall();

  // const [addApplicationModalOpen, setAddApplicationModalOpen] = useState(false);

  const toggleFirewall = useToggleFirewall();
  const toggleFirewallApplication = useToggleFirewallApplication();

  const onToggleFirewall = (_: string, value: boolean) => {
    toggleFirewall.mutate({ value });
  };

  const onToggleFirewallApplication = (id: string, value: boolean) => {
    toggleFirewallApplication.mutate({ id, value });
  };

  // const openAddApplicationModal = () => {
  //   setAddApplicationModalOpen(true);
  // };

  return isLoading || !firewall ? (
    <>Loading</>
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
                  className="flex w-full items-center justify-between border-b border-gray-300 py-1"
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
          {/* <Button onClick={openAddApplicationModal}>Add application</Button> */}
          {/* <AddApplicationModal
            open={addApplicationModalOpen}
            setOpen={setAddApplicationModalOpen}
          /> */}
        </>
      )}
    </Box>
  );
};

export default FirewallPage;
