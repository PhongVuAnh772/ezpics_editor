import React,{useState} from "react";
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
import { useSelector, useDispatch } from "react-redux";
import axios from 'axios'
import { toast } from "react-toastify";
import { Helmet } from "react-helmet";

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
    const network = useSelector((state) => state.ipv4.network);
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
  const [text,setText ] =useState('')
  const [loading,setLoading] = useState(false)
    const [loadingSecond,setLoadingSecond] = useState(false)

  const handleSaveContact = async () => {
    setLoading(true)
    try {
      const response = await axios.post(`${network}/extendWarehousesAPI`, {
        token: checkTokenCookie(),
        content: text
      });
      if (response && response.data.code === 0) {
       
        setLoading(false)
        toast.success("Gửi thông tin hỗ trợ thành công !! 🦄", {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
        
      } else if (response && response.data.code !== 0) {

        setLoading(false)

        toast.error("Lỗi, hãy thử lại !!", {
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
                setLoading(false)

        console.error("Invalid response format");
      }
    } catch (error) {
              setLoading(false)

      console.error("Error fetching data:", error.message);
    }
  
  }
  return (
    <div
      style={{
        paddingTop: "7%",
        display: "flex",
        flexDirection: "row",
        minHeight: "100%",
        flex: 1,
         paddingTop: "6%", paddingRight: "2%", paddingLeft: "19%"
      }}
    >
      <Helmet>
          <meta charSet="utf-8" />
          <title>Liên hệ Ezpics</title>
          <meta name="description" content="Ezpics RB" />
          <meta
            itemprop="name"
            content="Liên hệ Ezpics "
          />
          <meta
            itemprop="description"
            content="Liên hệ Ezpics "
          />
          <meta
            property="og:title"
            content="Liên hệ Ezpics "
          />
          <meta
            property="og:description"
            content="Liên hệ Ezpics "
          />
          <meta
            property="og:image"
            content="https://admin.ezpics.vn/upload/admin/files/1587a9df872656780f37.jpg"
          />
          <meta
            name="twitter:title"
            content="Liên hệ Ezpics "
            data-react-helmet="true"
          />
          <meta
            name="twitter:description"
            content="Liên hệ Ezpics "
          />
          <meta
            name="twitter:image"
            content="https://admin.ezpics.vn/upload/admin/files/1587a9df872656780f37.jpg"
          />
        </Helmet>
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
  height: "53%"}} onChange={(e) =>setText(e.target.value)} className="textarea--contact">Nhập nội dung liên hệ</textarea>
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
              display:'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
            onClick={() => {
              // saveContactAPI
              handleSaveContact()
              
            }}
          >
            
            {loading ? <span className="loaderNew"></span> : 'Gửi liên hệ'}
          </Button>
        </div>
      </div>
    </div>
  );
}

export default Contact;
