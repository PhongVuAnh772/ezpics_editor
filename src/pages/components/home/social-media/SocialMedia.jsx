import React, { useEffect, useState, useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import Slider from "react-slick";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import crown from "./crown.png";
import "./ForYouPage.css";
import { Routes, Route, Link, useParams, useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import deleteIcon from "./delete.png";
import editIcon from "./edit.png";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import warning from "./warning.png";
import { toast } from "react-toastify";
import {DELETE_ALL_VALUES} from '../../../store/slice/infoUser'

function SocialMedia() {
  const [loadingCategory,setLoadingCategory] = React.useState(false)
  const dispatch = useDispatch()
  const [modalLogoutDevice,setModalLogoutDevice] = React.useState(false);
    const [loadingBuyingFunc, setLoadingBuyingFunc] = React.useState(false);
  const [dataEndow,setDataEndow] = React.useState([])
useEffect(() => {
    const getData = async () => {
      setLoadingCategory(true)
      try {
        const responseCategory = await axios.get(
          `${network}/getProductCategoryAPI`
        );
        if (
          responseCategory &&
          responseCategory.data &&
          responseCategory.data.listData
        ) {
         
          const thumbnailYoutubeCategory = responseCategory.data.listData.find(
            (category) => category.name === "Ảnh bìa mạng xã hội"
          );
          if (thumbnailYoutubeCategory) {
            const categoryId = thumbnailYoutubeCategory.id;
            const response = await axios.post(
              `${network}/getProductByCategoryAPI`,
              {
                limit: 30,
                page: 1,
                category_id: categoryId
              }
            );
            if (response && response.data) {
              // setData(response.data.listData[5].listData);
              // setData2(response.data.listData[8].listData);
              // setLoading(false);
              setLoadingCategory(false)
              setDataEndow(response.data.listData)
            } else {
              console.error("Invalid response format");
              setLoading(false);
              setLoadingCategory(false)
            }
            console.log(categoryId)
          } else {
            setLoadingCategory(false)
            console.log('Category "Thumnail Youtube" not found.');
          }
        } else {
          setLoadingCategory(false)
          console.error("Invalid response format");
        }
      } catch (error) {
        setLoadingCategory(false)
        console.error("Error fetching data:", error.message);
      }
    };

    getData();
  }, []);
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
  const itemsPerRow = 4; // Number of items per row
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
  const [loading, setLoading] = React.useState(true);
  const [modalBuyingFree, setModalBuyingFree] = React.useState(false);

  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 4.5,
      slidesToSlide: 2,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2,
      slidesToSlide: 2, // optional, default to 1.
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
      slidesToSlide: 1, // optional, default to 1.
    },
  };
  const navigate = useNavigate();

  const network = useSelector((state) => state.ipv4.network);
  const ref = useRef({});

  const [data, setData] = useState([]);
  const [data2, setData2] = useState([]);
  const settings = {
    infinite: true,
    slidesToShow: 3.5,
    slidesToScroll: 2,
    // nextArrow: <SampleNextArrow />,
    // prevArrow: <SamplePrevArrow />,
  };
  const [dataForYou, setDataForYou] = React.useState([]);
  const [loadingForYou, setLoadingForYou] = React.useState(false);
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
  const [dataNewest,setDataNewest] = React.useState([])
  function checkAvailableLogin() {
    var token = getCookie("token");
    var userLogin = getCookie("user_login");

    if (userLogin == null || token == null) {
      return false;
    } else {
      return true;
    }
  }
    const [deletingItemId, setDeletingItemId] = React.useState(null);

  const authentication = checkAvailableLogin();
const handleCloseModalFree = () => {
    setModalBuyingFree(false);
    setDeletingItemId(null);
  };
  useEffect(() => {
    setLoading(true);

    const getData = async () => {
      try {
        const response = await axios.post(
          `${network}/getProductAllCategoryAPI`,
          {
            limit: 30,
            keyword: "",
          }
        );
        if (response && response.data && response.data.listData) {
          setData(response.data.listData[5].listData);
          setData2(response.data.listData[8].listData);
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
        } else {
          setModalLogoutDevice(true);
        }
      } catch (error) {
        console.error("Error fetching data:", error.message);
        setLoadingForYou(false);
      }
    };

    if (authentication) {
      getData();
    }
  }, []);
  const [loadingNewest,setLoadingNewest] = React.useState(false)
  useEffect(() => {
    setLoadingNewest(true);

    const getData = async () => {
      try {
        const response = await axios.get(`${network}/getNewProductAPI`);
        if (response && response.data && response.data.listData) {
          setDataNewest(response.data.listData);
          setLoadingNewest(false);
        } else {
          console.error("Invalid response format");
          setLoadingNewest(false);
        }
      } catch (error) {
        console.error("Error fetching data:", error.message);
        setLoadingNewest(false);
      }
    };

    getData();
  }, []);
  const rows = [];
  for (let i = 0; i < dataForYou.length; i += itemsPerRow) {
    const rowItems = dataForYou.slice(i, i + itemsPerRow);
    rows.push(rowItems);
  }
  const formatPrice = (price) => {
    // Sử dụng Intl.NumberFormat để định dạng số thành chuỗi có dấu phân cách hàng nghìn
    return new Intl.NumberFormat("vi-VN").format(price);
  };
  const CustomRightArrow = ({ onClick, ...rest }) => {
    const {
      onMove,
      carouselState: { currentSlide, deviceType },
    } = rest;
    // onMove means if dragging or swiping in progress.
    return (
      <button
        onClick={() => onClick()}
        style={{ padding: 10, backgroundColor: "red" }}
      >
        <ArrowForwardIosIcon />
      </button>
    );
  };
const handleLogoutDevice = () => {
    document.cookie = `user_login=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
    document.cookie = `token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
    dispatch(DELETE_ALL_VALUES());
    setModalLogoutDevice(false);
  };
  return (
    <div style={{ paddingRight: 15, paddingTop: 15 }}>
      <p style={{ fontSize: 18, fontWeight: "bold" }}>Ảnh bìa mạng xã hội</p>

      {loadingCategory ? (
        // Display loading skeletons while data is being fetched
        <Carousel
          swipeable={false}
          responsive={responsive}
          ssr={true}
          infinite={true}
          autoPlaySpeed={1000}
          keyBoardControl={true}
          transitionDuration={500}
          containerClass="carousel-container"
          removeArrowOnDeviceType={["tablet", "mobile"]}
        >
          {[...Array(4).keys()].map((index) => (
            <div
              key={index}
              style={{
                position: "relative",
                width: "100%",
                justifyContent: "center",
                borderRadius: 10,
                marginLeft: "12px",
              }}
            >
              <div
                className="carousel-item"
                style={{
                  position: "relative",
                  width: "80%",
                  height: 180,
                  background: "#f0f0f0",
                  justifyContent: "center",
                  borderRadius: 10,
                  overflow: "hidden",
                }}
              >
                <Skeleton height={180} />
              </div>
              <div
                style={{
                  minHeight: 70,
                  maxWidth: "100%",
                  color: "rgb(37, 38, 56)",
                  fontWeight: 600,
                  fontSize: "17px",
                  margin: 0,
                  marginBottom: 15,
                  marginTop: 10,
                }}
              >
                <Skeleton height={17} width="80%" />
              </div>
              <Skeleton height={15} width="100%" />
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  height: "2em",
                }}
              >
                <Skeleton height={17} width="50%" />
                <Skeleton height={14} width="40%" />
              </div>
            </div>
          ))}
        </Carousel>
      ) : (
        // Display actual content once data is available

        <Carousel
          swipeable={false}
          responsive={responsive}
          ssr={true}
          infinite={true}
          autoPlaySpeed={1000}
          keyBoardControl={true}
          transitionDuration={500}
          containerClass="carousel-container"
          removeArrowOnDeviceType={["tablet", "mobile"]}
        >
          {dataEndow.map((item, index) => (
            <div
              key={index}
              style={{
                position: "relative",
                width: "100%",
                justifyContent: "center",
                borderRadius: 10,
                marginLeft: "12px",
                cursor: "pointer",
              }}
              onClick={() => {
                navigate(`/category/${item.id}`);
                // console.log(item)
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
            >
              <div
                className="carousel-item"
                style={{
                  position: "relative",
                  width: "80%",
                  height: 180,
                  background: "#f0f0f0",
                  justifyContent: "center",
                  borderRadius: 10,
                  overflow: "hidden",
                }}
              >
                <img
                  src={item.image}
                  alt=""
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "contain",
                  }}
                />
                {item.free_pro && (
                  <div class="ribbon-1 left-ribbon">
                    {/* <p style={{ color: "white", margin: 0, fontSize: 13 }}>Pro</p> */}
                    <img
                      alt=""
                      src={crown}
                      style={{
                        width: 14,
                        height: 15,
                        transform: "translate(-0.3%) rotate(45deg)",
                      }}
                    />
                  </div>
                )}
              </div>
              <div
                style={{
                  maxWidth: "100%",
                  color: "rgb(37, 38, 56)",
                  fontFamily:
                    "Canva Sans,Noto Sans Variable,Noto Sans,-apple-system,BlinkMacSystemFont,Segoe UI,Helvetica,Arial,sans-serif",
                  fontWeight: 600,
                  fontSize: "17px",
                  margin: 0,
                  marginBottom: 15,
                  marginTop: 10,
                  height: 70,
                }}
              >
                <h5
                  style={{
                    color: "rgb(37, 38, 56)",
                    fontFamily:
                      "Canva Sans,Noto Sans Variable,Noto Sans,-apple-system,BlinkMacSystemFont,Segoe UI,Helvetica,Arial,sans-serif",
                    fontWeight: 600,
                    fontSize: "17px",
                    margin: 0,
                    width: "80%",
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
          ))}
        </Carousel>
      )}
      <p style={{ fontSize: 18, fontWeight: "bold" }}>Mẫu thiết kế mới nhất</p>
      {loadingNewest ? (
        // Display loading skeletons while data is being fetched
        <Carousel
          swipeable={false}
          responsive={responsive}
          ssr={true}
          infinite={true}
          autoPlaySpeed={1000}
          keyBoardControl={true}
          transitionDuration={500}
          containerClass="carousel-container"
          removeArrowOnDeviceType={["tablet", "mobile"]}
        >
          {[...Array(4).keys()].map((index) => (
            <div
              key={index}
              style={{
                position: "relative",
                width: "100%",
                justifyContent: "center",
                borderRadius: 10,
                marginLeft: "12px",
              }}
            >
              <div
                className="carousel-item"
                style={{
                  position: "relative",
                  width: "80%",
                  height: 180,
                  background: "#f0f0f0",
                  justifyContent: "center",
                  borderRadius: 10,
                  overflow: "hidden",
                }}
              >
                <Skeleton height={180} />
              </div>
              <div
                style={{
                  minHeight: 70,
                  maxWidth: "100%",
                  color: "rgb(37, 38, 56)",
                  fontWeight: 600,
                  fontSize: "17px",
                  margin: 0,
                  marginBottom: 15,
                  marginTop: 10,
                }}
              >
                <Skeleton height={17} width="80%" />
              </div>
              <Skeleton height={15} width="100%" />
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  height: "2em",
                }}
              >
                <Skeleton height={17} width="50%" />
                <Skeleton height={14} width="40%" />
              </div>
            </div>
          ))}
        </Carousel>
      ) : (
        // Display actual content once data is available

        <Carousel
          swipeable={false}
          responsive={responsive}
          ssr={true}
          infinite={true}
          autoPlaySpeed={1000}
          keyBoardControl={true}
          transitionDuration={500}
          containerClass="carousel-container"
          removeArrowOnDeviceType={["tablet", "mobile"]}
        >
          {dataNewest.map((item, index) => (
            <div
              key={index}
              style={{
                position: "relative",
                width: "100%",
                justifyContent: "center",
                borderRadius: 10,
                marginLeft: "12px",
                cursor: "pointer",
              }}
              onClick={() => {
                navigate(`/category/${item.id}`);
                // console.log(item)
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
            >
              <div
                className="carousel-item"
                style={{
                  position: "relative",
                  width: "80%",
                  height: 180,
                  background: "#f0f0f0",
                  justifyContent: "center",
                  borderRadius: 10,
                  overflow: "hidden",
                }}
              >
                <img
                  src={item.image}
                  alt=""
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "contain",
                  }}
                />
                {item.free_pro && (
                  <div class="ribbon-1 left-ribbon">
                    {/* <p style={{ color: "white", margin: 0, fontSize: 13 }}>Pro</p> */}
                    <img
                      alt=""
                      src={crown}
                      style={{
                        width: 14,
                        height: 15,
                        transform: "translate(-0.3%) rotate(45deg)",
                      }}
                    />
                  </div>
                )}
              </div>
              <div
                style={{
                  maxWidth: "100%",
                  color: "rgb(37, 38, 56)",
                  fontFamily:
                    "Canva Sans,Noto Sans Variable,Noto Sans,-apple-system,BlinkMacSystemFont,Segoe UI,Helvetica,Arial,sans-serif",
                  fontWeight: 600,
                  fontSize: "17px",
                  margin: 0,
                  marginBottom: 15,
                  marginTop: 10,
                  height: 70,
                }}
              >
                <h5
                  style={{
                    color: "rgb(37, 38, 56)",
                    fontFamily:
                      "Canva Sans,Noto Sans Variable,Noto Sans,-apple-system,BlinkMacSystemFont,Segoe UI,Helvetica,Arial,sans-serif",
                    fontWeight: 600,
                    fontSize: "17px",
                    margin: 0,
                    width: "80%",
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
          ))}
        </Carousel>
      )}
      <p style={{ fontSize: 18, fontWeight: "bold" }}>Có thể bạn muốn thử</p>
      {loading ? (
        // Display loading skeletons while data is being fetched
        <Carousel
          swipeable={false}
          responsive={responsive}
          ssr={true}
          infinite={true}
          autoPlaySpeed={1000}
          keyBoardControl={true}
          transitionDuration={500}
          containerClass="carousel-container"
          removeArrowOnDeviceType={["tablet", "mobile"]}
        >
          {[...Array(4).keys()].map((index) => (
            <div
              key={index}
              style={{
                position: "relative",
                width: "100%",
                justifyContent: "center",
                borderRadius: 10,
                marginLeft: "12px",
              }}
            >
              <div
                className="carousel-item"
                style={{
                  position: "relative",
                  width: "80%",
                  height: 180,
                  background: "#f0f0f0",
                  justifyContent: "center",
                  borderRadius: 10,
                  overflow: "hidden",
                }}
              >
                <Skeleton height={180} />
              </div>
              <div
                style={{
                  minHeight: 70,
                  maxWidth: "100%",
                  color: "rgb(37, 38, 56)",
                  fontWeight: 600,
                  fontSize: "17px",
                  margin: 0,
                  marginBottom: 15,
                  marginTop: 10,
                }}
              >
                <Skeleton height={17} width="80%" />
              </div>
              <Skeleton height={15} width="100%" />
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  height: "2em",
                }}
              >
                <Skeleton height={17} width="50%" />
                <Skeleton height={14} width="40%" />
              </div>
            </div>
          ))}
        </Carousel>
      ) : (
        // Display actual content once data is available

        <Carousel
          swipeable={false}
          responsive={responsive}
          ssr={true}
          infinite={true}
          autoPlaySpeed={1000}
          keyBoardControl={true}
          transitionDuration={500}
          containerClass="carousel-container"
          removeArrowOnDeviceType={["tablet", "mobile"]}
        >
          {data.map((item, index) => (
            <div
              key={index}
              style={{
                position: "relative",
                width: "100%",
                justifyContent: "center",
                borderRadius: 10,
                marginLeft: "12px",
                cursor: "pointer",
              }}
              onClick={() => {
                navigate(`/category/${item.id}`);
                // console.log(item)
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
            >
              <div
                className="carousel-item"
                style={{
                  position: "relative",
                  width: "80%",
                  height: 180,
                  background: "#f0f0f0",
                  justifyContent: "center",
                  borderRadius: 10,
                  overflow: "hidden",
                }}
              >
                <img
                  src={item.image}
                  alt=""
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "contain",
                  }}
                />
                {item.free_pro && (
                  <div class="ribbon-1 left-ribbon">
                    {/* <p style={{ color: "white", margin: 0, fontSize: 13 }}>Pro</p> */}
                    <img
                      alt=""
                      src={crown}
                      style={{
                        width: 14,
                        height: 15,
                        transform: "translate(-0.3%) rotate(45deg)",
                      }}
                    />
                  </div>
                )}
              </div>
              <div
                style={{
                  maxWidth: "100%",
                  color: "rgb(37, 38, 56)",
                  fontFamily:
                    "Canva Sans,Noto Sans Variable,Noto Sans,-apple-system,BlinkMacSystemFont,Segoe UI,Helvetica,Arial,sans-serif",
                  fontWeight: 600,
                  fontSize: "17px",
                  margin: 0,
                  marginBottom: 15,
                  marginTop: 10,
                  height: 70,
                }}
              >
                <h5
                  style={{
                    color: "rgb(37, 38, 56)",
                    fontFamily:
                      "Canva Sans,Noto Sans Variable,Noto Sans,-apple-system,BlinkMacSystemFont,Segoe UI,Helvetica,Arial,sans-serif",
                    fontWeight: 600,
                    fontSize: "17px",
                    margin: 0,
                    width: "80%",
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
          ))}
        </Carousel>
      )}

      <p style={{ fontSize: 18, fontWeight: "bold" }}>Phổ biến</p>
      {loading ? (
        // Display loading skeletons while data is being fetched
        <Carousel
          swipeable={false}
          responsive={responsive}
          ssr={true}
          infinite={true}
          autoPlaySpeed={1000}
          keyBoardControl={true}
          transitionDuration={500}
          containerClass="carousel-container"
          removeArrowOnDeviceType={["tablet", "mobile"]}
        >
          {[...Array(4).keys()].map((index) => (
            <div
              key={index}
              style={{
                position: "relative",
                width: "100%",
                justifyContent: "center",
                borderRadius: 10,
                marginLeft: "12px",
              }}
            >
              <div
                className="carousel-item"
                style={{
                  position: "relative",
                  width: "80%",
                  height: 180,
                  background: "#f0f0f0",
                  justifyContent: "center",
                  borderRadius: 10,
                  overflow: "hidden",
                }}
              >
                <Skeleton height={180} />
              </div>
              <div
                style={{
                  minHeight: 70,
                  maxWidth: "100%",
                  color: "rgb(37, 38, 56)",
                  fontFamily:
                    "Canva Sans,Noto Sans Variable,Noto Sans,-apple-system,BlinkMacSystemFont,Segoe UI,Helvetica,Arial,sans-serif",
                  fontWeight: 600,
                  fontSize: "17px",
                  margin: 0,
                  marginBottom: 15,
                  marginTop: 10,
                }}
              >
                <Skeleton height={17} width="80%" />
              </div>
              <Skeleton height={15} width="100%" />
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  height: "2em",
                }}
              >
                <Skeleton height={17} width="50%" />
                <Skeleton height={14} width="40%" />
              </div>
            </div>
          ))}
        </Carousel>
      ) : (
        // Display actual content once data is available
        <Carousel
          swipeable={false}
          responsive={responsive}
          ssr={true}
          infinite={true}
          autoPlaySpeed={1000}
          keyBoardControl={true}
          transitionDuration={500}
          containerClass="carousel-container"
          removeArrowOnDeviceType={["tablet", "mobile"]}
        >
          {data2.map((item, index) => (
            <div
              key={index}
              style={{
                position: "relative",
                width: "100%",
                justifyContent: "center",
                borderRadius: 10,
                marginLeft: "12px",
                cursor: "pointer",
              }}
              onClick={() => {
                navigate(`/category/${item.id}`);
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
            >
              <div
                className="carousel-item"
                style={{
                  position: "relative",
                  width: "80%",
                  height: 180,
                  background: "#f0f0f0",
                  justifyContent: "center",
                  borderRadius: 10,
                  overflow: "hidden",
                }}
              >
                <img
                  src={item.image}
                  alt=""
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "contain",
                  }}
                />{" "}
                {item?.free_pro && (
                  <div class="ribbon-1 left-ribbon">
                    <img
                      alt=""
                      src={crown}
                      style={{
                        width: 14,
                        height: 15,
                        transform: "translate(-0.3%) rotate(45deg)",
                      }}
                    />
                  </div>
                )}
              </div>

              <div
                style={{
                  maxWidth: "100%",
                  color: "rgb(37, 38, 56)",
                  fontFamily:
                    "Canva Sans,Noto Sans Variable,Noto Sans,-apple-system,BlinkMacSystemFont,Segoe UI,Helvetica,Arial,sans-serif",
                  fontWeight: 600,
                  fontSize: "17px",
                  margin: 0,
                  marginBottom: 15,
                  marginTop: 10,
                  height: 70,
                }}
              >
                <h5
                  style={{
                    maxWidth: "80%",
                    color: "rgb(37, 38, 56)",
                    fontFamily:
                      "Canva Sans,Noto Sans Variable,Noto Sans,-apple-system,BlinkMacSystemFont,Segoe UI,Helvetica,Arial,sans-serif",
                    fontWeight: 600,
                    fontSize: "17px",
                    margin: 0,
                    width: "80%",
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
          ))}
        </Carousel>
      )}
      
      {authentication && <p style={{ fontSize: 18, fontWeight: "bold",marginBottom:0 }}>Thiết kế gần đây</p>}
      {authentication && <div style={{ paddingTop: "0px", display: "flex", flexWrap: "wrap" }}>
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
                    style={{ margin: 0, paddingLeft: 5, textTransform: "none" }}
                  >
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
                  <p
                    style={{ margin: 0, paddingLeft: 5, textTransform: "none" }}
                  >
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
          <></>
        )}
      </div>}

      {authentication && (
        <div
          style={{
            width: "100%",
            alignItems: "center",
            justifyContent: "center",
            display: "flex",
          }}
        >
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
          </Button>
        </div>
      )}
       <Modal
        open={modalLogoutDevice}
        onClose={handleLogoutDevice}
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
            Tài khoản đã bị đăng nhập ở thiết bị khác
          </p>
          <div style={{ display: "flex" }}>
            
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
                width: "100%",
              }}
              onClick={() => {
                document.cookie = `user_login=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
      document.cookie = `token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
      dispatch(DELETE_ALL_VALUES());
                setModalLogoutDevice(false);
                
                navigate('/login',{replace:true})
              }}
            >
              Đăng xuất
            </Button>
          </div>
        </Box>
      </Modal>
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
  );
}

export default SocialMedia;
