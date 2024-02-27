import React,{useState,useEffect} from 'react'
import Button from "@mui/material/Button";
import axios from 'axios'
import { useSelector, useDispatch } from "react-redux";
import deleteIcon from "./delete.png";
import editIcon from "./edit.png";
import {
  BrowserRouter as Router,
  Route,
  Link,
  Routes,
  useLocation,
  Outlet,
  useOutletContext,
  NavLink,
  useNavigate,
} from "react-router-dom";
function YourDesignPage() {
    const itemsPerRow = 3; // Number of items per row
  const rows = [];
  const navigate = useNavigate()

    const [dataForYou, setDataForYou] = React.useState([]);
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
    const [loadingForYou, setLoadingForYou] = React.useState(false);
  const network = useSelector((state) => state.ipv4.network);

  useEffect(() => {
    setLoadingForYou(true);

    const getData = async () => {
      try {
        const response = await axios.post(`${network}/getMyProductAPI`, {
          type: "user_edit",
          token: checkTokenCookie(),
          limit: 30,
        });
        if (response && response.data && response.data.code === 1) {
          setDataForYou(response.data.listData);
          setLoadingForYou(false);
        } 
      } catch (error) {
        console.error("Error fetching data:", error.message);
        setLoadingForYou(false);
      }
    };

      getData();
    
  }, []);
  for (let i = 0; i < dataForYou.length; i += itemsPerRow) {
    const rowItems = dataForYou.slice(i, i + itemsPerRow);
    rows.push(rowItems);
  }
  return (
    <div style={{backgroundColor:'white',borderRadius: 10,display:'flex',flexDirection:'row',flexWrap:'wrap'}}>
      {dataForYou.length > 0 ? (
            dataForYou.map((item, index) => (
              <div
                key={index}
                style={{
                  flex: `0 0 calc(${100 / itemsPerRow}% - 16px)`,

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
                    position: "absolute",
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                    background: "rgba(0, 0, 0, 0.7)",
                    borderRadius: 10,
                    opacity: 0,
                    transition: "opacity 0.3s",
                    zIndex: 1000,
                    display: "flex",
                    flexDirection: "row",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.opacity = 1;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.opacity = 0;
                  }}
                >
                  <Button
                    onClick={(e) => {
                      navigate(`/design`, {
                        state: { id: item.id, token: checkTokenCookie() },
                      });
                    }}
                    style={{
                      color: "black",
                      margin: "5px",
                      cursor: "pointer",
                      borderRadius: 10,
                      backgroundColor: "white",
                      width: 80,
                    }}
                  >
                    <img
                      src={editIcon}
                      alt=""
                      style={{ width: 20, height: 20 }}
                    />
                    <p
                      style={{
                        margin: 0,
                        paddingLeft: 5,
                        textTransform: "none",
                      }}
                    >
                      Sửa
                    </p>
                  </Button>
                  
                </div>
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
            ))
          ) : (
            <></>
          )}
          <div style={{width: '100%',height: 'auto',display:'flex',alignSelf:'center',paddingBottom: 10,flexDirection: "column",
                                                  display: "flex",}}><Button
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
              alignItems: "center",
              alignSelf: "center",
              width: "20%",
                                

            }}
            onClick={() => {
              window.scrollTo({
                top: 0,
                behavior: "smooth",
              });
              navigate("/your-design/purchase-form");
            }}
          >
            Xem thêm
          </Button></div>
    </div>
  )
}

export default YourDesignPage