import { AppBar, Box, Toolbar, Typography } from "@mui/material";
import React from "react";
import { NavLink } from "react-router-dom";
import "../App.css";

function Header() {
  const backColor="orangered";
  return (
    <>
      <Box sx={{ margin: "35px", display: "flex" }}>
        <AppBar sx={{ background:backColor }} color={undefined}  component="nav">
          <Toolbar>
            <Typography
              variant="h6"
              component="div"
              sx={{ flexGrow: 1, display: { xs: "none", sm: "block" } }}
            >
              My Task
            </Typography>
            <Box
              className="nav-link-wrraper"
              sx={{ display: { xs: "none", sm: "block" } }}
            >
              <NavLink to="/" className="nav-link">
                DATA TABLE
              </NavLink>
              <NavLink to="/create_usr" className="nav-link">
                CREATE USER
              </NavLink>
            </Box>
          </Toolbar>
        </AppBar>
      </Box>
    </>
  );
}

export default Header;
