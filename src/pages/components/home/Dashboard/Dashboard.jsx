import React, { useRef, useState, useEffect } from "react";
import { styled, useTheme } from "@mui/material/styles";
import {
  BrowserRouter as Router,
  Route,
  Link,
  Routes,
  useLocation,
  Outlet,
  useOutletContext,
  useNavigate
} from "react-router-dom";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import CssBaseline from "@mui/material/CssBaseline";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import InputBase from "@mui/material/InputBase";
import Badge from "@mui/material/Badge";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import AccountCircle from "@mui/icons-material/AccountCircle";
import NotificationsIcon from "@mui/icons-material/Notifications";
import MoreIcon from "@mui/icons-material/MoreVert";
import Button from "@mui/material/Button";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import Tooltip from "@mui/material/Tooltip";
import Avatar from "@mui/material/Avatar";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import NotificationsActiveOutlinedIcon from "@mui/icons-material/NotificationsActiveOutlined";
import MonitorOutlinedIcon from "@mui/icons-material/MonitorOutlined";
import TextField from "@mui/material/TextField";
import Paper from "@mui/material/Paper";
import DirectionsIcon from "@mui/icons-material/Directions";
import ForYouPage from "../ForYou/ForYouPage";
import ForYouIcon from "../../../assets/ForYouIcon";
import DosIcon from "../../../assets/DosIcon";
import ContentIcon from "../../../assets/ContentIcon";
import FormatIcon from "../../../assets/FormatIcon";
import VideoIcon from "../../../assets/VideoIcon";
import WebIcon from "../../../assets/WebIcon";
import TemplateIcon from "../../../assets/TemplateIcon";
import MoreIcons from "../../../assets/MoreIcon";
import PageIcon from "../../../assets/PageIcon";
import crownIcon from "../../../assets/crownIcon";
import axios from "axios";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { useAppSelector, useAppDispatch } from "../../../../hooks/hook.ts";

