// if this grew it could go into a theme directory
import { createTheme } from "@mui/material/styles";

export const theme = createTheme({
  palette: {
    primary: {
      main: "#3d69e1",
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 30,
          textTransform: "none",
          fontSize: "1rem",
        },
      },
      defaultProps: {
        disableElevation: true,
      },
    },
  },
});
