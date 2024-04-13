import React, { useState, useRef,useEffect  } from "react";
import "./information.css";
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
import Button from "@mui/material/Button";
import { useSelector, useDispatch } from "react-redux";
import { CHANGE_VALUE, DELETE_ALL_VALUES } from "../../store/slice/infoUser";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
function InformationPersonal() {
  const inputFileRef = useRef(null);
  const handleRemoveBackground = () => {
    inputFileRef.current?.click();
  };
  const dispatch = useDispatch();
  const open = useOutletContext();
  const infoUser = useSelector((state) => state.user.info);
  const drawerWidth = 240;
  const [inputName, setInputName] = React.useState(false);
  const [inputEmail, setInputEmail] = React.useState(false);
  const [inputPhone, setInputPhone] = React.useState(false);
  function setCookie(name, value, expirationHours) {
    var date = new Date();
    value = JSON.stringify(value);
    date.setTime(date.getTime() + expirationHours * 60 * 60 * 1000); // Chuyển đổi giờ thành mili giây
    var expires = "expires=" + date.toUTCString();
    document.cookie = name + "=" + value + ";" + expires + ";path=/";
  }
  const styleModalBuyingFree = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "30%",
    height: 400,
    // bgcolor: "background.paper",
    boxShadow: 24,
    display: "flex",
    alignItems: "center",
    flexDirection: "column",
    paddingTop: "15px",
    alignItems:'center',
    justifyContent: "center",
    borderRadius: "15px",
  };
  const [inputNameChanging, setInputNameChanging] = React.useState("");
  const [inputPhoneChanging, setInputPhoneChanging] = React.useState("");
  const [inputEmailChanging, setInputEmailChanging] = React.useState("");

  const network = useSelector((state) => state.ipv4.network);
  const [passwordChanging, setPasswordChanging] = React.useState(false);
  const [oldPass, setOldPass] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [rePassword, setRePassword] = React.useState("");
  const [loadingRemove, setLoadingRemove] = useState(false);

  const handleDropFiles = async (files) => {
    setLoadingRemove(true);
    const file = files[0];
    const url = URL.createObjectURL(file);
    if (!/(png|jpg|jpeg)$/i.test(file.name)) {
      toast.error("Chỉ chấp nhận file png, jpg hoặc jpeg");
      setLoadingRemove(false);

      return;
    } else {
      const headers = {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers": "*",
        "Content-Type": "multipart/form-data",
      };

      const config = {
        headers: headers,
      };
      const formData = new FormData();

      formData.append("avatar", file);
      formData.append("token", checkTokenCookie());
      const response = await axios.post(
        `${network}/saveInfoUserAPI`,
        formData,
        config
      );

      if (response && response.data.code === 0) {
        const response2 = await axios.post(`${network}/getInfoMemberAPI`, {
          token: checkTokenCookie(),
        });
        if (response2 && response2.data.code === 0) {
              setLoadingRemove(false);


          window.location.reload();
          setCookie("user_login", response2.data.data, 1);
          dispatch(CHANGE_VALUE(response2.data.data));

          console.log(response2.data);
        }
      }
    }
  };
  const handleFileInput = (e) => {
    handleDropFiles(e.target.files);
  };
  const [modalImage,setModalImage] =useState(false)
  function checkTokenCookie() {
    var allCookies = document.cookie;

    var cookiesArray = allCookies.split("; ");

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
  const token = checkTokenCookie();
  React.useEffect(() => {
    setInputNameChanging(infoUser[0]?.name);
    setInputPhoneChanging(infoUser[0]?.phone);
    setInputEmailChanging(infoUser[0]?.email);
  }, []);
  const [loadingName, setLoadingName] = useState(false);
  const [loadingEmail, setLoadingEmail] = useState(false);

  const [loadingPhone, setLoadingPhone] = useState(false);

  const handleChangeName = async () => {
    setLoadingName(true);
    const response = await axios.post(`${network}/saveInfoUserAPI`, {
      token: checkTokenCookie(),
      name: inputNameChanging,
    });
    if (response && response.data.code === 0) {
      const response = await axios.post(`${network}/getInfoMemberAPI`, {
        token: checkTokenCookie(),
      });
      if (response && response.data.code === 0) {
        setLoadingName(false);

        window.location.reload();
        setCookie("user_login", response.data.data, 1);
        dispatch(CHANGE_VALUE(response.data.data));

        console.log(response.data.data);
      }
    }
  };
  const [imageAvatar,setImageAvatar] =React.useState('')
  useEffect(() => {
    if (infoUser) {
      setImageAvatar(infoUser[0]?.avatar)
    }
  }, [])
  const handleCloseModalFreeExtend = () => {
    setModalImage(false);
  };
  const handlePhone = async () => {
    setLoadingPhone(true);
    const response = await axios.post(`${network}/saveInfoUserAPI`, {
      token: checkTokenCookie(),
      phone: inputPhoneChanging,
    });
    if (response && response.data) {
      const response = await axios.post(`${network}/getInfoMemberAPI`, {
        token: checkTokenCookie(),
      });
      if (response && response.data.code === 0) {
        setLoadingPhone(false);
        window.location.reload();
        setCookie("user_login", response.data.data, 1);
        dispatch(CHANGE_VALUE(response.data.data));

        console.log(response.data.data);
      }
    }
  };
  const handleChangeEmail = async () => {
    setLoadingEmail(true);
    const response = await axios.post(`${network}/saveInfoUserAPI`, {
      token: checkTokenCookie(),
      email: inputEmailChanging,
    });
    if (response && response.data) {
      const response = await axios.post(`${network}/getInfoMemberAPI`, {
        token: checkTokenCookie(),
      });
      if (response && response.data.code === 0) {
        setLoadingEmail(false);
        window.location.reload();
        setCookie("user_login", response.data.data, 1);
        dispatch(CHANGE_VALUE(response.data.data));

        console.log(response.data.data);
      }
    }
  };
  const navigate = useNavigate();

  const handleChangePassword = async () => {
    const response = await axios.post(`${network}/saveChangePassAPI`, {
      token: checkTokenCookie(),
      passOld: oldPass,
      passNew: password,
      passAgain: rePassword,
    });
    if (response && response.data) {
      const response = await axios.post(`${network}/getInfoMemberAPI`, {
        token: checkTokenCookie(),
      });
      if (response && response.data.code === 0) {
        window.location.reload();
        setCookie("user_login", response.data.data, 1);
        dispatch(CHANGE_VALUE(response.data.data));

        console.log(response.data.data);
      }
    }
  };
  function deleteCookie(key) {
    document.cookie = key + "=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
  }
  const handleDeleteAccount = async () => {
    const response = await axios.post(`${network}/lockAccountAPI`, {
      token: checkTokenCookie(),
    });
    if (response && response.data) {
      const response = await axios.post(`${network}/getInfoMemberAPI`, {
        token: checkTokenCookie(),
      });
      if (response && response.data.code === 0) {
        deleteCookie("user_login");
        dispatch(DELETE_ALL_VALUES());
        navigate("/", { replace: true });
      }
    }
  };
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
  return (
    <><div style={{ paddingTop: "6%", paddingRight: "30%", paddingLeft: "20%" }}>
      <div className="information-header__container">
        <label className="information-header">Tài khoản của bạn</label>
      </div>
      <div className="information-content__container">
        <p className="information-content__header">Ảnh hồ sơ</p>
        <div className="information-content__satisfied">
          <img
            className="information-content__satisfied---image"
            src={infoUser[0]?.avatar}
            alt=""
          />
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <Button
              style={{
                alignItems: "center",
                // fontFamily:
                //   "Noto Sans Vietnamese,-apple-system,BlinkMacSystemFont,Segoe UI,Helvetica,Arial,sans-serif",
                fontSize: "15px",
                color: "rgb(13, 18, 22)",
                lineHeight: "22px",
                textTransform: "none",
                height: 36,
                marginRight: "8px",
                fontWeight: "bold",
              }}
              onClick={() => setModalImage(true)}
            >
              Xem ảnh hiện tại
            </Button>
            <Button
              style={{
                alignItems: "center",
                // fontFamily:
                //   "Noto Sans Vietnamese,-apple-system,BlinkMacSystemFont,Segoe UI,Helvetica,Arial,sans-serif",
                fontSize: "15px",
                color: "rgb(13, 18, 22)",
                lineHeight: "22px",
                textTransform: "none",
                paddingLeft: "6px",
                paddingRight: "6px",
                backgroundColor: "rgb(225, 228, 231)",
                height: 36,
                width: 120,
                fontWeight: "600",
              }}
              onClick={() => handleRemoveBackground()}
            >
              
              {loadingRemove ? <span className="loaderNew2"></span> : "Thay đổi ảnh"}
            </Button>
            <input
              onChange={handleFileInput}
              type="file"
              id="file"
              ref={inputFileRef}
              style={{ display: "none" }}
            />
          </div>
        </div>
      </div>
      <div className="information-content__container">
        <p className="information-content__header" style={{ marginBottom: 0 }}>
          Tên
        </p>
        {inputName ? (
          <div
            className="information-content__satisfied"
            style={{ paddingTop: "5px" }}
          >
            <input
              style={{
                alignItems: "center",
                // fontFamily:
                //   "Noto Sans Vietnamese,-apple-system,BlinkMacSystemFont,Segoe UI,Helvetica,Arial,sans-serif",
                fontSize: "15px",
                color: "rgb(13, 18, 22)",
                lineHeight: "22px",
                textTransform: "none",
                paddingLeft: "10px",
                paddingRight: "10px",
                backgroundColor: "rgb(255, 255, 255)",
                height: 36,
                width: "100%",
                marginRight: "10px",
                border: "1px solid rgb(225, 228, 231)",
              }}
              className="information-content__satisfied---input"
              value={inputNameChanging}
              onChange={(e) => setInputNameChanging(e.target.value)}
            />
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <Button
                style={{
                  alignItems: "center",
                  // fontFamily:
                  //   "Noto Sans Vietnamese,-apple-system,BlinkMacSystemFont,Segoe UI,Helvetica,Arial,sans-serif",
                  fontSize: "15px",
                  color: "rgb(13, 18, 22)",
                  lineHeight: "22px",
                  textTransform: "none",
                  paddingLeft: "10px",
                  paddingRight: "10px",
                  backgroundColor: "rgb(225, 228, 231)",
                  height: 36,
                  width: 80,
                  fontWeight: "bold",

                  marginRight: "10px",
                }}
                onClick={() => setInputName(false)}
              >
                Hủy
              </Button>
              <Button
                style={{
                  alignItems: "center",
                  // fontFamily:
                  //   "Noto Sans Vietnamese,-apple-system,BlinkMacSystemFont,Segoe UI,Helvetica,Arial,sans-serif",
                  fontSize: "15px",
                  color: "white",
                  lineHeight: "22px",
                  textTransform: "none",
                  paddingLeft: "10px",
                  paddingRight: "10px",
                  backgroundColor: "rgb(255, 66, 78)",
                  height: 36,
                  width: 80,
                  fontWeight: "bold",
                }}
                onClick={() => handleChangeName()}
              >
                {loadingName ? <span className="loaderNew"></span> : "Lưu"}
              </Button>
            </div>
          </div>
        ) : (
          <div className="information-content__satisfied">
            <p className="information-content__satisfied----text">
              {infoUser[0]?.name}
            </p>
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <Button
                style={{
                  alignItems: "center",
                  // fontFamily:
                  //   "Noto Sans Vietnamese,-apple-system,BlinkMacSystemFont,Segoe UI,Helvetica,Arial,sans-serif",
                  fontSize: "15px",
                  color: "rgb(13, 18, 22)",
                  lineHeight: "22px",
                  textTransform: "none",
                  paddingLeft: "10px",
                  paddingRight: "10px",
                  backgroundColor: "rgb(225, 228, 231)",
                  height: 36,
                  width: 80,
                  fontWeight: "bold",
                }}
                onClick={() => setInputName(true)}
              >
                Sửa
              </Button>
            </div>
          </div>
        )}
      </div>
      <div className="information-content__container">
        <p className="information-content__header" style={{ marginBottom: 0 }}>
          Mật khẩu
        </p>
        {passwordChanging ? (
          <div style={{ paddingTop: "5px" }}>
            <p
              style={{
                marginTop: "5px",
                marginBottom: "5px",
                color: "rgb(95, 99, 128)",
                fontSize: "14px",
              }}
            >
              Mật khẩu cũ
            </p>
            <input
              type="password"
              style={{
                alignItems: "center",
                // fontFamily:
                //   "Noto Sans Vietnamese,-apple-system,BlinkMacSystemFont,Segoe UI,Helvetica,Arial,sans-serif",
                fontSize: "15px",
                color: "rgb(13, 18, 22)",
                lineHeight: "22px",
                textTransform: "none",
                paddingLeft: "10px",
                paddingRight: "10px",
                backgroundColor: "rgb(255, 255, 255)",
                height: 36,
                width: "100%",
                marginRight: "10px",
                border: "1px solid rgb(225, 228, 231)",
              }}
              className="information-content__satisfied---input"
              onChange={(e) => setOldPass(e.target.value)}
            />

            <p
              style={{
                marginTop: "5px",
                marginBottom: "5px",
                color: "rgb(95, 99, 128)",
                fontSize: "14px",
              }}
            >
              Mật khẩu mới
            </p>
            <input
              type="password"
              style={{
                alignItems: "center",
                // fontFamily:
                //   "Noto Sans Vietnamese,-apple-system,BlinkMacSystemFont,Segoe UI,Helvetica,Arial,sans-serif",
                fontSize: "15px",
                color: "rgb(13, 18, 22)",
                lineHeight: "22px",
                textTransform: "none",
                paddingLeft: "10px",
                paddingRight: "10px",
                backgroundColor: "rgb(255, 255, 255)",
                height: 36,
                width: "100%",
                marginRight: "10px",
                border: "1px solid rgb(225, 228, 231)",
              }}
              className="information-content__satisfied---input"
              onChange={(e) => setPassword(e.target.value)}
            />

            <p
              style={{
                marginTop: "5px",
                marginBottom: "5px",
                color: "rgb(95, 99, 128)",
                fontSize: "14px",
              }}
            >
              Nhập lại mật khẩu
            </p>

            <input
              type="password"
              style={{
                alignItems: "center",
                // fontFamily:
                //   "Noto Sans Vietnamese,-apple-system,BlinkMacSystemFont,Segoe UI,Helvetica,Arial,sans-serif",
                fontSize: "15px",
                color: "rgb(13, 18, 22)",
                lineHeight: "22px",
                textTransform: "none",
                paddingLeft: "10px",
                paddingRight: "10px",
                backgroundColor: "rgb(255, 255, 255)",
                height: 36,
                width: "100%",
                marginRight: "10px",
                border: "1px solid rgb(225, 228, 231)",
              }}
              className="information-content__satisfied---input"
              onChange={(e) => setRePassword(e.target.value)}
            />
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                paddingTop: "10px",
                justifyContent: "flex-end",
              }}
            >
              <Button
                style={{
                  alignItems: "center",
                  // fontFamily:
                  //   "Noto Sans Vietnamese,-apple-system,BlinkMacSystemFont,Segoe UI,Helvetica,Arial,sans-serif",
                  fontSize: "15px",
                  color: "rgb(13, 18, 22)",
                  lineHeight: "22px",
                  textTransform: "none",
                  paddingLeft: "10px",
                  paddingRight: "10px",
                  backgroundColor: "rgb(225, 228, 231)",
                  height: 36,
                  width: 80,
                  fontWeight: "bold",

                  marginRight: "10px",
                }}
                onClick={() => setPasswordChanging(false)}
              >
                Hủy
              </Button>
              {oldPass && password && rePassword ? (
                <Button
                  style={{
                    alignItems: "center",
                    // fontFamily:
                    //   "Noto Sans Vietnamese,-apple-system,BlinkMacSystemFont,Segoe UI,Helvetica,Arial,sans-serif",
                    fontSize: "15px",
                    color: "white",
                    lineHeight: "22px",
                    textTransform: "none",
                    paddingLeft: "10px",
                    paddingRight: "10px",
                    backgroundColor: "rgb(255, 66, 78)",
                    height: 36,
                    width: 80,
                    fontWeight: "bold",
                  }}
                  onClick={() => handleChangePassword()}
                >
                  Lưu
                </Button>
              ) : (
                <Button
                  style={{
                    alignItems: "center",
                    // fontFamily:
                    //   "Noto Sans Vietnamese,-apple-system,BlinkMacSystemFont,Segoe UI,Helvetica,Arial,sans-serif",
                    fontSize: "15px",
                    color: "white",
                    lineHeight: "22px",
                    textTransform: "none",
                    paddingLeft: "10px",
                    paddingRight: "10px",
                    backgroundColor: "rgba(255, 66, 78,0.4)",
                    height: 36,
                    width: 80,
                    fontWeight: "bold",
                  }}
                  disabled
                  onClick={() => handleChangePassword()}
                >
                  Lưu
                </Button>
              )}
            </div>
          </div>
        ) : (
          <div className="information-content__satisfied">
            <p className="information-content__satisfied----text">
              *************
            </p>
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <Button
                style={{
                  alignItems: "center",
                  // fontFamily:
                  //   "Noto Sans Vietnamese,-apple-system,BlinkMacSystemFont,Segoe UI,Helvetica,Arial,sans-serif",
                  fontSize: "15px",
                  color: "rgb(13, 18, 22)",
                  lineHeight: "22px",
                  textTransform: "none",
                  paddingLeft: "10px",
                  paddingRight: "10px",
                  backgroundColor: "rgb(225, 228, 231)",
                  height: 36,
                  width: 80,
                  fontWeight: "bold",
                }}
                onClick={() => setPasswordChanging(true)}
              >
                Sửa
              </Button>
            </div>
          </div>
        )}
      </div>
      <div className="information-content__container">
        <p className="information-content__header" style={{ marginBottom: 0 }}>
          Địa chỉ email
        </p>
        {inputEmail ? (
          <div
            className="information-content__satisfied"
            style={{ paddingTop: "5px" }}
          >
            <input
              style={{
                alignItems: "center",
                // fontFamily:
                //   "Noto Sans Vietnamese,-apple-system,BlinkMacSystemFont,Segoe UI,Helvetica,Arial,sans-serif",
                fontSize: "15px",
                color: "rgb(13, 18, 22)",
                lineHeight: "22px",
                textTransform: "none",
                paddingLeft: "10px",
                paddingRight: "10px",
                backgroundColor: "rgb(255, 255, 255)",
                height: 36,
                width: "100%",
                marginRight: "10px",
                border: "1px solid rgb(225, 228, 231)",
              }}
              className="information-content__satisfied---input"
              value={inputEmailChanging}
              onChange={(e) => setInputEmailChanging(e.target.value)}
            />
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <Button
                style={{
                  alignItems: "center",
                  // fontFamily:
                  //   "Noto Sans Vietnamese,-apple-system,BlinkMacSystemFont,Segoe UI,Helvetica,Arial,sans-serif",
                  fontSize: "15px",
                  color: "rgb(13, 18, 22)",
                  lineHeight: "22px",
                  textTransform: "none",
                  paddingLeft: "10px",
                  paddingRight: "10px",
                  backgroundColor: "rgb(225, 228, 231)",
                  height: 36,
                  width: 80,
                  fontWeight: "bold",

                  marginRight: "10px",
                }}
                onClick={() => setInputEmail(false)}
              >
                Hủy
              </Button>
              <Button
                style={{
                  alignItems: "center",
                  // fontFamily:
                  //   "Noto Sans Vietnamese,-apple-system,BlinkMacSystemFont,Segoe UI,Helvetica,Arial,sans-serif",
                  fontSize: "15px",
                  color: "white",
                  lineHeight: "22px",
                  textTransform: "none",
                  paddingLeft: "10px",
                  paddingRight: "10px",
                  backgroundColor: "rgb(255, 66, 78)",
                  height: 36,
                  width: 80,
                  fontWeight: "bold",
                }}
                onClick={() => handleChangeEmail()}
              >
                {loadingEmail ? <span className="loaderNew"></span> : "Lưu"}
              </Button>
            </div>
          </div>
        ) : (
          <div className="information-content__satisfied">
            <p className="information-content__satisfied----text">
              {infoUser[0]?.email}
            </p>
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <Button
                style={{
                  alignItems: "center",
                  // fontFamily:
                  //   "Noto Sans Vietnamese,-apple-system,BlinkMacSystemFont,Segoe UI,Helvetica,Arial,sans-serif",
                  fontSize: "15px",
                  color: "rgb(13, 18, 22)",
                  lineHeight: "22px",
                  textTransform: "none",
                  paddingLeft: "10px",
                  paddingRight: "10px",
                  backgroundColor: "rgb(225, 228, 231)",
                  height: 36,
                  width: 80,
                  fontWeight: "bold",
                }}
                onClick={() => setInputEmail(true)}
              >
                Sửa
              </Button>
            </div>
          </div>
        )}
      </div>
      <div className="information-content__container">
        <p className="information-content__header" style={{ marginBottom: 0 }}>
          Số điện thoại
        </p>
        {inputPhone ? (
          <div
            className="information-content__satisfied"
            style={{ paddingTop: "5px" }}
          >
            <input
              style={{
                alignItems: "center",
                // fontFamily:
                //   "Noto Sans Vietnamese,-apple-system,BlinkMacSystemFont,Segoe UI,Helvetica,Arial,sans-serif",
                fontSize: "15px",
                color: "rgb(13, 18, 22)",
                lineHeight: "22px",
                textTransform: "none",
                paddingLeft: "10px",
                paddingRight: "10px",
                backgroundColor: "rgb(255, 255, 255)",
                height: 36,
                width: "100%",
                marginRight: "10px",
                border: "1px solid rgb(225, 228, 231)",
              }}
              className="information-content__satisfied---input"
              value={inputPhoneChanging}
              onChange={(e) => setInputPhoneChanging(e.target.value)}
            />
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <Button
                style={{
                  alignItems: "center",
                  // fontFamily:
                  //   "Noto Sans Vietnamese,-apple-system,BlinkMacSystemFont,Segoe UI,Helvetica,Arial,sans-serif",
                  fontSize: "15px",
                  color: "rgb(13, 18, 22)",
                  lineHeight: "22px",
                  textTransform: "none",
                  paddingLeft: "10px",
                  paddingRight: "10px",
                  backgroundColor: "rgb(225, 228, 231)",
                  height: 36,
                  width: 80,
                  fontWeight: "bold",

                  marginRight: "10px",
                }}
                onClick={() => setInputPhone(false)}
              >
                Hủy
              </Button>
              <Button
                style={{
                  alignItems: "center",
                  // fontFamily:
                  //   "Noto Sans Vietnamese,-apple-system,BlinkMacSystemFont,Segoe UI,Helvetica,Arial,sans-serif",
                  fontSize: "15px",
                  color: "white",
                  lineHeight: "22px",
                  textTransform: "none",
                  paddingLeft: "10px",
                  paddingRight: "10px",
                  backgroundColor: "rgb(255, 66, 78)",
                  height: 36,
                  width: 80,
                  fontWeight: "bold",
                }}
                onClick={() => handlePhone()}
              >
                {loadingPhone ? <span className="loaderNew"></span> : "Lưu"}
              </Button>
            </div>
          </div>
        ) : (
          <div className="information-content__satisfied">
            <p className="information-content__satisfied----text">
              {infoUser[0]?.phone}
            </p>
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <Button
                style={{
                  alignItems: "center",
                  // fontFamily:
                  //   "Noto Sans Vietnamese,-apple-system,BlinkMacSystemFont,Segoe UI,Helvetica,Arial,sans-serif",
                  fontSize: "15px",
                  color: "rgb(13, 18, 22)",
                  lineHeight: "22px",
                  textTransform: "none",
                  paddingLeft: "10px",
                  paddingRight: "10px",
                  backgroundColor: "rgb(225, 228, 231)",
                  height: 36,
                  width: 80,
                  fontWeight: "bold",
                }}
                onClick={() => setInputPhone(true)}
              >
                Sửa
              </Button>
            </div>
          </div>
        )}
      </div>
      <div className="information-content__container">
        <p className="information-content__header" style={{ marginBottom: 0 }}>
          Xóa tài khoản
        </p>
        <div className="information-content__satisfied">
          <p className="information-content__satisfied----text">
            Một khi bạn xóa tài khoản, bạn sẽ không thể quay lại. Xin hãy chắc
            chắn.
          </p>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <Button
              style={{
                alignItems: "center",
                // fontFamily:
                //   "Noto Sans Vietnamese,-apple-system,BlinkMacSystemFont,Segoe UI,Helvetica,Arial,sans-serif",
                fontSize: "15px",
                color: "red",
                lineHeight: "22px",
                textTransform: "none",
                paddingLeft: "10px",
                paddingRight: "10px",
                height: 36,
                width: 120,
                border: "1px solid red",
                backgroundColor: "white",
              }}
              onClick={() => handleDeleteAccount()}
            >
              Xóa tài khoản
            </Button>
          </div>
        </div>
      </div>
    </div><Modal
          open={modalImage}
          onClose={handleCloseModalFreeExtend}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={styleModalBuyingFree}>
                      {imageAvatar && <img src={imageAvatar} alt="" style={{width: '100%',height:'100%'}}/>}

          </Box>
        </Modal></>
  );
}

export default InformationPersonal;
