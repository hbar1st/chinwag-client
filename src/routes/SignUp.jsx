import * as React from "react";

import { Link as RouterLink } from "react-router";
import { useNavigate, useOutletContext } from "react-router-dom";

import Link from "@mui/material/Link";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Checkbox from "@mui/material/Checkbox";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import FormControlLabel from "@mui/material/FormControlLabel";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";

import FormLabel from "@mui/material/FormLabel";
import FormControl from "@mui/material/FormControl";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import MuiCard from "@mui/material/Card";
import { styled } from "@mui/material/styles";

import AppTheme from "../shared-theme/AppTheme";
import ColorModeSelect from "../shared-theme/ColorModeSelect";
import { SitemarkIcon } from "../components/CustomIcons";
import GitHubIcon from "@mui/icons-material/GitHub";

const Card = styled(MuiCard)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignSelf: "center",
  width: "100%",
  padding: theme.spacing(4),
  gap: theme.spacing(2),
  margin: "auto",
  boxShadow:
  "hsla(220, 30%, 5%, 0.05) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.05) 0px 15px 35px -5px",
  [theme.breakpoints.up("sm")]: {
    width: "450px",
  },
  ...theme.applyStyles("dark", {
    boxShadow:
    "hsla(220, 30%, 5%, 0.5) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.08) 0px 15px 35px -5px",
  }),
}));


const SignUpContainer = styled(Stack)(({ theme }) => ({
  height: "calc((1 - var(--template-frame-height, 0)) * 100dvh)",
  minHeight: "100%",
  padding: theme.spacing(2),
  [theme.breakpoints.up("sm")]: {
    padding: theme.spacing(4),
  },
  "&::before": {
    content: '""',
    display: "block",
    position: "absolute",
    zIndex: -1,
    inset: 0,
    backgroundImage:
    "radial-gradient(ellipse at 50% 50%, hsl(210, 100%, 97%), hsl(0, 0%, 100%))",
    backgroundRepeat: "no-repeat",
    ...theme.applyStyles("dark", {
      backgroundImage:
      "radial-gradient(at 50% 50%, hsla(210, 100%, 16%, 0.5), hsl(220, 30%, 5%))",
    }),
  },
}));

