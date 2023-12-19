import * as React from "react";
import {
  BrowserRouter as Router,
  Route,
  Link,
  Routes,
  useLocation,
  Outlet,
} from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import Cookies from "js-cookie";
import axios from "axios";
import Slider from "react-slick";
import iconPicture from "./iconPicture";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import "../category/Category.css";
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
import MailIcon from "@mui/icons-material/Mail";
import Badge from "@mui/material/Badge";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
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
import "./Content.css";
import CrownIcon from "../../../assets/crownIcon";
import "react-multi-carousel/lib/styles.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import img1 from "./assets/img1.jpg";
import img2 from "./assets/img2.jpg";
import img3 from "./assets/img3.jpg";
import img4 from "./assets/img4.jpg";
import paint from "./assets/paint-palette.png";
import picture from "./assets/picture.png";
import xMark from "./assets/x-button.png";
import { useNavigate } from "react-router-dom";
import magicwand from "./assets/magic-wand1.png";
import home from "./assets/home.png";
import folder from "./assets/folder.png";
import paintPaletted from "./assets/paint-palette.png";
import officialLogo from "./EZPICS (converted)-03.png";
import "./Content.scss";
import { CHANGE_VALUE, DELETE_ALL_VALUES } from "../../../store/slice/infoUser";
import crownPro from "./assets/crown.png";
import database from "./assets/database.png";
import order from "./assets/online-order.png";
import history from "./assets/history.png";
import repeater from "./assets/repeater.png";
import downloader from "./assets/download-icon.png";
import gift from "./assets/gift-box.png";
import { CHANGE_VALUE_TOKEN } from "../../../store/slice/authSlice";
import paintRoller from "./assets/paint-roller (1).png";
import DownloadIcon from "@mui/icons-material/Download";
import banknote from './banknotes.png'
import coin from './coin.png'


const drawerWidth = 240;

