import { createTheme } from "@mui/material/styles";
import { red } from "@mui/material/colors";

// Detect system color scheme preference
const getSystemThemeMode = () => {
  if (typeof window === "undefined") return "light";
  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
};

// Create theme based on mode
const createAppTheme = (mode = getSystemThemeMode()) => {
  const isDark = mode === "dark";

  return createTheme({
    cssVariables: true,
    palette: {
      mode,
      primary: {
        main: "#556cd6",
      },
      secondary: {
        main: "#19857b",
      },
      error: {
        main: red.A400,
      },
      text: {
        primary: isDark ? "#ffffff" : "#000000",
      },
      background: {
        default: isDark ? "#121212" : "#ffffff",
        paper: isDark ? "#1e1e1e" : "#ffffff",
      },
    },
    typography: {
      fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
      h1: {
        color: isDark ? "#ffffff" : "#000000",
      },
      h2: {
        color: isDark ? "#ffffff" : "#000000",
      },
      h3: {
        color: isDark ? "#ffffff" : "#000000",
      },
      h4: {
        color: isDark ? "#ffffff" : "#000000",
      },
      h5: {
        color: isDark ? "#ffffff" : "#000000",
      },
      h6: {
        color: isDark ? "#ffffff" : "#000000",
      },
      body1: {
        color: isDark ? "#ffffff" : "#000000",
      },
      body2: {
        color: isDark ? "#ffffff" : "#000000",
      },
    },
    components: {
      MuiCssBaseline: {
        styleOverrides: {
          html: {
            width: "100%",
            height: "100%",
          },
          body: {
            width: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            minHeight: "100dvh",
            backgroundColor: isDark ? "#121212" : "#ffffff",
            color: isDark ? "#ffffff" : "#000000",
          },
        },
      },
    },
  });
};

const theme = createAppTheme();

export { createAppTheme };
export default theme;
