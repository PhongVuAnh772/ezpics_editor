import React, { useEffect, useState, useRef } from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { Routes, Route, Link, useParams, useNavigate } from "react-router-dom";
import deleteIcon from "./delete.png";
import editIcon from "./edit.png";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import warning from "./warning.png";
import { toast } from "react-toastify";

function PurchaseForm() {
  const [deletingItemId, setDeletingItemId] = React.useState(null);
  const [modalCreate,setModalCreate] = React.useState(false);
  const [loadingBuyingFunc, setLoadingBuyingFunc] = React.useState(false);
  const handleDelete = async () => {
    setLoadingBuyingFunc(true);
    try {
      const response = await axios.post(`${network}/deleteProductAPI`, {
        token: checkTokenCookie(),
        id: deletingItemId,
      });
      if (response && response.data.code === 0) {
        setLoadingBuyingFunc(false);
            setModalBuyingFree(false);

        toast.success("Xóa mẫu thiết kế thành công !! 🦄", {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
        setTimeout(function () {
          window.location.reload();
        }, 1500);
      } else {
        console.error("Invalid response format");
        setLoadingBuyingFunc(false);
      }
    } catch (error) {
      console.error("Error fetching data:", error.message);
      setLoadingBuyingFunc(false);
    }
  };
  const navigate = useNavigate();
  const styleModalBuyingFree = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "30%",
    height: "40%",
    bgcolor: "background.paper",
    boxShadow: 24,
    display: "flex",
    alignItems: "center",
    flexDirection: "column",
    paddingTop: "15px",

    borderRadius: "15px",
  };
  const [loading, setLoading] = React.useState(true);
  const network = useSelector((state) => state.ipv4.network);
  const [data, setData] = useState([]);
  const itemsPerRow = 4; // Number of items per row
  const [modalBuyingFree, setModalBuyingFree] = React.useState(false);

  const handleCloseModalFree = () => {
    setModalBuyingFree(false);
    setDeletingItemId(null);
  };
  // deleteProductAPI
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

  useEffect(() => {
    setLoading(true);

    const getData = async () => {
      try {
        const response = await axios.post(`${network}/getMyProductAPI`, {
          type: "user_series",
          token: checkTokenCookie(),
          limit: 30,
        });
        if (response && response.data && response.data.listData) {
          setData(response.data.listData);

          setLoading(false);
        } else {
          console.error("Invalid response format");
          setLoading(false);
        }
      } catch (error) {
        console.error("Error fetching data:", error.message);
        setLoading(false);
      }
    };

    getData();
  }, []);

  const rows = [];
  for (let i = 0; i < data.length; i += itemsPerRow) {
    const rowItems = data.slice(i, i + itemsPerRow);
    rows.push(rowItems);
  }

  return (
    <div style={{ paddingTop: "10px", display: "flex", flexWrap: "wrap" }}>
      {data.length > 0 ? (
        data.map((item, index) => (
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
                  // setModalCreate(true)
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
                <img src={editIcon} alt="" style={{ width: 20, height: 20 }} />
                <p style={{ margin: 0, paddingLeft: 5, textTransform: "none" }}>
                  Sửa
                </p>
              </Button>
              <Button
                onClick={(e) => {
                  setModalBuyingFree(true);
                  setDeletingItemId(item.id);
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
                  src={deleteIcon}
                  alt=""
                  style={{ width: 20, height: 20 }}
                />
                <p style={{ margin: 0, paddingLeft: 5, textTransform: "none" }}>
                  Xóa
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
        <div style={{ textAlign: "center", width: "100%", paddingTop: "3%" }}>
          <p style={{ textAlign: "center", fontWeight: "bold" }}>
            Bạn chưa có mẫu thiết kế nào
          </p>
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
            }}
            onClick={() => {
              window.scrollTo({
                top: 70,
                behavior: "smooth", // This makes the scroll animation smooth
              });
            }}
          >
            Về trang chủ
          </Button>
        </div>
      )}
      <Modal
        open={modalCreate}
        onClose={() => setModalCreate(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={styleModalBuyingFree}>
          <p
            style={{
              margin: 0,
              fontSize: 22,
              fontWeight: "bold",
              paddingBottom: "10px",
            }}
          >
            Cảnh báo
          </p>
          <img
            src={warning}
            alt=""
            style={{ width: "20%", height: "30%", marginBottom: "10px" }}
          />
          <p
            style={{
              margin: 0,
              fontSize: 17,
              fontWeight: "500",
              paddingTop: "10px",
            }}
          >
            Bạn có chắc chắn xóa mẫu thiết kế này chứ ?
          </p>
          <div style={{ display: "flex" }}>
            <Button
              variant="contained"
              size="medium"
              style={{
                height: 40,
                alignSelf: "center",
                textTransform: "none",
                color: "black",
                backgroundColor: "white",
                marginTop: "40px",
                width: "60%",
                marginRight: 10,
              }}
              onClick={() => {
                setModalBuyingFree(false);
                setDeletingItemId(null);
              }}
            >
              Hủy
            </Button>
            <Button
              variant="contained"
              size="medium"
              style={{
                height: 40,
                alignSelf: "center",
                textTransform: "none",
                color: "white",
                backgroundColor: "rgb(255, 66, 78)",
                marginTop: "40px",
                width: "60%",
              }}
              onClick={() => {
                handleDelete();
              }}
            >
              {" "}
              {loadingBuyingFunc ? <span class="loaderNew"></span> : "Xóa"}
            </Button>
          </div>
        </Box>
      </Modal>
      {/* <Modal
        open={modalBuyingFree}
        onClose={handleCloseModalFree}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={styleModalBuyingFree}>
          <p
            style={{
              margin: 0,
              fontSize: 22,
              fontWeight: "bold",
              paddingBottom: "10px",
            }}
          >
            Tạo ảnh
          </p>
          <img
            src={warning}
            alt=""
            style={{ width: "20%", height: "30%", marginBottom: "10px" }}
          />
          <p
            style={{
              margin: 0,
              fontSize: 17,
              fontWeight: "500",
              paddingTop: "10px",
            }}
          >
            Bạn 
          </p>
          <div style={{ display: "flex" }}>
            <Button
              variant="contained"
              size="medium"
              style={{
                height: 40,
                alignSelf: "center",
                textTransform: "none",
                color: "black",
                backgroundColor: "white",
                marginTop: "40px",
                width: "60%",
                marginRight: 10,
              }}
              onClick={() => {
                setModalBuyingFree(false);
                setDeletingItemId(null);
              }}
            >
              Hủy
            </Button>
            <Button
              variant="contained"
              size="medium"
              style={{
                height: 40,
                alignSelf: "center",
                textTransform: "none",
                color: "white",
                backgroundColor: "rgb(255, 66, 78)",
                marginTop: "40px",
                width: "60%",
              }}
              onClick={() => {
                handleDelete();
              }}
            >
              {" "}
              {loadingBuyingFunc ? <span class="loaderNew"></span> : "Xóa"}
            </Button>
          </div>
        </Box>
      </Modal> */}
    </div>
  );
}

export default PurchaseForm;
