import React, { useState, useEffect } from "react";
import { styled, useTheme } from "@mui/material/styles";
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
import Box from "@mui/material/Box";
import { Tab, TabList, TabPanel, Tabs } from "./tabs.jsx";
import "./Project.css";
import Paper from "@mui/material/Paper";
import InputBase from "@mui/material/InputBase";
import SearchIcon from "@mui/icons-material/Search";
import IconButton from "@mui/material/IconButton";
import CancelIcon from "@mui/icons-material/Cancel";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { useAppSelector, useAppDispatch } from "../../hooks/hook.ts";
import Button from "@mui/material/Button";
import editIcon from "./edit.png";
import warning from "./warning.png";
import deleteIcon from "./delete.png";
import hobby from "./hobby (1).png";

import axios from "axios";
// import backgroundHeader from
function UnBuyingCollection() {
  const formatPrice = (price) => {
    // Sử dụng Intl.NumberFormat để định dạng số thành chuỗi có dấu phân cách hàng nghìn
    return new Intl.NumberFormat("vi-VN").format(price);
  };
  const [dataWarehouse, setDataWarehouse] = React.useState([]);
  const navigate = useNavigate();
  const location = useLocation();
  const [enableButtonClear, setEnableButtonClear] = React.useState(false);
  //   React.useEffect(() => {
  //     navigate("recommend");
  //   }, []);

  // Get the current route
  const currentRoute = location.pathname.split("/").pop();
  const open = useOutletContext();
  const [active, setActive] = useState("tab1");
  const [searchText, setSearchText] = React.useState("");
  const [loadingSearch, setLoadingSearch] = React.useState(false);
  const drawerWidth = 240;
  const onChange = (event) => {
    console.log(event.target.value);
    setSearchText(event.target.value);
    setEnableButtonClear(true);
    setLoadingSearch(true);
    if (searchText === "") {
      setEnableButtonClear(false);
    }
    setTimeout(() => {
      setLoadingSearch(false);
    }, 1500);
  };
  const onChangeClear = () => {
    setSearchText("");
    setEnableButtonClear(false);
  };
  const networkAPI = useAppSelector((state) => state.network.ipv4Address);

  useEffect(() => {
    const fetchProUser = async () => {
      try {
        const response = await axios.post(`${networkAPI}/searchWarehousesAPI`, {
          limit: 40,
          page: 1,
        });
        if (response.data.data && response.data) {
          console.log(response.data.data);
          setDataWarehouse(response.data.data);
        }
      } catch (error) {
        toast.error("Lỗi lấy thông tin khách hàng", {
          position: "top-left",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
        setLoading(false);
      }
    };

    fetchProUser();
  }, []);

  const getDataWarehouse = async (text) => {
    try {
      const response = await axios.post(`${networkAPI}/searchWarehousesAPI`, {
        limit: 40,
        page: 1,
        name: text,
      });
      if (response.data.data && response.data) {
        console.log(response.data.data);
        setDataWarehouse(response.data.data);
      } else if (response.data.code === 2 && response.data) {
        console.log(response.data.data);
        setDataWarehouse([]);
      }
    } catch (error) {
      toast.error("Lỗi lấy thông tin khách hàng", {
        position: "top-left",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
      setLoading(false);
    }
  };
  const fetchProUser = async () => {
    try {
      const response = await axios.post(`${networkAPI}/searchWarehousesAPI`, {
        limit: 40,
        page: 1,
        name: searchText,
      });
      if (response.data.data && response.data) {
        console.log(response.data.data);
        setDataWarehouse(response.data.data);
      } else if (response.data.code === 2 && response.data) {
        console.log(response.data.data);
        setDataWarehouse([]);
      }
    } catch (error) {
      toast.error("Lỗi lấy thông tin khách hàng", {
        position: "top-left",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
      setLoading(false);
    }
  };
  const Main = styled("main")(({ theme }) => ({
    // flexGrow: 1,
    // padding: theme.spacing(3),
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
    }),
  }));
  const itemsPerRow = 4;
  const rows = [];
  for (let i = 0; i < dataWarehouse.length; i += itemsPerRow) {
    const rowItems = dataWarehouse.slice(i, i + itemsPerRow);
    rows.push(rowItems);
  }
  return (
    <div style={{ paddingTop: "6%", paddingRight: "2%", paddingLeft: "18%" }}>
      <Box
        style={{
          background: "rgb(231, 246, 246)",
          width: "100%",
          height: 300,
          borderRadius: 15,
          display: "flex",
          alignItems: "center",
          flexDirection: "row",
          position: "relative",
          marginBottom: "10px",
        }}
      >
        <div className="project-header__advertisement">
          <p className="project-header__advertisement---textHeader">
            Biến mỗi khoảnh khắc thành nghệ thuật
          </p>
          <p className="project-header__advertisement---textContent">
            Ezpics Collection - Tạo nên bộ sưu tập ảnh độc đáo, làm nổi bật câu
            chuyện của bạn.
          </p>
        </div>
        <img src={hobby} alt="" style={{ width: 300, height: 300 }} />
      </Box>
      <div
        style={{ display: "flex", flexDirection: "row", position: "relative" }}
      >
        <Paper
          component="form"
          sx={{
            p: "2px 4px",
            display: "flex",
            alignItems: "center",
            width: 400,
            marginTop: "10px",
            border: "0.5px solid rgb(141, 147, 151)",
          }}
        >
          <IconButton sx={{ p: "7px", pr: "0px" }} aria-label="menu" style={{}}>
            <SearchIcon />
          </IconButton>
          <InputBase
            sx={{ ml: 0, flex: 1, fontSize: 14 }}
            placeholder="Tìm kiếm bộ sưu tập"
            onChange={onChange}
            value={searchText}
          />
          {searchText !== "" && (
            <IconButton
              sx={{ p: "5px" }}
              aria-label="menu"
              style={{}}
              onClick={onChangeClear}
            >
              <CancelIcon fontSize="small" />
            </IconButton>
          )}
          {enableButtonClear && (
            <div
              style={{
                width: 400,
                position: "absolute",
                bottom: loadingSearch ? -150 : -45,
                left: 0,
                height: loadingSearch ? 150 : 40,
                boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
                paddingTop: 10,
                paddingLeft: 15,
                alignItems: loadingSearch ? "flex-start" : "center",
                zIndex: 8888888,
                backgroundColor: "white",
              }}
            >
              {loadingSearch ? (
                <>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      width: "100%",
                      alignItems: "center",
                      paddingTop: 5,
                    }}
                  >
                    <Skeleton height={30} width={30} />
                    <Skeleton
                      height={14}
                      width={310}
                      style={{ marginLeft: 20 }}
                    />
                  </div>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      width: "100%",
                      alignItems: "center",
                      paddingTop: 10,
                    }}
                  >
                    <Skeleton height={30} width={30} />
                    <Skeleton
                      height={14}
                      width={310}
                      style={{ marginLeft: 20 }}
                    />
                  </div>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      width: "100%",
                      alignItems: "center",
                      paddingTop: 10,
                    }}
                  >
                    <Skeleton height={30} width={30} />
                    <Skeleton
                      height={14}
                      width={310}
                      style={{ marginLeft: 20 }}
                    />
                  </div>
                </>
              ) : (
                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    cursor: "pointer",
                  }}
                  onClick={() => {
                    setEnableButtonClear(false);

                    fetchProUser();
                  }}
                >
                  <SearchIcon fontSize="small" />
                  <p style={{ paddingLeft: 10, margin: 0 }}>
                    Tìm kiếm {searchText}
                  </p>
                </div>
              )}
            </div>
          )}
        </Paper>
        <div
          onClick={() => getDataWarehouse("Chạm tay bay nám")}
          style={{
            border: "1px solid gray",
            paddingTop: 20,
            display: "flex",
            alignItems: "center",
            marginTop: 10,
            height: 43,
            marginLeft: 10,
            paddingBottom: 15,
            paddingLeft: 7,
            paddingRight: 7,
            borderRadius: 5,
            cursor: "pointer",
          }}
        >
          <p style={{ margin: 0 }}>Chạm tay bay nám</p>
        </div>

        <div
          onClick={() => getDataWarehouse("Sự kiện - Chương trình - Cuộc thi")}
          style={{
            border: "1px solid gray",
            paddingTop: 20,
            display: "flex",
            alignItems: "center",
            marginTop: 10,
            height: 43,
            marginLeft: 10,
            paddingBottom: 15,
            paddingLeft: 7,
            paddingRight: 7,
            borderRadius: 5,
            cursor: "pointer",
          }}
        >
          <p style={{ margin: 0 }}>Sự kiện - Hội nghị</p>
        </div>
        <div
          onClick={() => getDataWarehouse("Vinh danh")}
          style={{
            border: "1px solid gray",
            paddingTop: 20,
            display: "flex",
            alignItems: "center",
            marginTop: 10,
            height: 43,
            marginLeft: 10,
            paddingBottom: 15,
            paddingLeft: 7,
            paddingRight: 7,
            borderRadius: 5,
            cursor: "pointer",
          }}
        >
          <p style={{ margin: 0 }}>Vinh danh</p>
        </div>
        <div
          onClick={() => getDataWarehouse("Kho tổng")}
          style={{
            border: "1px solid gray",
            paddingTop: 20,
            display: "flex",
            alignItems: "center",
            marginTop: 10,
            height: 43,
            marginLeft: 10,
            paddingBottom: 15,
            paddingLeft: 7,
            paddingRight: 7,
            borderRadius: 5,
            cursor: "pointer",
          }}
        >
          <p style={{ margin: 0 }}>Kho tổng</p>
        </div>
        <div
          onClick={() => getDataWarehouse("Mẫu thiết kế đẹp")}
          style={{
            border: "1px solid gray",
            paddingTop: 20,
            display: "flex",
            alignItems: "center",
            marginTop: 10,
            height: 43,
            marginLeft: 10,
            paddingBottom: 15,
            paddingLeft: 7,
            paddingRight: 7,
            borderRadius: 5,
            cursor: "pointer",
          }}
        >
          <p style={{ margin: 0 }}>Mẫu thiết kế đẹp</p>
        </div>
      </div>
      <div style={{ paddingTop: "10px", display: "flex", flexWrap: "wrap" }}>
        {dataWarehouse.length > 0 ? (
          dataWarehouse.map((item, index) => (
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
              {/* <div
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
            </div> */}
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
                {/* <p
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
                </p> */}
              </div>
            </div>
          ))
        ) : (
          <div style={{ textAlign: "center", width: "100%", paddingTop: "3%" }}>
            <p style={{ textAlign: "center", fontWeight: "bold" }}>
              Đang tải, đợi xíu nhé
            </p>
            <Button
              variant="contained"
              size="medium"
              style={{
                // marginLeft: "20px",
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
      </div>
    </div>
  );
}

export default UnBuyingCollection;
