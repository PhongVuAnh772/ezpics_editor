import React, { useEffect, useState } from "react";
import "./PageSatisfied.css";
import { useSelector, useDispatch } from "react-redux";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import axios from "axios";
import ReplyIcon from "@mui/icons-material/Reply";
import EditIcon from "@mui/icons-material/Edit";
import { Tab, TabList, TabPanel, Tabs } from "./tabs.jsx";
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import BalanceIcon from '@mui/icons-material/Balance';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
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
import DraftsIcon from "@mui/icons-material/Drafts";
function PageSatisfied() {
  const navigate = useNavigate()
  const [data, setData] = useState([]);
  React.useEffect(() => {
    navigate("your-design");
  }, []);
  
  const network = useSelector((state) => state.ipv4.network);
  function formatCurrency(amount, currencySymbol) {
    // Chuyển đổi chuỗi số thành số nguyên
    amount = parseInt(amount);

    // Kiểm tra xem amount có phải là một số hợp lệ không
    if (isNaN(amount)) {
        return "Số không hợp lệ";
    }

    // Thêm dấu phẩy phân tách hàng nghìn
    var formattedAmount = amount.toLocaleString('en-US');

    // Thêm ký hiệu tiền tệ nếu được cung cấp
    if (currencySymbol) {
        formattedAmount = formattedAmount + ' ' + currencySymbol;
    }

    return formattedAmount;
}
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
  useEffect(() => {
    const getData = async () => {
      const response = await axios.post(`${network}/getInfoMemberAPI`, {
        token: checkTokenCookie(),
      });
      if (response.data && response.data.code === 0) {
        setData(response.data.data);
      }
    };
    getData();
  }, []);

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        backgroundColor: "rgb(240, 242, 245)",
      }}
    >
      <div
        style={{ paddingTop: "4%", paddingLeft: "25%", paddingRight: "10%" }}
      >
        <div style={{ width: "100%", height: 1000 }}>
          {/* <img src={} style={{width:'100%',height:200}}/> */}
          <div
            style={{
              width: "100%",
              height: 200,
              background: "rgb(255,255,255)",
              background:
                "linear-gradient(180deg, rgba(255,255,255,1) 54%, rgba(159,157,158,1) 96%)",
              borderRadius: 10,
              zIndex: 1,
              position: "relative",
            }}
          ></div>
          <Tabs>
            <div
              style={{
                width: "100%",
                paddingLeft: 30,
                paddingRight: 30,
                maxHeight: 250,
                backgroundColor: "white",
                borderRadius: "20px",
              }}
            >
              {data && (
                <div
                  style={{
                    marginTop: "-6%",
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      alignItems: "flex-end",
                    }}
                  >
                    <Avatar
                      alt="Avatar"
                      src={data.avatar}
                      sx={{
                        width: 180,
                        height: 180,
                        border: "4px solid white",
                        zIndex: 2,
                        position: "relative",
                      }}
                    />
                    <div style={{ display: "flex", flexDirection: "column" }}>
                      <p
                        style={{
                          paddingLeft: 15,
                          fontSize: "32px",
                          fontWeight: "700",
                          fontFamily: "Helvetica, Arial, sans-serif",
                          margin: 0,
                        }}
                      >
                        {data.name}
                      </p>
                      <p
                        style={{
                          paddingLeft: 15,
                          fontSize: "14px",
                          fontWeight: "600",
                          fontFamily: "Helvetica, Arial, sans-serif",
                          margin: 0,
                          color: "rgb(101, 103, 107)",
                          paddingTop: 10,
                        }}
                      >
                        {data.email}
                      </p>
                    </div>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      alignItems: "flex-end",
                    }}
                  >
                    <Button
                      variant="contained"
                      size="medium"
                      style={{
                        marginLeft: "20px",
                        height: 40,
                        textTransform: "none",
                        color: "white",
                        backgroundColor: "rgb(255, 66, 78)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                      onClick={() => {
                        window.scrollTo({
                          top: 70,
                          behavior: "smooth", // This makes the scroll animation smooth
                        });
                      }}
                    >
                      <ReplyIcon />
                      <p style={{ margin: 0, paddingLeft: 5, paddingTop: 1 }}>
                        Chia sẻ
                      </p>
                    </Button>
                    <Button
                      variant="contained"
                      size="medium"
                      style={{
                        marginLeft: "20px",
                        height: 40,
                        textTransform: "none",
                        color: "black",
                        backgroundColor: "rgb(216, 218, 223)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontWeight: "600",
                      }}
                      onClick={() => {
                        navigate('/information')
                      }}
                    >
                      <EditIcon />
                      <p style={{ margin: 0, paddingLeft: 5, paddingTop: 1 }}>
                        Chỉnh sửa thông tin cá nhân
                      </p>
                    </Button>
                  </div>
                </div>
              )}
              <div style={{ paddingTop: 20 }}>
                <TabList aria-label="Groceries">
                  <Tab to="your-design">Thiết kế</Tab>
                  <Tab to="portfolio">Portfolio</Tab>
                  <Tab to="your-collection">Bộ sưu tập</Tab>
                </TabList>
              </div>
            </div>
            <div
              style={{
                width: "100%",
                paddingTop: 20,
                display: "flex",
                flexDirection: "row",
                maxHeight:300
              }}
            >
              <div
                style={{
                  width: "30%",
                  backgroundColor: "white",
                  borderRadius: 10,
                  paddingLeft: 15,
                                    paddingBottom: 15,

                }}
              >
                <h1
                  style={{
                    fontSize: 20,
                    fontFamily: "Helvetica, Arial, sans-serif",
                  }}
                >
                  Thông tin
                </h1>
                <div style={{ display: "flex", flexDirection: "row" }}>
                  <DraftsIcon style={{ color: "rgb(140, 147, 157)" }} />
                  <p
                    style={{
                      margin: 0,
                      paddingLeft: 10,
                      fontWeight: "600",
                      fontSize: 15,
                    }}
                  >
                    {data.email}
                  </p>
                </div>
                <div style={{ display: "flex", flexDirection: "row",paddingTop: 15   }}>
                  <LocalPhoneIcon style={{ color: "rgb(140, 147, 157)" }} />
                  <p
                    style={{
                      margin: 0,
                      paddingLeft: 10,
                      fontWeight: "600",
                      fontSize: 15,
                    }}
                  >
                    {data.phone}
                  </p>
                </div>
                <div style={{ display: "flex", flexDirection: "row",paddingTop: 15 }}>
                  <BalanceIcon style={{ color: "rgb(140, 147, 157)" }} />
                  <p
                    style={{
                      margin: 0,
                      paddingLeft: 10,
                      fontWeight: "600",
                      fontSize: 15,
                    }}
                  >
                    {formatCurrency(data.account_balance, 'VND')}
                  </p>
                </div><div style={{ display: "flex", flexDirection: "row",paddingTop: 15 }}>
                  <MonetizationOnIcon style={{ color: "rgb(140, 147, 157)" }} />
                  <p
                    style={{
                      margin: 0,
                      paddingLeft: 10,
                      fontWeight: "600",
                      fontSize: 15,
                    }}
                  >
                    {data.ecoin} ecoin
                  </p>
                </div>
              </div>
              <TabPanel style={{ paddingLeft: 15, width: "70%", height: "100%" }}>

                <Outlet />

              </TabPanel>
            </div>
          </Tabs>
        </div>
      </div>
    </div>
  );
}

export default PageSatisfied;
