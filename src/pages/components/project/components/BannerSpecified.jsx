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

function BannerSpecified() {
  const [loading, setLoading] = React.useState(true);
    const [loading2, setLoading2] = React.useState(true);

  const network = useSelector((state) => state.ipv4.network);
  const responsiveSliding = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 1,
      slidesToSlide: 2,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 1,
      slidesToSlide: 2, // optional, default to 1.
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
      slidesToSlide: 1, // optional, default to 1.
    },
  };
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
  const [data, setData] = useState([]);
  const [data2, setData2] = useState([]);
  const [data3, setData3] = useState([]);

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
          // setData(response.data.listData[5].listData);
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
  useEffect(() => {
    setLoading2(true);

    const getData = async () => {
      try {
        const response = await axios.get(`${network}/getSlideHomeAPI`);
        if (response && response.data) {
          setData3(response.data);

          setLoading2(false);
        } else {
          console.error("Invalid response format");
          setLoading2(false);
        }
      } catch (error) {
        console.error("Error fetching data:", error.message);
        setLoading2(false);
      }
    };

    getData();
  }, []);
  const formatPrice = (price) => {
    // Sử dụng Intl.NumberFormat để định dạng số thành chuỗi có dấu phân cách hàng nghìn
    return new Intl.NumberFormat("vi-VN").format(price);
  };
  const navigate = useNavigate();
useEffect(() => {
    const getData = async () => {
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
            (category) => category.name === "Banner Livestream"
          );
          if (thumbnailYoutubeCategory) {
            const categoryId = thumbnailYoutubeCategory.id;
            const response = await axios.post(
              `${network}/getProductByCategoryAPI`,
              {
                limit: 30,
                page: 1,
                category_id: categoryId,
              }
            );
            if (response && response.data) {
              // setData(response.data.listData[5].listData);
              // setData2(response.data.listData[8].listData);
              // setLoading(false);

              setData(response.data.listData);
            } else {
              console.error("Invalid response format");
              setLoading(false);
            }
            console.log(categoryId);
          } else {
            console.log('Category "Thumnail Youtube" not found.');
          }
        } else {
          console.error("Invalid response format");
        }
      } catch (error) {
        console.error("Error fetching data:", error.message);
      }
    };

    getData();
  }, []);
  return (
    <div style={{ paddingRight: 15, paddingTop: 15 }}>
      <p style={{ fontSize: 18, fontWeight: "bold" }}>Banner Livestream</p>
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
                  fontFamily: "Inter",
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
                  minHeight: 70,
                  maxWidth: "100%",
                  color: "rgb(37, 38, 56)",
                  fontFamily: "Inter",
                  fontWeight: 600,
                  fontSize: "17px",
                  margin: 0,
                  marginBottom: 15,
                  marginTop: 10,
                }}
              >
                <h5
                  style={{
                    maxWidth: "80%",
                    color: "rgb(37, 38, 56)",
                    fontFamily: "Inter",
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
      {loading2 ? (
        // Display loading skeletons while data is being fetched
        <Carousel
          swipeable={false}
          responsive={responsive}
          ssr={true}
          infinite={true}
          autoPlaySpeed={1000}
          autoPlay
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
                  color: "rgb(37, 38, 56)",
                  fontFamily: "Inter",
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
                  minHeight: 70,
                  maxWidth: "100%",
                  color: "rgb(37, 38, 56)",
                  fontFamily: "Inter",
                  fontWeight: 600,
                  fontSize: "17px",
                  margin: 0,
                  marginBottom: 15,
                  marginTop: 10,
                }}
              >
                <h5
                  style={{
                    height: "100%",
                    maxWidth: "80%",
                    color: "rgb(37, 38, 56)",
                    fontFamily: "Inter",
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
    </div>
  );
}

export default BannerSpecified;
