import React, { useState, useEffect } from "react";
import "./ComparePricing.css";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import CheckIcon from "@mui/icons-material/Check";
import Crown from "./Crown";
import KeyboardArrowDownOutlinedIcon from "@mui/icons-material/KeyboardArrowDownOutlined";
import LanguageOutlinedIcon from "@mui/icons-material/LanguageOutlined";
import fbLogo from "./fb_logo.png";
import paint from "./assets/paint-palette.png";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import discount from "./assets/discount-coupon.png";

import {
  BrowserRouter as Router,
  Route,
  Link,
  Routes,
  useLocation,
  Outlet,
  useNavigate,
} from "react-router-dom";
import { styled, useTheme } from "@mui/material/styles";
import Slider from "react-slick";
import img1 from "./assets/img1.jpg";
import img2 from "./assets/img2.jpg";
import img3 from "./assets/img3.jpg";
import img4 from "./assets/img4.jpg";
import picture from "./assets/picture.png";
import xMark from "./assets/x-button.png";
import axios from "axios";
function ComparePricing() {
  const navigate = useNavigate();

  const [loadingBuyingLostFunc, setLoadingBuyingLostFunc] =
    React.useState(false);
  const [openModalPro, setOpenModalPro] = React.useState(false);
  const [loadingContact, setLoadingContact] = React.useState(false);
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });
  const [showModalResize, setShowModalResize] = useState(false);
  // Define event listener function
  const handleResize = () => {
    setWindowSize({
      width: window.innerWidth,
      height: window.innerHeight,
    });
    if (window.innerWidth < window.screen.width * (4.5 / 5)) {
      setShowModalResize(true);

      // alert("ngu")
    } else {
      setShowModalResize(false);
    }
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
  const contactAdmin = async () => {
    setLoadingContact(true);
    const response = await axios.post(`${network}/saveContactAPI`, {
      token: checkTokenCookie(),
      content: `Cần nạp Pro cho ${priceTeammate} tài khoản`,
    });
    if (response.data && response.data.code === 0) {
      setLoadingContact(false);

      toast("Đã liên hệ thành công, vui lòng đợi phản hồi !! 🦄", {
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
          token: checkTokenCookie(),
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
  const [selectPrice, setSelectPrice] = useState(false);
  const [priceTeammate, setPriceTeammate] = useState("");
  const [personCount, setPersonCount] = useState("400000");
  const [loadingModal, setLoadingModal] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const dispatch = useDispatch();
  const theme = useTheme();
  const [open, setOpen] = React.useState(true);
  const location = useLocation();
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
  const [modalAdvertisement, setModalAdvertisement] = React.useState(false);
  const handleCloseModalAdvertisement = () => {
    setModalAdvertisement(false);
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
  const styleModalBuyingFree = {
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

    if (userLogin == null) {
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
    const checkLoginAuth = () => {
      var userLogin = getCookie("user_login");
      if (userLogin != null && authentication == false) {
        checkLoginAuth();
      }
    };
    checkLoginAuth();
  }, [authentication]);

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
  function formatCurrency(number) {
    // Chuyển số thành chuỗi và đảm bảo rằng nó có dạng chuỗi
    let strNumber = String(number);

    // Tách phần nguyên và phần thập phân (nếu có)
    let parts = strNumber.split(".");
    let integerPart = parts[0];
    let decimalPart = parts.length > 1 ? "." + parts[1] : "";

    // Thêm dấu chấm ngăn cách mỗi 3 chữ số từ phải sang trái vào phần nguyên
    let formattedInteger = "";
    for (let i = integerPart.length - 1, count = 0; i >= 0; i--, count++) {
      if (count && count % 3 === 0) {
        formattedInteger = "." + formattedInteger;
      }
      formattedInteger = integerPart[i] + formattedInteger;
    }

    // Kết hợp phần nguyên và phần thập phân để tạo giá trị cuối cùng
    let formattedNumber = formattedInteger + decimalPart;

    return formattedNumber;
  }
  useEffect(() => {
    const dataPrice = () => {
      if (!selectPrice) {
        const data = parseInt(priceTeammate) * 200000;
        console.log(data);
        setPersonCount(data);
      } else {
        const data = parseInt(priceTeammate) * 1999000;
        console.log(data);
        setPersonCount(data);
      }
    };
    dataPrice();
  }, [selectPrice, priceTeammate]);

  return (
    <div
      style={{
        display: "flex",
        width: "100%",
        minHeight: "100%",
        position: "relative",
      }}
    >
      <div style={{ paddingTop: "4%", paddingLeft: "16%", paddingRight: "0%" }}>
        <Tabs forceRenderTabPanel>
          <h1 className="background-title__compare">
            Thiết kế <span className="title__compare--span">mọi thứ</span>với
            gói đăng ký phù hợp
            <span className="background-title__compare---absolute___tabs">
              
            </span>
          </h1>
            <div
              style={{
                width: "100%",
                marginTop: -50,
                position: "relative",
                zIndex: 100,
                paddingLeft: "5%",
                paddingRight: "5%",
                paddingTop: "10%",
                display: "flex",
                justifyContent: "space-between",
                backgroundColor: "white",
                flexDirection: "column",
              }}
            >
              <div
                style={{ width: "100%", display: "flex", flexDirection: "row" }}
              >
                <div style={{ display: "flex", width: "33.3333%" }}>
                  <h1 style={{ margin: 0, fontSize: 20 }}>
                    Tính toán cho đội của bạn
                  </h1>
                </div>
                <div
                  style={{
                    display: "flex",
                    width: "33.3333%",
                    flexDirection: "column",
                  }}
                >
                  <p style={{ margin: 0, fontSize: 15, paddingBottom: 10 }}>
                    Số lượng thành viên
                  </p>
                  <div
                    style={{
                      width: "90%",
                      height: 60,
                      border: "1px solid rgb(225, 228, 231)",
                      borderRadius: 10,
                      display: "flex",
                      flexDirection: "row",
                      alignItems: "center",
                    }}
                  >
                    <input
                      style={{
                        width: "70%",
                        backgroundColor: "white",
                        border: 0,
                        fontSize: 15,
                        paddingBottom: 10,
                      }}
                      onChange={(e) => setPriceTeammate(e.target.value)}
                      placeholder="Tùy chỉnh"
                    />
                    <p style={{ margin: 0, fontSize: 15 }}>thành viên</p>
                  </div>
                </div>
                <div
                  style={{
                    display: "flex",
                    width: "33.3333%",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "flex-start",
                    justifyContent: "center",
                  }}
                >
                  <p style={{ margin: 0, fontSize: 15, paddingBottom: 10 }}>
                    <strong>Chu kỳ:</strong>{" "}
                    <span style={{ color: "rgb(139, 61, 255)" }}>
                      Tiết kiệm 16%
                    </span>{" "}
                    khi thanh toán theo năm
                  </p>
                  <div
                    style={{
                      width: "90%",
                      height: "80%",
                      border: "1px solid rgb(225, 228, 231)",
                      borderRadius: 10,
                      display: "flex",
                      flexDirection: "row",
                      alignItems: "center",
                      paddingLeft: 10,
                      paddingRight: 10,
                    }}
                  >
                    <button
                      style={{
                        width: "90%",
                        height: "80%",
                        borderRadius: 10,
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "center",
                        border: 0,
                        justifyContent: "center",
                        backgroundColor:
                          selectPrice !== false ? "white" : "rgb(255, 66, 78)",
                        color: selectPrice !== false ? "black" : "white",
                        transition: "background-color 0.3s, color 0.3s",
                        fontWeight: selectPrice !== false ? "500" : "600",
                        fontFamily:
                          "Noto Sans Vietnamese,-apple-system,BlinkMacSystemFont,Segoe UI,Helvetica,Arial,sans-serif",
                      }}
                      onClick={() => setSelectPrice(false)}
                    >
                      Hàng tháng
                    </button>
                    <button
                      style={{
                        width: "90%",
                        height: "80%",
                        borderRadius: 10,
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "center",
                        border: 0,
                        justifyContent: "center",
                        backgroundColor: selectPrice
                          ? "rgb(255, 66, 78)"
                          : "white",
                        color: selectPrice ? "white" : "black",
                        transition: "background-color 0.3s, color 0.3s",
                        fontFamily:
                          "Noto Sans Vietnamese,-apple-system,BlinkMacSystemFont,Segoe UI,Helvetica,Arial,sans-serif",
                        fontWeight: selectPrice ? "600" : "500",
                      }}
                      onClick={() => setSelectPrice(true)}
                    >
                      Hàng năm
                    </button>
                  </div>
                </div>
              </div>
              <div
                style={{
                  width: "100%",
                  display: "flex",
                  flexDirection: "row",
                  marginTop: "5%",
                  paddingBottom: "5%",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    width: "33.3333%",
                    flexDirection: "column",
                  }}
                >
                  <div
                    style={{
                      width: "90%",
                      backgroundColor: "rgb(242, 243, 245)",
                      padding: 24,
                      borderTopLeftRadius: 10,
                      borderTopRightRadius: 10,
                    }}
                  >
                    <p
                      style={{
                        backgroundColor: "white",
                        width: "40%",
                        textAlign: "center",
                        borderRadius: 10,
                        fontSize: "11px",
                        color: "black",
                        fontWeight: 600,
                      }}
                    >
                      Dành cho một người
                    </p>
                    <p
                      style={{
                        fontSize: 24,
                        fontWeight: 700,
                        fontFamily:
                          'Noto Sans Vietnamese, -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif',
                      }}
                    >
                      Ezpics miễn phí
                    </p>
                    <p
                      style={{
                        fontSize: "14px",
                        fontWeight: 400,
                        fontFamily:
                          'Noto Sans Vietnamese, -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif',
                      }}
                    >
                      Tự tay thiết kế mọi thứ hoặc thiết kế cùng bạn bè và gia
                      đình.
                    </p>
                    <p
                      style={{
                        fontSize: 27,
                        fontWeight: 700,
                        fontFamily:
                          'Noto Sans Vietnamese, -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif',
                        margin: 0,
                      }}
                    >
                      0 <span style={{ textDecoration: "underline" }}>đ</span>
                    </p>
                    <p
                      style={{
                        fontSize: "14px",
                        fontWeight: 400,
                        fontFamily:
                          'Noto Sans Vietnamese, -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif',
                        margin: 0,
                      }}
                    >
                      /năm dành cho một thành viên
                    </p>
                    <button
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        width: "100%",
                        backgroundColor: "rgb(81, 85, 88)",
                        border: 0,
                        paddingTop: 10,
                        paddingBottom: 10,
                        marginTop: "25%",
                        borderRadius: 5,
                        color: "white",
                        fontFamily:
                          '"Noto Sans Vietnamese", -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif',
                        fontSize: "14px",
                        fontWeight: "600",
                      }}
                      onClick={(e) => {
                        navigate("/");
                        window.scrollTo({ top: 0, behavior: "smooth" });
                      }}
                    >
                      Bắt đầu
                    </button>
                  </div>
                  <div
                    style={{
                      padding: 24,

                      width: "90%",
                      borderLeft: "0.2px solid rgb(0, 0, 0,0.2)",
                      borderBottom: "0.2px solid rgb(0, 0, 0,0.2)",
                      borderRight: "0.2px solid rgb(0, 0, 0,0.2)",
                      minHeight: 700,
                    }}
                  >
                    <p style={{ margin: 0, fontSize: "14px", fontWeight: 600 }}>
                      Tính năng bạn sẽ thích:
                    </p>
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        paddingTop: 15,
                      }}
                    >
                      <CheckIcon
                        sx={{ color: "rgb(165, 112, 255)", fontSize: 18 }}
                      />
                      <p
                        style={{ margin: 0, fontSize: "14px", paddingLeft: 5 }}
                      >
                        Trình biên tập kéo-thả dễ dùng
                      </p>
                    </div>
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        paddingTop: 15,
                      }}
                    >
                      <CheckIcon
                        sx={{ color: "rgb(165, 112, 255)", fontSize: 18 }}
                      />
                      <p
                        style={{ margin: 0, fontSize: "14px", paddingLeft: 5 }}
                      >
                        Hơn 1 triệu mẫu được thiết kế chuyên nghiệp
                      </p>
                    </div>
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        paddingTop: 15,
                      }}
                    >
                      <CheckIcon
                        sx={{ color: "rgb(165, 112, 255)", fontSize: 18 }}
                      />
                      <p
                        style={{ margin: 0, fontSize: "14px", paddingLeft: 5 }}
                      >
                        Hơn 1000 loại thiết kế (bài đăng mạng xã hội và hơn thế
                        nữa)
                      </p>
                    </div>
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        paddingTop: 15,
                      }}
                    >
                      <CheckIcon
                        sx={{ color: "rgb(165, 112, 255)", fontSize: 18 }}
                      />
                      <p
                        style={{ margin: 0, fontSize: "14px", paddingLeft: 5 }}
                      >
                        Hơn 3 triệu ảnh stock và đồ họa
                      </p>
                    </div>
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        paddingTop: 15,
                      }}
                    >
                      <CheckIcon
                        sx={{ color: "rgb(165, 112, 255)", fontSize: 18 }}
                      />
                      <p
                        style={{ margin: 0, fontSize: "14px", paddingLeft: 5 }}
                      >
                        In và giao hàng thiết kế
                      </p>
                    </div>
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        paddingTop: 15,
                      }}
                    >
                      <CheckIcon
                        sx={{ color: "rgb(165, 112, 255)", fontSize: 18 }}
                      />
                      <p
                        style={{ margin: 0, fontSize: "14px", paddingLeft: 5 }}
                      >
                        Đảm bảo tính nhất quán của thương hiệu với tính năng phê
                        duyệt
                      </p>
                    </div>
                  </div>
                </div>
                <div
                  style={{
                    display: "flex",
                    width: "33.3333%",
                    flexDirection: "column",
                    maxHeight: 900,
                    height: 900,
                  }}
                >
                  <div
                    style={{
                      width: "90%",
                      backgroundColor: "rgb(242, 243, 245)",
                      padding: 24,
                      borderTopLeftRadius: 10,
                      borderTopRightRadius: 10,
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "space-between",
                      }}
                    >
                      <p
                        style={{
                          backgroundColor: "white",
                          width: "40%",
                          textAlign: "center",
                          borderRadius: 10,
                          fontSize: "11px",
                          color: "black",
                          fontWeight: 600,
                        }}
                      >
                        Dành cho một người
                      </p>
                      <div
                        style={{
                          height: 40,
                          width: 40,
                          borderRadius: 25,
                          backgroundColor: "white",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        <Crown />
                      </div>
                    </div>
                    <p
                      style={{
                        fontSize: 24,
                        fontWeight: 700,
                        fontFamily:
                          'Noto Sans Vietnamese, -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif',
                      }}
                    >
                      Ezpics Pro
                    </p>
                    <p
                      style={{
                        fontSize: "14px",
                        fontWeight: 400,
                        fontFamily:
                          'Noto Sans Vietnamese, -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif',
                      }}
                    >
                      Tự tay thiết kế mọi thứ hoặc thiết kế cùng bạn bè và gia
                      đình.
                    </p>
                    <p
                      style={{
                        fontSize: 27,
                        fontWeight: 700,
                        fontFamily:
                          'Noto Sans Vietnamese, -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif',
                        margin: 0,
                      }}
                    >
                      {selectPrice === false ? "200.000" : "1.999.000"}{" "}
                      <span style={{ textDecoration: "underline" }}>đ</span>
                    </p>
                    <p
                      style={{
                        fontSize: "14px",
                        fontWeight: 400,
                        fontFamily:
                          'Noto Sans Vietnamese, -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif',
                        margin: 0,
                      }}
                    >
                      /{selectPrice === false ? "tháng" : "năm"} dành cho một thành viên
                    </p>
                    <button
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        width: "100%",
                        backgroundColor: "rgb(255, 66, 78)",
                        border: 0,
                        paddingTop: 10,
                        paddingBottom: 10,
                        marginTop: "20%",
                        borderRadius: 5,
                        color: "white",
                        fontFamily:
                          '"Noto Sans Vietnamese", -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif',
                        fontSize: "14px",
                        fontWeight: "600",
                      }}
                      onClick={(e) => {
                        e.preventDefault();
                        window.scrollTo({ top: 0, behavior: "smooth" });

                        setOpenModalPro(true);
                      }}
                    >
                      Bắt đầu bản dùng thử
                    </button>
                  </div>
                  <div
                    style={{
                      padding: 24,

                      width: "90%",
                      borderLeft: "0.2px solid rgb(0, 0, 0,0.2)",
                      borderBottom: "0.2px solid rgb(0, 0, 0,0.2)",
                      borderRight: "0.2px solid rgb(0, 0, 0,0.2)",
                      minHeight: 700,
                    }}
                  >
                    <p style={{ margin: 0, fontSize: "14px", fontWeight: 600 }}>
                      Tính năng bạn sẽ thích:
                    </p>
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        paddingTop: 15,
                      }}
                    >
                      <CheckIcon
                        sx={{ color: "rgb(165, 112, 255)", fontSize: 18 }}
                      />
                      <p
                        style={{ margin: 0, fontSize: "14px", paddingLeft: 5 }}
                      >
                        Trình biên tập kéo-thả dễ dùng
                      </p>
                    </div>
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        paddingTop: 15,
                      }}
                    >
                      <CheckIcon
                        sx={{ color: "rgb(165, 112, 255)", fontSize: 18 }}
                      />
                      <p
                        style={{ margin: 0, fontSize: "14px", paddingLeft: 5 }}
                      >
                        Hơn 1 triệu mẫu được thiết kế chuyên nghiệp
                      </p>
                    </div>
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        paddingTop: 15,
                      }}
                    >
                      <CheckIcon
                        sx={{ color: "rgb(165, 112, 255)", fontSize: 18 }}
                      />
                      <p
                        style={{ margin: 0, fontSize: "14px", paddingLeft: 5 }}
                      >
                        Hơn 1000 loại thiết kế (bài đăng mạng xã hội và hơn thế
                        nữa)
                      </p>
                    </div>
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        paddingTop: 15,
                      }}
                    >
                      <CheckIcon
                        sx={{ color: "rgb(165, 112, 255)", fontSize: 18 }}
                      />
                      <p
                        style={{ margin: 0, fontSize: "14px", paddingLeft: 5 }}
                      >
                        Hơn 3 triệu ảnh stock và đồ họa
                      </p>
                    </div>
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        paddingTop: 15,
                      }}
                    >
                      <CheckIcon
                        sx={{ color: "rgb(165, 112, 255)", fontSize: 18 }}
                      />
                      <p
                        style={{ margin: 0, fontSize: "14px", paddingLeft: 5 }}
                      >
                        In và giao hàng thiết kế
                      </p>
                    </div>
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        paddingTop: 15,
                      }}
                    >
                      <CheckIcon
                        sx={{ color: "rgb(165, 112, 255)", fontSize: 18 }}
                      />
                      <p
                        style={{ margin: 0, fontSize: "14px", paddingLeft: 5 }}
                      >
                        Đảm bảo tính nhất quán của thương hiệu với tính năng phê
                        duyệt
                      </p>
                    </div>
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        paddingTop: 15,
                      }}
                    >
                      <CheckIcon
                        sx={{ color: "rgb(165, 112, 255)", fontSize: 18 }}
                      />
                      <p
                        style={{ margin: 0, fontSize: "14px", paddingLeft: 5 }}
                      >
                        Xóa nền với chỉ một lần nhấp
                      </p>
                    </div>
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        paddingTop: 15,
                      }}
                    >
                      <CheckIcon
                        sx={{ color: "rgb(165, 112, 255)", fontSize: 18 }}
                      />
                      <p
                        style={{ margin: 0, fontSize: "14px", paddingLeft: 5 }}
                      >
                        Lập kế hoạch và lên lịch cho nội dung đăng trên mạng xã
                        hội
                      </p>
                    </div>
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        paddingTop: 15,
                      }}
                    >
                      <CheckIcon
                        sx={{ color: "rgb(165, 112, 255)", fontSize: 18 }}
                      />
                      <p
                        style={{ margin: 0, fontSize: "14px", paddingLeft: 5 }}
                      >
                        Mẫu cao cấp không giới hạn
                      </p>
                    </div>
                  </div>
                </div>
                <div
                  style={{
                    display: "flex",
                    width: "33.3333%",
                    flexDirection: "column",
                    maxHeight: 900,
                    height: 900,
                  }}
                >
                  <div
                    style={{
                      width: "90%",
                      backgroundColor: "rgb(242, 243, 245)",
                      padding: 24,
                      borderTopLeftRadius: 10,
                      borderTopRightRadius: 10,
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "space-between",
                      }}
                    >
                      <p
                        style={{
                          backgroundColor: "white",
                          width: "40%",
                          textAlign: "center",
                          borderRadius: 10,
                          fontSize: "11px",
                          color: "black",
                          fontWeight: 600,
                        }}
                      >
                        Dành cho một người
                      </p>
                      <div
                        style={{
                          height: 40,
                          width: 40,
                          borderRadius: 25,
                          backgroundColor: "white",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        <Crown />
                      </div>
                    </div>
                    <p
                      style={{
                        fontSize: 24,
                        fontWeight: 700,
                        fontFamily:
                          'Noto Sans Vietnamese, -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif',
                      }}
                    >
                      Ezpics Pro Ecoin
                    </p>
                    <p
                      style={{
                        fontSize: "14px",
                        fontWeight: 400,
                        fontFamily:
                          'Noto Sans Vietnamese, -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif',
                      }}
                    >
                      Tự tay thiết kế mọi thứ hoặc thiết kế cùng bạn bè và gia
                      đình.
                    </p>
                    <p
                      style={{
                        fontSize: 27,
                        fontWeight: 700,
                        fontFamily:
                          'Noto Sans Vietnamese, -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif',
                        margin: 0,
                      }}
                    >
                      {selectPrice === false ? "200" : "2000"}{" "}
                      <span style={{  }}>eCoin</span>
                    </p>
                    <p
                      style={{
                        fontSize: "14px",
                        fontWeight: 400,
                        fontFamily:
                          'Noto Sans Vietnamese, -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif',
                        margin: 0,
                      }}
                    >
                      /{selectPrice === false ? "tháng" : "năm"} dành cho 1 thành viên
                    </p>
                    <button
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        width: "100%",
                        backgroundColor: "rgb(255, 66, 78)",
                        border: 0,
                        paddingTop: 10,
                        paddingBottom: 10,
                        marginTop: "20%",
                        borderRadius: 5,
                        color: "white",
                        fontFamily:
                          '"Noto Sans Vietnamese", -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif',
                        fontSize: "14px",
                        fontWeight: "600",
                      }}
                      onClick={(e) => {
                        e.preventDefault();
                        window.scrollTo({ top: 0, behavior: "smooth" });

                        setOpenModalPro(true);
                      }}
                    >
                      {loadingContact ? (
                        <span className="loaderNew"></span>
                      ) : (
                        "Bắt đầu mua và trải nghiệm"
                      )}
                    </button>
                  </div>
                  <div
                    style={{
                      padding: 24,

                      width: "90%",
                      borderLeft: "0.2px solid rgb(0, 0, 0,0.2)",
                      borderBottom: "0.2px solid rgb(0, 0, 0,0.2)",
                      borderRight: "0.2px solid rgb(0, 0, 0,0.2)",
                      minHeight: 700,
                    }}
                  >
                    <p style={{ margin: 0, fontSize: "14px", fontWeight: 600 }}>
                      Tính năng bạn sẽ thích:
                    </p>
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        paddingTop: 15,
                      }}
                    >
                      <CheckIcon
                        sx={{ color: "rgb(165, 112, 255)", fontSize: 18 }}
                      />
                      <p
                        style={{ margin: 0, fontSize: "14px", paddingLeft: 5 }}
                      >
                        Trình biên tập kéo-thả dễ dùng
                      </p>
                    </div>
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        paddingTop: 15,
                      }}
                    >
                      <CheckIcon
                        sx={{ color: "rgb(165, 112, 255)", fontSize: 18 }}
                      />
                      <p
                        style={{ margin: 0, fontSize: "14px", paddingLeft: 5 }}
                      >
                        Hơn 1 triệu mẫu được thiết kế chuyên nghiệp
                      </p>
                    </div>
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        paddingTop: 15,
                      }}
                    >
                      <CheckIcon
                        sx={{ color: "rgb(165, 112, 255)", fontSize: 18 }}
                      />
                      <p
                        style={{ margin: 0, fontSize: "14px", paddingLeft: 5 }}
                      >
                        Hơn 1000 loại thiết kế (bài đăng mạng xã hội và hơn thế
                        nữa)
                      </p>
                    </div>
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        paddingTop: 15,
                      }}
                    >
                      <CheckIcon
                        sx={{ color: "rgb(165, 112, 255)", fontSize: 18 }}
                      />
                      <p
                        style={{ margin: 0, fontSize: "14px", paddingLeft: 5 }}
                      >
                        Hơn 3 triệu ảnh stock và đồ họa
                      </p>
                    </div>
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        paddingTop: 15,
                      }}
                    >
                      <CheckIcon
                        sx={{ color: "rgb(165, 112, 255)", fontSize: 18 }}
                      />
                      <p
                        style={{ margin: 0, fontSize: "14px", paddingLeft: 5 }}
                      >
                        In và giao hàng thiết kế
                      </p>
                    </div>
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        paddingTop: 15,
                      }}
                    >
                      <CheckIcon
                        sx={{ color: "rgb(165, 112, 255)", fontSize: 18 }}
                      />
                      <p
                        style={{ margin: 0, fontSize: "14px", paddingLeft: 5 }}
                      >
                        Đảm bảo tính nhất quán của thương hiệu với tính năng phê
                        duyệt
                      </p>
                    </div>
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        paddingTop: 15,
                      }}
                    >
                      <CheckIcon
                        sx={{ color: "rgb(165, 112, 255)", fontSize: 18 }}
                      />
                      <p
                        style={{ margin: 0, fontSize: "14px", paddingLeft: 5 }}
                      >
                        Hỗ trợ khách hàng 24/7
                      </p>
                    </div>
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        paddingTop: 15,
                      }}
                    >
                      <CheckIcon
                        sx={{ color: "rgb(165, 112, 255)", fontSize: 18 }}
                      />
                      <p
                        style={{ margin: 0, fontSize: "14px", paddingLeft: 5 }}
                      >
                        Tạo bản sao thỏa yêu cầu thương hiệu
                      </p>
                    </div>
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        paddingTop: 15,
                      }}
                    >
                      <CheckIcon
                        sx={{ color: "rgb(165, 112, 255)", fontSize: 18 }}
                      />
                      <p
                        style={{ margin: 0, fontSize: "14px", paddingLeft: 5 }}
                      >
                        Ưu tiên tiếp cận dịch vụ hỗ trợ khách hàng*
                      </p>
                    </div>
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        paddingTop: 15,
                      }}
                    >
                      <CheckIcon
                        sx={{ color: "rgb(165, 112, 255)", fontSize: 18 }}
                      />
                      <p
                        style={{ margin: 0, fontSize: "14px", paddingLeft: 5 }}
                      >
                        SSO
                      </p>
                    </div>
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        paddingTop: 15,
                      }}
                    >
                      <CheckIcon
                        sx={{ color: "rgb(165, 112, 255)", fontSize: 18 }}
                      />
                      <p
                        style={{ margin: 0, fontSize: "14px", paddingLeft: 5 }}
                      >
                        Áp dụng tính giá theo số lượng
                      </p>
                    </div>
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        paddingTop: 15,
                      }}
                    >
                      <CheckIcon
                        sx={{ color: "rgb(165, 112, 255)", fontSize: 18 }}
                      />
                      <p
                        style={{ margin: 0, fontSize: "14px", paddingLeft: 5 }}
                      >
                        Xóa nền với chỉ một lần nhấp
                      </p>
                    </div>
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        paddingTop: 15,
                      }}
                    >
                      <CheckIcon
                        sx={{ color: "rgb(165, 112, 255)", fontSize: 18 }}
                      />
                      <p
                        style={{ margin: 0, fontSize: "14px", paddingLeft: 5 }}
                      >
                        Lập kế hoạch và lên lịch cho nội dung đăng trên mạng xã
                        hội
                      </p>
                    </div>
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        paddingTop: 15,
                      }}
                    >
                      <CheckIcon
                        sx={{ color: "rgb(165, 112, 255)", fontSize: 18 }}
                      />
                      <p
                        style={{ margin: 0, fontSize: "14px", paddingLeft: 5 }}
                      >
                        Mẫu cao cấp không giới hạn {windowSize.height} và
                        {windowSize.width}
                      </p>
                    </div>
                    <p
                      style={{
                        fontSize: "12px",
                        paddingTop: 20,
                        color: "rgba(13, 18, 22, 0.7)",
                      }}
                    >
                      *Liên hệ với bộ phận bán hàng để biết thêm thông tin.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          
          
        </Tabs>
        <div
          style={{
            width: "75%",
            height: 30,
            borderTop: "1px solid rgb(225, 228, 231)",
            paddingTop: "3%",
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            paddingBottom: "3%",
            position: "absolute",
            paddingLeft: "5%",
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
              marginRight: "12%",
            }}
          >
            © 2023 Mọi quyền được bảo lưu, Ezpics®
          </p>
          <a href="https://www.facebook.com/ezpicsvn">
            <img src={fbLogo} alt="" style={{ width: 20, height: 20 }} />
          </a>
        </div>
      </div>
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
                      Mở khóa các tính năng sau với Ezpics Pro.
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
                        selectedDiscount === null ? "gray" : "rgb(255, 66, 78)",
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
      {showModalResize && (
        <div
          style={{
            position: "absolute",
            width: "100%",
            height: "100%",
            backgroundColor: "white",
            zIndex: 100000000,
          }}
        >
          
        </div>
      )}
    </div>
  );
}

export default ComparePricing;
