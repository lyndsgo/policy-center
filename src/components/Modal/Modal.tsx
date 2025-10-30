import Box from "@mui/material/Box";
import MuiModal from "@mui/material/Modal";
import Typography from "@mui/material/Typography";
import { useId, type ReactNode } from "react";

export interface ModalProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  title: string;
  description: string;
  children?: ReactNode;
}

const Modal = ({ open, setOpen, title, description, children }: ModalProps) => {
  const id = useId();

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <MuiModal
      open={open}
      onClose={handleClose}
      aria-labelledby={`${id}-title`}
      aria-describedby={`${id}-desc`}
    >
      <Box className="absolute top-1/2 left-1/2 w-[500px] max-w-[calc(100%-2rem)] -translate-x-1/2 -translate-y-1/2 rounded-3xl bg-white p-4">
        <Typography id={`${id}-title`} variant="h6" component="h2">
          {title}
        </Typography>
        <Typography id={`${id}-desc`}>{description}</Typography>
        {children}
      </Box>
    </MuiModal>
  );
};

export default Modal;