export default function PersistentDrawerLeft() {
  const [loading, setLoading] = React.useState(false);
  const dispatch = useDispatch();
  const theme = useTheme();
  const [open, setOpen] = React.useState(true);
  const location = useLocation();
  const [openModalPro, setOpenModalPro] = React.useState(false);
  const [openModalCreating, setOpenModalCreating] = React.useState(false);
  const network = useSelector((state) => state.network.network);
  const infoUser = useSelector((state) => state.user.info);
  function checkTokenCookie() {
    var allCookies = document.cookie;

    var cookiesArray = allCookies.split(";");

    for (var i = 0; i < cookiesArray.length; i++) {
      var cookie = cookiesArray[i].trim();
      if (cookie.indexOf("token=") === 0) {
        var tokenValue = cookie.substring("token=".length, cookie.length);

        if (tokenValue !== "") {
          console.log(
            "Có token và không rỗng. Giá trị token là: " + tokenValue
          );

          return true;
        } else {
          console.log("Có token nhưng giá trị rỗng.");
          return false;
        }
      }
    }

    // Không tìm thấy cookie "token"
    console.log("Không tìm thấy cookie có tên là 'token'.");
    return false;
  }
  const formatPrice = (price) => {
    return new Intl.NumberFormat("vi-VN").format(price);
  };
  React.useEffect(() => {
    const getDataUser = () => {
      const dataCookie = Cookies.get("user_login");
      if (dataCookie) {
        const dataUser = JSON.parse(dataCookie);
        dispatch(CHANGE_VALUE(dataUser));
        dispatch(CHANGE_VALUE_TOKEN(dataUser?.token));

        console.log(dataUser?.token);
      }
    };
    getDataUser();
  }, []);

  const navigate = useNavigate();
  const authentication = checkTokenCookie();

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
    nextArrow: <></>,
    prevArrow: <></>,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 1500,
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
    // alignItems: "center",
    paddingTop: "5%",
    justifyContent: "center",
  };
  const ezpizProBlock = {
    width: "65%",
    height: "50%",
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
  const handleLogout = () => {
    setLoading(true);

    setTimeout(() => {
      document.cookie = `user_login=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
      document.cookie = `token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
      dispatch(DELETE_ALL_VALUES());
      setLoading(false);
      handleCloseUserMenu();
      navigate("/", { replace: true });
    }, 1500);
  };
  return (
    <>
      <Box
        sx={{
          display: "flex",
          width: "100%",
          minHeight: "100%",
          position: "relative",
        }}
      >
        <CssBaseline />
        <Box theme={darkTheme} style={{ width: "100%" }}>
          <AppBar
            position="static"
            theme={darkTheme}
            style={{ width: "100%", position: "fixed" }}
          >
            <Toolbar style={{ width: "100%" }}>
              <IconButton
                size="large"
                edge="start"
                color="inherit"
                aria-label="open drawer"
                sx={{ mr: 2 }}
                // onClick={() => setOpen(!open)}
              >
                <MenuIcon />
              </IconButton>

              <img
                alt=""
                src={officialLogo}
                loading="lazy"
                style={{ width: "3%", height: "5%", cursor: "pointer" }}
                onClick={() => navigate("/")}
              />
              <div style={textHeader}>Tính năng</div>
              <div style={textHeader}>Mẫu thiết kế nổi bật</div>
              <div style={textHeader}>Hướng dẫn sử dụng</div>
              <div style={textHeader}>BLOG</div>
              <div style={textHeader}>Liên hệ</div>
              <Box sx={{ flexGrow: 1 }} />
              <Box sx={{ display: { xs: "none", md: "flex" } }}>
                <Tooltip title="Tải xuống ứng dụng">
                  <IconButton
                    size="large"
                    aria-label="show 4 new mails"
                    color="inherit"
                    title="Tải xuống ứng dụng"
                    onClick={() => {
                      navigate("/download");
                      window.scrollTo({
                        top: 70,
                        behavior: "smooth",
                      });
                    }}
                  >
                    <Badge color="error">
                      <MonitorOutlinedIcon />
                    </Badge>
                  </IconButton>
                </Tooltip>
                <Tooltip title="Cài đặt">
                  <IconButton
                    size="large"
                    aria-label="show 4 new mails"
                    color="inherit"
                    title="Cài đặt"
                    onClick={() => {
                      navigate("/information");
                    }}
                  >
                    <Badge color="error">
                      <SettingsOutlinedIcon />
                    </Badge>
                  </IconButton>
                </Tooltip>

                <Tooltip title="Thông báo">
                  <IconButton
                    size="large"
                    aria-label="show 4 new mails"
                    color="inherit"
                    title="Thông báo"
                  >
                    <Badge color="error">
                      <NotificationsActiveOutlinedIcon />
                    </Badge>
                  </IconButton>
                </Tooltip>
                <Button
                  variant="contained"
                  size="medium"
                  style={{
                    marginLeft: "20px",
                    height: 40,
                    alignSelf: "center",
                    textTransform: "none",
                    color: "white",
                    backgroundColor: "rgb(255, 66, 78)",
                  }}
                  onClick={() => {
                    window.scrollTo({
                      top: 70,
                      behavior: "smooth", // This makes the scroll animation smooth
                    });
                    setOpenModalCreating(true);
                  }}
                >
                  Tạo thiết kế
                </Button>
              </Box>

              <Box
                sx={{ flexGrow: 0, marginLeft: "20px", overflowY: "hidden" }}
              >
                {authentication ? (
                  <Tooltip title="Cá nhân">
                    <IconButton
                      onClick={(e) => {
                        window.scrollTo({ top: 0, behavior: "smooth" });

                        handleOpenUserMenu(e);
                      }}
                      sx={{ p: 0 }}
                    >
                      <Avatar alt="Remy Sharp" src={infoUser[0]?.avatar} />
                    </IconButton>
                  </Tooltip>
                ) : (
                  <>
                    <button
                      className="category-wrapper__block---title----button"
                      style={{
                        backgroundColor: "rgb(255, 245, 241)",
                        border: "1px solid rgb(255, 66, 78)",
                        color: "rgb(255, 66, 78)",
                        // width: "200px",
                        height: 40,
                        width: 130,
                        alignItems: "center",
                        cursor: "pointer",
                      }}
                      onClick={() => navigate("/login")}
                    >
                      <span style={{ paddingRight: 5 }}>
                        <AccountCircleOutlinedIcon />
                      </span>
                      Đăng nhập
                    </button>
                  </>
                )}
                <Menu
                  sx={{
                    mt: "45px",
                    top: 0,
                    left: "73%",
                    position: "absolute",
                    minWidth: "100%",
                    flexDirection: "column",
                    display: "flex",
                  }}
                  id="menu-appbar"
                  anchorEl={anchorElUser}
                  anchorOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  open={Boolean(anchorElUser)}
                  onClose={handleCloseUserMenu}
                  style={{ cursor: "pointer" }}
                >
                  <MenuItem onClick={handleCloseUserMenu}>
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "center",
                      }}
                    >
                      <Avatar
                        alt="Remy Sharp"
                        src={infoUser[0]?.avatar}
                        onClick={() => console.log("User info:", infoUser)}
                      />
                      <div style={{ paddingBottom: "10%", paddingLeft: "5%" }}>
                        <p
                          style={{
                            fontFamily:
                              "Noto Sans Vietnamese,-apple-system,BlinkMacSystemFont,Segoe UI,Helvetica,Arial,sans-serif",
                            color: "rgb(13, 18, 22)",
                            fontWeight: "700",
                            fontSize: "18px",
                          }}
                        >
                          <b>{infoUser[0]?.name}</b>
                        </p>

                        <p
                          style={{
                            color: "rgba(13, 18, 22, 0.7)",
                            fontSize: "13px",
                            fontFamily:
                              "Noto Sans Vietnamese,-apple-system,BlinkMacSystemFont,Segoe UI,Helvetica,Arial,sans-serif",
                            lineHeight: "0px",
                          }}
                        >
                          Tài khoản:{" "}
                          <b>{formatPrice(infoUser[0]?.account_balance)}₫</b>
                        </p>
                      </div>
                    </div>
                  </MenuItem>
                  <Divider />

                  <MenuItem
                    onClick={() => {
                      navigate("/page-satisfied");
                      handleCloseUserMenu();
                    }}
                  >
                    <Typography
                      textAlign="left"
                      style={{ width: 300, fontSize: "14px", height: "25px" }}
                    >
                      Trang cá nhân
                    </Typography>
                  </MenuItem>
                  <MenuItem
                    onClick={() => {
                      navigate("/information");
                      handleCloseUserMenu();
                    }}
                  >
                    <Typography
                      textAlign="left"
                      style={{ width: 300, fontSize: "14px", height: "25px" }}
                    >
                      Sửa thông tin cá nhân
                    </Typography>
                  </MenuItem>
                  <MenuItem onClick={handleCloseUserMenu}>
                    <Typography
                      textAlign="left"
                      style={{ width: 300, fontSize: "14px", height: "25px" }}
                    >
                      Khiếu nại
                    </Typography>
                  </MenuItem>
                  <MenuItem onClick={() => navigate("/download")}>
                    <Typography
                      textAlign="left"
                      style={{ width: 300, fontSize: "14px", height: "25px" }}
                    >
                      Tải ứng dụng Ezpics
                    </Typography>
                  </MenuItem>
                  <MenuItem onClick={handleCloseUserMenu}>
                    <Typography
                      textAlign="left"
                      style={{
                        width: 300,
                        fontSize: "14px",
                        height: "25px",
                        display: "flex",
                        justifyContent: "space-between",
                      }}
                    >
                      <p style={{ margin: 0 }}>Giới thiệu bạn bè</p>
                    </Typography>
                    <img
                      alt=""
                      src={gift}
                      loading="lazy"
                      style={{
                        width: "20px",
                        height: "20px",
                        cursor: "pointer",
                        marginBottom: "10px",
                      }}
                      onClick={() => navigate("/")}
                    />
                  </MenuItem>
                  <MenuItem onClick={() => handleLogout()}>
                    <Typography
                      textAlign="left"
                      style={{
                        width: 300,
                        fontSize: "14px",
                        height: "25px",
                        display: "flex",
                        justifyContent: "space-between",
                      }}
                    >
                      <p style={{ margin: 0 }}>Đăng xuất</p>
                    </Typography>
                    {loading && (
                      <div class="lds-ring">
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                      </div>
                    )}
                  </MenuItem>
                </Menu>
              </Box>
            </Toolbar>
          </AppBar>
          {renderMobileMenu}
          {renderMenu}
          <Drawer
            sx={{
              width: drawerWidth,
              flexShrink: 0,
              "& .MuiDrawer-paper": {
                width: drawerWidth,
                boxSizing: "border-box",
                overflowY: "hidden",
              },
            }}
            variant="persistent"
            anchor="left"
            open={open}
            style={{ paddingRight: 10 }}
          >
            <DrawerHeader></DrawerHeader>
            <List></List>

            <div style={{}}>
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  paddingLeft: 15,
                  alignItems: "center",
                  position: "relative",
                }}
              >
                {authentication ? (
                  <Avatar
                    alt="Remy Sharp"
                    src={infoUser[0]?.avatar}
                    style={{ alignSelf: "center" }}
                    onClick={() => console.log("User info:", infoUser)}
                  />
                ) : (
                  <Avatar
                    alt="Remy Sharp"
                    style={{ alignSelf: "center" }}
                    onClick={() => console.log("User info:", infoUser)}
                  />
                )}
                {authentication && (
                  <img
                    src={crownPro}
                    style={{
                      width: "18px",
                      height: "18px",
                      position: "absolute",
                      bottom: "22%",
                      left: "17%",
                    }}
                    alt=""
                  />
                )}

                <div
                  style={{
                    // display: "flex",
                    // flexDirection: "column",
                    // justifyContent: "center",
                    paddingLeft: 15,
                    paddingBottom: 15,
                  }}
                >
                  {authentication ? (
                    <p
                      style={{
                        fontFamily:
                          "Noto Sans Vietnamese,-apple-system,BlinkMacSystemFont,Segoe UI,Helvetica,Arial,sans-serif",
                        color: "rgb(13, 18, 22)",
                        fontWeight: "600",
                        lineHeight: "0px",
                      }}
                    >
                      <b>{infoUser[0]?.name}</b>
                    </p>
                  ) : (
                    <p
                      style={{
                        fontFamily:
                          "Noto Sans Vietnamese,-apple-system,BlinkMacSystemFont,Segoe UI,Helvetica,Arial,sans-serif",
                        color: "rgb(13, 18, 22)",
                        fontWeight: "600",
                        lineHeight: "0px",
                      }}
                    >
                      Đăng nhập
                    </p>
                  )}
                  {authentication && (
                    <>
                    <div style={{display:'flex',flexDirection: 'row',alignItems:"center"}}><img src={banknote} alt="" style={{width: 20,height:20}}/><p
                      style={{
                        color: "rgba(13, 18, 22, 0.7)",
                        fontSize: "15px",
                        fontFamily:
                          "Noto Sans Vietnamese,-apple-system,BlinkMacSystemFont,Segoe UI,Helvetica,Arial,sans-serif",
                        lineHeight: "0px",
                        paddingLeft: 5,
                        fontWeight: "bold",
                      }}
                    >
                      : <b>{formatPrice(infoUser[0]?.account_balance)}₫</b>
                    </p></div>
                    <div style={{display:'flex',flexDirection: 'row',alignItems:"center"}}><img src={coin} alt="" style={{width: 20,height:20}}/>
                    <p
                      style={{
                        color: "rgba(13, 18, 22, 0.7)",
                        fontSize: "15px",
                        fontFamily:
                          "Noto Sans Vietnamese,-apple-system,BlinkMacSystemFont,Segoe UI,Helvetica,Arial,sans-serif",
                        lineHeight: "0px",
                        paddingLeft: 5
                      }}
                    >
                      : <b>{infoUser[0]?.ecoin}</b>
                    </p></div></>
                  )}
                </div>
              </div>
            </div>

            {infoUser[0]?.member_pro ? (
              <></>
            ) : (
              <button
                style={{
                  backgroundColor: "#e1e4e7",
                  marginLeft: "15px",
                  display: "flex",
                  textDecoration: "none",
                  height: 40,
                  alignItems: "center",
                  paddingLeft: 10,
                  textAlign: "center",
                  justifyContent: "center",
                  fontSize: "13px",
                  color: "rgb(13, 18, 22)",
                  lineHeight: "22px",
                  fontWeight: "bold",
                  border: "none",
                  borderRadius: 10,
                  marginRight: "12px",
                  marginTop: "10px",
                  marginBottom: "20px",
                  cursor: "pointer",
                }}
                onClick={() => {
                  setOpenModalPro(true);
                  window.scrollTo({
                    top: 0,
                    behavior: "smooth", // This makes the scroll animation smooth
                  });
                }}
              >
                <CrownIcon style={{ marginLeft: "-10px" }} />
                <span style={{ paddingRight: "10px", paddingLeft: "5px" }}>
                  Dùng Ezpics Pro
                </span>
              </button>
            )}
            <Divider />
            <ul
              style={{
                textDecoration: "none",
                listStyleType: "none",
                paddingLeft: 15,
                paddingRight: "12px",
              }}
            >
              <li
                style={{
                  display: "flex",
                  textDecoration: "none",
                  width: "100%",
                  color: "inherit",
                  backgroundColor:
                    location.pathname === "/" ? "#ccc" : "transparent",
                  borderRadius: 5,
                  marginBottom: 5,

                  // paddingTop: 2,
                  // paddingBottom: 2,
                }}
              >
                <Link
                  to="/"
                  style={{
                    display: "flex",
                    textDecoration: "none",
                    width: "100%",
                    height: 40,
                    alignItems: "center",
                    paddingLeft: 10,

                    fontSize: "15px",
                    color: "rgb(13, 18, 22)",
                    lineHeight: "22px",
                  }}
                >
                  <img
                    src={home}
                    alt=""
                    style={{ marginRight: 5, height: 20, width: 20 }}
                  />
                  Trang chủ
                </Link>
              </li>
              <li
                style={{
                  display: "flex",
                  textDecoration: "none",
                  width: "100%",
                  color: "inherit",
                  backgroundColor:
                    location.pathname === "/category" ? "#ccc" : "transparent",
                  marginBottom: 5,
                  borderRadius: 5,
                }}
              >
                <Link
                  to="/category"
                  style={{
                    display: "flex",
                    textDecoration: "none",
                    width: "100%",
                    height: 40,
                    alignItems: "center",
                    paddingLeft: 10,

                    fontSize: "15px",
                    color: "rgb(13, 18, 22)",
                    lineHeight: "22px",
                  }}
                >
                  <img
                    src={paintPaletted}
                    alt=""
                    style={{ marginRight: 5, height: 20, width: 20 }}
                  />
                  Bộ sưu tập
                </Link>
              </li>
              <li
                style={{
                  display: "flex",
                  textDecoration: "none",
                  width: "100%",
                  color: "inherit",
                  backgroundColor:
                    location.pathname === "/remove" ? "#ccc" : "transparent",
                  marginBottom: 5,
                  borderRadius: 5,
                }}
              >
                <Link
                  to="/remove"
                  style={{
                    display: "flex",
                    textDecoration: "none",
                    width: "100%",
                    height: 40,
                    alignItems: "center",
                    paddingLeft: 10,

                    fontSize: "15px",
                    color: "rgb(13, 18, 22)",
                    lineHeight: "22px",
                  }}
                >
                  {/* <SpaceDashboardOutlinedIcon
                    style={{ marginRight: 5, height: 20, width: 20 }}
                  /> */}
                  <img
                    src={magicwand}
                    alt=""
                    style={{ marginRight: 5, height: 20, width: 20 }}
                  />
                  <p>Xóa nền Ezpics</p>
                </Link>
              </li>
              <li
                style={{
                  display: "flex",
                  textDecoration: "none",
                  width: "100%",
                  color: "inherit",
                  backgroundColor:
                    location.pathname === "/f" ? "#ccc" : "transparent",
                }}
              >
                <Link
                  to="/project"
                  style={{
                    display: "flex",
                    textDecoration: "none",
                    width: "100%",
                    height: 40,
                    alignItems: "center",
                    paddingLeft: 10,
                    // fontFamily:
                    //   "Noto Sans Vietnamese,-apple-system,BlinkMacSystemFont,Segoe UI,Helvetica,Arial,sans-serif",
                    fontSize: "15px",
                    color: "rgb(13, 18, 22)",
                    lineHeight: "22px",
                  }}
                >
                  <img
                    src={folder}
                    alt=""
                    style={{ marginRight: 5, height: 20, width: 20 }}
                  />
                  Danh mục
                </Link>
              </li>

              {authentication && <Divider style={{ paddingTop: 15 }} />}
              {authentication && (
                <>
                  <div style={{}}>
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        paddingLeft: 5,
                        paddingTop: 15,
                        paddingBottom: 15,
                        alignItems: "center",
                        position: "relative",
                      }}
                    >
                      <Avatar
                        alt="Remy Sharp"
                        src={infoUser[0]?.avatar}
                        style={{ alignSelf: "center" }}
                        onClick={() => console.log("User info:", infoUser)}
                      />

                      <div
                        style={{
                          // display: "flex",
                          // flexDirection: "column",
                          // justifyContent: "center",
                          paddingLeft: 15,
                        }}
                      >
                        <p
                          style={{
                            fontFamily:
                              "Noto Sans Vietnamese,-apple-system,BlinkMacSystemFont,Segoe UI,Helvetica,Arial,sans-serif",
                            color: "rgb(13, 18, 22)",
                            fontWeight: "500",
                            alignSelf: "center",
                            justifyContent: "center",
                            fontSize: "15px",
                          }}
                        >
                          Cá nhân
                        </p>
                      </div>
                    </div>
                  </div>
                  <li
                    style={{
                      display: "flex",
                      textDecoration: "none",
                      width: "100%",
                      color: "inherit",
                      backgroundColor:
                        location.pathname === "/f" ? "#ccc" : "transparent",
                    }}
                  >
                    <Link
                      to="/your-design"
                      style={{
                        display: "flex",
                        textDecoration: "none",
                        width: "100%",
                        height: 40,
                        alignItems: "center",
                        paddingLeft: 10,
                        fontSize: "15px",
                        color: "rgb(13, 18, 22)",
                        lineHeight: "22px",
                      }}
                    >
                      <img
                        src={database}
                        alt=""
                        style={{ marginRight: 5, height: 20, width: 20 }}
                      />
                      Thiết kế của bạn
                    </Link>
                  </li>
                  <li
                    style={{
                      display: "flex",
                      textDecoration: "none",
                      width: "100%",
                      color: "inherit",
                      backgroundColor:
                        location.pathname === "/f" ? "#ccc" : "transparent",
                    }}
                  >
                    <Link
                      to="/ordered"
                      style={{
                        display: "flex",
                        textDecoration: "none",
                        width: "100%",
                        height: 40,
                        alignItems: "center",
                        paddingLeft: 10,
                        // fontFamily:
                        //   "Noto Sans Vietnamese,-apple-system,BlinkMacSystemFont,Segoe UI,Helvetica,Arial,sans-serif",
                        fontSize: "15px",
                        color: "rgb(13, 18, 22)",
                        lineHeight: "22px",
                      }}
                    >
                      <img
                        src={order}
                        alt=""
                        style={{ marginRight: 5, height: 20, width: 20 }}
                      />
                      Order mẫu thiết kế
                    </Link>
                  </li>
                  <li
                    style={{
                      display: "flex",
                      textDecoration: "none",
                      width: "100%",
                      color: "inherit",
                      backgroundColor:
                        location.pathname === "/f" ? "#ccc" : "transparent",
                    }}
                  >
                    <Link
                      to="/"
                      style={{
                        display: "flex",
                        textDecoration: "none",
                        width: "100%",
                        height: 40,
                        alignItems: "center",
                        paddingLeft: 10,
                        // fontFamily:
                        //   "Noto Sans Vietnamese,-apple-system,BlinkMacSystemFont,Segoe UI,Helvetica,Arial,sans-serif",
                        fontSize: "15px",
                        color: "rgb(13, 18, 22)",
                        lineHeight: "22px",
                      }}
                    >
                      <img
                        src={paintRoller}
                        alt=""
                        style={{ marginRight: 5, height: 20, width: 20 }}
                      />
                      Bộ sưu tập của bạn
                    </Link>
                  </li>
                  <li
                    style={{
                      display: "flex",
                      textDecoration: "none",
                      width: "100%",
                      color: "inherit",
                      backgroundColor:
                        location.pathname === "/f" ? "#ccc" : "transparent",
                    }}
                  >
                    <Link
                      to="/"
                      style={{
                        display: "flex",
                        textDecoration: "none",
                        width: "100%",
                        height: 40,
                        alignItems: "center",
                        paddingLeft: 10,
                        // fontFamily:
                        //   "Noto Sans Vietnamese,-apple-system,BlinkMacSystemFont,Segoe UI,Helvetica,Arial,sans-serif",
                        fontSize: "15px",
                        color: "rgb(13, 18, 22)",
                        lineHeight: "22px",
                      }}
                    >
                      <img
                        src={history}
                        alt=""
                        style={{ marginRight: 5, height: 20, width: 20 }}
                      />
                      Lịch sử giao dịch
                    </Link>
                  </li>
                  <li
                    style={{
                      display: "flex",
                      textDecoration: "none",
                      width: "100%",
                      color: "inherit",
                      backgroundColor:
                        location.pathname === "/f" ? "#ccc" : "transparent",
                    }}
                  >
                    <Link
                      to="/"
                      style={{
                        display: "flex",
                        textDecoration: "none",
                        width: "100%",
                        height: 40,
                        alignItems: "center",
                        paddingLeft: 10,
                        // fontFamily:
                        //   "Noto Sans Vietnamese,-apple-system,BlinkMacSystemFont,Segoe UI,Helvetica,Arial,sans-serif",
                        fontSize: "15px",
                        color: "rgb(13, 18, 22)",
                        lineHeight: "22px",
                      }}
                    >
                      <img
                        src={repeater}
                        alt=""
                        style={{ marginRight: 5, height: 20, width: 20 }}
                      />
                      {infoUser[0]?.member_pro
                        ? "Gia hạn bản PRO"
                        : "Dùng thử bản PRO"}
                    </Link>
                  </li>
                  <li
                    style={{
                      display: "flex",
                      textDecoration: "none",
                      width: "100%",
                      color: "inherit",
                      backgroundColor:
                        location.pathname === "/f" ? "#ccc" : "transparent",
                    }}
                  >
                    <Button
                      style={{
                        display: "flex",
                        textDecoration: "none",
                        width: "100%",
                        bottom: 0,
                        marginTop: "20%",
                        height: 40,
                        alignItems: "center",
                        // fontFamily:
                        //   "Noto Sans Vietnamese,-apple-system,BlinkMacSystemFont,Segoe UI,Helvetica,Arial,sans-serif",
                        fontSize: "16px",
                        color: "white",
                        lineHeight: "22px",

                        backgroundColor: "rgb(255, 66, 78)",
                        textTransform: "none",
                        fontWeight: "500",
                        marginTop: "28.2px",
                      }}
                      onClick={() => navigate("/download")}
                    >
                      <DownloadIcon style={{ color: "white",}} />
                      <p style={{paddingLeft: 3}}>Tải ứng dụng</p>
                    </Button>
                  </li>
                </>
              )}
            </ul>
          </Drawer>
          <Outlet context={open} />
        </Box>

        {openModalPro && (
          <>
            <div className="ezpics-pro-modal" style={ezpicsProContainer}>
              <div style={ezpizProBlock}>
                <div style={ezpicsProDescription}>
                  <h2
                    style={{
                      fontFamily:
                        "Noto Sans Vietnamese,-apple-system,BlinkMacSystemFont,Segoe UI,Helvetica,Arial,sans-serif",
                      fontSize: 25,
                      lineHeight: "32px",
                    }}
                  >
                    Dùng thử Ezpics Pro
                  </h2>

                  <p
                    style={{
                      fontSize: "13px",
                      fontWeight: 400,
                      color: "rgb(13, 18, 22)",
                      fontFamily:
                        "Noto Sans Vietnamese,-apple-system,BlinkMacSystemFont,Segoe UI,Helvetica,Arial,sans-serif",
                    }}
                  >
                    Năng suất hơn. Mạnh mẽ hơn. Dùng thử những tính năng ưu việt
                    của chúng tôi.
                  </p>

                  <p
                    style={{
                      fontSize: "14px",
                      fontWeight: "bold",
                      paddingTop: "3%",
                    }}
                  >
                    Mở khóa các tính năng sau với Canva Pro.
                  </p>

                  <div style={{ display: "flex", flexDirection: "row" }}>
                    <img
                      src={picture}
                      alt=""
                      style={{ width: 15, height: 15 }}
                    />
                    <p style={{ fontSize: "14px", margin: 0, paddingLeft: 10 }}>
                      <b>Hơn 100 triệu ảnh, video</b> và thành phần cao cấp,{" "}
                      <b>
                        hơn 3.000 phông chữ cao cấp, hơn 610.000 mẫu cao cấp
                      </b>
                    </p>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      paddingTop: 10,
                    }}
                  >
                    <img src={paint} alt="" style={{ width: 15, height: 15 }} />
                    <p style={{ fontSize: "14px", margin: 0, paddingLeft: 10 }}>
                      Sáng tạo dễ dàng nhờ các tính năng như{" "}
                      <b>Xóa nền, tạo ảnh tự động</b>
                    </p>
                  </div>

                  <button
                    style={{
                      marginBottom: "5%",
                      width: "95%",
                      height: 35,
                      borderRadius: 5,
                      backgroundColor: "rgb(244, 204, 62)",
                      border: "none",
                      color: "white",
                      fontSize: 15,
                      fontWeight: "bold",
                      position: "absolute",
                      bottom: 0,
                      alignSelf: "center",
                    }}
                  >
                    Đăng ký Ezpic Pro
                  </button>
                </div>

                {/* <div > */}
                <Slider
                  {...settingsModal}
                  style={{ minHeight: "100%", width: "60%" }}
                >
                  <div>
                    <img
                      src={img1}
                      alt=""
                      style={{
                        width: "100%",
                        height: "100%",
                        maxWidth: "100%",
                        minHeight: "100%",
                        objectFit: "cover",
                      }}
                    />
                  </div>
                  <div>
                    <img
                      src={img2}
                      alt=""
                      style={{
                        width: "100%",
                        height: "100%",
                        maxWidth: "100%",
                        minHeight: "100%",
                        objectFit: "cover",
                      }}
                    />
                  </div>
                  <div>
                    <img
                      src={img3}
                      alt=""
                      style={{
                        width: "100%",
                        height: "100%",
                        maxWidth: "100%",
                        minHeight: "100%",
                        objectFit: "cover",
                      }}
                    />
                  </div>
                  <div>
                    <img
                      src={img4}
                      alt=""
                      style={{
                        width: "100%",
                        height: "100%",
                        maxWidth: "100%",
                        minHeight: "100%",
                        objectFit: "cover",
                      }}
                    />
                  </div>
                </Slider>
                {/* </div> */}
              </div>
              <img
                src={xMark}
                alt=""
                style={{
                  width: 20,
                  height: 20,
                  marginLeft: 10,
                  cursor: "pointer",
                  // maxWidth: "100%",
                  // minHeight: "100%",
                  // objectFit: "cover",
                }}
                onClick={() => setOpenModalPro(false)}
              />
            </div>
          </>
        )}
        {openModalCreating && (
          <>
            <div className="ezpics-pro-modal" style={ezpicsProContainer}>
              <div
                className="container"
                style={{ animation: "fadeIn 0.5s ease-in-out" }}
              >
                <div className="card---create-newing">
                  <div className="card-image---create-newing">
                    <h2 className="card-heading---create-newing">
                      Bắt đầu tạo mẫu thiết kế <br></br>
                      <small style={{ fontSize: 15 }}>
                        Hãy điền đầy đủ thông tin trước khi tạo nhé
                      </small>
                    </h2>
                  </div>

                  <form className="card-form---create-newing">
                    <div className="input---create-newing">
                      <input
                        type="text"
                        className="input-field---create-newing"
                        required
                      />
                      <label className="input-label---create-newing">
                        Tên mẫu thiết kế
                      </label>
                    </div>

                    <div className="input---create-newing">
                      {/* <input type="file" className="input-field" required accept="image/png, image/jpeg"/>
                       */}
                      <label className="input-label---create-newing">
                        Ảnh nền
                      </label>

                      <form
                        id="file-upload-form"
                        class="uploader"
                        style={{ marginTop: 30 }}
                      >
                        <input
                          id="file-upload"
                          type="file"
                          name="fileUpload"
                          accept="image/*"
                        />

                        <label
                          for="file-upload"
                          id="file-drag"
                          style={{ height: 200 }}
                        >
                          <img
                            id="file-image"
                            src="#"
                            alt="Preview"
                            class="hidden"
                          />
                          <div id="start---create-newing">
                            <i class="fa fa-download" aria-hidden="true"></i>
                            <div>Chọn ảnh</div>
                            <div id="notimage" class="hidden">
                              Hãy chọn ảnh
                            </div>
                            <span id="file-upload-btn" class="btn btn-primary">
                              Chọn ảnh
                            </span>
                          </div>
                          <div id="response" class="hidden">
                            <div id="messages"></div>
                            <progress
                              class="progress"
                              id="file-progress"
                              value="0"
                            >
                              <span>0</span>%
                            </progress>
                          </div>
                        </label>
                      </form>
                    </div>

                    <div className="action---create-newing">
                      <button className="action-button---create-newing">
                        Bắt đầu tạo mẫu
                      </button>
                    </div>
                  </form>
                  <div className="card-info---create-newing">
                    <p>
                      Nếu bạn chưa có thông tin, hãy tham khảo
                      <a href="#"> Mẫu thiết kế có sẵn</a>
                    </p>
                  </div>
                </div>
              </div>
              <img
                src={xMark}
                alt=""
                style={{
                  width: 20,
                  height: 20,
                  marginLeft: 10,
                  cursor: "pointer",
                }}
                onClick={() => setOpenModalCreating(false)}
              />
            </div>
          </>
        )}
      </Box>
    </>
  );
}
