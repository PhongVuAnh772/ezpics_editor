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
import paintSticker from './paint-sticker.png'

import "./Project.css";
// import backgroundHeader from
function CollectionAll() {
  const navigate = useNavigate();
  const location = useLocation();

  React.useEffect(() => {
    navigate("purchase-collection");
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
          // marginBottom: "10px",
        }}
      >
        <div className="project-header__advertisement">
          <p className="project-header__advertisement---textHeader">
            Hãy thổi hồn vào các mẫu thiết kế của bạn 
          </p>
          <p className="project-header__advertisement---textContent">
            Không chỉ là mẫu thiết kế, mà là một phần của cuộc sống hiện đại, thể hiện sự cá nhân hóa và gu thẩm mỹ của bạn
          </p>
        </div>
        <img src={paintSticker} alt="" className="project-header__img---your-design" />
      </Box>
      <Tabs>
        <TabList aria-label="Groceries">
          <Tab to="purchase-collection">Kho mua</Tab>
          <Tab to="sale-collection">Kho bán</Tab>
          
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

export default CollectionAll;
