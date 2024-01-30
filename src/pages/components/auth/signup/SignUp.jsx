import React, { useState, useEffect } from "react";
import bg from "./background.jpg";
import logo from "./ezpics-logo.png";
import "./SignUp.css";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import img4 from "./img4.jpg";
import { toast } from "react-toastify";
import './Content.css'
import {
  CHANGE_VALUE_TOKEN,
  CHANGE_STATUS_AUTH,
} from "../../../store/slice/authSlice";
import axios from "axios";
function SignUp() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
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
  useEffect(() => {
    const authentication = checkAvailableLogin();
    if (authentication) {
      navigate("/", { replace: true });
    }
  }, []);
    const network = useSelector((state) => state.ipv4.network);
const isValidPhoneNumber = (phoneNumber) => {
  return /^\d{10}$/.test(phoneNumber);
};
const [loading,setLoading] = useState(false)
var expirationHours = 3;
function setCookie(name, value, expirationHours) {
    var date = new Date();
    value = JSON.stringify(value);
    date.setTime(date.getTime() + expirationHours * 60 * 60 * 1000); // Chuyển đổi giờ thành mili giây
    var expires = "expires=" + date.toUTCString();
    document.cookie = name + "=" + value + ";" + expires + ";path=/";
  }
  const handleSignUp = async (e) => {
    e.preventDefault();
    if (
      name !== "" &&
      isValidPhoneNumber(phone) &&
      password !== "" &&
      rePassword !== "" &&
      affsource !== ""
    ) {
      
      if (password === rePassword) {const response = await axios.post(`${network}/saveRegisterMemberAPI`, {
        name: name,
        phone: phone,
        password: password,
        password_again: rePassword,
        affsource: affsource,
        token_device: "web",
      });
      if (response && response.data && response.data.code === 0) {
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
          toast.success("Đăng ký thành công !! 🦄", {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
          navigate("/", { replace: true });
        }
        
      } else if (response && response.data && response.data.code === 3) {
        toast.error("Số điện thoại đã tồn tại !! 🦄", {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
      }}
      else {
        toast.error("Mật khẩu nhập lại không đúng !! 🦄", {
        position: "top-right",
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
      toast.error("Có trường bị thiếu hoặc nhập sai, hãy thử lại !! 🦄", {
        position: "top-right",
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
    backgroundColor: "white",
    width: "90%",
    borderRadius: "8px",
    marginTop: "0%",
    display: "flex",
    flexDirection: "row",
  };
  const header = {
    width: "100%",
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
    alignSelf: "center",
  };
  const blockStyleSignUp = {
    width: "50%",
    minHeight: "100%",
  };
  const blockStyleSignUpSecond = {
    width: "50%",
    height: "100%",
    paddingLeft: 10,
    paddingRight: 10,
  };
  const [phone, setPhone] = useState("");
  const [name, setName] = useState("");

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rePassword, setRePassword] = useState("");
  const [affsource, setAffsource] = useState("");

  //   const [phone,setPhone] = useState('')
  // const [phone,setPhone] = useState('')
  // const [phone,setPhone] = useState('')
  // const [phone,setPhone] = useState('')

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
              <div style={blockStyleSignUp}>
                <img
                  src={img4}
                  alt=""
                  style={{
                    width: "auto",
                    minHeight: "100%",
                    objectFit: "contain",
                  }}
                />
              </div>
              <div style={blockStyleSignUpSecond}>
                <div style={textContentHeader}>Ezpics - Dùng là thích! 👋</div>
                <p
                  style={{
                    fontFamily:
                      "Canva Sans,Noto Sans Variable,Noto Sans,-apple-system,BlinkMacSystemFont,Segoe UI,Helvetica,Arial,sans-serif",
                    fontSize: "15px",
                    fontWeight: 500,
                  }}
                >
                  Tên
                </p>
                <input
                  type="text"
                  id="fname"
                  name="firstname"
                  placeholder="Tên"
                  autoFocus
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
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
                  id="fname"
                  name="firstname"
                  placeholder="Số điện thoại"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
                <p
                  style={{
                    fontFamily:
                      "Canva Sans,Noto Sans Variable,Noto Sans,-apple-system,BlinkMacSystemFont,Segoe UI,Helvetica,Arial,sans-serif",
                    fontSize: "15px",
                    fontWeight: 500,
                  }}
                >
                  Email
                </p>
                <input
                  type="text"
                  id="fname"
                  name="firstname"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />

                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    width: "100%",
                  }}
                >
                  <div style={{ width: "50%" }}>
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
                      id="lname"
                      name="lastname"
                      placeholder="Mật khẩu"
                      style={{ width: "90%" }}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </div>
                  <div style={{ width: "50%" }}>
                    <p
                      style={{
                        fontFamily:
                          "Canva Sans,Noto Sans Variable,Noto Sans,-apple-system,BlinkMacSystemFont,Segoe UI,Helvetica,Arial,sans-serif",
                        fontSize: "15px",
                        fontWeight: 500,
                        paddingTop: 5,
                      }}
                    >
                      Nhập lại mật khẩu
                    </p>
                    <input
                      type="password"
                      id="lname"
                      name="lastname"
                      placeholder="Mật khẩu"
                      value={rePassword}
                      onChange={(e) => setRePassword(e.target.value)}
                    />
                  </div>
                </div>
                <div style={{ display: "flex", flexDirection: "row" }}>
                  {" "}
                  <p
                    style={{
                      fontFamily:
                        "Canva Sans,Noto Sans Variable,Noto Sans,-apple-system,BlinkMacSystemFont,Segoe UI,Helvetica,Arial,sans-serif",
                      fontSize: "15px",
                      fontWeight: 500,
                      paddingTop: 5,
                    }}
                  >
                    Mã giới thiệu
                  </p>
                  <input
                    type="password"
                    id="lname"
                    name="lastname"
                    placeholder="Mã giới thiệu"
                    value={affsource}
                    onChange={(e) => setAffsource(e.target.value)}
                  />
                </div>
                <button style={submitButton} onClick={(e) => handleSignUp(e)}>
                  
                  {loading ? <span class="loaderNew"></span> :'Đăng ký'}
                </button>

                <p
                  style={{
                    fontFamily:
                      "Canva Sans,Noto Sans Variable,Noto Sans,-apple-system,BlinkMacSystemFont,Segoe UI,Helvetica,Arial,sans-serif",
                    fontSize: "13px",
                    paddingTop: 5,
                    textAlign: "center",
                  }}
                >
                  Bạn đã có tài khoản ? - <a href="/login">Đăng nhập</a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignUp;
