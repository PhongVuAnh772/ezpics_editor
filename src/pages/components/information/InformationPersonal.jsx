import React from "react";
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
import { CHANGE_VALUE,DELETE_ALL_VALUES } from "../../store/slice/infoUser";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function InformationPersonal() {
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
  const [inputNameChanging, setInputNameChanging] = React.useState("");
  const [inputPhoneChanging, setInputPhoneChanging] = React.useState("");
  const [inputEmailChanging, setInputEmailChanging] = React.useState("");

  const network = useSelector((state) => state.network.network);
  const [passwordChanging, setPasswordChanging] = React.useState(false);
  const [oldPass, setOldPass] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [rePassword, setRePassword] = React.useState("");
  const token = useSelector((state) => state.auth.token);
  React.useEffect(() => {
    setInputNameChanging(infoUser[0]?.name);
    setInputPhoneChanging(infoUser[0]?.phone);
    setInputEmailChanging(infoUser[0]?.email);
  }, []);

  const handleChangeName = async () => {
    const response = await axios.post(`${network}/saveInfoUserAPI`, {
      token: token,
      name: inputNameChanging,
    });
    if (response && response.data.code === 0) {
      const response = await axios.post(`${network}/getInfoMemberAPI`, {
        token: token,
      });
      if (response && response.data.code === 0) {
        window.location.reload();
        setCookie("user_login", response.data.data, 1);
        dispatch(CHANGE_VALUE(response.data.data));
        
        console.log(response.data.data);
      }
    }
  };
  const handlePhone = async () => {
    const response = await axios.post(`${network}/saveInfoUserAPI`, {
      token: token,
      phone: inputPhoneChanging,
    });
    if (response && response.data) {
      const response = await axios.post(`${network}/getInfoMemberAPI`, {
        token: token,
      });
      if (response && response.data.code === 0) {
        window.location.reload();
        setCookie("user_login", response.data.data, 1);
        dispatch(CHANGE_VALUE(response.data.data));
        
        console.log(response.data.data);
      }
    }
  };
  const handleChangeEmail = async () => {
    const response = await axios.post(`${network}/saveInfoUserAPI`, {
      token: token,
      email: inputEmailChanging,
    });
    if (response && response.data) {
      const response = await axios.post(`${network}/getInfoMemberAPI`, {
        token: token,
      });
      if (response && response.data.code === 0) {
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
      token: token,
      passOld: oldPass,
      passNew: password,
      passAgain: rePassword,
    });
    if (response && response.data) {
      const response = await axios.post(`${network}/getInfoMemberAPI`, {
        token: token,
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
      token: token,
    });
    if (response && response.data) {
      const response = await axios.post(`${network}/getInfoMemberAPI`, {
        token: token,
      });
      if (response && response.data.code === 0) {
        deleteCookie("user_login");
        dispatch(DELETE_ALL_VALUES());
        navigate('/',{replace: true});
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
    <div style={{ paddingTop: "6%", paddingRight: "30%", paddingLeft: "20%" }}>
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
            >
              Xóa ảnh
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
            >
              Thay đổi ảnh
            </Button>
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
                  width: 80,                  fontWeight: "bold",

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
                  width: 80,                  fontWeight: "bold",

                }}
                onClick={() => handleChangeName()}
              >
                Lưu
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
                  width: 80,                  fontWeight: "bold",

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
                  width: 80,                  fontWeight: "bold",

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
                    width: 80,                  fontWeight: "bold",

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
                    width: 80,                  fontWeight: "bold",

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
                  width: 80,                  fontWeight: "bold",

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
              value={infoUser[0]?.email}
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
                  width: 80,                  fontWeight: "bold",

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
                  width: 80,                  fontWeight: "bold",

                }}
                onClick={() => handleChangeEmail()}
              >
                Lưu
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
                  width: 80,                  fontWeight: "bold",

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
              value={infoUser[0]?.phone}
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
                  width: 80,                  fontWeight: "bold",

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
                  width: 80,                  fontWeight: "bold",

                }}
                onClick={() => handlePhone()}
              >
                Lưu
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
                  width: 80,                  fontWeight: "bold",

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
    </div>
  );
}

export default InformationPersonal;
