import React,{useEffect } from "react";
import Widget from "./Widget";
import Chart from "./Chart";
import Table from "./Table";
import Featured from "./Featured";
import { styled, useTheme } from "@mui/material/styles";
import "./TransactionHistory.scss";
import {
  BrowserRouter as Router,
  Route,
  Link,
  Routes,
  useLocation,
  Outlet,
  useOutletContext,
  useNavigate,
  Navigate,
  useParams,
} from "react-router-dom";
import { Tab, TabList, TabPanel, Tabs } from "./tabs.jsx";

function TransactionHistory() {
  const navigate = useNavigate()
  useEffect(() => {
    navigate('table-1')
  }, [])
  
  const open = useOutletContext();
  const drawerWidth = 240;

  const Main = styled("main")(({ theme }) => ({
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
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
      style={{
        backgroundColor: "white",
        paddingTop: "7%",
        flex: 1,
        paddingRight: "5%",
        paddingLeft: "5%",
      }}
    >
      <div style={{ display: "flex", flexDirection: "row" }}>
        <Chart title="Thống kê" aspect={2 / 1} />
        <div
          className="widgets"
          style={{
            display: "flex",
            flexDirection: "column",
            width: "50%",
            paddingLeft: "3%",
          }}
        >
          <Widget type="user" />
          <Widget type="order" />
          <Widget type="earning" />
        </div>
      </div>
      <Tabs style={{marginTop: '5%'}}>
        <TabList aria-label="Groceries" style={{marginTop: '1%'}}>
          <Tab to="table-1">Giao dịch tiền mặt</Tab>
          <Tab to="table-2">Giao dịch Ecoin</Tab>          
        </TabList>
        <div className="panels">
          <TabPanel>
            <Outlet />
          </TabPanel>
        </div>
      </Tabs>
      <div
        className="listContainer"
        style={{ display: "flex", flexDirection: "row", width: "100%",paddingTop: '5%' }}
      >
        <Outlet />
      </div>
    </Main>
  );
}

export default TransactionHistory;
