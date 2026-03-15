import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import theme from "./theme"; // your theme.js file
import { Outlet } from "react-router-dom";

export default function App() {
  const apiUrl = import.meta.env.VITE_API_URL;

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Outlet context={{ apiUrl }} />
    </ThemeProvider>
  );
}
