import React from "react";
import bg from "./background.jpg";
import logo from "./ezpics-logo.png";
import "./SignUp.css";
function SignUp() {
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
                id="fname"
                name="firstname"
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
                id="lname"
                name="lastname"
                placeholder="Mật khẩu"
              />
              <button style={submitButton}>Đăng nhập</button>
              <p style={{ fontSize: "12px", textAlign: "center" }}>Hoặc</p>
              <button style={googleButton}>Đăng nhập bằng Google</button>
              <p
                style={{
                  fontFamily:
                    "Canva Sans,Noto Sans Variable,Noto Sans,-apple-system,BlinkMacSystemFont,Segoe UI,Helvetica,Arial,sans-serif",
                  fontSize: "13px",
                  paddingTop: 5,
                  textAlign: "center",
                }}
              >
                Bạn đã có tài khoản ? - <a href="/sign-up">Đăng nhập</a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignUp;