import { useSelector, useDispatch } from "react-redux";
function Dashboard() {
    const navigate = useNavigate();

  const open = useOutletContext();
  const drawerWidth = 240;
  const location = useLocation();
  const linkRefs = useRef({});
  const activePath = location.pathname;
  const network = useSelector((state) => state.ipv4.network);
  const [searchText, setSearchText] = React.useState("");
  const [loadingSearch, setLoadingSearch] = React.useState(false);
  const [indicatorPosition, setIndicatorPosition] = useState({ left: "5%" });
  const [dataWarehouse, setDataWarehouse] = React.useState([]);
  const [enableButtonClear, setEnableButtonClear] = React.useState(false);
  const [clickedOnDataWarehouse, setClickedOnDataWarehouse] = React.useState(false);
  const handleUlSelect = (position) => {
    setIndicatorPosition({ left: position });
  };
  const onChange = (event) => {
    // console.log(event.target.value);
    setSearchText(event.target.value);
    setEnableButtonClear(true);
    setLoadingSearch(true);
    console.log(searchText === "");

    if (event.target.value === "") {
      setEnableButtonClear(false);
      setLoadingSearch(false);
    } else {
      fetchProUser();
      setEnableButtonClear(true);
      setLoadingSearch(true);
    }
    setTimeout(() => {
      setLoadingSearch(false);
    }, 1500);
  };
  const onChangeClear = () => {
    setSearchText("");
    setEnableButtonClear(false);
  };
  useEffect(() => {
    const getData = async () => {
      try {
        const response = await axios.post(`${network}/getTrendProductAPI`, {
          limit: 30,
        });
        if (response && response.data && response.data.listData) {
          // setData(response.data.listData);
        } else {
          console.error("Invalid response format");
        }
      } catch (error) {
        console.error("Error fetching data:", error.message);
      }
    };

    getData();
  }, []);
  const networkAPI = useAppSelector((state) => state.network.ipv4Address);

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
    }),
  }));
  const fetchProUser = async () => {
    try {
      const response = await axios.post(`${networkAPI}/searchProductAPI`, {
        limit: 5,
        page: 1,
        name: searchText,
      });
      if (response.data.listData && response.data) {
        console.log(response.data.listData);
        // setDataWarehouse(response.data.data);
        setDataWarehouse(response.data.listData);
      }
    } catch (error) {
      toast.error("Lỗi lấy thông tin khách hàng", {
        position: "top-left",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
      setLoading(false);
    }
  };

  const [isHovered, setIsHovered] = useState(false);
  const handleHover = () => {
    setIsHovered(true);
  };

  const handleLeave = () => {
    setIsHovered(false);
  };
  return (
    <div style={{ paddingTop: "6%", paddingRight: "2%", paddingLeft: "18%" }}>
      {/* <DrawerHeader /> */}

      <Box
        style={{
          background:
            "linear-gradient(63deg, rgba(253,208,46,1) 40%, rgba(250,226,139,1) 100%)",
          width: "100%",
          height: 300,
          borderRadius: 20,
          display: "flex",
          alignItems: "center",
          flexDirection: "column",
          position: "relative",
          marginBottom: "10px",
        }}
      >
        <h1
          style={{
            fontFamily:
              "Noto Sans Vietnamese,-apple-system,BlinkMacSystemFont,Segoe UI,Helvetica,Arial,sans-serif",
            color: "white",
            fontSize: "2.2rem",
          }}
        >
          Bạn muốn thiết kế gì ?
        </h1>
        <Paper
          component="form"
          sx={{
            p: "2px 4px",
            display: "flex",
            alignItems: "center",
            width: 700,
            marginTop: "10px",
            position: "relative",
            
          }}
          onBlur={() => {
            if (!clickedOnDataWarehouse) {
      setEnableButtonClear(false);
    }
          }}
        >
          <IconButton sx={{ p: "10px" }} aria-label="menu" style={{}}>
            <SearchIcon />
          </IconButton>
          <InputBase
            sx={{ ml: 1, flex: 1 }}
            placeholder="Tìm kiếm nội dung trên Ezpics"
            onChange={onChange}
            value={searchText}
            
            // inputProps={{ 'aria-label': 'search google maps' }}
          />
          {enableButtonClear && (
            <div
              style={{
                width: 700,
                position: "absolute",
                bottom: loadingSearch && dataWarehouse.length > 0 ? -150 : -225,
                left: 0,
                height: loadingSearch && dataWarehouse.length > 0 ? 150 : 230,
                boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
                paddingTop: 10,
                paddingLeft: 15,
                alignItems: loadingSearch ? "flex-start" : "center",
                backgroundColor: "white",
                cursor: "pointer",
                zIndex: 9999999999999,
              }}
               onMouseEnter={() => setClickedOnDataWarehouse(true)}
      onMouseLeave={() => setClickedOnDataWarehouse(false)}
            >
              {loadingSearch ? (
                <>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      width: "100%",
                      alignItems: "center",
                      paddingTop: 5,
                      cursor: "pointer",
                    }}
                  >
                    <Skeleton height={30} width={30} />
                    <Skeleton
                      height={14}
                      width={310}
                      style={{ marginLeft: 20 }}
                    />
                  </div>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      width: "100%",
                      alignItems: "center",
                      paddingTop: 10,
                    }}
                  >
                    <Skeleton height={30} width={30} />
                    <Skeleton
                      height={14}
                      width={310}
                      style={{ marginLeft: 20 }}
                    />
                  </div>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      width: "100%",
                      alignItems: "center",
                      paddingTop: 10,
                    }}
                  >
                    <Skeleton height={30} width={30} />
                    <Skeleton
                      height={14}
                      width={310}
                      style={{ marginLeft: 20 }}
                    />
                  </div>
                </>
              ) : (
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    cursor: "pointer",
                    zIndex: 9999999999999,
                  }}
                  onClick={() => console.log(dataWarehouse)}
                >
                  {dataWarehouse.length > 0 ? (
                    <>
                      {dataWarehouse.map((data, index) => (
                        <div
                          style={{
                            width: "100%",
                            height: 40,
                            display: "flex",
                            flexDirection: "row",
                            alignItems: "center",
                          }}
                          onClick={() => {
                navigate(`/category/${data.id}`);
                // console.log(item)
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
                        >
                          <img
                            src={data.thumbnail}
                            alt=""
                            style={{ width: 40, height: "auto" }}
                          />
                          <p style={{ paddingLeft: 20 }}>{data.name}</p>
                        </div>
                      ))}
                    </>
                  ) : (
                    <>
                      <p>Không tìm thấy sản phẩm</p>
                    </>
                  )}
                </div>
              )}
            </div>
          )}
        </Paper>

        <ul
          style={{
            textDecoration: "none",
            listStyleType: "none",
            display: "flex",
            flexDirection: "row",
            width: "100%",
            justifyContent: "space-around",
            paddingTop: "25px",
            paddingLeft: "50px",
            paddingRight: "50px",
            position: "relative",
          }}
        >
          <li style={{}}>
            <Link
              to="/"
              style={{
                display: "flex",
                textDecoration: "none",
                width: "100%",
                alignItems: "center",
                paddingLeft: 10,

                fontSize: "16px",
                color: "rgb(13, 18, 22)",
                lineHeight: "22px",
                flexDirection: "column",
              }}
              onClick={() => handleUlSelect("5%")}
            >
              {/* <CottageOutlinedIcon style={{ marginRight: 5 }} /> */}
              {/* <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  width: 45,
                  height: 45,
                  borderRadius: "50%",
                  padding: 10,
                  backgroundColor: "white",
                }}
                onMouseEnter={(e) =>
                  (e.target.style.backgroundColor = "rgb(69, 86, 239)")
                }
                onMouseLeave={(e) => (e.target.style.backgroundColor = "white")}
              > */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="35"
                height="35"
                viewBox="0 0 32 32"
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  width: 45,
                  height: 45,
                  borderRadius: "50%",
                  padding: 10,
                  backgroundColor: "white",
                  transition: "background-color 0.3s, fill 0.3s",
                }}
                onMouseEnter={(e) => {
                  const pathElement = e.target.querySelector("path");
                  if (pathElement) {
                    pathElement.style.fill = "white";
                    e.target.style.backgroundColor = "rgb(69, 86, 239)";
                  }
                }}
                onMouseLeave={(e) => {
                  const pathElement = e.target.querySelector("path");
                  if (pathElement) {
                    pathElement.style.fill = "rgb(69, 86, 239)";
                    e.target.style.backgroundColor = "white";
                  }
                }}
              >
                <path
                  d="M11.26 7.49c0-.36-.35-.45-.35-.45-1.55-.49-2.49-1.43-2.98-2.99 0 0-.06-.34-.45-.34-.38 0-.44.34-.44.34-.49 1.56-1.42 2.5-2.98 2.99 0 0-.35.09-.35.45s.35.45.35.45c1.56.49 2.49 1.43 2.98 2.99 0 0 .06.34.45.34.38-.01.45-.34.45-.34.49-1.56 1.42-2.5 2.98-2.99 0 .01.34-.08.34-.45 0 .01 0 .01 0 0zm17.06 8.46c0-.53-.44-.88-.94-1 0 0-3.96-1.34-5.43-2.25-.98-.48-1.91-1.45-2.5-2.41v.01c-.89-1.16-2.39-5.73-2.39-5.73-.18-.59-.52-.93-1.05-.94v.04L16 3.63c-.53 0-.88.44-1 .94 0 0-1.34 3.96-2.25 5.43-.48.98-1.45 1.91-2.41 2.5h.01c-1.16.89-5.73 2.39-5.73 2.39-.59.18-.93.52-.94 1.05l.06.01h-.06c0 .53.44.88.94 1 0 0 3.96 1.34 5.43 2.25.98.48 1.91 1.45 2.5 2.41v-.01c.89 1.16 2.39 5.73 2.39 5.73.18.59.52.93 1.05.94l.01-.07.01.07c.53 0 .88-.44 1-.94 0 0 1.34-3.96 2.25-5.43.48-.98 1.45-1.91 2.41-2.5h-.01c1.16-.89 5.73-2.39 5.73-2.39.59-.18.93-.52.94-1.05l-.08-.01h.07zm-.26 8.99c-.47-.24-.92-.58-1.31-.97s-.73-.85-.97-1.31c0 0-.11-.24-.39-.24s-.39.24-.39.24c-.24.47-.58.92-.97 1.31s-.85.73-1.31.97c0 0-.24.11-.24.39s.24.39.24.39c.47.24.92.58 1.31.97s.73.85.97 1.31c0 0 .11.24.39.24s.39-.24.39-.24c.24-.47.58-.92.97-1.31s.85-.73 1.31-.97c0 0 .24-.11.24-.39s-.24-.39-.24-.39z"
                  fill="rgb(69, 86, 239)"
                ></path>
              </svg>
              {/* </div> */}

              <span
                style={{
                  marginTop: "5px",
                  fontFamily:
                    "Noto Sans Vietnamese,-apple-system,BlinkMacSystemFont,Segoe UI,Helvetica,Arial,sans-serif",
                  fontSize: "13px",
                  color: "white",
                  fontWeight: 600,
                }}
              >
                Cho bạn
              </span>
            </Link>
          </li>
          <li style={{}}>
            <Link
              to="/banner"
              style={{
                display: "flex",
                textDecoration: "none",
                width: "100%",
                alignItems: "center",
                paddingLeft: 10,

                fontSize: "16px",
                color: "rgb(13, 18, 22)",
                lineHeight: "22px",
                flexDirection: "column",
              }}
              onClick={() => handleUlSelect("14%")}
            >
              {/* <CottageOutlinedIcon style={{ marginRight: 5 }} /> */}{" "}
              {/* <DosIcon color="rgb(15, 184, 206)" />
               */}
              <svg
                width="32"
                height="32"
                viewBox="0 0 32 32"
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  width: 45,
                  height: 45,
                  borderRadius: "50%",
                  padding: 10,
                  backgroundColor: "white",
                  transition: "background-color 0.3s, fill 0.3s",
                }}
                xmlns="http://www.w3.org/2000/svg"
                onMouseEnter={(e) => {
                  const pathElement = e.target.querySelector("path");
                  if (pathElement) {
                    pathElement.style.fill = "white";
                    e.target.style.backgroundColor = "rgb(15, 184, 206)";
                  }
                }}
                onMouseLeave={(e) => {
                  const pathElement = e.target.querySelector("path");
                  if (pathElement) {
                    pathElement.style.fill = "rgb(15, 184, 206)";
                    e.target.style.backgroundColor = "white";
                  }
                }}
              >
                <path
                  d="M26.605 7.924c-.032-1.265-.746-2.4-1.784-3.113-.616-.422-1.362-.714-2.14-.714C20.67 4 18.627 4 16.584 4H13.47c-.032 0-.065.032-.097.032-1.362 0-2.724.033-4.087.065-2.043.065-3.794 1.817-3.892 3.827-.032 1.33-.097 5.74-.097 6.52 0 .745-.032 1.524 0 2.27 0 2.464.033 4.93.097 7.394.033 1.265.746 2.4 1.784 3.114.616.421 1.362.713 2.14.713C11.33 28 13.374 28 15.417 28h3.114c.032 0 .064-.032.097-.032 1.362 0 2.724-.033 4.086-.065 2.044-.065 3.795-1.816 3.892-3.827.033-1.33.033-2.692.065-4.022 0-.032.032-.097.032-.13v-2.367c0-.746.033-1.525 0-2.27 0-2.465-.032-4.898-.097-7.363Zm-15.373 7.46c.714 0 1.33.584 1.33 1.297 0 .714-.584 1.297-1.33 1.297-.713 0-1.33-.583-1.33-1.297 0-.713.584-1.297 1.33-1.297ZM9.935 12.95c0-.713.584-1.297 1.33-1.297h9.47c.746 0 1.33.584 1.33 1.297 0 .714-.584 1.298-1.33 1.298h-9.47c-.746.032-1.33-.552-1.33-1.298ZM20.832 23.46H11.135c-1.135 0-1.557-1.07-.973-1.945l1.297-1.979c.552-.875 1.979-.875 2.53 0l.616.94 2.011-3.08c.551-.876 1.978-.876 2.53 0l2.66 4.119c.583.875.129 1.945-.974 1.945Zm-.097-12.94h-9.503c-.746 0-1.33-.584-1.33-1.297 0-.714.584-1.298 1.33-1.298h9.503c.746 0 1.33.584 1.33 1.298 0 .713-.584 1.297-1.33 1.297Z"
                  fill="rgb(15, 184, 206)"
                ></path>
              </svg>
              <span
                style={{
                  marginTop: "5px",
                  fontFamily:
                    "Noto Sans Vietnamese,-apple-system,BlinkMacSystemFont,Segoe UI,Helvetica,Arial,sans-serif",
                  fontSize: "13px",
                  color: "white",
                  fontWeight: 600,
                }}
              >
                Logo
              </span>
            </Link>
          </li>
          <li style={{}}>
            <Link
              to="/social-media"
              style={{
                display: "flex",
                textDecoration: "none",
                width: "100%",
                alignItems: "center",
                paddingLeft: 10,

                fontSize: "16px",
                color: "rgb(13, 18, 22)",
                lineHeight: "22px",
                flexDirection: "column",
              }}
              onClick={() => handleUlSelect("23.85%")}
            >
              {/* <CottageOutlinedIcon style={{ marginRight: 5 }} /> */}

              <svg
                width="32"
                height="32"
                viewBox="0 0 32 32"
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  width: 45,
                  height: 45,
                  borderRadius: "50%",
                  padding: 10,
                  backgroundColor: "white",
                  transition: "background-color 0.3s, fill 0.3s",
                }}
                xmlns="http://www.w3.org/2000/svg"
                onMouseEnter={(e) => {
                  const pathElement = e.target.querySelector("path");
                  if (pathElement) {
                    pathElement.style.fill = "white";
                    e.target.style.backgroundColor = "rgb(33, 166, 99)";
                  }
                }}
                onMouseLeave={(e) => {
                  const pathElement = e.target.querySelector("path");
                  if (pathElement) {
                    pathElement.style.fill = "rgb(33, 166, 99)";
                    e.target.style.backgroundColor = "white";
                  }
                }}
              >
                <path
                  d="M26.487 6.237C25.099 4.85 22.693 4.85 18.066 4.85h-3.98c-4.719 0-7.032 0-8.513 1.48C4 7.81 4 10.125 4 14.844v2.314c0 4.72 0 7.033 1.48 8.513 1.481 1.48 3.795 1.48 8.514 1.48h3.98c4.719 0 7.032 0 8.513-1.48 1.48-1.48 1.48-3.886 1.48-8.606v-2.313c.093-4.627.093-7.126-1.48-8.514ZM12.174 23.603H8.596c-.617 0-1.08-.493-1.08-1.08v-3.577H9.8v2.406h2.406v2.252h-.03ZM24.39 10.648v2.406h-2.282v-2.406H19.7V8.366h3.609c.586 0 1.048.493 1.08 1.08v1.202Z"
                  fill={"rgb(33, 166, 99)"}
                ></path>
              </svg>
              <span
                style={{
                  marginTop: "5px",
                  fontFamily:
                    "Noto Sans Vietnamese,-apple-system,BlinkMacSystemFont,Segoe UI,Helvetica,Arial,sans-serif",
                  fontSize: "13px",
                  color: "white",
                  fontWeight: 600,
                }}
              >
                Mạng xã hội
              </span>
            </Link>
          </li>
          <li style={{}}>
            <Link
              to="/live-stream"
              style={{
                display: "flex",
                textDecoration: "none",
                width: "100%",
                alignItems: "center",
                paddingLeft: 10,

                fontSize: "16px",
                color: "rgb(13, 18, 22)",
                lineHeight: "22px",
                flexDirection: "column",
              }}
              onClick={() => handleUlSelect("34.5%")}
            >
              {/* <CottageOutlinedIcon style={{ marginRight: 5 }} /> */}

              <svg
                width="32"
                height="32"
                viewBox="0 0 32 32"
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  width: 45,
                  height: 45,
                  borderRadius: "50%",
                  padding: 10,
                  backgroundColor: "white",
                  transition: "background-color 0.3s, fill 0.3s",
                }}
                xmlns="http://www.w3.org/2000/svg"
                onMouseEnter={(e) => {
                  const pathElement = e.target.querySelector("path");
                  if (pathElement) {
                    pathElement.style.fill = "white";
                    e.target.style.backgroundColor = "rgb(210, 105, 230)";
                  }
                }}
                onMouseLeave={(e) => {
                  const pathElement = e.target.querySelector("path");
                  if (pathElement) {
                    pathElement.style.fill = "rgb(210, 105, 230)";
                    e.target.style.backgroundColor = "white";
                  }
                }}
              >
                <path
                  d="m25.834 10.931-2.946 2.109c-.029-.982-.029-1.993-.029-2.975-.058-1.82-1.617-3.38-3.437-3.437a204.296 204.296 0 0 0-11.899 0c-1.819.058-3.379 1.617-3.436 3.437a203.323 203.323 0 0 0 0 11.87c.057 1.82 1.617 3.38 3.436 3.437 3.957.115 7.914.115 11.9 0 1.819-.058 3.378-1.617 3.436-3.437.03-.982.03-1.993.03-2.975l2.945 2.08c1.184.837 2.166.346 2.166-1.098V12.03c-.029-1.444-.982-1.964-2.166-1.098Zm-9.386 6.354-4.65 2.686c-1.27.722-2.282.116-2.282-1.328v-5.315c0-1.444 1.04-2.05 2.282-1.328l4.679 2.686c1.241.722 1.241 1.877-.03 2.6Z"
                  fill="rgb(210, 105, 230)"
                ></path>
              </svg>
              <span
                style={{
                  marginTop: "5px",
                  fontFamily:
                    "Noto Sans Vietnamese,-apple-system,BlinkMacSystemFont,Segoe UI,Helvetica,Arial,sans-serif",
                  fontSize: "13px",
                  color: "white",
                  fontWeight: 600,
                }}
              >
                LiveStream
              </span>
            </Link>
          </li>
          <li style={{}}>
            <Link
              to="/gift"
              style={{
                display: "flex",
                textDecoration: "none",
                width: "100%",
                alignItems: "center",
                paddingLeft: 10,

                fontSize: "16px",
                color: "rgb(13, 18, 22)",
                lineHeight: "22px",
                flexDirection: "column",
              }}
              onClick={() => handleUlSelect("45.5%")}
            >
              {/* <CottageOutlinedIcon style={{ marginRight: 5 }} /> */}

              <svg
                width="32"
                height="32"
                viewBox="0 0 32 32"
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  width: 45,
                  height: 45,
                  borderRadius: "50%",
                  padding: 10,
                  backgroundColor: "white",
                  transition: "background-color 0.3s, fill 0.3s",
                }}
                xmlns="http://www.w3.org/2000/svg"
                onMouseEnter={(e) => {
                  const pathElement = e.target.querySelector("path");
                  if (pathElement) {
                    pathElement.style.fill = "white";
                    e.target.style.backgroundColor = "rgb(165, 72, 255)";
                  }
                }}
                onMouseLeave={(e) => {
                  const pathElement = e.target.querySelector("path");
                  if (pathElement) {
                    pathElement.style.fill = "rgb(165, 72, 255)";
                    e.target.style.backgroundColor = "white";
                  }
                }}
              >
                <path
                  d="M27.979 13.771c-.064-2.02-1.796-3.784-3.816-3.848h-.032V7.422a.757.757 0 0 0-.225-.513l-2.533-2.534a.757.757 0 0 0-.513-.224H10.085a2.217 2.217 0 0 0-2.213 2.213v3.56H7.84c-2.02.063-3.784 1.827-3.816 3.847a285.195 285.195 0 0 0 0 7.408c.064 2.02 1.796 3.784 3.816 3.848h.032v.61c0 1.218.994 2.212 2.213 2.212h11.801a2.217 2.217 0 0 0 2.213-2.212v-.61h.032c2.02-.064 3.784-1.828 3.816-3.848.064-1.956.064-5.42.032-7.408ZM9.155 17.844c-.481-.032-.93-.449-.93-.93a16.777 16.777 0 0 1 0-1.796c.032-.48.449-.93.93-.93.61-.032 1.187-.032 1.796 0 .48.032.93.45.93.93.032.61.032 1.187 0 1.796-.032.481-.45.93-.93.93a16.81 16.81 0 0 1-1.796 0Zm12.699 7.023a.746.746 0 0 1-.738.738h-10.23a.746.746 0 0 1-.737-.738v-2.149h11.705v2.149Zm0-13.308H10.117V7.133c0-.417.353-.737.738-.737h8.08v2.886h2.887v2.277h.032Z"
                  fill={"rgb(165, 72, 255)"}
                ></path>
              </svg>
              <span
                style={{
                  marginTop: "5px",
                  fontFamily:
                    "Noto Sans Vietnamese,-apple-system,BlinkMacSystemFont,Segoe UI,Helvetica,Arial,sans-serif",
                  fontSize: "13px",
                  color: "white",
                  fontWeight: 600,
                }}
              >
                Thẻ quà tặng
              </span>
            </Link>
          </li>
          <li style={{}}>
            <Link
              to="/endow"
              style={{
                display: "flex",
                textDecoration: "none",
                width: "100%",
                alignItems: "center",
                paddingLeft: 10,

                fontSize: "16px",
                color: "rgb(13, 18, 22)",
                lineHeight: "22px",
                flexDirection: "column",
              }}
              onClick={() => handleUlSelect("55.5%")}
            >
              {/* <CottageOutlinedIcon style={{ marginRight: 5 }} /> */}
              {/* <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  width: 45, // Đặt chiều rộng và chiều cao cùng một giá trị để tạo hình tròn
                  height: 45,
                  borderRadius: "50%", // Đặt border-radius thành 50% để tạo hình tròn
                  padding: 10,
                  backgroundColor: "white",
                }}
              >
                <PageIcon color="rgb(255, 81, 84)" />
              </div> */}
              <svg
                width="30"
                height="30"
                viewBox="0 0 30 30"
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  width: 45,
                  height: 45,
                  borderRadius: "50%",
                  padding: 10,
                  backgroundColor: "white",
                  transition: "background-color 0.3s, fill 0.3s",
                }}
                xmlns="http://www.w3.org/2000/svg"
                onMouseEnter={(e) => {
                  const pathElement = e.target.querySelector("path");
                  if (pathElement) {
                    pathElement.style.fill = "white";
                    e.target.style.backgroundColor = "rgb(255, 81, 84)";
                  }
                }}
                onMouseLeave={(e) => {
                  const pathElement = e.target.querySelector("path");
                  if (pathElement) {
                    pathElement.style.fill = "rgb(255, 81, 84)";
                    e.target.style.backgroundColor = "white";
                  }
                }}
              >
                <path
                  d="M27.928 8.7c-.095-2.004-1.813-3.722-3.817-3.817-5.344-.191-10.783-.191-16.222 0-2.004.095-3.722 1.813-3.817 3.817-.096 3.435-.096 6.87 0 10.306.095 2.004 1.813 3.722 3.817 3.817 1.336 0 2.672 0 4.008.095l2.385 3.34c.955 1.336 2.481 1.336 3.436 0l2.385-3.34c1.336 0 2.672 0 4.008-.095 2.004-.095 3.722-1.813 3.817-3.817.096-3.467.096-6.903 0-10.306Zm-6.234 5.216a3.522 3.522 0 0 1-.445.923c-.287.509-1.464 2.131-4.581 4.421h-1.304c-2.418-1.78-3.658-3.149-4.23-3.912a5.85 5.85 0 0 1-.287-.382v-.032l-.032-.031a2.693 2.693 0 0 1-.477-.955 2.726 2.726 0 0 1-.16-.859c0-.19.033-.35.064-.508.128-.668.446-1.241.891-1.686a2.93 2.93 0 0 1 2.1-.86c1.208 0 2.258.732 2.735 1.75H16a3.042 3.042 0 0 1 2.736-1.75 3.054 3.054 0 0 1 3.053 3.054c.032.287-.032.573-.095.827Z"
                  fill={"rgb(255, 81, 84)"}
                ></path>
              </svg>
              <span
                style={{
                  marginTop: "5px",
                  fontFamily:
                    "Noto Sans Vietnamese,-apple-system,BlinkMacSystemFont,Segoe UI,Helvetica,Arial,sans-serif",
                  fontSize: "13px",
                  color: "white",
                  fontWeight: 600,
                }}
              >
                Ưu đãi
              </span>
            </Link>
          </li>
          <li style={{}}>
            <Link
              to="/congratulation"
              style={{
                display: "flex",
                textDecoration: "none",
                width: "100%",
                alignItems: "center",
                paddingLeft: 10,

                fontSize: "16px",
                color: "rgb(13, 18, 22)",
                lineHeight: "22px",
                flexDirection: "column",
              }}
              onClick={() => handleUlSelect("66.5%")}
            >
              {/* <CottageOutlinedIcon style={{ marginRight: 5 }} /> */}

              <svg
                width="30"
                height="30"
                viewBox="0 0 30 30"
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  width: 45,
                  height: 45,
                  borderRadius: "50%",
                  padding: 10,
                  backgroundColor: "white",
                  transition: "background-color 0.3s, fill 0.3s",
                }}
                xmlns="http://www.w3.org/2000/svg"
                onMouseEnter={(e) => {
                  const pathElement = e.target.querySelector("path");
                  if (pathElement) {
                    pathElement.style.fill = "white";
                    e.target.style.backgroundColor = "rgb(87, 94, 253)";
                  }
                }}
                onMouseLeave={(e) => {
                  const pathElement = e.target.querySelector("path");
                  if (pathElement) {
                    pathElement.style.fill = "rgb(87, 94, 253)";
                    e.target.style.backgroundColor = "white";
                  }
                }}
              >
                <path
                  d="M26.485 6.24c-1.39-1.39-3.798-1.39-8.417-1.39h-3.983c-4.712 0-7.028 0-8.51 1.482C4 7.815 4 10.131 4 14.842v2.316c0 4.711 0 7.027 1.482 8.51 1.482 1.482 3.798 1.482 8.51 1.482h3.983c4.712 0 7.028 0 8.51-1.482 1.482-1.483 1.482-3.891 1.482-8.603V14.75c.093-4.632.093-7.12-1.482-8.51Zm-8.457 2.117c.953 0 1.76.807 1.76 1.76s-.807 1.76-1.76 1.76c-.952 0-1.76-.807-1.76-1.76-.013-.94.808-1.76 1.76-1.76Zm-4.314 0c.953 0 1.76.807 1.76 1.76s-.807 1.76-1.76 1.76-1.76-.807-1.76-1.76c0-.94.807-1.76 1.76-1.76Zm-4.301 0c.953 0 1.76.807 1.76 1.76s-.807 1.76-1.76 1.76-1.76-.807-1.76-1.76c-.014-.94.807-1.76 1.76-1.76ZM24.38 21.34a1.839 1.839 0 0 1-1.84 1.853H9.492A1.858 1.858 0 0 1 7.64 21.34v-5.545c0-1.02.834-1.853 1.853-1.853h13.036c1.02 0 1.853.834 1.853 1.853v5.545Z"
                  fill={"rgb(87, 94, 253)"}
                ></path>
              </svg>
              <span
                style={{
                  marginTop: "5px",
                  fontFamily:
                    "Noto Sans Vietnamese,-apple-system,BlinkMacSystemFont,Segoe UI,Helvetica,Arial,sans-serif",
                  fontSize: "13px",
                  color: "white",
                  fontWeight: 600,
                }}
              >
                Thiệp chúc mừng
              </span>
            </Link>
          </li>
          <li style={{}}>
            <Link
              to="/event"
              style={{
                display: "flex",
                textDecoration: "none",
                width: "100%",
                alignItems: "center",
                paddingLeft: 10,

                fontSize: "16px",
                color: "rgb(13, 18, 22)",
                lineHeight: "22px",
                flexDirection: "column",
              }}
              onClick={() => handleUlSelect("77.85%")}
            >
              {/* <SpaceDashboardOutlinedIcon style={{ marginRight: 5 }} /> */}

              <svg
                width="30"
                height="30"
                viewBox="0 0 30 30"
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  width: 47,
                  height: 47,
                  borderRadius: "50%",
                  padding: 10,
                  transition: "background-color 0.3s, fill 0.3s",

                  backgroundColor: "white",
                }}
                xmlns="http://www.w3.org/2000/svg"
                onMouseEnter={(e) => {
                  const pathElement = e.target.querySelector("path");
                  if (pathElement) {
                    pathElement.style.fill = "white";
                    e.target.style.backgroundColor = "rgb(255, 153, 0)";
                  }
                }}
                onMouseLeave={(e) => {
                  const pathElement = e.target.querySelector("path");
                  if (pathElement) {
                    pathElement.style.fill = "rgb(255, 153, 0)";
                    e.target.style.backgroundColor = "white";
                  }
                }}
              >
                <path
                  d="M27.924 8.454c-.032-1.15-.608-2.174-1.471-2.877-.672-.544-1.471-.895-2.366-.96a226.297 226.297 0 0 0-8.09-.127c-2.717 0-5.403.032-8.088.128-.864.032-1.663.383-2.334.927-.864.703-1.471 1.758-1.503 2.91a185.346 185.346 0 0 0 0 10.327c.064 2.014 1.79 3.772 3.837 3.836 1.534.064 3.037.064 4.572.064l-2.046 3.645c-.288.543.095 1.183.67 1.183h1.727a.78.78 0 0 0 .672-.384l.224-.383 1.534-2.718a.901.901 0 0 1 1.567 0l1.726 3.101c.128.256.384.384.672.384h1.726c.576 0 .96-.64.672-1.151l-.64-1.12-1.406-2.525c1.502-.032 3.037-.032 4.54-.064 2.014-.064 3.773-1.822 3.836-3.837.064-3.453.064-6.906-.031-10.359ZM15.998 18.43c-2.622 0-4.764-2.142-4.764-4.796 0-2.654 2.142-4.796 4.764-4.796v4.796h4.796a4.79 4.79 0 0 1-4.796 4.796Zm1.087-5.883V7.75c2.621 0 4.796 2.142 4.796 4.796h-4.796Z"
                  fill={"rgb(255, 153, 0)"}
                ></path>
              </svg>
              <span
                style={{
                  marginTop: "5px",
                  fontFamily:
                    "Noto Sans Vietnamese,-apple-system,BlinkMacSystemFont,Segoe UI,Helvetica,Arial,sans-serif",
                  fontSize: "13px",
                  color: "white",
                  fontWeight: 600,
                }}
              >
                Sự kiện
              </span>
            </Link>
          </li>
          <li style={{}}>
            <Link
              to="/"
              style={{
                display: "flex",
                textDecoration: "none",
                width: "100%",
                alignItems: "center",
                paddingLeft: 10,

                fontSize: "16px",
                color: "rgb(13, 18, 22)",
                lineHeight: "22px",
                flexDirection: "column",
              }}
              onClick={() => handleUlSelect("87.15%")}
            >
              {/* <FolderOutlinedIcon style={{ marginRight: 5 }} /> */}
              <svg
                width="30"
                height="30"
                viewBox="0 0 30 30"
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  width: 45,
                  height: 45,
                  borderRadius: "50%",
                  padding: 10,
                  backgroundColor: "white",
                  transition: "background-color 0.3s, fill 0.3s",
                }}
                xmlns="http://www.w3.org/2000/svg"
                onMouseEnter={(e) => {
                  const pathElement = e.target.querySelector("path");
                  if (pathElement) {
                    pathElement.style.fill = "white";
                    e.target.style.backgroundColor = "rgb(104, 62, 212)";
                  }
                }}
                onMouseLeave={(e) => {
                  const pathElement = e.target.querySelector("path");
                  if (pathElement) {
                    pathElement.style.fill = "rgb(104, 62, 212)";
                    e.target.style.backgroundColor = "white";
                  }
                }}
              >
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M6.667 18.667a2.667 2.667 0 1 0 0-5.334 2.667 2.667 0 0 0 0 5.334Zm9.333 0a2.667 2.667 0 1 0 0-5.334 2.667 2.667 0 0 0 0 5.334ZM28 16a2.667 2.667 0 1 1-5.333 0A2.667 2.667 0 0 1 28 16Z"
                  fill={"rgb(104, 62, 212)"}
                ></path>
              </svg>

              <span
                style={{
                  marginTop: "5px",
                  fontFamily:
                    "Noto Sans Vietnamese,-apple-system,BlinkMacSystemFont,Segoe UI,Helvetica,Arial,sans-serif",
                  fontSize: "13px",
                  color: "white",
                  fontWeight: 600,
                }}
              >
                Xem thêm
              </span>
            </Link>
          </li>
        </ul>
        <div
          style={{
            transform:
              "matrix(-0.707107, 0.707107, -0.707107, -0.707107, 40, 2)",
            backgroundColor: "white",
            width: 16,
            height: 16,
            position: "absolute",
            bottom: 0,
            marginBottom: "-7px",

            left: indicatorPosition.left,
            transition: "left 0.3s ease", // Smooth transition
          }}
        ></div>
      </Box>
      <Outlet />
    </div>
  );
}

export default Dashboard;
