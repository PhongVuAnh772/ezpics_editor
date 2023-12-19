import React from "react";
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
import "./Contact.css";
import gmail from "./gmail.png";
import phoneCall from "./phone-call.png";
import placeholder from "./placeholder.png";
import man from "./man.png";
function Contact() {
  const open = useOutletContext();

  const drawerWidth = 240;

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
      display: "flex",
      flexDirection: "row",
      minHeight: "100%",
      flex: 1,
    }),
  }));
  const ContactContainerBackground = styled("div")({
    width: "100%",
    minHeight: "600px",
    alignItems: "center",
    justifyContent: "center",
    display: "flex",
    backgroundImage: 'url("./designer.png")',
    backgroundRepeat: "no-repeat, repeat",
    backgroundSize: "cover",
    backdropFilter: "blur(8px)",
    background: "rgba(0, 0, 0, 0.55)",
    borderTopLeftRadius: "15px",
    borderBottomLeftRadius: "15px",
  });
  return (
    <Main
      open={open}
      sx={{
        paddingTop: "7%",
        display: "flex",
        flexDirection: "row",
        minHeight: "100%",
        flex: 1,
      }}
    >
      <div className="contact-container-background">
        <ContactContainerBackground>
          <div className="contact-content">
            <h1 style={{ textAlign: "center", margin: 0, paddingBottom: "5%" }}>
              Liên hệ với chúng tôi
            </h1>

            <div className="contact-content__div">
              <img src={man} className="contact-content___icon" alt="" />
              <div className="contact-content---text__container">
                <p className="contact-content__title">Họ và tên</p>
                <p className="contact-content__content---text">Mr. Phong</p>
              </div>
            </div>
            <div className="contact-content__div">
              <img src={phoneCall} className="contact-content___icon" alt="" />

              <div className="contact-content---text__container">
                <p className="contact-content__title">Số điện thoại</p>
                <p className="contact-content__content---text">0968121090</p>
              </div>
            </div>
            <div className="contact-content__div">
              <img src={gmail} className="contact-content___icon" alt="" />

              <div className="contact-content---text__container">
                <p className="contact-content__title">Email</p>
                <p className="contact-content__content---text">
                  ezpicsvn@gmail.com
                </p>
              </div>
            </div>
            <Button
              variant="contained"
              size="large"
              style={{
                marginLeft: "20px",
                height: 40,
                alignSelf: "center",
                textTransform: "none",
                color: "white",
                backgroundColor: "rgb(255, 66, 78)",
                marginTop: "50px",
              }}
              onClick={() => {
                window.scrollTo({
                  top: 70,
                  behavior: "smooth", // This makes the scroll animation smooth
                });
              }}
            >
              Hỗ trợ trực tuyến
            </Button>
          </div>
        </ContactContainerBackground>
      </div>
      <div className="contact-container">
        <div className="contact-content" style={{paddingTop: '7%',paddingLeft: '7%',paddingRight: '7%'}}>
          <h1
            style={{
              textAlign: "center",
              margin: 0,
              paddingBottom: "13%",
              color: "black",
            }}
          >
            Gửi nội dung liên hệ
          </h1>

         
          
          <textarea style={{width: "100%",
  height: "53%"}} className="textarea--contact">Nhập nội dung liên hệ</textarea>
          <Button
            variant="contained"
            size="large"
            style={{
              marginLeft: "20px",
              height: 40,
              alignSelf: "center",
              textTransform: "none",
              color: "white",
              backgroundColor: "rgb(255, 66, 78)",
              marginTop: '9%',
              paddingLeft: '10%',
              paddingRight: '10%',
            }}
            onClick={() => {
              window.scrollTo({
                top: 70,
                behavior: "smooth", // This makes the scroll animation smooth
              });
            }}
          >
            Gửi liên hệ
          </Button>
        </div>
      </div>
    </Main>
  );
}

export default Contact;