export default function SignUp(props) {
  const [emailError, setEmailError] = React.useState(false);
  const [emailErrorMessage, setEmailErrorMessage] = React.useState("");
  const [newPasswordError, setNewPasswordError] = React.useState(false);
  const [newPasswordErrorMessage, setNewPasswordErrorMessage] =
  React.useState("");
  const [confirmPasswordError, setConfirmPasswordError] = React.useState(false);
  const [confirmPasswordErrorMessage, setConfirmPasswordErrorMessage] =
  React.useState("");
  const [nicknameError, setNickNameError] = React.useState(false);
  const [nicknameErrorMessage, setNickNameErrorMessage] = React.useState("");
  const [usernameError, setUsernameError] = React.useState(false);
  const [usernameErrorMessage, setUsernameErrorMessage] = React.useState("");
  
  const { apiUrl } = useOutletContext();
  const navigate = useNavigate();
  
  const apiPath = `${apiUrl}/user/signup`;
  const [validationErrors, setValidationErrors] = React.useState({});
  const [success, setSuccess] = React.useState(false);
  
  const validateInputs = () => {
    const email = document.getElementById("email");
    const password = document.getElementById("new-password");
    const confirmPassword = document.getElementById("confirm-password");
    const nickname = document.getElementById("nickname");
    const username = document.getElementById("username");
    
    let isValid = true;
    
    if (!email.value || !/\S+@\S+\.\S+/.test(email.value)) {
      setEmailError(true);
      setEmailErrorMessage("Email address does not seem to be valid.");
      isValid = false;
    } else {
      setEmailError(false);
      setEmailErrorMessage("");
    }
    
    if (!password.value || password.value.length < 8) {
      setNewPasswordError(true);
      setNewPasswordErrorMessage(
        "Password must be at least 6 characters long.",
      );
      isValid = false;
    } else {
      setNewPasswordError(false);
      setNewPasswordErrorMessage("");
    }
    
    if (!confirmPassword.value || confirmPassword.value.length < 8) {
      setConfirmPasswordError(true);
      setConfirmPasswordErrorMessage(
        "Confirm Password must be at least 8 characters long.",
      );
      isValid = false;
    } else if (confirmPassword.value !== password.value) {
      setConfirmPasswordError(true);
      setConfirmPasswordErrorMessage("Confirm Password must be the same as the Password")
    } else {
      setConfirmPasswordError(false);
      setConfirmPasswordErrorMessage("");
    }
    
    if (!nickname.value || nickname.value.length < 1) {
      setNickNameError(true);
      setNickNameErrorMessage("Nickname is required.");
      isValid = false;
    } else {
      setNickNameError(false);
      setNickNameErrorMessage("");
    }
    
    if (!username.value || username.value.length < 1) {
      setUsernameError(true);
      setUsernameErrorMessage("Username is required.");
      isValid = false;
    } else {
      setUsernameError(false);
      setUsernameErrorMessage("");
    }
    
    return isValid;
  };

  React.useEffect(() => {
    setSuccess(false); //makes sure the snack bar isn't still here
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (
      usernameError ||
      nicknameError ||
      emailError ||
      newPasswordError ||
      confirmPasswordError
    ) {
      return;
    }
    const data = new FormData(event.currentTarget);
    const postData = {
      nickname: data.get("nickname"),
      username: data.get("username"),
      email: data.get("email"),
      "new-password": data.get("new-password"),
      "confirm-password": data.get("confirm-password"),
    };
    
    try {
      const response = await fetch(`${apiPath}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(postData),
      });
      
      if (response.status != 400 && !response.ok) {
        console.error("Signup failed");
        return;
      } else {
        const result = await response.json();
        
        if (response.status == 400) {
          const formatted = {};
          result.data.forEach((err) => {
            formatted[err.path] = err.msg;
          });
          
          setValidationErrors(formatted);
        } else {
          setSuccess(true);
          setTimeout(
            () =>
              navigate("/signin", { state: { email: result.data.email } }),
            1500,
          );
        }
      }
    } catch (err) {
      console.error("Network error during signup:", err);
    }
  };
  
  return (
    <AppTheme {...props}>
      <CssBaseline enableColorScheme />
      <ColorModeSelect sx={{ position: "fixed", top: "1rem", right: "1rem" }} />
      <Snackbar
        open={success}
        autoHideDuration={1500}
        onClose={() => setSuccess(false)}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        sx={{ mb: 6 }}
      >
        <Alert severity="success" variant="filled" sx={{ width: "100%" }}>
          Account created successfully! Redirecting to sign in…
        </Alert>
      </Snackbar>
      <SignUpContainer direction="column" justifyContent="space-between">
        <Card variant="outlined">
          <Box component="div" sx={{ display: "flex" }}>
            <SitemarkIcon />
            <Typography
              component="h1"
              variant="h4"
              sx={{ width: "100%", fontSize: "clamp(2rem, 10vw, 2.15rem)" }}
            >
              Sign up
            </Typography>
          </Box>
          <Box
            component="form"
            onSubmit={handleSubmit}
            sx={{ display: "flex", flexDirection: "column", gap: 2 }}
          >
            <FormControl>
              <FormLabel htmlFor="nickname">Nickname</FormLabel>
              <TextField
                name="nickname"
                required
                fullWidth
                id="nickname"
                placeholder="Jon Snow"
                error={Boolean(validationErrors.nickname) || nicknameError}
                helperText={validationErrors.nickname || nicknameErrorMessage}
                color={nicknameError ? "error" : "primary"}
              />
            </FormControl>
            <FormControl>
              <FormLabel htmlFor="username">Username</FormLabel>
              <TextField
                autoComplete="username"
                name="username"
                required
                fullWidth
                id="username"
                placeholder="jsnow"
                error={Boolean(validationErrors.username) || usernameError}
                helperText={validationErrors.username || usernameErrorMessage}
                color={usernameError ? "error" : "primary"}
              />
            </FormControl>
            <FormControl>
              <FormLabel htmlFor="email">Email</FormLabel>
              <TextField
                required
                fullWidth
                id="email"
                placeholder="your@email.com"
                name="email"
                autoComplete="email"
                variant="outlined"
                error={Boolean(validationErrors.email) || emailError}
                helperText={validationErrors.email || emailErrorMessage}
                color={newPasswordError ? "error" : "primary"}
              />
            </FormControl>
            <FormControl>
              <FormLabel htmlFor="new-password">Password</FormLabel>
              <TextField
                required
                fullWidth
                name="new-password"
                placeholder="••••••"
                type="password"
                id="new-password"
                variant="outlined"
                error={
                  Boolean(validationErrors["new-password"]) || newPasswordError
                }
                helperText={
                  validationErrors["new-password"] || newPasswordErrorMessage
                }
                color={newPasswordError ? "error" : "primary"}
              />
            </FormControl>
            <FormControl>
              <FormLabel htmlFor="confirm-password">Confirm Password</FormLabel>
              <TextField
                required
                fullWidth
                name="confirm-password"
                placeholder="••••••"
                type="password"
                id="confirm-password"
                variant="outlined"
                error={
                  Boolean(validationErrors["confirm-password"]) ||
                  confirmPasswordError
                }
                helperText={
                  validationErrors["confirm-password"] ||
                  confirmPasswordErrorMessage
                }
                color={confirmPasswordError ? "error" : "primary"}
              />
            </FormControl>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              onClick={validateInputs}
            >
              Sign up
            </Button>
          </Box>
          <Divider>
            <Typography sx={{ color: "text.secondary" }}>or</Typography>
          </Divider>
          <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
            <Button
              fullWidth
              variant="outlined"
              onClick={() => alert("Sign up with GitHub")}
              startIcon={<GitHubIcon />}
            >
              Sign up with GitHub
            </Button>
            <Typography sx={{ textAlign: "center" }}>
              Already have an account?{" "}
              <Link
                href="/signin/"
                variant="body2"
                sx={{ alignSelf: "center" }}
              >
                Sign in
              </Link>
            </Typography>
          </Box>
        </Card>
      </SignUpContainer>
    </AppTheme>
  );
}
