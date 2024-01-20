import React, { useEffect } from "react";
import "./Category.css";
import { styled, useTheme } from "@mui/material/styles";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import "./loadingFavorite.css";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import confirmBuying from "./shopping-bag.png";
import { toast, ToastContainer } from "react-toastify";
import Slider from "@mui/material/Slider";

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
import TravelExploreOutlinedIcon from "@mui/icons-material/TravelExploreOutlined";
import crown from "./crown.png";
import FavoriteIcon from "@mui/icons-material/Favorite";
import CheckIcon from "@mui/icons-material/Check";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import fbicon from "./fb.png";
import messicon from "./messenger.png";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import pinterest from "./pinterest.png";
import twitter from "./twitter.png";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Box from "@mui/material/Box";
import { CHANGE_VALUE_TOKEN } from "../../../store/slice/authSlice";
import { CHANGE_VALUE, DELETE_ALL_VALUES } from "../../../store/slice/infoUser";
import Cookies from "js-cookie";
import warning from "../../live-stream/warning.png";
import MuiInput from "@mui/material/Input";

function CollectionBuying({
  image = "https://down-vn.img.susercontent.com/file/a262ff1f44dab967e8e7d50c7bda514d",
  pro = true,
  price = 400000,
  discount = 299000,
  date = "2023-10-09T10:13:37+07:00",
  view = "40",
  user_id = "1232",
  color = "black",
  id_cart = 18934,
}) {
  const [loadingFavorite, setLoadingFavorite] = React.useState(false);
  const [tokenString, setTokenString] = React.useState("");
  const [modalExtend, setModalExtend] = React.useState(false);
  const styleModalBuyingFreeBuying = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "30%",
    height: 400,
    bgcolor: "background.paper",
    boxShadow: 24,
    display: "flex",
    alignItems: "center",
    flexDirection: "column",
    paddingTop: "15px",

    borderRadius: "15px",
  };
  const styleModalBuyingFreeBuyingSpecified = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "60%",
    height: 600,
    bgcolor: "background.paper",
    boxShadow: 24,
    display: "flex",
    alignItems: "center",
    flexDirection: "column",
    paddingTop: "15px",

    borderRadius: "15px",
  };
  const [value, setValue] = React.useState(30);
  const Input = styled(MuiInput)`
    width: 42px;
  `;
  const handleSliderChange = (event, newValue) => {
    setValue(newValue);
  };
  const handleCloseModalFreeExtend = () => {
    setModalExtend(false);
  };
  function setCookie(name, value, expirationHours) {
    var date = new Date();
    value = JSON.stringify(value);
    date.setTime(date.getTime() + expirationHours * 60 * 60 * 1000); // Chuyển đổi giờ thành mili giây
    var expires = "expires=" + date.toUTCString();
    document.cookie = name + "=" + value + ";" + expires + ";path=/";
  }
  const handleInputChange = (event) => {
    setValue(event.target.value === "" ? 0 : Number(event.target.value));
  };
  const [contentSelected, setContentSelected] = React.useState([]);

  const handleExtend = async () => {
    setLoadingBuyingFunc(true);
    try {
      const response = await axios.post(`${network}/extendWarehousesAPI`, {
        token: checkTokenCookie(),
        idWarehouse: id,
        number: value,
      });
      if (response && response.data.code === 1) {
        setLoadingBuyingFunc(false);
        setModalExtend(false);

        toast.success("Gia hạn mẫu thiết kế thành công !! 🦄", {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
        setTimeout(function () {
          window.location.reload();
        }, 1500);
      } else if (response && response.data.code === 4) {
        setLoadingBuyingFunc(false);
        setModalExtend(false);

        toast.error("Tài khoản không đủ tiền, hãy thử lại !!", {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
      } else {
        console.error("Invalid response format");
        setLoadingBuyingFunc(false);
      }
    } catch (error) {
      console.error("Error fetching data:", error.message);
      setLoadingBuyingFunc(false);
    }
  };
  const handleBlur = () => {
    if (value < 0) {
      setValue(0);
    } else if (value > 100) {
      setValue(100);
    }
  };
  const infoUser = useSelector((state) => state.user.info);
  const discountFake = 89;
  const itemsPerRow = 4; // Number of items per row

  const dispatch = useDispatch();
  const navigate = useNavigate();
  let location = useLocation();
  const [favorite, setFavorite] = React.useState(false);
  const { id } = useParams();
  const network = useSelector((state) => state.ipv4.network);
  const [userId, setUserId] = React.useState("");
  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 4.5,
      slidesToSlide: 2,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2,
      slidesToSlide: 2, // optional, default to 1.
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
      slidesToSlide: 1, // optional, default to 1.
    },
  };

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
  function tinhGiaBanDau(giaSauGiamGia, phanTramGiamGia) {
    // Kiểm tra nếu phần trăm giảm giá không hợp lệ
    if (phanTramGiamGia <= 0 || phanTramGiamGia >= 100) {
      console.error("Phần trăm giảm giá không hợp lệ.");
      return null;
    }

    // Tính giá ban đầu
    var giaBanDau = giaSauGiamGia / (1 - phanTramGiamGia / 100);

    return giaBanDau;
  }

  function checkMoneyCookie() {
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

      if (cookieName === "user_login") {
        tokenCookie = cookieValue;
        break;
      }
    }

    // Kiểm tra nếu đã tìm thấy cookie "token"
    if (tokenCookie) {
      return tokenCookie.trim();
    } else {
      console.log('Không tìm thấy cookie có tên là "token"');
    }
  }

  function checkIcoinCookie() {
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

      if (cookieName === "user_login") {
        tokenCookie = cookieValue;
        break;
      }
    }

    // Kiểm tra nếu đã tìm thấy cookie "token"
    if (tokenCookie) {
      return tokenCookie?.ecoin;
    } else {
      console.log('Không tìm thấy cookie có tên là "token"');
    }
  }
  const [loadingBuying, setLoadingBuying] = React.useState(false);
  function checkTokenCookieTrue() {
    // Lấy tất cả các cookies
    var allCookies = document.cookie;

    // Tách các cookies thành mảng
    var cookiesArray = allCookies.split(";");

    // Duyệt qua mỗi cookie để tìm cookie có tên là "token"
    for (var i = 0; i < cookiesArray.length; i++) {
      var cookie = cookiesArray[i].trim();
      // Kiểm tra xem cookie có bắt đầu bằng "token="
      if (cookie.indexOf("token=") === 0) {
        // Lấy giá trị của cookie
        var tokenValue = cookie.substring("token=".length, cookie.length);

        // Kiểm tra xem giá trị của cookie có rỗng hay không
        if (tokenValue !== "") {
          // Có token và không rỗng

          // setTokenString(tokenValue)
          return true;
        } else {
          // Có token nhưng rỗng
          console.log("Có token nhưng giá trị rỗng.");
          return false;
        }
      }
    }
  }
  const [loading, setLoading] = React.useState(true);
  const [modalLogoutDevice, setModalLogoutDevice] = React.useState(false);
  const handleLogoutDevice = () => {
    document.cookie = `user_login=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
    document.cookie = `token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
    dispatch(DELETE_ALL_VALUES());
    setModalLogoutDevice(false);
  };
  const open = useOutletContext();
  const formatPrice = (price) => {
    return new Intl.NumberFormat("vi-VN").format(price);
  };
  const drawerWidth = 240;
  const [data, setData] = React.useState([]);
  const token = useSelector((state) => state.auth.token);
  const [dataCreator, setDataCreator] = React.useState([]);
  const [dataProduct, setDataProduct] = React.useState([]);

  const getData = async () => {
    if (userId) {
      setLoading(true);

      try {
        const response = await axios.post(`${network}/getInfoUserAPI`, {
          idUser: userId,
        });
        if (response && response.data) {
          setDataCreator(response.data.data);
          console.log(response.data.data);
          setLoading(false);
        }
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    }
  };
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
  const [checkBuying, setCheckBuying] = React.useState(false);
  const getDataCheckBuying = async () => {
    if (userId) {
      setLoading(true);

      try {
        const response = await axios.post(`${network}/checkBuyWarehousesAPI`, {
          idWarehouse: id,
          token: checkTokenCookie(),
        });
        if (response && response.data.code === 1) {
          setCheckBuying(true);
          setLoading(false);
        } else if (response && response.data.code === 0) {
          setCheckBuying(false);
          setLoading(false);
        }
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    }
  };
  useEffect(() => {
    getDataCheckBuying();
  }, [id]);
  useEffect(() => {
    getData();
  }, [id]);
  const [dataInsideSpecified, setDataInsideSpecified] = React.useState([]);
  const getDataInsideWarehouse = async () => {
    try {
      const response = await axios.post(`${network}/getProductsWarehousesAPI`, {
        idWarehouse: id,
        limit: 100,
        page: 1,
        // token: "mfQEi80l2anIqZk1rHUxVdKJwAcPFO1702210289"
      });
      if (response && response.data.data) {
        setDataInsideSpecified(response.data.data);
        // setDataProduct(response.data?.data);
        // setUserId(response.data?.data?.user_id);
        // console.log(response.data);
        // setLoading(false);
      }
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };
  const getDataCategoryWarehouse = async () => {
    setLoading(true);

    try {
      const response = await axios.post(`${network}/getInfoWarehouseAPI`, {
        idWarehouse: id,
        // token: "mfQEi80l2anIqZk1rHUxVdKJwAcPFO1702210289"
      });
      if (response && response.data) {
        setDataProduct(response.data?.data);
        setUserId(response.data?.data?.user_id);
        console.log(response.data);
        setLoading(false);
      }
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  const getDataCategory = async () => {
    setLoading(true);

    try {
      const response = await axios.post(`${network}/getInfoProductAPI`, {
        id: id,
        // token: "mfQEi80l2anIqZk1rHUxVdKJwAcPFO1702210289"
      });
      if (response && response.data) {
      }
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };
  const styleModal = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "60%",
    height: "80%",
    bgcolor: "background.paper",
    boxShadow: 24,
    p: 4,
  };

  const styleModalBuyingFree = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "30%",
    height: "40%",
    bgcolor: "background.paper",
    boxShadow: 24,
    display: "flex",
    alignItems: "center",
    flexDirection: "column",
    paddingTop: "15px",

    borderRadius: "15px",
  };
  const [newids, setId] = React.useState(location.state?.id);
  useEffect(() => {
    getDataInsideWarehouse();
  }, [id]);
  useEffect(() => {
    getDataCategoryWarehouse();
  }, [id]);
  const [openModal, setOpenModal] = React.useState(false);
  const handleOpen = () => setOpenModal(true);
  const handleClose = () => {
    setSelectedOption(null);
    setOpenModal(false);
    setErrMessage(false);
    setErrMessageMoney(false);
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
    // because unescape has been deprecated, replaced with decodeURI
    //return unescape(dc.substring(begin + prefix.length, end));
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
  const [modalSpecifiedCategory, setModalSpecifiedCategory] =
    React.useState(false);
  const [modalBuyingFree, setModalBuyingFree] = React.useState(false);
  const authentication = checkAvailableLogin();
  const handleCloseModalFree = () => setModalBuyingFree(false);

  const handleBuying = async () => {
    if (!authentication) {
      navigate("/login", { replace: true });
    } else {
      if (
        dataProduct.sale_price === 0 ||
        (dataProduct.free_pro && infoUser[0]?.member_pro)
      ) {
        window.scrollTo({ top: 0, behavior: "smooth" });

        // setLoadingBuying(true)
        setModalBuyingFree(true);
        // const response = await axios.post
      } else {
        setOpenModal(true);
      }
    }
  };

  const handleFavorite = async () => {
    if (!authentication) {
      navigate("/login", { replace: true });
    } else {
      setLoadingFavorite(true);
      try {
        const response = await axios.post(`${network}/saveFavoriteProductAPI`, {
          product_id: id,
          token: checkTokenCookie(),
        });
        if (response && response.data && response.data.code === 0) {
          setFavorite(true);
          setLoadingFavorite(false);
          // saveFavoriteProductAPI
        } else {
          setFavorite(false);
          setLoadingFavorite(false);
          setModalLogoutDevice(true);
        }
      } catch (error) {
        console.error("Error fetching data:", error.message);
        setLoadingFavorite(false);
      }
    }
  };
  const [selectedOption, setSelectedOption] = React.useState(null);

  // Hàm xử lý sự kiện khi radio button thay đổi
  const handleRadioChange = (event) => {
    setSelectedOption(event.target.value);
    console.log(event.target.value);
    setErrMessage(false);
    setErrMessageMoney(false);
  };
  const deleteFavorite = async () => {
    setLoadingFavorite(true);
    try {
      const response = await axios.post(`${network}/deleteFavoriteProductAPI`, {
        product_id: id,
        token: checkTokenCookie(),
      });
      if (response && response.data && response.data.code === 0) {
        setFavorite(false);
        // saveFavoriteProductAPI
        setLoadingFavorite(false);
      } else {
        setFavorite(false);
        setLoadingFavorite(false);

        setModalLogoutDevice(true);
      }
    } catch (error) {
      console.error("Error fetching data:", error.message);
      setLoadingFavorite(false);
    }
  };
  const [loadingBuyingFunc, setLoadingBuyingFunc] = React.useState(false);
  const handleBuyingFreeFunc = async () => {
    setLoadingBuyingFunc(true);
    try {
      const response = await axios.post(`${network}/buyProductAPI`, {
        id: id,
        token: checkTokenCookie(),
        type: "ecoin",
      });
      if (response && response.data && response.data.code === 0) {
        // saveFavoriteProductAPI
        setLoadingBuyingFunc(false);
        handleCloseModalFree();
        toast.success("Mua mẫu thiết kế thành công", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
        setTimeout(function () {
          navigate(`/design`, {
            state: { id: response.data.product_id, token: checkTokenCookie() },
          });
        }, 2000);
      } else {
        console.error("Invalid response format");
        setLoadingBuyingFunc(false);
        setModalLogoutDevice(true);
      }
    } catch (error) {
      console.error("Error fetching data:", error.message);
      setLoadingBuyingFunc(false);
    }
  };
  const [errMessage, setErrMessage] = React.useState(false);
  const [errMessageMoney, setErrMessageMoney] = React.useState(false);

  const [loadingBuyingLostFunc, setLoadingBuyingLostFunc] =
    React.useState(false);
  const handleBuyingFunc = async () => {
    console.log(infoUser[0]?.account_balance);

    if (selectedOption === null) {
      setErrMessage(true);
    } else {
      if (selectedOption === "1" && infoUser[0]?.ecoin > dataProduct.ecoin) {
        console.log("th1");
        setLoadingBuyingLostFunc(true);

        try {
          const response1 = await axios.post(`${network}/buyProductAPI`, {
            id: id,
            token: checkTokenCookie(),
            type: "ecoin",
          });
          if (response1 && response1.data && response1.data.code === 0) {
            const response = await axios.post(`${network}/getInfoMemberAPI`, {
              token: checkTokenCookie(),
            });
            if (response && response.data.code === 0) {
              setLoadingBuyingLostFunc(false);
              setOpenModal(false);
              toast.success("Mua mẫu thiết kế thành công", {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
              });

              setTimeout(function () {
                navigate(`/design`, {
                  state: {
                    id: response1.data.product_id,
                    token: checkTokenCookie(),
                  },
                });
                setCookie("user_login", response.data.data, 1);
                dispatch(CHANGE_VALUE(response.data.data));
              }, 2000);
            }
          } else {
            console.error("Invalid response format");
            setLoadingBuyingLostFunc(false);
            setModalLogoutDevice(true);
          }
        } catch (error) {
          console.error("Error fetching data:", error.message);
          setLoadingBuyingLostFunc(false);
        }
      } else if (
        selectedOption === "2" &&
        infoUser[0]?.account_balance > dataProduct.sale_price
      ) {
        setLoadingBuyingLostFunc(true);
        console.log("th2");

        try {
          const response1 = await axios.post(`${network}/buyProductAPI`, {
            id: id,
            token: checkTokenCookie(),
          });
          if (response1 && response1.data && response1.data.code === 0) {
            // saveFavoriteProductAPI
            const response = await axios.post(`${network}/getInfoMemberAPI`, {
              token: token,
            });
            if (response && response.data.code === 0) {
              // setLoadingBuyingLostFunc(false);
              // setOpenModal(false);

              // window.location.reload();
              // setCookie("user_login", (response.data.data), 1);
              // dispatch(CHANGE_VALUE(response.data.data));
              // toast.success("Mua mẫu thiết kế thành công", {
              //   position: "top-right",
              //   autoClose: 5000,
              //   hideProgressBar: false,
              //   closeOnClick: true,
              //   pauseOnHover: true,
              //   draggable: true,
              //   progress: undefined,
              //   theme: "dark",
              // });
              setLoadingBuyingLostFunc(false);
              setOpenModal(false);
              toast.success("Mua mẫu thiết kế thành công", {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
              });

              setTimeout(function () {
                navigate(`/design`, {
                  state: {
                    id: response1.data.product_id,
                    token: checkTokenCookie(),
                  },
                });
                setCookie("user_login", response.data.data, 1);
                dispatch(CHANGE_VALUE(response.data.data));
              }, 2000);
            }
          } else {
            console.error("Invalid response format");
            setLoadingBuyingLostFunc(false);
            setErrMessageMoney(true);
            setModalLogoutDevice(true);
          }
        } catch (error) {
          console.error("Error fetching data:", error.message);
          setLoadingBuyingLostFunc(false);
        }
      } else {
        setErrMessageMoney(true);
        setLoadingBuyingLostFunc(false);
      }
    }
  };
  useEffect(() => {
    const checkFavoriteCategory = async () => {
      if (authentication) {
        try {
          const response = await axios.post(
            `${network}/checkFavoriteProductAPI`,
            {
              product_id: id,
              token: checkTokenCookie(),
            }
          );
          if (response && response.data && response.data.code === 1) {
            setFavorite(true);
          } else {
          }
        } catch (error) {
          console.error("Error fetching data:", error.message);
        }
      } else {
        setFavorite(false);
      }
    };
    checkFavoriteCategory();
  }, []);
  useEffect(() => {
    const getData = async () => {
      try {
        const response = await axios.post(`${network}/searchWarehousesAPI`, {
          limit: 40,
          page: 1,
        });
        if (response && response.data && response.data.data) {
          setData(response.data.data);

          setLoading(false);
        } else {
          console.error("Invalid response format");
          setLoading(false);
        }
      } catch (error) {
        console.error("Error fetching data:", error.message);
        setLoading(false);
      }
    };

    getData();
  }, []);
  const dataTime = (date) => {
    const dateObject = new Date(date);
    const year = dateObject.getFullYear();
    const month = dateObject.getMonth() + 1;
    const day = dateObject.getDate();
    return `Ngày ${day} Tháng ${month} Năm ${year}`;
  };
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
    // <Main
    //   open={open}
    //   style={{
    //     backgroundColor: "rgb(245, 245, 245)",
    //     paddingTop: "7%",
    //     flex: 1,
    //     paddingRight: "5%",
    //     paddingLeft: "5%",
    //   }}
    // >
    <div style={{ paddingTop: "6%", paddingLeft: "16%" }}>
      <div className="category-wrapper">
        <div className="category-wrapper__block">
          {/* <img
            src={dataProduct.image}
            alt=""
            className="category-wrapper__block---image"
          /> */}
          {loading ? (
            <Skeleton
              style={{
                minHeight: "400px",
                width: "80%",
                alignSelf: "center",
                marginLeft: "5%",
                marginTop: "6%",
              }}
            />
          ) : (
            <div className="category-wrapper__block---image----container">
              <img
                src={dataProduct.thumbnail}
                alt=""
                className="category-wrapper__block---image"
              />
            </div>
          )}
          {loading ? (
            <></>
          ) : (
            <div className="category-wrapper__block---bottom-image">
              <div className="category-wrapper__block---sharing">
                <p className="category-wrapper__block---title----price-----information------desc--------creator------name">
                  Chia sẻ:
                </p>
                <img
                  className="category-wrapper__block---title----price-----information------desc--------creator------avatar"
                  style={{ marginLeft: 10 }}
                  alt=""
                  src={fbicon}
                />
                <img
                  className="category-wrapper__block---title----price-----information------desc--------creator------avatar"
                  style={{ marginLeft: 10 }}
                  alt=""
                  src={twitter}
                />
                <img
                  className="category-wrapper__block---title----price-----information------desc--------creator------avatar"
                  style={{ marginLeft: 10 }}
                  alt=""
                  src={messicon}
                />
                <img
                  className="category-wrapper__block---title----price-----information------desc--------creator------avatar"
                  style={{ marginLeft: 10 }}
                  alt=""
                  src={pinterest}
                />
              </div>
              {/* <div></div> */}
              <div
                className="category-wrapper__block---sharing---secondary"
                // style={{ backgroundColor: "rgb(255, 66, 78)", color: "white",width: "40%" }}
              >
                <div
                  className="category-wrapper__block---sharing---secondary-----block"
                  // style={{ backgroundColor: "rgb(255, 66, 78)", color: "white",width: "40%" }}
                >
                  <FavoriteBorderOutlinedIcon
                    style={{ color: "rgb(255, 66, 78)" }}
                  />
                  <p className="category-wrapper__block---title----price-----information------desc--------creator------name">
                    Đã thích ({dataProduct.views})
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
        <div className="category-wrapper__block" style={{ width: "50%" }}>
          <div className="category-wrapper__block---title">
            {dataProduct.free_pro && (
              <img
                src={crown}
                className="category-wrapper__block---title----vip"
                alt=""
              />
            )}

            {loading ? (
              <Skeleton style={{ height: 30, width: 500 }} />
            ) : (
              <h1 className="category-wrapper__block---title----text">
                {dataProduct.name}
              </h1>
            )}
          </div>
          <div className="category-wrapper__block---title----price">
            {loading ? (
              <Skeleton style={{ height: 30, width: 100, marginLeft: 10 }} />
            ) : (
              <p className="category-wrapper__block---title----price-----deleted">
                ₫{formatPrice(tinhGiaBanDau(dataProduct.price, discountFake))}
              </p>
            )}
            {loading ? (
              <Skeleton style={{ height: 40, width: 150, marginLeft: 10 }} />
            ) : (
              <p className="category-wrapper__block---title----price-----newer">
                {dataProduct.price === 0
                  ? "Miễn phí"
                  : `₫ ${formatPrice(dataProduct.price)}`}
              </p>
            )}

            {loading ? (
              <Skeleton style={{ height: 30, width: 100, marginLeft: 10 }} />
            ) : (
              <p className="category-wrapper__block---title----price-----discount">
                {discountFake}% GIẢM
              </p>
            )}
          </div>
          {loading ? (
            <Skeleton
              style={{ height: 30, width: 200, marginLeft: 10, marginTop: 30 }}
            />
          ) : (
            <div
              className="category-wrapper__block---title----price-----information------desc"
              style={{ marginBottom: "10px", paddingTop: "10px" }}
            >
              <div className="category-wrapper__block---title----price-----information------desc--------title">
                <p className="category-wrapper__block---title----price-----information------desc--------title-------content">
                  Khuyến mãi
                </p>
              </div>
              <p
                className="category-wrapper__block---title----price-----discount"
                style={{
                  backgroundColor: "rgb(255, 245, 241)",
                  border: "1px solid rgb(255, 66, 78)",
                  color: "rgb(255, 66, 78)",
                }}
              >
                GIẢM MẠNH {discountFake}%
              </p>
            </div>
          )}
          {loading ? (
            <Skeleton
              style={{ height: 30, width: 200, marginLeft: 10, marginTop: 30 }}
            />
          ) : (
            <div className="category-wrapper__block---title----price-----information------desc">
              <div className="category-wrapper__block---title----price-----information------desc--------title">
                <p className="category-wrapper__block---title----price-----information------desc--------title-------content">
                  Tác giả
                </p>
              </div>
              <a
                href="/author"
                className="category-wrapper__block---title----price-----information------desc--------creator"
              >
                <img
                  className="category-wrapper__block---title----price-----information------desc--------creator------avatar"
                  alt=""
                  src={dataCreator?.avatar}
                />
                <p className="category-wrapper__block---title----price-----information------desc--------creator------name">
                  {dataCreator?.name}
                </p>
              </a>
            </div>
          )}
          {loading ? (
            <Skeleton
              style={{ height: 30, width: 200, marginLeft: 10, marginTop: 30 }}
            />
          ) : (
            <div className="category-wrapper__block---title----price-----information------desc">
              <div className="category-wrapper__block---title----price-----information------desc--------title">
                <p className="category-wrapper__block---title----price-----information------desc--------title-------content">
                  Số ngày sử dụng :
                </p>
              </div>
              <p
                // className="category-wrapper__block---title----price-----information------desc--------title-------content"
                style={{
                  color: "black",
                  padding: 0,
                  margin: 0,
                  fontWeight: "500",
                  paddingLeft: 20,
                }}
              >
                &nbsp;{dataProduct.date_use} ngày
              </p>
            </div>
          )}

          {loading ? (
            <Skeleton
              style={{ height: 30, width: 200, marginLeft: 10, marginTop: 30 }}
            />
          ) : (
            <div className="category-wrapper__block---title----price-----information------desc">
              <div className="category-wrapper__block---title----price-----information------desc--------title">
                <p className="category-wrapper__block---title----price-----information------desc--------title-------content">
                  Lượt xem :
                </p>
              </div>
              <p
                // className="category-wrapper__block---title----price-----information------desc--------title-------content"
                style={{
                  color: "black",
                  padding: 0,
                  margin: 0,
                  fontWeight: "500",
                }}
              >
                {view} người
              </p>
            </div>
          )}

          {loading ? (
            <div style={{ display: "flex", flexDirection: "row" }}>
              <Skeleton
                style={{
                  height: 50,
                  width: 170,
                  marginLeft: 15,
                  marginTop: 30,
                }}
              />
              <Skeleton
                style={{
                  height: 50,
                  width: 170,
                  marginLeft: 15,
                  marginTop: 30,
                }}
              />
            </div>
          ) : (
            <div className="category-wrapper__block---title----buttonContainer">
              <button
                className="category-wrapper__block---title----button"
                style={{
                  backgroundColor: "rgb(255, 245, 241)",
                  border: "1px solid rgb(255, 66, 78)",
                  color: "rgb(255, 66, 78)",
                  width: "200px",
                  cursor: "pointer",
                  animation: "thumbs-up 2s linear infinite",
                }}
                onClick={() => setModalSpecifiedCategory(true)}
              >
                {loadingFavorite ? (
                  <span class="loader-favorite"></span>
                ) : (
                  <>Chi tiết sản phẩm</>
                )}
              </button>
              <button
                className="category-wrapper__block---title----button"
                style={{
                  backgroundColor: "rgb(255, 66, 78)",
                  color: "white",
                  cursor: "pointer",
                }}
                onClick={() => setModalExtend(true)}
              >
                {loadingBuying ? (
                  <span class="loader"></span>
                ) : (
                  <>{checkBuying ? "Gia hạn ngay" : "Mua ngay"}</>
                )}
              </button>
            </div>
          )}
        </div>
      </div>

      <div
        className="category-wrapper"
        style={{
          flexDirection: "column",
          paddingLeft: "3%",
          paddingBottom: "3%",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            width: "100%",
            alignItems: "center",
            paddingRight: "3%",
          }}
        >
          {loading ? (
            <Skeleton
              style={{ height: 30, width: 200, marginLeft: 10, marginTop: 30 }}
            />
          ) : (
            <p style={{ fontSize: 18, fontWeight: "bold" }}>
              Bộ sưu tập bạn có thể thích
            </p>
          )}
          {loading ? (
            <Skeleton
              style={{ height: 30, width: 200, marginLeft: 10, marginTop: 30 }}
            />
          ) : (
            <a
              href="/author"
              style={{
                textDecoration: "underline",
                fontWeight: "bold",
                fontSize: "15px",
                color: "rgb(255, 66, 78)",
              }}
            >
              Xem tất cả
            </a>
          )}
        </div>
        {loading ? (
          <Carousel
            swipeable={false}
            responsive={responsive}
            ssr={true}
            infinite={true}
            autoPlaySpeed={1000}
            keyBoardControl={true}
            transitionDuration={500}
            containerClass="carousel-container"
            removeArrowOnDeviceType={["tablet", "mobile"]}
          >
            {[...Array(4).keys()].map((index) => (
              <div
                key={index}
                style={{
                  position: "relative",
                  width: "100%",
                  justifyContent: "center",
                  borderRadius: 10,
                  marginLeft: "12px",
                  marginTop: "12px",
                }}
              >
                <div
                  className="carousel-item"
                  style={{
                    position: "relative",
                    width: "80%",
                    height: 180,
                    background: "#f0f0f0",
                    justifyContent: "center",
                    borderRadius: 10,
                    overflow: "hidden",
                  }}
                >
                  <Skeleton height={180} />
                </div>
                <div
                  style={{
                    minHeight: 70,
                    maxWidth: "100%",
                    color: "rgb(37, 38, 56)",
                    fontFamily:
                      "Canva Sans,Noto Sans Variable,Noto Sans,-apple-system,BlinkMacSystemFont,Segoe UI,Helvetica,Arial,sans-serif",
                    fontWeight: 600,
                    fontSize: "17px",
                    margin: 0,
                    marginBottom: 15,

                    marginTop: 10,
                  }}
                >
                  <Skeleton height={17} width="80%" />
                </div>
                <Skeleton height={15} width="100%" />
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    height: "2em",
                  }}
                >
                  <Skeleton height={17} width="50%" />
                  <Skeleton height={14} width="40%" />
                </div>
              </div>
            ))}
          </Carousel>
        ) : (
          // Display actual content once data is available
          <Carousel
            swipeable={false}
            responsive={responsive}
            ssr={true}
            infinite={true}
            autoPlaySpeed={1000}
            keyBoardControl={true}
            transitionDuration={500}
            containerClass="carousel-container"
            removeArrowOnDeviceType={["tablet", "mobile"]}
          >
            {data.map((item, index) => (
              <div
                key={index}
                style={{
                  position: "relative",
                  width: "120%",
                  justifyContent: "center",
                  borderRadius: 10,
                  marginLeft: "15px",
                  cursor: "pointer",
                  paddingRight: "30%",
                }}
                onClick={() => {
                  navigate(`/collection-buying/${item.id}`);
                  // console.log(item)
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }}
              >
                <div
                  className="carousel-item"
                  style={{
                    position: "relative",
                    width: "100%",
                    height: 180,
                    background: "#f0f0f0",
                    justifyContent: "center",
                    borderRadius: 10,
                    overflow: "hidden",
                  }}
                >
                  <img
                    src={item.thumbnail}
                    alt=""
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "contain",
                    }}
                  />
                  {item.free_pro && (
                    <div class="ribbon-1 left-ribbon">
                      {/* <p style={{ color: "white", margin: 0, fontSize: 13 }}>Pro</p> */}
                      <img
                        alt=""
                        src={crown}
                        style={{
                          width: 14,
                          height: 15,
                          transform: "translate(-0.3%) rotate(45deg)",
                        }}
                      />
                    </div>
                  )}
                </div>
                <div
                  style={{
                    maxWidth: "100%",
                    color: "rgb(37, 38, 56)",
                    fontFamily:
                      "Canva Sans,Noto Sans Variable,Noto Sans,-apple-system,BlinkMacSystemFont,Segoe UI,Helvetica,Arial,sans-serif",
                    fontWeight: 600,
                    fontSize: "17px",
                    margin: 0,
                    marginBottom: 15,
                    marginTop: 10,
                    height: 70,
                  }}
                >
                  <h5
                    style={{
                      color: "rgb(37, 38, 56)",
                      fontFamily:
                        "Canva Sans,Noto Sans Variable,Noto Sans,-apple-system,BlinkMacSystemFont,Segoe UI,Helvetica,Arial,sans-serif",
                      fontWeight: 600,
                      fontSize: "17px",
                      margin: 0,
                      width: "80%",
                    }}
                  >
                    {item.name}
                  </h5>
                </div>
                <p style={{ margin: 0, color: "black", fontSize: 15 }}>
                  Số lượng mẫu : {item.number_product}
                </p>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    height: "2em",
                  }}
                >
                  <p
                    style={{
                      margin: 0,
                      color: "rgb(238, 77, 45)",
                      fontSize: 17,
                    }}
                  >
                    {formatPrice(item.price) === "0"
                      ? "Miễn phí"
                      : `${formatPrice(item.price)}₫`}
                  </p>
                </div>
              </div>
            ))}
          </Carousel>
        )}
      </div>

      {loading ? (
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            width: "100%",
            height: 300,
            backgroundColor: "white",
            paddingLeft: "3%",
          }}
        >
          <Skeleton height={100} width={100} circle />
          <div className="user__creator---block----name-container">
            <Skeleton height={20} width={150} />
            <Skeleton height={15} width={150} />
            <Skeleton height={40} width={200} />
          </div>
          <div className="category-wrapper__block---title----other----information">
            <Skeleton height={15} width={200} />
            <Skeleton height={15} width={200} />
          </div>
          <div className="category-wrapper__block---title----other----information">
            <Skeleton height={15} width={200} />
            <Skeleton height={15} width={200} />
          </div>
          <div className="category-wrapper__block---title----other----information">
            <Skeleton height={15} width={200} />
          </div>
        </div>
      ) : (
        <div
          className="category-wrapper"
          style={{
            flexDirection: "column",
            paddingLeft: "3%",
            paddingBottom: "2%",
            marginBottom: "3%",
          }}
        >
          <p style={{ fontSize: 18, fontWeight: "bold" }}>Chi tiết tác giả</p>

          <div className="user__creator---block">
            <img
              className="user__creator---block----img"
              alt=""
              src={dataCreator?.avatar}
            />
            <div className="user__creator---block----name-container">
              <p className="user__creator---block----name-title">
                {dataCreator?.name}
              </p>
              <p
                className="user__creator---block----name-title"
                style={{ fontSize: "14px", fontWeight: 500 }}
              >
                Email: {dataCreator?.email}
              </p>

              <button
                className="category-wrapper__block---title----button"
                style={{
                  backgroundColor: "rgb(255, 245, 241)",
                  border: "1px solid rgb(255, 66, 78)",
                  color: "rgb(255, 66, 78)",
                  width: "200px",
                  height: "40px",
                  marginTop: "10px",
                }}
              >
                <span style={{ paddingRight: 5, alignSelf: "center" }}>
                  <TravelExploreOutlinedIcon />
                </span>
                Xem tác giả
              </button>
            </div>
            <div className="category-wrapper__block---title----other----information">
              <p
                className="user__creator---block----name-title"
                style={{
                  fontSize: "14px",
                  fontWeight: 500,
                  color: "rgb(255, 66, 78)",
                }}
              >
                Số lượng theo dõi:{" "}
                <span style={{ color: "black" }}>
                  {dataCreator?.quantityFollow}
                </span>
              </p>
              <p
                className="user__creator---block----name-title"
                style={{
                  fontSize: "14px",
                  fontWeight: 500,
                  color: "rgb(255, 66, 78)",
                  paddingTop: "20px",
                }}
              >
                Số lượng sản phẩm:{" "}
                <span style={{ color: "black" }}>
                  {dataCreator?.quantityProduct}
                </span>
              </p>
            </div>
            <div className="category-wrapper__block---title----other----information">
              <p
                className="user__creator---block----name-title"
                style={{
                  fontSize: "14px",
                  fontWeight: 500,
                  color: "rgb(255, 66, 78)",
                }}
              >
                Số lượng đã bán:{" "}
                <span style={{ color: "black" }}>
                  {dataCreator?.quantitySell}
                </span>
              </p>
              <p
                className="user__creator---block----name-title"
                style={{
                  fontSize: "14px",
                  fontWeight: 500,
                  color: "rgb(255, 66, 78)",
                  paddingTop: "20px",
                }}
              >
                Số sản phẩm bán ra tiền:{" "}
                <span style={{ color: "black" }}>
                  {formatPrice(dataCreator?.sellingMoney)} đ
                </span>
              </p>
            </div>
            <div className="category-wrapper__block---title----other----information">
              <p
                className="user__creator---block----name-title"
                style={{
                  fontSize: "14px",
                  fontWeight: 500,
                  color: "rgb(255, 66, 78)",
                }}
              >
                Ngày tạo:{" "}
                <span style={{ color: "black" }}>
                  {dataTime(dataCreator?.created_at)}
                </span>
              </p>
            </div>
          </div>
        </div>
      )}

      <div className="footer-wrapper"></div>
      <Modal
        open={openModal}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={styleModal}>
          <p style={{ fontWeight: "bold", fontSize: 20 }}>Thanh toán</p>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  {/* <TableCell
                    style={{ border: "1px solid #ddd" }}
                    align="center"
                  >
                    Ảnh sản phẩm
                  </TableCell> */}
                  <TableCell
                    style={{ border: "1px solid #ddd" }}
                    align="center"
                  >
                    Tên sản phẩm
                  </TableCell>
                  <TableCell
                    style={{ border: "1px solid #ddd" }}
                    align="center"
                  >
                    Tác giả
                  </TableCell>
                  <TableCell
                    style={{ border: "1px solid #ddd" }}
                    align="center"
                  >
                    Khuyến mãi
                  </TableCell>
                  <TableCell
                    style={{ border: "1px solid #ddd" }}
                    align="center"
                  >
                    Giá tiền
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  {/* <TableCell
                    component="th"
                    scope="row"
                    style={{
                      border: "1px solid #ddd",
                      width: "10%",
                      maxHeight: "20px",
                    }}
                  >
                    <img
                      src={dataProduct.image}
                      alt=""
                      style={{ width: "100%", height: "100%" }}
                    />
                  </TableCell> */}
                  <TableCell align="left" style={{ border: "1px solid #ddd" }}>
                    {dataProduct.name}
                  </TableCell>
                  <TableCell align="left" style={{ border: "1px solid #ddd" }}>
                    {dataCreator?.name}
                  </TableCell>
                  <TableCell align="left" style={{ border: "1px solid #ddd" }}>
                    {Math.round(
                      100 - (dataProduct.sale_price / dataProduct.price) * 100
                    )}
                    %
                  </TableCell>
                  <TableCell align="left" style={{ border: "1px solid #ddd" }}>
                    {formatPrice(dataProduct.sale_price)}₫
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
          <div class="container">
            <form>
              <label>
                <input
                  type="radio"
                  name="radio"
                  onChange={(e) => handleRadioChange(e)}
                  value={1}
                />
                <span>Mua bằng Ecoin</span>
              </label>
              <label>
                <input
                  type="radio"
                  name="radio"
                  onChange={(e) => handleRadioChange(e)}
                  value={2}
                />
                <span>Mua bằng tiền mặt</span>
              </label>
            </form>
          </div>
          <div className="money--cart__container">
            <div className="money--cart__block-new">
              <div className="money--cart__block">
                <div className="money--cart__block---content">
                  <p style={{ fontSize: 15 }}>Giá tiền gốc :</p>
                  <p style={{ fontSize: 15, fontWeight: "bold" }}>
                    {formatPrice(dataProduct.price)}đ
                  </p>
                </div>
              </div>
              <div className="money--cart__block">
                <div className="money--cart__block---content">
                  <p>Khuyến mãi :</p>
                  <p style={{ fontSize: 15, fontWeight: "bold" }}>
                    {Math.round(
                      100 - (dataProduct.sale_price / dataProduct.price) * 100
                    )}
                    %
                  </p>
                </div>
              </div>
              <div className="money--cart__block">
                <div className="money--cart__block---content">
                  <p>Tổng :</p>
                  <p style={{ fontSize: 20, fontWeight: "bold" }}>
                    {dataProduct.sale_price === 0
                      ? "Miễn phí"
                      : `${formatPrice(dataProduct.sale_price)} ₫`}
                  </p>
                </div>
              </div>
              {errMessage && (
                <p style={{ textAlign: "right", fontSize: 14, color: "red" }}>
                  Bạn phải lựa chọn phương thức thanh toán
                </p>
              )}
              {errMessageMoney && (
                <p style={{ textAlign: "right", fontSize: 14, color: "red" }}>
                  Bạn không đủ số dư để thực hiện
                </p>
              )}
              <div
                style={{
                  width: "100%",
                  justifyContent: "flex-end",
                  display: "flex",
                }}
              >
                <Button
                  variant="contained"
                  size="medium"
                  style={{
                    height: 40,
                    textTransform: "none",
                    color: "white",
                    backgroundColor: "rgb(255, 66, 78)",
                    width: "30%",
                    alignSelf: "right",
                    marginTop: "2%",
                  }}
                  onClick={() => {
                    handleBuyingFunc();
                  }}
                >
                  {" "}
                  {loadingBuyingLostFunc ? (
                    <span className="loaderNew"></span>
                  ) : (
                    "Thanh toán"
                  )}
                </Button>
              </div>
            </div>
          </div>
        </Box>
      </Modal>
      <Modal
        open={modalLogoutDevice}
        onClose={handleLogoutDevice}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={styleModalBuyingFree}>
          <p
            style={{
              margin: 0,
              fontSize: 22,
              fontWeight: "bold",
              paddingBottom: "10px",
            }}
          >
            Cảnh báo
          </p>
          <img
            src={warning}
            alt=""
            style={{ width: "20%", height: "30%", marginBottom: "10px" }}
          />
          <p
            style={{
              margin: 0,
              fontSize: 17,
              fontWeight: "500",
              paddingTop: "10px",
            }}
          >
            Tài khoản đã bị đăng nhập ở thiết bị khác
          </p>
          <div style={{ display: "flex" }}>
            <Button
              variant="contained"
              size="medium"
              style={{
                height: 40,
                alignSelf: "center",
                textTransform: "none",
                color: "white",
                backgroundColor: "rgb(255, 66, 78)",
                marginTop: "40px",
                width: "100%",
              }}
              onClick={() => {
                document.cookie = `user_login=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
                document.cookie = `token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
                dispatch(DELETE_ALL_VALUES());
                setModalLogoutDevice(false);

                navigate("/login", { replace: true });
              }}
            >
              Đăng xuất
            </Button>
          </div>
        </Box>
      </Modal>
      <Modal
        open={modalBuyingFree}
        onClose={handleCloseModalFree}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={styleModalBuyingFree}>
          <p
            style={{
              margin: 0,
              fontSize: 22,
              fontWeight: "bold",
              paddingBottom: "10px",
            }}
          >
            Thanh toán
          </p>
          <img
            src={confirmBuying}
            alt=""
            style={{ width: "20%", height: "30%", marginBottom: "10px" }}
          />
          <p
            style={{
              margin: 0,
              fontSize: 17,
              fontWeight: "500",
              paddingTop: "10px",
            }}
          >
            Bạn có chắc chắn mua mẫu thiết kế này chứ ?
          </p>

          <Button
            variant="contained"
            size="medium"
            style={{
              height: 40,
              alignSelf: "center",
              textTransform: "none",
              color: "white",
              backgroundColor: "rgb(255, 66, 78)",
              marginTop: "40px",
              width: "50%",
            }}
            onClick={() => {
              handleBuyingFreeFunc();
            }}
          >
            {" "}
            {loadingBuyingFunc ? (
              <span class="loaderNew"></span>
            ) : (
              "Mua mẫu thiết kế"
            )}
          </Button>
        </Box>
      </Modal>
      <Modal
        open={modalExtend}
        onClose={handleCloseModalFreeExtend}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={styleModalBuyingFreeBuying}>
          <p
            style={{
              margin: 0,
              fontSize: 22,
              fontWeight: "bold",
              paddingBottom: "10px",
            }}
          >
            Xác nhận
          </p>
          <img
            src={warning}
            alt=""
            style={{ width: "20%", height: "30%", marginBottom: "10px" }}
          />
          <p
            style={{
              margin: 0,
              fontSize: 17,
              fontWeight: "500",
              paddingTop: "10px",
            }}
          >
            Bạn có muốn {checkBuying ? "gia hạn" : "mua"} bộ sưu tập này không ?
          </p>
          <p
            style={{
              margin: 0,
              fontSize: 17,
              fontWeight: "500",
              paddingTop: "10px",
            }}
          >
            Giá bộ sưu tập này trị giá {formatPrice(dataProduct.price)} đ
          </p>
          <div
            style={{
              width: "100%",
              display: "flex",
              flexDirection: "row",
              paddingLeft: 30,
              paddingRight: 30,
              justifyContent: "space-between",
              paddingTop: 10,
            }}
          >
            <Slider
              value={typeof value === "number" ? value : 0}
              onChange={handleSliderChange}
              aria-labelledby="input-slider"
              style={{ width: "70%" }}
              min={1}
            />
            <Input
              value={value}
              size="small"
              onChange={handleInputChange}
              onBlur={handleBlur}
              inputProps={{
                step: 1,
                min: 1,
                max: 100,
                type: "number",
                "aria-labelledby": "input-slider",
              }}
            />
          </div>
          <div style={{ display: "flex" }}>
            <Button
              variant="contained"
              size="medium"
              style={{
                height: 40,
                alignSelf: "center",
                textTransform: "none",
                color: "black",
                backgroundColor: "white",
                marginTop: "40px",
                width: "30%",
                marginRight: 10,
              }}
              onClick={() => {
                // setModalBuyingFree(false);
                setModalExtend(false);
                console.log(contentSelected);
                setDeletingItemId(null);
              }}
            >
              Hủy
            </Button>
            <Button
              variant="contained"
              size="medium"
              style={{
                height: 40,
                alignSelf: "center",
                textTransform: "none",
                color: "white",
                backgroundColor: "rgb(255, 66, 78)",
                marginTop: "40px",
                width: "60%",
              }}
              onClick={() => {
                handleExtend();
              }}
            >
              {" "}
              {loadingBuyingFunc ? (
                <span class="loaderNew"></span>
              ) : (
                <>{checkBuying ? "Gia hạn" : "Mua ngay"}</>
              )}
            </Button>
          </div>
        </Box>
      </Modal>
      <Modal
        open={modalSpecifiedCategory}
        onClose={() => setModalSpecifiedCategory(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={styleModalBuyingFreeBuyingSpecified}>
          <p
            style={{
              margin: 0,
              fontSize: 22,
              fontWeight: "bold",
              paddingBottom: "10px",
            }}
          >
            Xác nhận
          </p>
          <div
            style={{
              paddingTop: "10px",
              display: "flex",
              flexWrap: "wrap",
              paddingLeft: 10,
              maxHeight: "100%",
              overflowY:'auto',
            }}
          >
            {dataInsideSpecified.map((item, index) => (
              <div
                key={index}
                style={{
                  flex: `0 0 calc(${100 / itemsPerRow}% - 16px)`, // Adjust the margin as needed

                  marginBottom: "15px",
                  boxSizing: "border-box",
                  padding: "0 8px",
                  position: "relative",
                  maxWidth: 280,
                  marginTop: "2%",
                  marginRight: "1%",
                }}
              >
                <div
                  style={{
                    position: "relative",
                    width: "100%",
                    background: "#f0f0f0",
                    borderRadius: 10,
                    overflow: "hidden",
                    cursor: "pointer",
                  }}
                  onClick={() => {
                    navigate(`/category/${item.id}`);
                    window.scrollTo({ top: 0, behavior: "smooth" });
                  }}
                >
                  <img
                    src={item.image}
                    alt=""
                    style={{
                      width: "100%",
                      height: "180px",
                      objectFit: "contain",
                    }}
                  />
                </div>

                <div
                  style={{
                    height: 70,
                    maxWidth: "100%",
                    color: "rgb(37, 38, 56)",
                    fontFamily:
                      "Canva Sans, Noto Sans Variable, Noto Sans, -apple-system, BlinkMacSystemFont, Segoe UI, Helvetica, Arial, sans-serif",
                    fontWeight: 600,
                    fontSize: "17px",
                    margin: 0,
                    marginTop: 10,
                  }}
                >
                  <h5
                    style={{
                      maxWidth: "100%",
                      color: "rgb(37, 38, 56)",
                      fontFamily:
                        "Canva Sans, Noto Sans Variable, Noto Sans, -apple-system, BlinkMacSystemFont, Segoe UI, Helvetica, Arial, sans-serif",
                      fontWeight: 600,
                      fontSize: "17px",
                      margin: 0,
                    }}
                  >
                    {item.name}
                  </h5>
                </div>
              </div>
            ))}
          </div>
        </Box>
      </Modal>
      <Modal
        open={modalLogoutDevice}
        onClose={handleLogoutDevice}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={styleModalBuyingFree}>
          <p
            style={{
              margin: 0,
              fontSize: 22,
              fontWeight: "bold",
              paddingBottom: "10px",
            }}
          >
            Cảnh báo
          </p>
          <img
            src={warning}
            alt=""
            style={{ width: "20%", height: "30%", marginBottom: "10px" }}
          />
          <p
            style={{
              margin: 0,
              fontSize: 17,
              fontWeight: "500",
              paddingTop: "10px",
            }}
          >
            Tài khoản đã bị đăng nhập ở thiết bị khác
          </p>
          <div style={{ display: "flex" }}>
            <Button
              variant="contained"
              size="medium"
              style={{
                height: 40,
                alignSelf: "center",
                textTransform: "none",
                color: "white",
                backgroundColor: "rgb(255, 66, 78)",
                marginTop: "40px",
                width: "100%",
              }}
              onClick={() => {
                document.cookie = `user_login=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
                document.cookie = `token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
                dispatch(DELETE_ALL_VALUES());
                setModalLogoutDevice(false);

                navigate("/login", { replace: true });
              }}
            >
              Đăng xuất
            </Button>
          </div>
        </Box>
      </Modal>
    </div>
  );
}

export default CollectionBuying;
