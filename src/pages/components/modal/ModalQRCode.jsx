import React, { useEffect, useRef } from "react";
import { useParams, useNavigate  } from "react-router-dom";
import { disableBodyScroll, enableBodyScroll } from "body-scroll-lock";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import xMark from "../../../../src/pages/components/home/content/assets/x-button.png";
import Avatar from "@mui/material/Avatar";
import { useSelector, useDispatch } from "react-redux";
import coin from "../../components/home/content/coin.png";
import crownPro from "../../components/home/content/assets/crown-pro.png";
import banknote from "../../components/home/content/banknotes.png";
import "./ModalTransaction.css";
import axios from "axios";

export default function ModalTransaction() {
  let history = useNavigate();

  const network = useSelector((state) => state.ipv4.network);

  const infoUser = useSelector((state) => state.user.info);
  const [loading, setLoading] = React.useState(true);

  function checkTokenCookie() {
    var allCookies = document.cookie;

    var cookiesArray = allCookies.split(";");

    for (var i = 0; i < cookiesArray.length; i++) {
      var cookie = cookiesArray[i].trim();
      if (cookie.indexOf("token=") === 0) {
        var tokenValue = cookie.substring("token=".length, cookie.length);

        if (tokenValue !== "") {
          console.log(
            "Có token và không rỗng. Giá trị token là: " + tokenValue
          );

          return true;
        } else {
          console.log("Có token nhưng giá trị rỗng.");
          return false;
        }
      }
    }

    // Không tìm thấy cookie "token"
    console.log("Không tìm thấy cookie có tên là 'token'.");
    return false;
  }
  function getCookie(name) {
    var dc = document.cookie;
    var prefix = name + "=";
    var begin = dc.indexOf("; " + prefix);
    if (begin == -1) {
        begin = dc.indexOf(prefix);
        if (begin != 0) return null;
    }
    else
    {
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
    var userLogin = getCookie("user_login")

    if (userLogin == null || token == null) {
        return false;
    }
    else {
        return true;
    }
}
  const [messageErr, setMessageErr] = React.useState(false);
  const modalRef = useRef();
  const { id } = useParams();
  const navigate = useNavigate();
  const authentication = checkAvailableLogin();
  const formatPrice = (price) => {
    return new Intl.NumberFormat("vi-VN").format(price);
  };
  
  const [money, setMoney] = React.useState("");
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
  const styleModalBuyingFree = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    // width: "50%",
    bgcolor: "#fff",
    boxShadow: 24,
    display: "flex",
    flexDirection: "column",
    paddingTop: "15px",
    borderRadius: "15px",
    paddingLeft: "20px",
  };
  const handleChangeMoney = (e) => {
    setMoney(e.target.value);
  };
  const getData = async () => {
    if (parseInt(money) < 1000000000) {
      setLoading(true);

      try {
        const response = await axios.post(`${network}/saveRequestBankingAPI`, {
          token: checkTokenCookie(),
          money: parseInt(money),
        });
        if (response && response.data && response.data.code === 0) {
          setLoading(false);
        }
      } catch (error) {
        console.log(error);
      }
    } else {
      setMessageErr(true);
    }
  };
  return (
    <Modal
      open={true}
      // onClose={handleCloseModalFree}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Box sx={styleModalBuyingFree}>
        <div style={{}}>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              paddingLeft: 15,
              alignItems: "center",
              position: "relative",
            }}
          >
            {authentication ? (
              <Avatar
                alt="Remy Sharp"
                src={infoUser[0]?.avatar}
                style={{ alignSelf: "center" }}
                onClick={() => console.log("User info:", infoUser)}
              />
            ) : (
              <Avatar
                alt="Remy Sharp"
                style={{ alignSelf: "center" }}
                onClick={() => console.log("User info:", infoUser)}
              />
            )}
            {authentication && (
              <img
                src={crownPro}
                style={{
                  width: "18px",
                  height: "18px",
                  position: "absolute",
                  bottom: "0%",
                  left: "6%",
                }}
                alt=""
              />
            )}

            {authentication ? (
              <p
                style={{
                  fontFamily:
                    "Noto Sans Vietnamese,-apple-system,BlinkMacSystemFont,Segoe UI,Helvetica,Arial,sans-serif",
                  color: "rgb(13, 18, 22)",
                  fontWeight: "600",
                  lineHeight: "0px",
                  paddingLeft: "3%",
                }}
              >
                <b>
                  <span style={{ color: "rgba(13, 18, 22, 0.7)" }}>Tên :</span>{" "}
                  {infoUser[0]?.name}
                </b>
              </p>
            ) : (
              <></>
            )}
            {authentication && (
              <>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    paddingLeft: "5%",
                  }}
                >
                  <img
                    src={banknote}
                    alt=""
                    style={{ width: 20, height: 20 }}
                  />
                  <p
                    style={{
                      color: "rgba(13, 18, 22)",
                      fontSize: "15px",
                      fontFamily:
                        "Noto Sans Vietnamese,-apple-system,BlinkMacSystemFont,Segoe UI,Helvetica,Arial,sans-serif",
                      lineHeight: "0px",
                      paddingLeft: 5,
                      fontWeight: "bold",
                    }}
                  >
                    : <b>{formatPrice(infoUser[0]?.account_balance)}₫</b>
                  </p>
                </div>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    paddingLeft: "5%",
                  }}
                >
                  <img src={coin} alt="" style={{ width: 20, height: 20 }} />
                  <p
                    style={{
                      color: "rgba(13, 18, 22)",
                      fontSize: "15px",
                      fontFamily:
                        "Noto Sans Vietnamese,-apple-system,BlinkMacSystemFont,Segoe UI,Helvetica,Arial,sans-serif",
                      lineHeight: "0px",
                      paddingLeft: 5,
                    }}
                  >
                    : <b>{infoUser[0]?.ecoin} eCoin</b>
                  </p>
                </div>
              </>
            )}
          </div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            {" "}
            <p style={{ paddingLeft: "1rem", color: "black" }}>
              Nhập số tiền :
            </p>
            <input
              className="input-transaction"
              type="number"
              placeholder="Nhập số tiền"
              value={money}
              onChange={(e) => {
                setMessageErr(false);
                handleChangeMoney(e);
              }}
            ></input>
            <p style={{ paddingLeft: "1rem", color: "black" }}>
              Hoặc chọn số tiền cần nạp
            </p>
            <div style={{ width: "100%", display: "flex", flexWrap: "wrap" }}>
              <div
                class="card-box__shadow---money card-1-box__shadow---money"
                onClick={() => {
                  setMessageErr(false);
                  setMoney("10000");
                }}
              >
                <p>10.000 đ</p>
              </div>
              <div
                class="card-box__shadow---money card-1-box__shadow---money"
                onClick={() => {
                  setMessageErr(false);
                  setMoney("20000");
                }}
              >
                <p>20.000 đ</p>
              </div>
              <div
                class="card-box__shadow---money card-1-box__shadow---money"
                onClick={() => {
                  setMessageErr(false);
                  setMoney("50000");
                }}
              >
                <p>50.000 đ</p>
              </div>
              <div
                class="card-box__shadow---money card-1-box__shadow---money"
                onClick={() => {
                  setMessageErr(false);
                  setMoney("100000");
                }}
              >
                <p>100.000 đ</p>
              </div>
              <div
                class="card-box__shadow---money card-1-box__shadow---money"
                onClick={() => {
                  setMessageErr(false);
                  setMoney("150000");
                }}
              >
                <p>150.000 đ</p>
              </div>
              <div
                class="card-box__shadow---money card-1-box__shadow---money"
                onClick={() => {
                  setMessageErr(false);
                  setMoney("200000");
                }}
              >
                <p>200.000 đ</p>
              </div>
            </div>
            {messageErr && (
              <p style={{ color: "red", paddingLeft: "5%" }}>
                Bạn hãy nhập lại số tiền
              </p>
            )}
            <Button
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
                marginBottom: "5%",
                marginTop: "5%",
                width: "200px",
                marginRight: "6%",
              }}
              onClick={() => {
                if (authentication) {
                  getData();
                } else {
                  navigate("/login");
                }
              }}
            >
              Chấp nhận nạp tiền
            </Button>
          </div>
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
            position: "absolute",
            top: 0,
            right: -30,
          }}
          onClick={() => {
            // setOpenModalPro(false)
            history(-1)
            document.body.style.overflowY = "auto";
          }}
        />
      </Box>
    </Modal>
  );
}
