import IconButton from "@mui/material/IconButton";
import type { SnackbarCloseReason } from "@mui/material/Snackbar";
import Snackbar from "@mui/material/Snackbar";
import {
  useContext,
  createContext,
  type PropsWithChildren,
  useState,
  useEffect,
} from "react";

import CloseIcon from "@mui/icons-material/Close";
import ErrorIcon from "@mui/icons-material/Error";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import Box from "@mui/material/Box";

export type NotifcationType = "info" | "success" | "error";

export interface Notification {
  type: NotifcationType;
  message: string;
  key: number;
}

interface NotificationContextProps {
  notify: (type: NotifcationType, message: string) => void;
}

export const NotificationContext = createContext<NotificationContextProps>({
  notify: () => undefined,
});

export const NotificationProvider = ({ children }: PropsWithChildren) => {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [open, setOpen] = useState(false);
  const [messageInfo, setMessageInfo] = useState<Notification | undefined>(
    undefined,
  );

  useEffect(() => {
    if (notifications.length && !messageInfo) {
      // set a new notifications when we don't have an active one
      setMessageInfo({ ...notifications[0] });
      setNotifications((prev) => prev.slice(1));
      setOpen(true);
    } else if (notifications.length && messageInfo && open) {
      // close the active notifications when a new one is added
      setOpen(false);
    }
  }, [notifications, messageInfo, open]);

  const notify = (type: NotifcationType, message: string) => {
    setNotifications((prev) => [
      ...prev,
      { type, message, key: new Date().getTime() },
    ]);
  };

  const handleClose = (
    _: React.SyntheticEvent | Event,
    reason?: SnackbarCloseReason,
  ) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  const handleExited = () => {
    setMessageInfo(undefined);
  };

  return (
    <NotificationContext.Provider value={{ notify }}>
      {children}
      <Snackbar
        key={messageInfo ? messageInfo.key : undefined}
        open={open}
        autoHideDuration={3000}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        onClose={handleClose}
        slotProps={{ transition: { onExited: handleExited } }}
        message={
          messageInfo ? (
            <Box className="flex items-center gap-2">
              {messageInfo.type === "success" ? (
                <CheckCircleIcon aria-hidden color="success" />
              ) : (
                <ErrorIcon aria-hidden color="error" />
              )}
              {messageInfo.message}
            </Box>
          ) : undefined
        }
        action={
          <IconButton
            aria-label="Close"
            color="inherit"
            sx={{ p: 0.5 }}
            onClick={handleClose}
          >
            <CloseIcon />
          </IconButton>
        }
      />
    </NotificationContext.Provider>
  );
};

export function useNotificationContext() {
  return useContext(NotificationContext);
}
