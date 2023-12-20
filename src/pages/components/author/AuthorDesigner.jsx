import React from 'react'
import { styled, useTheme } from "@mui/material/styles";
import {
  BrowserRouter as Router,
  Route,
  Link,
  Routes,
  useLocation,
  Outlet,
  useOutletContext,
} from "react-router-dom";

function AuthorDesigner() {
  const open = useOutletContext();

  const drawerWidth = 240;
  const Main = styled("main")(({ theme }) => ({
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    // marginLeft: `-${drawerWidth}px`,
    ...(open && {
      transition: theme.transitions.create("margin", {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginLeft: `${drawerWidth}px`,
      display: "flex",
      flexDirection: "row",
      minHeight: "100%",
      flex: 1,
    }),
  }));
  return (
    <Main
      open={open}
      sx={{
        paddingTop: "7%",
        display: "flex",
        flexDirection: "row",
        minHeight: "100%",
        flex: 1,
      }}
    >
      
    </Main>
  )
}

export default AuthorDesigner