import Box from "@mui/material/Box";
import MuiModal from "@mui/material/Modal";
import Typography from "@mui/material/Typography";
import { useId, type ReactNode } from "react";

export interface ModalProps {
  open: boolean;
  onClose: () => void;
  title: string;
  description?: string;
  children?: ReactNode;
}

const Modal = ({ open, onClose, title, description, children }: ModalProps) => {
  const id = useId();

  const handleClose = () => {
    onClose();
  };

  return (
    <MuiModal
      open={open}
      onClose={handleClose}
      aria-labelledby={`${id}-title`}
      aria-describedby={description ? `${id}-desc` : undefined}
    >
      <Box className="absolute top-1/2 left-1/2 w-[500px] max-w-[calc(100%-2rem)] -translate-x-1/2 -translate-y-1/2 rounded-3xl bg-white p-4">
        <Typography id={`${id}-title`} variant="h6" component="h2">
          {title}
        </Typography>
        {description && (
          <Typography id={`${id}-desc`}>{description}</Typography>
        )}
        {children}
      </Box>
    </MuiModal>
  );
};

export default Modal;
