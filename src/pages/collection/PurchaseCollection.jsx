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

function PurchaseCollection() {
  const [deletingItemId, setDeletingItemId] = React.useState(null);
  const [itemId,setItemId] = React.useState(0);
  const [loadingBuyingFunc, setLoadingBuyingFunc] = React.useState(false);
  const formatPrice = (price) => {
    // Sử dụng Intl.NumberFormat để định dạng số thành chuỗi có dấu phân cách hàng nghìn
    return new Intl.NumberFormat("vi-VN").format(price);
  };
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
  const [specifiedCart, setSpecifiedCart] = React.useState(false);
  const [cartSpecifiedInside, setCartSpecifiedInside] = React.useState([]);
  const handleCloseModalFree = () => {
    setModalBuyingFree(false);
    setDeletingItemId(null);
  };
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10); // Bắt đầu với limit là 10
  const [loadingMore, setLoadingMore] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  const handleScroll = () => {
    const { scrollTop, clientHeight, scrollHeight } = document.documentElement;

    if (scrollTop + clientHeight >= scrollHeight - 10 && !loadingMore && hasMore) {
      setLoadingMore(true);
    }
    console.log(itemId)
  };
  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  useEffect(() => {
    const fetchMoreData = async () => {
      try {
        const response = await axios.post(`${network}/getProductsWarehousesAPI`, {
          limit: cartSpecifiedInside.length + 20,
          page: 1,
          idWarehouse: itemId,
          
        });
        if (response.data.data && response.data) {
          setCartSpecifiedInside((prevData) => [...prevData, ...response.data.data]);
          setLoadingMore(false);
          setHasMore(response.data.data.length > 0);
        }
      } catch (error) {
        console.error("Error fetching more data:", error.message);
        setLoadingMore(false);
      }
    };

    if (loadingMore) {
      fetchMoreData();
    }
  }, [loadingMore]);
  // useEffect(() => {
  //   setLoading(true);
  //   const getData = async () => {
  //     try {
  //       const response = await axios.post(
  //         `${network}/getListBuyWarehousesAPI`,
  //         {
  //           token: checkTokenCookie(),
  //           page: page, // Thêm page vào body request
  //           limit: limit, // Thêm limit vào body request
  //         }
  //       );
  //       if (response && response.data && response.data.data) {
  //         setData((prevData) => [...prevData, ...response.data.data]); // Nối dữ liệu mới vào dữ liệu cũ
  //         setLoading(false);
  //       } else {
  //         console.error("Invalid response format");
  //         setLoading(false);
  //       }
  //     } catch (error) {
  //       console.error("Error fetching data:", error.message);
  //       setLoading(false);
  //     }
  //   };

  //   getData();
  // }, [page, limit]); // Thêm page và limit vào dependency array

  // const handleScroll = () => {
  //   const scrollPosition =
  //     window.innerHeight + document.documentElement.scrollTop;
  //   const documentHeight = document.documentElement.offsetHeight;

  //   if (scrollPosition === documentHeight) {
  //     // Cuộn xuống cuối trang, tăng trang lên 1 và gọi lại API
  //     setPage((prevPage) => prevPage + 1);
  //   }
  // };

  // Gắn sự kiện cuộn trang khi component được render
  // useEffect(() => {
  //   window.addEventListener("scroll", handleScroll);
  //   return () => {
  //     window.removeEventListener("scroll", handleScroll);
  //   };
  // }, []);

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
    setLoading(true);

    const getData = async () => {
      try {
        const response = await axios.post(
          `${network}/getListBuyWarehousesAPI`,
          {
            token: checkTokenCookie(),
          }
        );
        if (response && response.data && response.data.data) {
          setData(response.data.data);

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

  const getData = async (item) => {
                          setItemId(item.id);

    try {
      const response = await axios.post(`${network}/getProductsWarehousesAPI`, {
        idWarehouse: item.id,
        limit: 100,
        page: 1,
      });
      if (response && response.data && response.data.data) {
        setSpecifiedCart(true);
        setCartSpecifiedInside(response.data.data);
      } else {
        console.error("Invalid response format");
      }
    } catch (error) {
      console.error("Error fetching data:", error.message);
    }
  };

  const rows = [];
  for (let i = 0; i < data.length; i += itemsPerRow) {
    const rowItems = data.slice(i, i + itemsPerRow);
    rows.push(rowItems);
  }

  return (
    <>
      {specifiedCart && (
        <Button
          variant="contained"
          size="medium"
          style={{
            marginLeft: "20px",
            marginTop: "20px",
            alignSelf: "center",
            height: 40,
            alignSelf: "center",
            textTransform: "none",
            color: "black",
            backgroundColor: "white",
          }}
          onClick={() => {
            setSpecifiedCart(false);
            setCartSpecifiedInside(null);
            setItemId(0);
          }}
        >
          &lt; Quay lại
        </Button>
      )}
      <div style={{ paddingTop: "10px", display: "flex", flexWrap: "wrap" }}>
        {specifiedCart ? (
          <>
            {cartSpecifiedInside.length > 0 ? (
              cartSpecifiedInside.map((item, index) => (
                <div
                  key={index}
                  style={{
                    flex: `0 0 calc(${100 / itemsPerRow}% - 16px)`, // Adjust the margin as needed

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
                      position: "relative",
                      width: "100%",
                      background: "#f0f0f0",
                      borderRadius: 10,
                      overflow: "hidden",
                      cursor: "pointer",
                    }}
                    onClick={() => {
                      navigate(`/design`, {
                        state: { id: item.id, token: checkTokenCookie() },
                      });
                    }}
                  >
                    <img
                      src={item.thumbnail}
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
                  <p style={{ margin: 0, color: "black", fontSize: 15 }}>
                Đã bán {item.sold}
              </p>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  height: "2em",
                }}
              >
                <p
                  style={{ margin: 0, color: "rgb(238, 77, 45)", fontSize: 17 }}
                >
                  {item.free_pro
                    ? "Miễn phí"
                    : `${
                        item.sale_price
                          ? `${formatPrice(item.sale_price)} ₫`
                          : "Miễn phí"
                      }`}
                </p>
                <p
                  style={{
                    margin: 0,
                    fontSize: 14,
                    textDecoration: "line-through",
                    paddingLeft: "5%",
                    color: "gray",
                    fontWeight: 300,
                  }}
                >
                  {formatPrice(item.price)}₫
                </p>
              </div>
                </div>
              ))
            ) : (
              <div
                style={{ textAlign: "center", width: "100%", paddingTop: "3%" }}
              >
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
          </>
        ) : (
          <>
            {data.length > 0 ? (
              data.map((item, index) => (
                <div
                  key={index}
                  style={{
                    flex: `0 0 calc(${100 / itemsPerRow}% - 16px)`, // Adjust the margin as needed

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
                      position: "relative",
                      width: "100%",
                      background: "#f0f0f0",
                      borderRadius: 10,
                      overflow: "hidden",
                      cursor: "pointer",
                    }}
                    onClick={() => {
                      // navigate(`/category/${item.id}`);
                      // window.scrollTo({ top: 0, behavior: "smooth" });
                    
                      getData(item);
                    }}
                  >
                    <img
                      src={item.thumbnail}
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
              
              <p
                style={{
                  margin: 0,
                  color: "black",
                  fontSize: 15,
                  marginTop: 10,
                }}
              >
                Số lượng mẫu : {item.number_product}
              </p>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  height: "2em",
                }}
              >
                <p
                  style={{ margin: 0, color: "rgb(238, 77, 45)", fontSize: 17 }}
                >
                  {item.price ? `${formatPrice(item.price)}₫` : "Miễn phí"}
                </p>
                </div>
                </div>
              ))
            ) : (
              <div
                style={{ textAlign: "center", width: "100%", paddingTop: "3%" }}
              >
                <p style={{ textAlign: "center", fontWeight: "bold" }}>
                  Bạn chưa có bộ sưu tập nào
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
          </>
        )}
        <Modal
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
      </div>
    </>
  );
}

export default PurchaseCollection;
