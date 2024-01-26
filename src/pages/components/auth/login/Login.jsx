import React, { useState, useEffect } from "react";
import bg from "./background.jpg";
import logo from "./ezpics-logo.png";
import "./LoginEzpics.css";
import GoogleIcon from "@mui/icons-material/Google";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  CHANGE_VALUE_TOKEN,
  CHANGE_STATUS_AUTH,
} from "../../../store/slice/authSlice";
import "./SignUp.css";
import { useGoogleLogin  } from '@react-oauth/google';

function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const network = useSelector((state) => state.ipv4.network);
  const [loading, setLoading] = useState(false);
  const [phoneNum, setPhoneNum] = useState("");
  const [password, setPassWord] = useState("");
  const token = useSelector((state) => state.auth.token);
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

    if (userLogin == null) {
      return false;
    } else {
      return true;
    }
  }

  function setCookie(name, value, expirationHours) {
    var date = new Date();
    value = JSON.stringify(value);
    date.setTime(date.getTime() + expirationHours * 60 * 60 * 1000); // Chuyển đổi giờ thành mili giây
    var expires = "expires=" + date.toUTCString();
    document.cookie = name + "=" + value + ";" + expires + ";path=/";
  }

  useEffect(() => {
    const authentication = checkAvailableLogin();
    if (authentication) {
      navigate("/", { replace: true });
    }
  }, []);

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
  var expirationHours = 3; // số giờ tồn tại của cookie
  const [errMessage, setErrMessage] = useState(false);
  const signInButton = async () => {
    setLoading(true);
    try {
      const response = await axios.post(`${network}/checkLoginMemberAPI`, {
        phone: phoneNum,
        password: password,
        type_device: "web",
      });
      if (response.data.code === 0) {
        console.log(response.data);
        dispatch(CHANGE_STATUS_AUTH(true));
        dispatch(CHANGE_VALUE_TOKEN(response.data?.info_member?.token_web));
        setCookie(
          "token",
          response.data?.info_member?.token_web,
          expirationHours
        );
        setCookie("user_login", response.data?.info_member, expirationHours);
        setLoading(false);
        const auth = checkAvailableLogin();
        if (auth) {
          navigate("/", { replace: true });
        }
      } else {
        setLoading(false);
        setErrMessage(true);
        console.log(response.data);
      }
    } catch (e) {
      setLoading(false);

      console.error(e);
    }
  };
  const backgroundStyle = {
    display: "flex",
    flexDirection: "column", // Use column direction to make flex: 1 work for height
    alignItems: "center", // Center the content horizontally
    justifyContent: "center", // Center the content vertically
    background: `url(${bg})`,
    flex: 1,
    minHeight: "100vh", // Set minimum height to 100% of the viewport height
    width: "100%",
    backgroundSize: "contain",
  };
  const overlayStyle = {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    background: "rgba(0, 0, 0, 0.4)", // Adjust the alpha value for the darkness
  };
  const blockStyle = {
    padding: "20px",
    backgroundColor: "white",
    width: 300,
    borderRadius: "8px",
    marginTop: "3%",
    animation: "fadeIn 0.5s ease-in-out",
  };
  const header = {
    width: "100%",
    paddingBottom: "10px",
    paddingTop: "10px",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  };
  const content = {
    width: "100%",
    minHeight: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  };
  const page = {
    paddingLeft: "2%",
  };
  const textHeader = {
    color: "white",
    fontFamily:
      "Canva Sans,Noto Sans Variable,Noto Sans,-apple-system,BlinkMacSystemFont,Segoe UI,Helvetica,Arial,sans-serif",
    fontWeight: 500,
    fontSize: "16px",
    paddingLeft: "3%",
  };
  const textContentHeader = {
    color: "black",
    fontSize: "18px",
    fontWeight: 700,
    paddingTop: "5%",
    paddingBottom: "2%",
  };
  const textDescription = {
    color: "black",
    fontSize: "13px",
  };
  const submitButton = {
    width: "100%",
    paddingTop: 10,
    paddingBottom: 10,
    marginTop: 20,
    border: "none",
    backgroundColor: "rgb(95, 97, 230)",
    borderRadius: 10,
    fontSize: "14px",
    fontWeight: 500,
    color: "rgb(255, 255, 255)",
    fontFamily:
      "Canva Sans,Noto Sans Variable,Noto Sans,-apple-system,BlinkMacSystemFont,Segoe UI,Helvetica,Arial,sans-serif",
  };
  const googleButton = {
    width: "100%",
    paddingTop: 10,
    paddingBottom: 10,
    border: "none",
    backgroundColor: "rgb(230, 56, 26)",
    borderRadius: 10,
    fontSize: "14px",
    fontWeight: 500,
    color: "rgb(255, 255, 255)",
    fontFamily:
      "Canva Sans,Noto Sans Variable,Noto Sans,-apple-system,BlinkMacSystemFont,Segoe UI,Helvetica,Arial,sans-serif",
  };
  const handleGoogleLogin = useGoogleLogin({
  onSuccess: tokenResponse => console.log(tokenResponse),
});
  return (
    <div style={backgroundStyle}>
      <div style={overlayStyle}>
        <div style={page}>
          <div style={header}>
            <img src={logo} alt="" style={{ width: 50, height: 50 }} />
            <div style={textHeader}>Tính năng</div>
            <div style={textHeader}>Mẫu thiết kế nổi bật</div>
            <div style={textHeader}>Hướng dẫn sử dụng</div>
            <div style={textHeader}>BLOG</div>
            <div style={textHeader}>Liên hệ</div>
          </div>
          <div style={content}>
            <div style={blockStyle}>
              <div style={textContentHeader}>Ezpics - Dùng là thích! 👋</div>
              <p style={textDescription}>
                Mời bạn đăng nhập công cụ thiết kế siêu tốc đầu tiên tại Việt
                Nam
              </p>
              <p
                style={{
                  fontFamily:
                    "Canva Sans,Noto Sans Variable,Noto Sans,-apple-system,BlinkMacSystemFont,Segoe UI,Helvetica,Arial,sans-serif",
                  fontSize: "15px",
                  fontWeight: 500,
                }}
              >
                Số điện thoại
              </p>
              <input
                type="text"
                onChange={(e) => setPhoneNum(e.target.value)}
                placeholder="Số điện thoại"
              />

              <p
                style={{
                  fontFamily:
                    "Canva Sans,Noto Sans Variable,Noto Sans,-apple-system,BlinkMacSystemFont,Segoe UI,Helvetica,Arial,sans-serif",
                  fontSize: "15px",
                  fontWeight: 500,
                  paddingTop: 5,
                }}
              >
                Mật khẩu
              </p>
              <input
                type="password"
                onChange={(e) => setPassWord(e.target.value)}
                placeholder="Mật khẩu"
              />
              {errMessage && (
                <p
                  style={{
                    fontSize: "13px",
                    fontWeight: 500,
                    paddingTop: 5,
                    textAlign: "center",
                    margin: 0,
                    color: "red",
                  }}
                >
                  Số điện thoại hoặc mật khẩu sai
                </p>
              )}
              <button style={submitButton} onClick={() => signInButton()}>
                {loading ? (
                  <div class="lds-ring-login">
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                  </div>
                ) : (
                  "Đăng nhập"
                )}
              </button>
              <p style={{ fontSize: "12px", textAlign: "center" }}>Hoặc</p>
              <button style={googleButton} onClick={() => handleGoogleLogin()}>Đăng nhập bằng Google</button>
              <p
                style={{
                  fontFamily:
                    "Canva Sans,Noto Sans Variable,Noto Sans,-apple-system,BlinkMacSystemFont,Segoe UI,Helvetica,Arial,sans-serif",
                  fontSize: "13px",
                  paddingTop: 5,
                  textAlign: "center",
                }}
              >
                Bạn chưa có tài khoản ? - <a href="/sign-up">Đăng ký</a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
