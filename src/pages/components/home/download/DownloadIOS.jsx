import * as React from "react";
import {
  BrowserRouter as Router,
  
  Route,
  Link,
  Routes,
  useLocation,
  Outlet,
} from "react-router-dom";
import Slider from "react-slick";
import iosstore from './ios.png'
import ggplay from './ggplay.png'

import ezpicsLogo from './ezpics-logo.png'
import { styled, useTheme } from "@mui/material/styles";
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
import LanguageOutlinedIcon from "@mui/icons-material/LanguageOutlined";
import Badge from "@mui/material/Badge";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import AccountCircle from "@mui/icons-material/AccountCircle";
import FolderOutlinedIcon from "@mui/icons-material/FolderOutlined";
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
import KeyboardArrowDownOutlinedIcon from "@mui/icons-material/KeyboardArrowDownOutlined";
import DirectionsIcon from "@mui/icons-material/Directions";
import Dashboard from "../Dashboard/Dashboard";
import CottageOutlinedIcon from "@mui/icons-material/CottageOutlined";
import SpaceDashboardOutlinedIcon from "@mui/icons-material/SpaceDashboardOutlined";
// import "./Content.scss";
import CrownIcon from "../../../assets/crownIcon";
import Carousel from "react-multi-carousel";
import frame from "./frameIOS.png";
import "react-multi-carousel/lib/styles.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useNavigate } from "react-router-dom";
import banner1 from "./banner1.jpg";
import banner2 from "./banner2.jpg";
import banner3 from "./banner3.jpg";
import banner4 from "./banner4.jpg";
import banner5 from "./banner5.jpg";
import fbLogo from './fb_logo.png'

const drawerWidth = 240;

