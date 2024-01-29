import React, { useEffect } from "react";
import {
  BrowserRouter as Router,
  Route,
  Link,
  Routes,
  useLocation,
  Outlet,
} from "react-router-dom";
import Modal from "@mui/material/Modal";
import "./Content.css";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
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
import paperRoll from "./paper-rolls.png";
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
import banknote from "./banknotes.png";
import coin from "./coin.png";
import downloadIcon from "./assets/direct-download (1).png";
import discount from "./assets/discount-coupon.png";
// import "../../../../../src/pages/components/home/category/loadingFavorite.css";

const drawerWidth = 250;

export default function PersistentDrawerLeft() {
  const [loadingModal, setLoadingModal] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const dispatch = useDispatch();
  const theme = useTheme();
  const [open, setOpen] = React.useState(true);
  const location = useLocation();
  const [openModalPro, setOpenModalPro] = React.useState(false);
  const [openModalCreating, setOpenModalCreating] = React.useState(false);
  const [openModalPrintCreating, setOpenModalPrintCreating] =
    React.useState(false);
  const network = useSelector((state) => state.ipv4.network);
  const infoUser = useSelector((state) => state.user.info);
  const [creatingBucket, setCreatingBucket] = React.useState(false);
  const [dataSizeBox, setDataSizeBox] = React.useState([]);
  const [hoveredIndex, setHoveredIndex] = React.useState(null);
  const [proDiscount, setProDiscount] = React.useState([]);
  const [contentProExtend, setContentProExtend] = React.useState(false);
  const [selectedOption, setSelectedOption] = React.useState(null);
  const [modalProDiscount, setModalProDiscount] = React.useState(false);
  const [selectedDiscount, setSelectedDiscount] = React.useState(null);
  const [selectedDiscountSpecified, setSelectedDiscountSpecified] =
    React.useState(null);
  const [selectedOptionTransaction, setSelectedOptionTransaction] =
    React.useState(null);

  // const
  const handleRadioChangeTransaction = (event) => {
    setSelectedOptionTransaction(event.target.value);
  };
  // const [contentProExtend, setContentProExtend] = React.useState(false);
  const handleRadioChange = (event) => {
    setSelectedOption(event.target.value);
  };
  const handleDiscountClick = (index) => {
    // Set the selectedDiscount state to the index of the clicked item
    setSelectedDiscount(index);
  };
  function getCookie(name) {
    var dc = document.cookie;
    var prefix = name + "=";
    var begin = dc.indexOf("; " + prefix);
    if (begin == -1) {
      begin = dc.indexOf(prefix);
      if (begin != 0) return null;
    } else {
      begin += 2;
      var end = document.cookie.indexOf(";", begin);
      if (end == -1) {
        end = dc.length;
      }
    }
    return decodeURI(dc.substring(begin + prefix.length, end));
  }
  function checkAvailableLogin() {
    var token = getCookie("token");
    var userLogin = getCookie("user_login");

    if (userLogin == null || token == null) {
      return false;
    } else {
      return true;
    }
  }
  const authentication = checkAvailableLogin();

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
  React.useEffect(() => {
    const getDataDiscount = async () => {
      try {
        const response = await axios.get(`${network}/showDiscountCodeAPI`);
        if (response && response.data) {
          console.log(response.data);
          setProDiscount(response.data.data);
        } else {
          console.error("Invalid response format");
        }
      } catch (error) {
        console.error("Error fetching data:", error.message);
      }
    };
    getDataDiscount();
  }, []);
  const [selectedFile, setSelectedFile] = React.useState(null);
  const [selectedFilePrint, setSelectedFilePrint] = React.useState(null);

  const handleFileChangePrint = (event) => {
    const fileInput = event.target;
    const files = fileInput.files;

    if (files.length > 0) {
      const file = files[0];
      console.log("Selected file:", file);

      // Lưu trữ thông tin về tệp tin trong trạng thái của component
      setSelectedFilePrint(file);

      // Bạn có thể thực hiện các xử lý khác tại đây
    }
  };
  useEffect(() => {
    setLoadingModal(true);

    const getData = async () => {
      try {
        const response = await axios.get(`${network}/getSizeProductAPI`);
        if (response && response.data) {
          console.log(response.data);
          setDataSizeBox(response.data);
          setLoadingModal(false);
        } else {
          console.error("Invalid response format");
          setLoadingModal(false);
        }
      } catch (error) {
        console.error("Error fetching data:", error.message);
        setLoadingModal(false);
      }
    };

    getData();
  }, []);
  const [showWidthHeight, setShowWidthHeight] = React.useState(false);
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
  const [loadingBuyingLostFunc, setLoadingBuyingLostFunc] =
    React.useState(false);
  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  function parseTimestamp(timestamp) {
    const dateTime = new Date(timestamp);

    const year = dateTime.getFullYear();
    const month = dateTime.getMonth() + 1; // Month is zero-based, so add 1
    const day = dateTime.getDate();

    return `${day}-${month}-${year}`;
  }
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
  const [loadingAwesome, setLoadingAwesome] = React.useState(false);
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

  function checkTokenCookie() {
    // Lấy tất cả các cookies
    var allCookies = document.cookie;

    // Tách các cookies thành mảng các cặp key-value
    var cookiesArray = allCookies.split("; ");

    // Tìm cookie có tên là "token"
    var tokenCookie;
    for (var i = 0; i < cookiesArray.length; i++) {
      var cookie = cookiesArray[i];
      var cookieParts = cookie.split("=");
      var cookieName = cookieParts[0];
      var cookieValue = cookieParts[1];

      if (cookieName === "token") {
        tokenCookie = cookieValue;
        break;
      }
    }

    // Kiểm tra nếu đã tìm thấy cookie "token"
    if (tokenCookie) {
      console.log('Giá trị của cookie "token" là:', tokenCookie);
      return tokenCookie.replace(/^"|"$/g, "");
    } else {
      console.log('Không tìm thấy cookie có tên là "token"');
    }
  }
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
    backdropFilter: "blur(3px)",
    display: "flex",
  };
  const ezpizProBlock = {
    width: "65%",
    height: 600,
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
  const handleLogout = async () => {
    setLoading(true);
    const response = await axios.post(`${network}/logoutMemberAPI`, {
      token: checkTokenCookie(),
    });
    if (response && response.data.code === 0) {
      handleCloseUserMenu();
      navigate("/", { replace: true });
      document.cookie = `user_login=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
      document.cookie = `token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
      dispatch(DELETE_ALL_VALUES());
      setModalLogoutDevice(false);
      setLoading(false);

    }
  };
  const [loadingButtonModalCreate, setLoadingButtonModalCreate] =
    React.useState(false);
  // loadingAwesome,

  const handleCreate = async (data) => {
    setLoadingAwesome(true);

    const response = await axios.post(`${network}/createProductAPI`, {
      background: data.image,
      token: checkTokenCookie(),
      type: "user_create",
      category_id: 0,
      sale_price: 0,
      name: `Mẫu thiết kế ${Math.floor(Math.random() * 100001)}`,
      // data.image
    });
    if (response && response.data && response.data.code === 0) {
      setTimeout(function () {
        setLoadingAwesome(false);

        navigate(`/design`, {
          state: { id: response.data.product_id, token: checkTokenCookie() },
        });
      }, 1500);
      // console.log(response.data.product_id);
    }
    //
    // 23979
    console.log(response.data);
  };
  function setCookie(name, value, expirationHours) {
    var date = new Date();
    value = JSON.stringify(value);
    date.setTime(date.getTime() + expirationHours * 60 * 60 * 1000); // Chuyển đổi giờ thành mili giây
    var expires = "expires=" + date.toUTCString();
    document.cookie = name + "=" + value + ";" + expires + ";path=/";
  }
  const handleFileChange = (event) => {
    const fileInput = event.target;
    const files = fileInput.files;

    if (files.length > 0) {
      const file = files[0];
      console.log("Selected file:", file);

      // Lưu trữ thông tin về tệp tin trong trạng thái của component
      setSelectedFile(file);

      // Bạn có thể thực hiện các xử lý khác tại đây
    }
  };
  const handleTransactionPro = async () => {
    setLoadingBuyingLostFunc(true);
    if (infoUser[0]?.member_pro) {
      const apiEndpoint =
        selectedOption === "2"
          ? "memberExtendProAPI"
          : "memberExtendProMonthAPI";
      // const infoUser[0]?.member_pro
      const response = await axios.post(`${network}/${apiEndpoint}`, {
        token: checkTokenCookie(),
        discountCode:
          selectedDiscountSpecified !== null
            ? selectedDiscountSpecified.code
            : "",
        type: selectedOptionTransaction === "2" ? "ecoin" : "",
      });
      if (response.data.code === 1) {
        console.log(response.data);
        const response = await axios.post(`${network}/getInfoMemberAPI`, {
          token: token,
        });
        if (response && response.data.code === 0) {
          setLoadingBuyingLostFunc(false);
          toast("Tài khoản gia hạn PRO thành công !! 🦄", {
            position: "top-left",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: true,
            progress: undefined,
            theme: "dark",
          });

          setTimeout(function () {
            setCookie("user_login", response.data.data, 1);
            dispatch(CHANGE_VALUE(response.data.data));
          }, 2000);
        }
      } else {
        document.body.style.overflowY = "auto";

        setOpenModalPro(false);
        setLoadingBuyingLostFunc(false);

        toast.error("Tài khoản không đủ để giao dịch !! 🦄", {
          position: "top-left",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
      }
    } else {
      const apiEndpoint =
        selectedOption === "2" ? "memberBuyProAPI" : "memberBuyProMonthAPI";
      // const infoUser[0]?.member_pro
      infoUser[0]?.member_pro;
      const response = await axios.post(`${network}/${apiEndpoint}`, {
        token: checkTokenCookie(),
        discountCode:
          selectedDiscountSpecified !== null
            ? selectedDiscountSpecified.code
            : "",
        type: selectedOptionTransaction === 2 ? "ecoin" : "",
      });
      if (response && response.data) {
        console.log(response.data);
        setLoadingBuyingLostFunc(false);
      }
    }
  };
  const handleCreateCustomPrint = async (e) => {
  e.preventDefault();
  setLoadingButtonModalCreate(true);

  if (selectedFilePrint) {
    // Check if the selected file is an image
    if (selectedFilePrint.type.startsWith('image/')) {
      const response = await axios.post(
        `${network}/createProductAPI`,
        {
          token: checkTokenCookie(),
          type: "user_series",
          category_id: 0,
          sale_price: 0,
          name: `Mẫu thiết kế ${Math.floor(Math.random() * 100001)}`,
          background: selectedFilePrint,
        },
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      if (response && response.data && response.data.code === 0) {
        setLoadingButtonModalCreate(false);
        setOpenModalCreating(false);
        setLoadingAwesome(true);
        document.body.style.overflowY = "auto";

        setTimeout(function () {
          setLoadingAwesome(false);

          navigate(`/design`, {
            state: { id: response.data.product_id, token: checkTokenCookie() },
          });
        }, 1500);
      }
    } else {
      console.log("The selected file is not an image");
            toast.error("Chỉ chấp nhận file png, jpg hoặc jpeg");

    }
  } else {
    console.log("Không thấy ảnh");
  }
};

  const handleCreateCustom = async (e) => {
    e.preventDefault();
    setLoadingButtonModalCreate(true);

    if (selectedFile) {
      const response = await axios.post(
        `${network}/createProductAPI`,
        {
          token: checkTokenCookie(),
          type: "user_create",
          category_id: 0,
          sale_price: 0,
          name: `Mẫu thiết kế ${Math.floor(Math.random() * 100001)}`,
          background: selectedFile,
        },
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      if (response && response.data && response.data.code === 0) {
        setLoadingButtonModalCreate(false);
        setOpenModalCreating(false);
        setLoadingAwesome(true);
        document.body.style.overflowY = "auto";

        setTimeout(function () {
          setLoadingAwesome(false);

          navigate(`/design`, {
            state: { id: response.data.product_id, token: checkTokenCookie() },
          });
        }, 1500);
      }
    } else {
      console.log("Không thấy ảnh");
    }
    // 23979
    // console.log(response.data);
    // console.log(selectedFile)
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
              <div style={textHeader} onClick={() => navigate("/")}>
                Trang chủ
              </div>

              <div style={textHeader}>Tính năng</div>
              <div style={textHeader}>Mẫu thiết kế nổi bật</div>
              <div style={textHeader}>Hướng dẫn sử dụng</div>
              <div style={textHeader}>BLOG</div>
              <div style={textHeader}>Liên hệ</div>
              <Box sx={{ flexGrow: 1 }} />
              <Box
                sx={{
                  display: { xs: "none", md: "flex" },
                  flexDirection: "row", // Đặt hướng của flexbox là cột
                  alignItems: "center", // Đặt căn giữa theo chiều ngang
                  position: "relative",
                }}
              >
                <Tooltip title="Tải xuống ứng dụng">
                  <IconButton
                    size="large"
                    aria-label="show 4 new mails"
                    color="inherit"
                    title="Tải xuống ứng dụng"
                    onClick={() => {
                      navigate("/download");
                      window.scrollTo({
                        top: 0,
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
                    position: "relative",
                  }}
                  onClick={() => {
                    if (authentication) {
                      window.scrollTo({
                        top: 0,
                        behavior: "smooth",
                      });
                      setCreatingBucket(!creatingBucket);
                      // setOpenModalCreating(true);
                    } else {
                      navigate("/login");
                    }
                  }}
                >
                  Tạo thiết kế
                </Button>
                {creatingBucket && (
                  <div className="new-creating---template___dashboard">
                    <div
                      style={{
                        paddingLeft: 12,
                        paddingTop: 5,
                        overflowX: "hidden",
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "center",
                        paddingBottom: 5,
                        cursor: "pointer",
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.backgroundColor =
                          "rgb(242, 243, 245)";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.backgroundColor = "white";
                      }}
                      onClick={() => {
                        setCreatingBucket(false);
                        setOpenModalCreating(true);
                        document.body.style.overflowY = "hidden";
                      }}
                    >
                      <svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M3 6.165V19a2 2 0 0 0 2 2h12.835c-.06-.05-.12-.102-.176-.159L16.318 19.5H5a.5.5 0 0 1-.5-.5V7.682L3.159 6.341A2.275 2.275 0 0 1 3 6.165ZM17.28 4.22a.75.75 0 0 1 0 1.06l-2 2a.75.75 0 1 1-1.06-1.06l.72-.72H6.56l.72.72a.75.75 0 0 1-1.06 1.06l-2-2a.75.75 0 0 1 0-1.06l2-2a.75.75 0 0 1 1.06 1.06L6.56 4h8.38l-.72-.72a.75.75 0 0 1 1.06-1.06l2 2ZM19.78 19.78a.75.75 0 0 1-1.06 0l-2-2a.75.75 0 1 1 1.06-1.06l.72.72V9.06l-.72.72a.75.75 0 1 1-1.06-1.06l2-2a.75.75 0 0 1 1.06 0l2 2a.75.75 0 0 1-1.06 1.06L20 9.06v8.38l.72-.72a.75.75 0 1 1 1.06 1.06l-2 2Z"
                          fill="black"
                        ></path>
                      </svg>
                      <p
                        style={{
                          margin: 0,
                          paddingLeft: 10,
                          color: "rgb(13, 18, 22)",
                          fontWeight: 400,
                          fontFamily: "Noto Sans",
                          fontSize: "14px",
                        }}
                      >
                        Cỡ tùy chỉnh
                      </p>
                    </div>
                    <div
                      style={{
                        paddingLeft: 12,
                        paddingTop: 5,
                        overflowX: "hidden",
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "center",
                        paddingBottom: 5,
                        borderBottom: "0.5px solid rgb(191, 196, 200)",
                        cursor: "pointer",
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.backgroundColor =
                          "rgb(242, 243, 245)";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.backgroundColor = "white";
                      }}
                      onClick={() => {
                        setCreatingBucket(false);
                        setOpenModalPrintCreating(true);
                        document.body.style.overflowY = "hidden";
                      }}
                    >
                      <img
                        src={paperRoll}
                        alt=""
                        style={{ width: 24, height: 24 }}
                      />
                      <p
                        style={{
                          margin: 0,
                          paddingLeft: 10,
                          color: "rgb(13, 18, 22)",
                          fontWeight: 400,
                          fontFamily: "Noto Sans",
                          fontSize: "14px",
                        }}
                      >
                        Mẫu in hàng loạt
                      </p>
                    </div>
                    <p
                      style={{
                        margin: 0,
                        color: "rgba(13, 18, 22, 0.7)",
                        fontSize: "14px",
                        fontWeight: 600,
                        paddingTop: 5,
                        paddingLeft: 12,
                      }}
                    >
                      Đề xuất
                    </p>
                    <div style={{ display: "flex", flexDirection: "column" }}>
                      {dataSizeBox.map((data, index) => {
                        return (
                          <div
                            key={index}
                            style={{
                              paddingLeft: 12,
                              paddingTop: 5,
                              overflowX: "hidden",
                              display: "flex",
                              flexDirection: "row",
                              alignItems: "center",
                              paddingBottom: 5,
                              cursor: "pointer",
                            }}
                            data-size={index}
                            onMouseEnter={(e) => {
                              e.currentTarget.style.backgroundColor =
                                "rgb(242, 243, 245)";
                              // setHoveredIndex(index)
                            }}
                            onMouseLeave={(e) => {
                              e.currentTarget.style.backgroundColor = "white";
                              // setHoveredIndex(null)
                            }}
                            onClick={() => {
                              handleCreate(data);
                              // console.log(data)
                            }}
                          >
                            <img
                              src={data.icon}
                              alt=""
                              style={{ width: 24, height: 24 }}
                            />
                            <p
                              style={{
                                margin: 0,
                                paddingLeft: 10,
                                color: "rgb(13, 18, 22)",
                                fontWeight: 400,
                                fontFamily: "Noto Sans",
                                fontSize: "14px",
                              }}
                            >
                              {data.name}
                            </p>
                            {
                              <span
                                style={{
                                  margin: 0,
                                  paddingLeft: 10,
                                  color: "rgb(13, 18, 22)",
                                  fontWeight: 400,
                                  fontFamily: "Noto Sans",
                                  fontSize: "12px",
                                  color: "rgba(13, 18, 22, 0.7)",
                                }}
                              >
                                {data.width} x {data.height} px
                              </span>
                            }
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}
              </Box>

              <Box sx={{ flexGrow: 0, marginLeft: "20px" }}>
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
              transformStyle: "unset",
              overflowY: "hidden",
              scrollbarWidth: "none",
              // boxSizing: "content-box",
              transition: "1s", // Add a transition for smooth effect
              paddingRight: 120,
              "&:hover": {
                overflowY: "auto",
                transition: "1s", // Add a transition for smooth effect
              },
              "&:hover .MuiDrawer-paper": {
                overflowY: "auto",
                transition: "1s", // Add a transition for smooth effect
              },
              "& .MuiDrawer-paper": {
                width: drawerWidth,
                // boxSizing: "border-box",
                // overflowY: "hidden",
                overflowY: "hidden", // Hide the scrollbar
                transition: "1s", // Add a transition for smooth effect
              },
              "&::-webkit-scrollbar": {
                display: "none",
              },
            }}
            variant="persistent"
            anchor="left"
            open={true}
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
                {authentication && infoUser[0]?.member_pro && (
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
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "row",
                          alignItems: "center",
                        }}
                      >
                        <img
                          src={banknote}
                          alt=""
                          style={{ width: 20, height: 20 }}
                        />
                        <p
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
                        </p>
                      </div>
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "row",
                          alignItems: "center",
                        }}
                      >
                        <img
                          src={coin}
                          alt=""
                          style={{ width: 20, height: 20 }}
                        />
                        <p
                          style={{
                            color: "rgba(13, 18, 22, 0.7)",
                            fontSize: "15px",
                            fontFamily:
                              "Noto Sans Vietnamese,-apple-system,BlinkMacSystemFont,Segoe UI,Helvetica,Arial,sans-serif",
                            lineHeight: "0px",
                            paddingLeft: 5,
                          }}
                        >
                          : <b>{infoUser[0]?.ecoin} eCoin</b>
                        </p>
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>

            {authentication && (
              <Link
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
                  marginBottom: "10px",
                  cursor: "pointer",
                  paddingTop: "7px",
                  paddingBottom: "7px",
                }}
                to="/modal"
                state={{ previousLocation: location }}
              >
                <CrownIcon style={{ marginLeft: "-10px" }} />
                <span
                  style={{
                    paddingRight: "10px",
                    paddingLeft: "5px",
                    fontSize: 14,
                  }}
                >
                  Nạp tiền
                </span>
              </Link>
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
                    location.pathname === "/collection-all"
                      ? "#ccc"
                      : "transparent",
                  marginBottom: 5,
                  borderRadius: 5,
                }}
              >
                <Link
                  to="/collection-all"
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
                    location.pathname === "/project" ||
                    location.pathname === "/project/recommend" ||
                    location.pathname === "/project/youtube" ||
                    location.pathname === "/project/cooking" ||
                    location.pathname === "/project/logo" ||
                    location.pathname === "/project/congrat" ||
                    location.pathname === "/project/banner" ||
                    location.pathname === "/project/more"
                      ? "#ccc"
                      : "transparent",
                  borderRadius: "5px",
                }}
              >
                <Link
                  to="/project/recommend"
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
                        location.pathname === "/your-design/purchase-form" ||
                        location.pathname === "/your-design/sale-sample" ||
                        location.pathname === "/your-design/printed-form"
                          ? "#ccc"
                          : "transparent",
                      borderRadius: "5px",
                    }}
                  >
                    <Link
                      to="/your-design/purchase-form"
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
                        location.pathname === "/ordered"
                          ? "#ccc"
                          : "transparent",
                      borderRadius: "10px",
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
                        location.pathname ===
                          "/your-collection/purchase-collection" ||
                        location.pathname === "/your-collection/sale-collection"
                          ? "#ccc"
                          : "transparent",
                      borderRadius: "10px",
                    }}
                  >
                    <Link
                      to="/your-collection/purchase-collection"
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
                        location.pathname === "/transaction/table-1" ||
                        location.pathname === "/transaction/table-2"
                          ? "#ccc"
                          : "transparent",
                      borderRadius: "5px",
                    }}
                  >
                    <Link
                      to="/transaction"
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
                      Tổng quan giao dịch
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
                    {infoUser[0]?.member_pro ? (
                      <div
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
                          cursor: "pointer",
                        }}
                        onClick={() => {
                          navigate("/");
                          setOpenModalPro(true);
                          document.body.style.overflowY = "hidden";
                          window.scrollTo({
                            top: 0,
                            behavior: "smooth", // This makes the scroll animation smooth
                          });
                        }}
                      >
                        <img
                          src={repeater}
                          alt=""
                          style={{ marginRight: 5, height: 20, width: 20 }}
                        />
                        {"Gia hạn bản PRO"}
                      </div>
                    ) : (
                      <div
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
                          cursor: "pointer",
                        }}
                        onClick={() => {
                          navigate("/");
                          setOpenModalPro(true);
                          document.body.style.overflowY = "hidden";
                          window.scrollTo({
                            top: 0,
                            behavior: "smooth", // This makes the scroll animation smooth
                          });
                        }}
                      >
                        <img
                          src={repeater}
                          alt=""
                          style={{ marginRight: 5, height: 20, width: 20 }}
                        />
                        {"Dùng thử bản PRO"}
                      </div>
                    )}
                  </li>
                  {/* <li
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
                        marginTop: "15.2px",
                      }}
                      onClick={() => navigate("/download")}
                    >
                      <DownloadIcon style={{ color: "white" }} />
                      <p style={{ paddingLeft: 3 }}>Tải ứng dụng</p>
                    </Button>
                  </li> */}
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
                    {infoUser[0]?.member_pro
                      ? "Gia hạn Ezpics Pro"
                      : "Dùng thử Ezpics Pro"}
                  </h2>

                  {contentProExtend ? (
                    <>
                      <div
                        class="container"
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          alignItems: "flex-start",
                          paddingLeft: 0,
                        }}
                      >
                        <form
                          style={{
                            paddingLeft: 0,
                            justifyContent: "flex-start",
                            flexDirection: "column",
                          }}
                        >
                          <label>
                            <input
                              type="radio"
                              name="radio"
                              onChange={(e) => handleRadioChange(e)}
                              value={1}
                            />
                            <span>Bản 1 tháng</span>
                          </label>
                          <p
                            style={{
                              margin: 0,
                              marginLeft: "30px",
                              fontWeight: 400,
                              fontFamily: "Noto Sans",
                              fontSize: 12,
                              paddingBottom: 5,
                            }}
                          >
                            200.000 ₫ <b>hoặc</b> 200 eCoin
                          </p>
                          <label>
                            <input
                              type="radio"
                              name="radio"
                              onChange={(e) => handleRadioChange(e)}
                              value={2}
                            />
                            <span>
                              Bản 12 tháng{" "}
                              <b
                                style={{
                                  color: "red",
                                  fontSize: 15,
                                  fontWeight: 400,
                                }}
                              >
                                &nbsp;(Khuyến nghị)
                              </b>
                            </span>
                          </label>
                          <p
                            style={{
                              margin: 0,
                              marginLeft: "30px",
                              fontWeight: 400,
                              fontFamily: "Noto Sans",
                              fontSize: 12,
                              color: "rgb(13, 18, 22)",
                            }}
                          >
                            1.999.000 ₫ <b>hoặc</b> 2000 eCoin
                          </p>
                        </form>
                        <div
                          style={{
                            display: "flex",
                            flexDirection: "row",
                            alignItems: "center",
                          }}
                        >
                          <span>
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="24"
                              height="24"
                              viewBox="0 0 24 24"
                            >
                              <path
                                fill="rgb(12, 134, 21)"
                                d="M4.53 11.9 9 16.38 19.44 5.97a.75.75 0 0 1 1.06 1.06L9.53 17.97c-.3.29-.77.29-1.06 0l-5-5c-.7-.71.35-1.77 1.06-1.07z"
                              ></path>
                            </svg>
                          </span>
                          <p
                            style={{
                              margin: 0,
                              marginLeft: 5,
                              fontSize: "14px",
                              fontFamily: "Noto Sans",
                              fontWeight: 400,
                            }}
                          >
                            Chức năng xóa nền tự dộng
                          </p>{" "}
                        </div>
                        <div
                          style={{
                            display: "flex",
                            flexDirection: "row",
                            alignItems: "center",
                          }}
                        >
                          <span>
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="24"
                              height="24"
                              viewBox="0 0 24 24"
                            >
                              <path
                                fill="rgb(12, 134, 21)"
                                d="M4.53 11.9 9 16.38 19.44 5.97a.75.75 0 0 1 1.06 1.06L9.53 17.97c-.3.29-.77.29-1.06 0l-5-5c-.7-.71.35-1.77 1.06-1.07z"
                              ></path>
                            </svg>
                          </span>
                          <p
                            style={{
                              margin: 0,
                              marginLeft: 5,
                              fontSize: "14px",
                              fontFamily: "Noto Sans",
                              fontWeight: 400,
                            }}
                          >
                            Hỗ trợ khách hàng 24/7
                          </p>{" "}
                        </div>
                        <div
                          style={{
                            display: "flex",
                            flexDirection: "row",
                            alignItems: "center",
                          }}
                        >
                          <span>
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="24"
                              height="24"
                              viewBox="0 0 24 24"
                            >
                              <path
                                fill="rgb(12, 134, 21)"
                                d="M4.53 11.9 9 16.38 19.44 5.97a.75.75 0 0 1 1.06 1.06L9.53 17.97c-.3.29-.77.29-1.06 0l-5-5c-.7-.71.35-1.77 1.06-1.07z"
                              ></path>
                            </svg>
                          </span>
                          <p
                            style={{
                              margin: 0,
                              marginLeft: 5,
                              fontSize: "14px",
                              fontFamily: "Noto Sans",
                              fontWeight: 400,
                            }}
                          >
                            Viết content tự động
                          </p>{" "}
                        </div>
                        <div
                          style={{
                            display: "flex",
                            flexDirection: "row",
                            alignItems: "center",
                          }}
                        >
                          <span>
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="24"
                              height="24"
                              viewBox="0 0 24 24"
                            >
                              <path
                                fill="rgb(12, 134, 21)"
                                d="M4.53 11.9 9 16.38 19.44 5.97a.75.75 0 0 1 1.06 1.06L9.53 17.97c-.3.29-.77.29-1.06 0l-5-5c-.7-.71.35-1.77 1.06-1.07z"
                              ></path>
                            </svg>
                          </span>
                          <p
                            style={{
                              margin: 0,
                              marginLeft: 5,
                              fontSize: "14px",
                              fontFamily: "Noto Sans",
                              fontWeight: 400,
                            }}
                          >
                            Nhận hoa hồng khi giới thiệu người dùng vĩnh viễn
                          </p>{" "}
                        </div>
                        <p
                          style={{
                            marginTop: 5,
                            marginLeft: 5,
                            fontSize: "14px",
                            fontFamily: "Noto Sans",
                            fontWeight: 500,
                            color: "rgb(255, 66, 78)",
                            marginBottom: 0,
                          }}
                        >
                          Tặng 1 bộ sưu tập 500 mẫu Ezpics
                        </p>
                        <p
                          style={{
                            margin: 0,
                            fontSize: "13px",
                            fontFamily: "Noto Sans",
                            fontWeight: 400,
                          }}
                        ></p>
                        <form
                          style={{
                            paddingLeft: 0,
                            justifyContent: "flex-start",
                            flexDirection: "row",
                          }}
                        >
                          <label>
                            <input
                              type="radio"
                              name="radio"
                              onChange={(e) => handleRadioChangeTransaction(e)}
                              value={1}
                            />
                            <span>Mua bằng tiền mặt</span>
                          </label>

                          <label>
                            <input
                              type="radio"
                              name="radio"
                              onChange={(e) => handleRadioChangeTransaction(e)}
                              value={2}
                            />
                            <span>Mua bằng eCoin</span>
                          </label>
                        </form>
                        {/*  */}
                      </div>

                      {selectedDiscountSpecified !== null && (
                        <div
                          style={{
                            width: "95%",
                            display: "flex",
                            flexDirection: "row",
                            justifyContent: "space-between",
                            alignItems: "flex-end",
                            position: "absolute",
                            bottom: "20%",
                          }}
                        >
                          <div
                            style={{
                              width: "100%",
                              height: 50,
                              flexShrink: 0,
                              border: "1px solid rgb(255, 66, 78)",
                              borderRadius: "10px",
                              display: "flex",
                              cursor: "pointer",
                            }}
                          >
                            <div
                              style={{
                                width: "30%",
                                backgroundColor: "rgb(255, 66, 78)",
                                height: "100%",
                                borderRadius: "10px",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                              }}
                            >
                              <p
                                style={{
                                  margin: 0,
                                  fontWeight: 500,
                                  fontSize: 20,
                                  color: "white",
                                }}
                              >
                                {selectedDiscountSpecified.name}
                              </p>
                            </div>
                            <div
                              style={{
                                width: "70%",
                                height: "100%",
                                borderRadius: "10px",
                                display: "flex",
                                flexDirection: "column",
                                justifyContent: "center",
                                paddingLeft: 10,
                                paddingTop: 5,
                                paddingBottom: 5,
                              }}
                            >
                              <p
                                style={{
                                  margin: 0,
                                  fontWeight: 500,
                                  fontSize: 17,
                                }}
                              >
                                {selectedDiscountSpecified.name}
                              </p>
                            </div>
                          </div>
                        </div>
                      )}
                      <div
                        style={{
                          width: "95%",
                          display: "flex",
                          flexDirection: "row",
                          justifyContent: "space-between",
                          alignItems: "flex-end",
                          position: "absolute",
                          bottom: "13%",
                        }}
                      >
                        <div
                          style={{
                            display: "flex",
                            flexDirection: "row",
                            alignItems: "flex-end",
                            // paddingBottom: '3px'
                          }}
                        >
                          <img
                            src={discount}
                            alt=""
                            style={{ width: 20, height: 20 }}
                          />
                          <p style={{ margin: 0, fontSize: 12 }}>
                            Ezpics Voucher
                          </p>
                        </div>
                        <p
                          style={{
                            margin: 0,
                            fontSize: 12,
                            color: "rgb(255, 66, 78)",
                            cursor: "pointer",
                          }}
                          onClick={() => {
                            document.body.style.overflowY = "hidden";
                            setModalProDiscount(true);
                          }}
                        >
                          Chọn để nhập mã
                        </p>
                      </div>
                      <button
                        style={{
                          marginBottom: "5%",
                          width: "95%",
                          height: 35,
                          borderRadius: 5,
                          backgroundColor:
                            selectedOption === null ||
                            selectedOptionTransaction === null
                              ? "gray"
                              : "rgb(255, 66, 78)",
                          border: "none",
                          color: "white",
                          position: "absolute",
                          fontSize: 15,
                          fontWeight: "bold",
                          bottom: 0,
                          alignSelf: "center",
                          cursor: "pointer",
                          transition: "opacity 0.5s ease", // Add transition effect
                          // opacity: contentProExtend ? 0 : 1, // Show or hide based on state
                        }}
                        onClick={() => handleTransactionPro()}
                        disabled={
                          selectedOption === null ||
                          selectedOptionTransaction === null
                        }
                      >
                        {loadingBuyingLostFunc ? (
                          <span className="loaderNew"></span>
                        ) : (
                          "Thanh toán"
                        )}
                      </button>
                    </>
                  ) : (
                    <>
                      <p
                        style={{
                          fontSize: "13px",
                          fontWeight: 400,
                          color: "rgb(13, 18, 22)",
                          fontFamily:
                            "Noto Sans Vietnamese,-apple-system,BlinkMacSystemFont,Segoe UI,Helvetica,Arial,sans-serif",
                          transition: "opacity 0.5s ease", // Add transition effect
                          opacity: contentProExtend ? 0 : 1, // Show or hide based on state
                        }}
                      >
                        Năng suất hơn. Mạnh mẽ hơn. Dùng thử những tính năng ưu
                        việt của chúng tôi.
                      </p>

                      <p
                        style={{
                          fontSize: "14px",
                          fontWeight: "bold",
                          paddingTop: "3%",
                          transition: "opacity 0.5s ease", // Add transition effect
                          opacity: contentProExtend ? 0 : 1, // Show or hide based on state
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
                        <p
                          style={{
                            fontSize: "14px",
                            margin: 0,
                            paddingLeft: 10,
                          }}
                        >
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
                        <img
                          src={paint}
                          alt=""
                          style={{ width: 15, height: 15 }}
                        />
                        <p
                          style={{
                            fontSize: "14px",
                            margin: 0,
                            paddingLeft: 10,
                          }}
                        >
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
                          backgroundColor: "rgb(255, 66, 78)",
                          border: "none",
                          color: "white",
                          fontSize: 15,
                          fontWeight: "bold",
                          position: "absolute",
                          bottom: 0,
                          alignSelf: "center",
                          cursor: "pointer",
                          transition: "opacity 0.5s ease", // Add transition effect
                          opacity: contentProExtend ? 0 : 1, // Show or hide based on state
                        }}
                        onClick={() => setContentProExtend(true)}
                      >
                        {infoUser[0]?.member_pro
                          ? "Gia hạn Ezpics Pro"
                          : "Đăng ký Ezpic Pro"}
                      </button>
                    </>
                  )}
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
                onClick={() => {
                  setContentProExtend(false);
                  setOpenModalPro(false);
                  setSelectedOption(null);
                  setSelectedDiscount(null);
                  setModalProDiscount(false);
                  setSelectedDiscountSpecified(null);
                  document.body.style.overflowY = "auto";
                }}
              />
            </div>
          </>
        )}
        {modalProDiscount && (
          <>
            <div className="ezpics-pro-modal" style={ezpicsProContainer}>
              <div
                className="container-modal-create"
                style={{
                  animation: "fadeIn 0.5s ease-in-out",
                  marginTop: "3%",
                }}
              >
                <div
                  className="card---create-newing"
                  style={{ paddingLeft: 20, paddingRight: 20 }}
                >
                  <p style={{ fontWeight: 600, fontSize: 20 }}>Chọn Voucher</p>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "space-between",
                      minWidth: "500px",
                      height: 300,
                      overflowY: "auto",
                    }}
                  >
                    {proDiscount.length > 0 ? (
                      proDiscount.map((discountValue, index) => (
                        <div
                          onClick={() => {
                            if (selectedDiscount === null) {
                              handleDiscountClick(index);
                            } else {
                              setSelectedDiscount(null);
                            }
                          }}
                          style={{
                            width: "100%",
                            height: 100,
                            flexShrink: 0,
                            border: "1px solid rgb(255, 66, 78)",
                            borderRadius: "10px",
                            display: "flex",
                            cursor: "pointer",
                            backgroundColor:
                              selectedDiscount === index
                                ? "rgba(255, 66, 78,0.5)"
                                : "white", // Change color based on selection
                          }}
                        >
                          <div
                            style={{
                              width: "30%",
                              backgroundColor: "rgb(255, 66, 78)",
                              height: "100%",
                              borderRadius: "10px",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                            }}
                          >
                            <p
                              style={{
                                margin: 0,
                                fontWeight: 500,
                                fontSize: 20,
                                color: "white",
                              }}
                            >
                              {discountValue.name}
                            </p>
                          </div>
                          <div
                            style={{
                              width: "70%",
                              height: "100%",
                              borderRadius: "10px",
                              display: "flex",
                              flexDirection: "column",
                              justifyContent: "space-between",
                              paddingLeft: 10,
                              paddingTop: 5,
                              paddingBottom: 5,
                            }}
                          >
                            <p
                              style={{
                                margin: 0,
                                fontWeight: 500,
                                fontSize: 17,
                              }}
                            >
                              {discountValue.name}
                            </p>
                            <p
                              style={{
                                margin: 0,
                                fontWeight: 500,
                                fontSize: 14,
                              }}
                            >
                              Số lượng : {discountValue.number_user}
                            </p>
                            <p
                              style={{
                                margin: 0,
                                fontWeight: 500,
                                fontSize: 14,
                              }}
                            >
                              Hạn sử dụng :{" "}
                              {parseTimestamp(discountValue.deadline_at)}
                            </p>
                          </div>
                        </div>
                      ))
                    ) : (
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                        }}
                      >
                        <p>Hiện tại chưa có mã giảm giá nào</p>
                      </div>
                    )}
                  </div>
                  <div
                    style={{
                      width: "100%",
                      height: 60,
                      display: "flex",
                      justifyContent: "flex-end",
                    }}
                  >
                    <Button
                      variant="contained"
                      size="medium"
                      style={{
                        marginLeft: "20px",
                        height: 40,
                        alignSelf: "center",
                        textTransform: "none",
                        color: "black",
                        backgroundColor: "white",
                        position: "relative",
                      }}
                      onClick={() => {
                        setModalProDiscount(false);
                        setSelectedDiscountSpecified(null);
                      }}
                    >
                      Hủy
                    </Button>
                    <Button
                      variant="contained"
                      size="medium"
                      style={{
                        marginLeft: "20px",
                        height: 40,
                        alignSelf: "center",
                        textTransform: "none",
                        color: "white",

                        position: "relative",
                        backgroundColor:
                          selectedDiscount === null
                            ? "gray"
                            : "rgb(255, 66, 78)",
                      }}
                      disabled={selectedDiscount === null}
                      onClick={() => {
                        if (selectedDiscount !== null) {
                          setSelectedDiscountSpecified(
                            proDiscount[selectedDiscount]
                          );
                          setModalProDiscount(false);
                        }
                        console.log(selectedDiscount);
                      }}
                    >
                      Chọn Voucher
                    </Button>
                  </div>
                  <img
                    src={xMark}
                    alt=""
                    style={{
                      width: 20,
                      height: 20,
                      marginRight: -30,
                      right: 0,
                      top: 0,
                      cursor: "pointer",
                      position: "absolute",
                    }}
                    onClick={() => {
                      setSelectedOption(null);
                      setSelectedDiscount(null);
                      setModalProDiscount(false);
                      setSelectedDiscountSpecified(null);
                      setSelectedOptionTransaction(null);
                      document.body.style.overflowY = "auto";
                    }}
                  />
                </div>
              </div>
            </div>
          </>
        )}
        {openModalPrintCreating && (
          // <Modal>
          <div className="ezpics-pro-modal" style={ezpicsProContainer}>
            <div
              className="container-modal-create"
              style={{ animation: "fadeIn 0.5s ease-in-out" }}
            >
              <div className="card---create-newing">
                <div className="card-image---create-newing">
                  <h2 className="card-heading---create-newing">
                    Bắt đầu tạo mẫu in hàng loạt <br></br>
                    <small style={{ fontSize: 15 }}>
                      Hãy điền đầy đủ thông tin trước khi tạo nhé
                    </small>
                  </h2>
                </div>

                <form className="card-form---create-newing">
                  {/* <div className="input---create-newing">
                      <input
                        type="text"
                        className="input-field---create-newing"
                        required
                      />
                      <label className="input-label---create-newing">
                        Tên mẫu thiết kế
                      </label>
                    </div> */}

                  <div className="input---create-newing">
                    {/* <input type="file" className="input-field" required accept="image/png, image/jpeg"/>
                     */}
                    <label className="input-label---create-newing">
                      Ảnh nền
                    </label>

                    <form
                      id="file-upload-form"
                      class="uploader"
                      style={{ marginTop: 40 }}
                    >
                      <input
                        id="file-upload"
                        type="file"
                        name="fileUpload"
                        accept="image/*"
                        onChange={handleFileChangePrint}
                      />

                      <label
                        for="file-upload"
                        id="file-drag"
                        style={{ height: 200, cursor: "pointer" }}
                      >
                        <img
                          id="file-image"
                          src="#"
                          alt="Preview"
                          class="hidden"
                        />
                        <div id="start---create-newing">
                          <img
                            src={downloadIcon}
                            alt=""
                            style={{
                              width: 30,
                              height: 30,
                              alignSelf: "center",
                              margin: "0 auto",
                              marginBottom: "2%",
                            }}
                          />
                          <div id="notimage" class="hidden">
                            Hãy chọn ảnh
                          </div>
                          <span id="file-upload-btn" class="btn btn-primary">
                            {selectedFilePrint === null
                              ? "Chọn ảnh"
                              : "Chọn lại"}
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
                    {selectedFilePrint !== null ? (
                      <button
                        className="action-button---create-newing"
                        style={{
                          cursor: "pointer",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                        onClick={(e) => handleCreateCustomPrint(e)}
                      >
                        {loadingButtonModalCreate ? (
                          <span class="loader-create-film"></span>
                        ) : (
                          "Bắt đầu tạo mẫu"
                        )}
                      </button>
                    ) : (
                      <button
                        className="action-button---create-newing"
                        style={{ backgroundColor: "rgba(255, 66, 78,0.3)" }}
                        disabled
                      >
                        Bắt đầu tạo mẫu
                      </button>
                    )}
                  </div>
                </form>
                <div className="card-info---create-newing">
                  <p>
                    Nếu bạn chưa có thông tin, hãy tham khảo
                    <a href="#"> Mẫu thiết kế có sẵn</a>
                  </p>
                </div>
                <img
                  src={xMark}
                  alt=""
                  style={{
                    width: 20,
                    height: 20,
                    marginRight: -30,
                    right: 0,
                    top: 0,
                    cursor: "pointer",
                    position: "absolute",
                  }}
                  onClick={() => {
                    setOpenModalPrintCreating(false);
                    document.body.style.overflowY = "auto";
                  }}
                />
              </div>
            </div>
          </div>
          // </Modal>
        )}
        {openModalCreating && (
          // <Modal>
          <div className="ezpics-pro-modal" style={ezpicsProContainer}>
            <div
              className="container-modal-create"
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
                  {/* <div className="input---create-newing">
                      <input
                        type="text"
                        className="input-field---create-newing"
                        required
                      />
                      <label className="input-label---create-newing">
                        Tên mẫu thiết kế
                      </label>
                    </div> */}

                  <div className="input---create-newing">
                    {/* <input type="file" className="input-field" required accept="image/png, image/jpeg"/>
                     */}
                    <label className="input-label---create-newing">
                      Ảnh nền
                    </label>

                    <form
                      id="file-upload-form"
                      class="uploader"
                      style={{ marginTop: 40 }}
                    >
                      <input
                        id="file-upload"
                        type="file"
                        name="fileUpload"
                        accept="image/*"
                        onChange={handleFileChange}
                      />

                      <label
                        for="file-upload"
                        id="file-drag"
                        style={{ height: 200, cursor: "pointer" }}
                      >
                        <img
                          id="file-image"
                          src="#"
                          alt="Preview"
                          class="hidden"
                        />
                        <div id="start---create-newing">
                          <img
                            src={downloadIcon}
                            alt=""
                            style={{
                              width: 30,
                              height: 30,
                              alignSelf: "center",
                              margin: "0 auto",
                              marginBottom: "2%",
                            }}
                          />
                          <div id="notimage" class="hidden">
                            Hãy chọn ảnh
                          </div>
                          <span id="file-upload-btn" class="btn btn-primary">
                            {selectedFile === null ? "Chọn ảnh" : "Chọn lại"}
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
                    {selectedFile !== null ? (
                      <button
                        className="action-button---create-newing"
                        style={{
                          cursor: "pointer",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                        onClick={(e) => handleCreateCustom(e)}
                      >
                        {loadingButtonModalCreate ? (
                          <span class="loader-create-film"></span>
                        ) : (
                          "Bắt đầu tạo mẫu"
                        )}
                      </button>
                    ) : (
                      <button
                        className="action-button---create-newing"
                        style={{ backgroundColor: "rgba(255, 66, 78,0.3)" }}
                        disabled
                      >
                        Bắt đầu tạo mẫu
                      </button>
                    )}
                  </div>
                </form>
                <div className="card-info---create-newing">
                  <p>
                    Nếu bạn chưa có thông tin, hãy tham khảo
                    <a href="#"> Mẫu thiết kế có sẵn</a>
                  </p>
                </div>
                <img
                  src={xMark}
                  alt=""
                  style={{
                    width: 20,
                    height: 20,
                    marginRight: -30,
                    right: 0,
                    top: 0,
                    cursor: "pointer",
                    position: "absolute",
                  }}
                  onClick={() => {
                    setOpenModalCreating(false);
                    document.body.style.overflowY = "auto";
                  }}
                />
              </div>
            </div>
          </div>
          // </Modal>
        )}
        {loadingAwesome && (
          <div
            className="preserve-3d"
            style={{
              position: "absolute",
              width: "100%",
              height: "100%",
              backgroundColor: "rgba(0,0,0,0.4)",
              zIndex: 99999,
              transition: "fadeIn 2s ease-in-out",
              display: "flex",
              justifyContent: "center",
              boxSizing: "border-box",
              paddingTop: "20%",
              transformStyle: "preserve-3d",
            }}
          >
            <div class="loader-loading---css"></div>
          </div>
        )}
      </Box>
    </>
  );
}
