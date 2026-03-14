import * as React from "react";
import { useNavigate } from "react-router";

import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";

export default function BasicMenu() {
  const navigate = useNavigate();

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    console.log("in handleClose")
    setAnchorEl(null);
  };
  const handleSignUp = () => {
    console.log("in handleSignUp")
    handleClose();
    navigate("/signup");
  }
  const handleSignIn = () => {
    handleClose();
    navigate("/signin");
  };
  return (
    <div>
      <Button
        id="basic-button"
        aria-controls={open ? "basic-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
      >
        Go to ChinWag
      </Button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        slotProps={{
          list: {
            "aria-labelledby": "basic-button",
          },
        }}
      >
        <MenuItem onClick={handleSignUp}>Sign Up</MenuItem>
        <MenuItem onClick={handleSignIn}>Sign In</MenuItem>
        <MenuItem onClick={handleClose}>Github Readme</MenuItem>
      </Menu>
    </div>
  );
}