export default function PersistentDrawerLeft() {
  const theme = useTheme();
  const [open, setOpen] = React.useState(true);
  const location = useLocation();
  const [openModalPro, setOpenModalPro] = React.useState(false);
  const navigate = useNavigate();
  const darkTheme = createTheme({
    palette: {
      mode: "dark",
      primary: {
        main: "#1976d2",
      },
    },
  });
  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };
  const settingsModal = {
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    nextArrow: <></>,
    prevArrow: <></>,
    autoplay: true,
  };
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);
  const pages = ["Products", "Pricing", "Blog"];
  const settings = [
    "Cài đặt tài khoản",
    "Tải ứng dụng Ezpics",
    "Giới thiệu bạn bè",
    "Đăng xuất",
  ];

  const textHeader = {
    color: "black",
    fontFamily:
      "Canva Sans,Noto Sans Variable,Noto Sans,-apple-system,BlinkMacSystemFont,Segoe UI,Helvetica,Arial,sans-serif",
    fontWeight: 500,
    fontSize: "16px",
    cursor: "pointer",

    paddingLeft: "3%",
  };
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };
  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const menuId = "primary-search-account-menu";
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      {/* <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
      <MenuItem onClick={handleMenuClose}>My account</MenuItem> */}
    </Menu>
  );

  const mobileMenuId = "primary-search-account-menu-mobile";
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem>
        <IconButton size="large" aria-label="show 4 new mails" color="inherit">
          <Badge badgeContent={4} color="error">
            <MailIcon />
          </Badge>
        </IconButton>
        <p>Messages</p>
      </MenuItem>
      <MenuItem>
        <IconButton
          size="large"
          aria-label="show 17 new notifications"
          color="inherit"
        >
          <Badge badgeContent={17} color="error">
            <NotificationsIcon />
          </Badge>
        </IconButton>
        <p>Notifications</p>
      </MenuItem>
      <MenuItem onClick={handleProfileMenuOpen}>
        <IconButton
          size="large"
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
        >
          <AccountCircle />
        </IconButton>
        <p>Profile</p>
      </MenuItem>
    </Menu>
  );
  const Main = styled("main", { shouldForwardProp: (prop) => prop !== "open" })(
    ({ theme, open }) => ({
      flexGrow: 1,
      padding: theme.spacing(3),
      transition: theme.transitions.create("margin", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
        position: "relative",
      }),
      // marginLeft: `-${drawerWidth}px`,
      ...(open && {
        transition: theme.transitions.create("margin", {
          easing: theme.transitions.easing.easeOut,
          duration: theme.transitions.duration.enteringScreen,
        }),
        marginLeft: `${drawerWidth}px`,
      }),
    })
  );

  const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== "open",
  })(({ theme, open }) => ({
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
      position: "relative",
      zIndex: theme.zIndex.drawer + 1,
    }),
    ...(open && {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: `${drawerWidth}px`,
      transition: theme.transitions.create(["margin", "width"], {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      position: "relative",
      zIndex: theme.zIndex.drawer + 1,
    }),
    position: "relative",
    zIndex: theme.zIndex.drawer + 1,
  }));

  const DrawerHeader = styled("div")(({ theme }) => ({
    display: "flex",
    alignItems: "center",
    padding: theme.spacing(0, 2),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: "flex-end",
    paddingTop: "30%",
  }));
  const ezpicsProContainer = {
    position: "absolute",
    backgroundColor: "rgba(0, 0, 0, 0.4)",
    width: "100%",
    height: "100%",
    zIndex: 99999,
    display: "flex",
    // alignItems: "center",
    paddingTop: "5%",
    justifyContent: "center",
  };
  const ezpizProBlock = {
    width: "65%",
    height: "53%",
    backgroundColor: "white",
    paddingLeft: 20,
    display: "flex",
    flexDirection: "row",
    animation: "slideIn 0.5s ease-in-out",
    borderRadius: 10,
  };
  const ezpicsProDescription = {
    width: "40%",
    height: "100%",
    paddingRight: 20,
    position: "relative",
  };
  return (
    <Box sx={{width: '100%'}}>
      <Box
        sx={{
          display: "flex",
          width: "100%",
          minHeight: "100%",
          position: "relative",
          paddingTop: "1%", paddingLeft: "30%", paddingRight: "12%"
        }}
      >
        
        <div
          style={{
            minWidth: "100%",
            paddingTop: "5%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            flexGrow: 1,
            
          }}
        >
          <p
            style={{
              fontFamily: "Canva Sans, sans-serif",
              fontSize: 40,
              color: "#0e1318",
              fontWeight: 700,
            }}
          >
            Ezpics đã có mặt trên mọi nền tảng
          </p>
          <p
            style={{
              fontFamily: "Canva Sans, sans-serif",
              fontSize: 17,
              color: "rgba(17,23,29,.6)",
              fontWeight: 400,
              lineHeight: 1.6,
              marginTop: "-1%",
            }}
          >
            Quét mã QR để cài đặt ứng dụng Ezpics trên iPhone hoặc iPad của bạn.
          </p>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <img
              onClick={() =>
                (window.location.href =
                  "https://apps.apple.com/vn/app/ezpics-d%C3%B9ng-l%C3%A0-th%C3%ADch/id1659195883?l=vi?l=vi")
              }
              src={iosstore}
              alt=""
              style={{ width: 180, height: 43,cursor: "pointer" }}
            />
            <img
              onClick={() =>
                (window.location.href =
                  "https://play.google.com/store/apps/details?id=vn.ezpics&hl=vi&gl=US")
              }
              src={ggplay}
              alt=""
              style={{ width: 180, height: 63,cursor: "pointer" }}
            />
          </div>
          <p
            style={{
              fontFamily: "Noto Sans, sans-serif",
              fontSize: 14,
              // color: "rgba(17, 23, 29, 0.6)",
              fontWeight: 400,
              lineHeight: 1.6,
            }}
          >
            Cũng có trên{" "}
            <a href="/" style={{ textDecorationLine: "underline" }}>
              Web
            </a>{" "}
          </p>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
              paddingBottom: "10%",
            }}
          >
            <img
              src={banner1}
              alt=""
              style={{
                borderRadius: 20,
                width: 220,
                height: 260,
                marginTop: "5%",
                marginRight: "4%",
              }}
            />
            <img
              src={banner5}
              alt=""
              style={{ borderRadius: 20, maxHeight: 260, marginRight: "4%" }}
            />
            <img
              src={banner3}
              alt=""
              style={{
                borderRadius: 20,
                width: 200,
                height: 220,
                marginTop: "15%",
                marginRight: "4%",
              }}
            />
            <img
              src={banner4}
              alt=""
              style={{
                borderRadius: 20,
                width: 200,
                height: 200,
                marginRight: "4%",
              }}
            />
          </div>
        </div>
      </Box>
      <div
        style={{
          width: "90%",
          height: 30,
          borderTop: "1px solid rgb(225, 228, 231)",
          marginLeft: "6.5%",
          paddingTop: "3%",
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          paddingBottom: "3%",
          paddingLeft: "12%",
          position: "absolute",
        }}
      >
        <button
          style={{
            border: "1px solid rgb(225, 228, 231)",
            backgroundColor: "white",
            display: "flex",
            flexDirection: "row",
            width: 220,
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <LanguageOutlinedIcon />
          <p
            style={{
              paddingRight: "2%",
              paddingLeft: "2%",
              fontFamily: "Noto Sans, sans-serif",
              color: "rgb(13, 18, 22)",
              fontSize: "14px",
            }}
          >
            Tiếng Việt (Việt Nam)
          </p>
          <KeyboardArrowDownOutlinedIcon />
        </button>
        <p
          style={{
          
            fontFamily: "Noto Sans, sans-serif",
            color: "rgba(17, 23, 29, 0.6)",
            fontSize: "14px",
            fontWeight: 400,
            marginRight: "12%"
          }}
        >
          © 2023 Mọi quyền được bảo lưu, Ezpics®
        </p>
        <a href="https://www.facebook.com/ezpicsvn" ><img src={fbLogo} alt="" style={{width: 20,height: 20}}/></a>
      </div>
    </Box>
  );
}
