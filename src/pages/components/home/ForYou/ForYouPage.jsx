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
import "./ForYouPage.css";
import { Routes, Route, Link, useParams, useNavigate } from "react-router-dom";

function ForYouPage() {
  const [loading, setLoading] = React.useState(true);

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

  return (
    <div style={{ paddingRight: 15, paddingTop: 15 }}>
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
                  height: 70
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
                  {item.sale_price ? formatPrice(item.sale_price) : "Miễn phí"}₫
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
                />
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
                  height: 70
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
                  {item.sale_price
                    ? `${formatPrice(item.sale_price)}₫`
                    : "Miễn phí"}
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
    </div>
  );
}

export default ForYouPage;
