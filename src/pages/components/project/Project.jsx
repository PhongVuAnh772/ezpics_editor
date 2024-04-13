import React, { useState } from "react";
import { styled, useTheme } from "@mui/material/styles";
import {
  BrowserRouter as Router,
  Route,
  Link,
  Routes,
  useLocation,
  Outlet,
  useOutletContext,
  NavLink,
  useNavigate,
} from "react-router-dom";
import Box from "@mui/material/Box";
import { Tab, TabList, TabPanel, Tabs } from "./tabs.jsx";

import "./Project.css";
// import backgroundHeader from
function Project() {
  const navigate = useNavigate();
  const location = useLocation();

  React.useEffect(() => {
    navigate("recommend");
  }, []);

  // Get the current route
  const currentRoute = location.pathname.split("/").pop();
  const open = useOutletContext();
  const [active, setActive] = useState("tab1");

  const drawerWidth = 240;

  const Main = styled("main")(({ theme }) => ({
    // flexGrow: 1,
    // padding: theme.spacing(3),
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
    }),
  }));
  return (
    <Main
      open={open}
      style={{ paddingTop: "6%", paddingLeft: "2%", paddingRight: "2%" }}
    >
      <Box
        style={{
          background: "rgb(231, 246, 246)",
          width: "100%",
          height: 300,
          borderRadius: 15,
          display: "flex",
          alignItems: "center",
          flexDirection: "row",
          position: "relative",
          marginBottom: "10px",
        }}
      >
        <div className="project-header__advertisement">
          <p className="project-header__advertisement---textHeader">
            Bắt đầu giàu cảm hứng với Ezpics
          </p>
          <p className="project-header__advertisement---textContent">
            Với hàng nghìn mẫu thiết kế độc đáo, hãy thổi hồn cho ý tưởng và tác
            phẩm tuyệt vời nhất của bạn.
          </p>
        </div>
        <img src="" alt="" className="project-header__img" />
      </Box>
      <Tabs>
        <TabList aria-label="Groceries">
          <Tab to="recommend">Được đề xuất</Tab>
          <Tab to="youtube">Thumbnail Youtube</Tab>
          <Tab to="cooking">Sự kiện</Tab>
          <Tab to="logo">Logo</Tab>
          <Tab to="congrat">Vinh danh</Tab>
          <Tab to="banner">Banner</Tab>
          <Tab to="more">Xem thêm</Tab>
        </TabList>
        <div className="panels">
          <TabPanel>
            <Outlet />
          </TabPanel>
        </div>
      </Tabs>
    </Main>
  );
}

export default Project;
