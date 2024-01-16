import React, { useRef, useState, useEffect } from "react";
import { styled, useTheme } from "@mui/material/styles";
import {
  BrowserRouter as Router,
  Route,
  Link,
  Routes,
  useLocation,
  Outlet,
  useOutletContext,
  useNavigate,
  useParams,
} from "react-router-dom";
import { MuiColorInput } from "mui-color-input";

import filterIcon from "./filter.png";
import Select from "@mui/material/Select";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import FormLabel from "@mui/material/FormLabel";
import CssBaseline from "@mui/material/CssBaseline";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import InputBase from "@mui/material/InputBase";
import Badge from "@mui/material/Badge";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import AccountCircle from "@mui/icons-material/AccountCircle";
import NotificationsIcon from "@mui/icons-material/Notifications";
import MoreIcon from "@mui/icons-material/MoreVert";
import Button from "@mui/material/Button";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import Tooltip from "@mui/material/Tooltip";
import Avatar from "@mui/material/Avatar";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import NotificationsActiveOutlinedIcon from "@mui/icons-material/NotificationsActiveOutlined";
import MonitorOutlinedIcon from "@mui/icons-material/MonitorOutlined";
import TextField from "@mui/material/TextField";
import Paper from "@mui/material/Paper";
import DirectionsIcon from "@mui/icons-material/Directions";
import ForYouPage from "../ForYou/ForYouPage";
import ForYouIcon from "../../../assets/ForYouIcon";
import DosIcon from "../../../assets/DosIcon";
import ContentIcon from "../../../assets/ContentIcon";
import FormatIcon from "../../../assets/FormatIcon";
import VideoIcon from "../../../assets/VideoIcon";
import WebIcon from "../../../assets/WebIcon";
import TemplateIcon from "../../../assets/TemplateIcon";
import MoreIcons from "../../../assets/MoreIcon";
import PageIcon from "../../../assets/PageIcon";
import crownIcon from "../../../assets/crownIcon";
import axios from "axios";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { useAppSelector, useAppDispatch } from "../../../../hooks/hook.ts";
import Modal from "@mui/material/Modal";
import { useSelector, useDispatch } from "react-redux";
import close from "./close.png";
import Radio from "@mui/material/Radio";

function DashboardSearch() {
  const [valueColor, setValueColor] = React.useState("");

  const handleChangeColor = (event) => {
    // Update the valueColor state without triggering drawer closure
    // event.preventDefault();

    setValueColor(event.target.value);
    setState({ left: open });
    console.log(valueColor);
  };
  const formatPrice = (price) => {
    // Sử dụng Intl.NumberFormat để định dạng số thành chuỗi có dấu phân cách hàng nghìn
    return new Intl.NumberFormat("vi-VN").format(price);
  };
  const [searchText, setSearchText] = React.useState("");
  const [age, setAge] = React.useState("");
  const [dataConvert, setDataConvert] = React.useState([]);
  const itemsPerRow = 4;
  const handleChange = (event) => {
    setAge(event.target.value);
  };
  const onChange = (event) => {
    // console.log(event.target.value);
    setSearchText(event.target.value);
    setEnableButtonClear(true);
    setLoadingSearch(true);
    console.log(searchText === "");

    if (event.target.value === "") {
      setEnableButtonClear(false);
      setLoadingSearch(false);
    } else {
      fetchProUser();
      setEnableButtonClear(true);
      setLoadingSearch(true);
    }
    setTimeout(() => {
      setLoadingSearch(false);
    }, 1500);
  };

  const [selectedRadio, setSelectedRadio] = useState("");
  const [selectedRadioPrice, setSelectedRadioPrice] = useState("");
  const [selectedRadioFilter, setSelectedRadioFilter] = useState("");

  const [dataWarehouse, setDataWarehouse] = React.useState([]);
  const [clickedOnDataWarehouse, setClickedOnDataWarehouse] =
    React.useState(false);
  const [listColor, dataListColor] = React.useState([]);
  const { search } = useParams();

  const navigate = useNavigate();

  const [dataCategorySearch, setDataCategorySearch] = React.useState([]);

  const [state, setState] = React.useState({
    left: false,
  });
  const toggleDrawer = (open) => (event) => {
    const isColorInput = event.target.type === "color";

    if (!isColorInput) {
      setState({ left: open });
    }
  };
  function BpRadio(props) {
    return (
      <Radio
        disableRipple
        color="default"
        checkedIcon={<BpCheckedIcon />}
        icon={<BpIcon />}
        {...props}
      />
    );
  }
  const BpIcon = styled("span")(({ theme }) => ({
    borderRadius: "50%",
    width: 16,
    height: 16,
    boxShadow:
      theme.palette.mode === "dark"
        ? "0 0 0 1px rgb(16 22 26 / 40%)"
        : "inset 0 0 0 1px rgba(16,22,26,.2), inset 0 -1px 0 rgba(16,22,26,.1)",
    backgroundColor: theme.palette.mode === "dark" ? "#394b59" : "#f5f8fa",
    backgroundImage:
      theme.palette.mode === "dark"
        ? "linear-gradient(180deg,hsla(0,0%,100%,.05),hsla(0,0%,100%,0))"
        : "linear-gradient(180deg,hsla(0,0%,100%,.8),hsla(0,0%,100%,0))",
    ".Mui-focusVisible &": {
      outline: "2px auto rgba(19,124,189,.6)",
      outlineOffset: 2,
    },
    "input:hover ~ &": {
      backgroundColor: theme.palette.mode === "dark" ? "#30404d" : "#ebf1f5",
    },
    "input:disabled ~ &": {
      boxShadow: "none",
      background:
        theme.palette.mode === "dark"
          ? "rgba(57,75,89,.5)"
          : "rgba(206,217,224,.5)",
    },
  }));
  const BpCheckedIcon = styled(BpIcon)({
    backgroundColor: "#137cbd",
    backgroundImage:
      "linear-gradient(180deg,hsla(0,0%,100%,.1),hsla(0,0%,100%,0))",
    "&::before": {
      display: "block",
      width: 16,
      height: 16,
      backgroundImage: "radial-gradient(#fff,#fff 28%,transparent 32%)",
      content: '""',
    },
    "input:hover ~ &": {
      backgroundColor: "#106ba3",
    },
  });
  const network = useAppSelector((state) => state.network.ipv4Address);
  useEffect(() => {
    const getDataCategory = async () => {
      try {
        const response = await axios.get(`${network}/getProductCategoryAPI`);
        if (response && response.data && response.data.listData) {
          setDataCategorySearch(response.data.listData);
        } else {
          console.error("Invalid response format");
        }
      } catch (error) {
        console.error("Error fetching data:", error.message);
      }
    };

    getDataCategory();
  }, []);
  useEffect(() => {
    const getDataColor = async () => {
      try {
        const response = await axios.get(`${network}/getMainColorAPI`);
        if (response && response.data) {
          dataListColor(response.data);
        } else {
          console.error("Invalid response format");
        }
      } catch (error) {
        console.error("Error fetching data:", error.message);
      }
    };

    getDataColor();
  }, []);
  useEffect(() => {
    const fetchProUser = async () => {
      try {
        const response = await axios.post(`${network}/searchProductAPI`, {
          limit: 20,
          page: 1,
          name: search,
        });
        if (response.data.listData && response.data) {
          setDataConvert(response.data.listData);
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

  const fetchDataWarehouse = async () => {
    try {
      const response = await axios.post(`${network}/searchProductAPI`, {
        limit: 20,
        page: 1,
        name: searchText,
        price: selectedRadioPrice !== "" ? selectedRadioPrice : "",
        orderBy: selectedRadioFilter !== "" ? selectedRadioFilter : "",
        orderType: selectedRadio !== "" ? selectedRadio : "",
        category_id: age !== "" ? age : "",
        color: valueColor !== "" ? valueColor : "",
      });
      if (response.data.listData && response.data) {
        console.log(response.data.listData);
        // setDataWarehouse(response.data.data);
              setState({ left: false });

        setDataConvert(response.data.listData);
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
      const response = await axios.post(`${networkAPI}/searchProductAPI`, {
        limit: 5,
        page: 1,
        name: searchText,
      });
      if (response.data.listData && response.data) {
        console.log(response.data.listData);
        // setDataWarehouse(response.data.data);
        setDataWarehouse(response.data.listData);
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
  return (
    <>
      <div style={{ paddingTop: "6%", paddingRight: "2%", paddingLeft: "18%" }}>
        <Box>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <Paper
              component="form"
              sx={{
                display: "flex",
                alignItems: "center",
                width: 750,
                position: "relative",
              }}
              onBlur={() => {
                if (!clickedOnDataWarehouse) {
                  setEnableButtonClear(false);
                }
              }}
            >
              <IconButton sx={{ p: "10px" }} aria-label="menu" style={{}}>
                <SearchIcon />
              </IconButton>
              <InputBase
                sx={{ ml: 0, flex: 1 }}
                placeholder="Tìm kiếm nội dung trên Ezpics"
                onChange={onChange}
                value={searchText}

                // inputProps={{ 'aria-label': 'search google maps' }}
              />
            </Paper>
            <Button
              variant="contained"
              size="medium"
              style={{
                marginLeft: "20px",
                height: 45,
                alignSelf: "center",
                textTransform: "none",
                color: "white",
                backgroundColor: "rgb(255, 66, 78)",
                position: "relative",
              }}
              onClick={() => {
                fetchDataWarehouse();
              }}
            >
              Tìm kiếm
            </Button>
          </div>

          <div
            style={{ paddingTop: 20, display: "flex", flexDirection: "row" }}
          >
            <Button
              onClick={toggleDrawer(true)}
              style={{
                color: "black",
                textTransform: "none",
                // border: "1px solid gray",
                backgroundColor: "rgb(225, 228, 231)",
                paddingTop: 10,
                paddingBottom: 10,
                paddingRight: 10,
                paddingLeft: 10,
                fontWeight: 600,
              }}
            >
              <img src={filterIcon} alt="" style={{ width: 20, height: 20 }} />
              &nbsp;Tìm kiếm nâng cao
            </Button>
            <FormControl style={{ minWidth: 120, marginLeft: 20 }}>
              <InputLabel id="demo-simple-select-label">Danh mục</InputLabel>

              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={age}
                label="Danh mục"
                onChange={handleChange}
                style={{}}
              >
                {dataCategorySearch.length > 0 &&
                  dataCategorySearch.map((data, index) => (
                    <MenuItem value={data.id}>{data.name}</MenuItem>
                  ))}
              </Select>
            </FormControl>
          </div>

          <div style={{ marginTop: dataConvert.length > 0 ? "-7%" : 0, display: "flex", flexWrap: "wrap" }}>
            {dataConvert.length > 0 ? (
              dataConvert.map((item, index) => (
                <div
                  key={index}
                  style={{
                    flex: `0 0 calc(${100 / itemsPerRow}% - 16px)`, // Adjust the margin as needed

                    marginBottom: "15px",
                    boxSizing: "border-box",
                    padding: "0 8px",
                    position: "relative",
                    maxWidth: 280,
                    marginTop: "10%",
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
                        style={{
                          margin: 0,
                          color: "rgb(238, 77, 45)",
                          fontSize: 17,
                        }}
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
                </div>
              ))
            ) : (
              <div
                style={{ textAlign: "center", width: "100%", paddingTop: "3%" }}
              >
                <p style={{ textAlign: "center", fontWeight: "bold" }}>
                  Không có mẫu thiết kế tương ứng
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
                    navigate('/')
                  }}
                >
                  Về trang chủ
                </Button>
              </div>
            )}
          </div>
        </Box>
      </div>
      <Drawer
        anchor="left"
        open={state.left}
        onClose={toggleDrawer(false)}
        style={{ zIndex: 1300, paddingLeft: 10, position: "relative" }}
      >
        {/* {list} */}
        <Box sx={{ width: 250 }} role="presentation">
          <div
            style={{
              width: "100%",
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              paddingLeft: 10,
              paddingRight: 10,
              paddingTop: 15,
              paddingBottom: 15,
            }}
          >
            <p style={{ fontSize: 14, margin: 0 }}>Bộ lọc</p>
            <img
              src={close}
              alt=""
              style={{ width: 20, height: 20, cursor: "pointer" }}
              onClick={toggleDrawer(true)}
            />
          </div>

          <Divider />
          <p style={{ fontSize: 15, fontWeight: 600, paddingLeft: 10 }}>
            Màu sắc :
          </p>
          {/* <MuiColorInput value={valueColor} onChange={handleChangeColor}  sx={{ zIndex: 133300}}/> */}
          <div style={{ width: "100%", display: "flex", flexDirection: "row" }}>
            {/* <input
              type="color"
              value={valueColor}
              onChange={handleChangeColor}
              style={{ width: "30%", height: 50, marginLeft: 10 }}
            /> */}
            <FormControl
              style={{ minWidth: 70, marginLeft: 10, maxWidth: 100 }}
            >
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={valueColor}
                label="Màu"
                onChange={handleChangeColor}
                style={{
                  zIndex: 1600,
                  backgroundColor: valueColor,
                  marginLeft: 0,
                }}
              >
                {listColor.length > 0 &&
                  listColor.map((data, index) => (
                    <MenuItem
                      value={data.code}
                      style={{ backgroundColor: data.code, color: "white" }}
                    >
                      {data.name}
                    </MenuItem>
                  ))}
              </Select>
            </FormControl>
            {/* <FormControl style={{ minWidth: 120, marginLeft: 20 }}>
              <InputLabel id="demo-simple-select-label">Danh mục</InputLabel>

              
            </FormControl> */}

            <p style={{ fontSize: 15, fontWeight: 600, paddingLeft: 10 }}>
              Màu : <span style={{ color: valueColor }}>{valueColor}</span>
            </p>
          </div>
          <p style={{ fontSize: 15, fontWeight: 600, paddingLeft: 10 }}>
            Sắp xếp theo :
          </p>
          <RadioGroup
            aria-labelledby="demo-radio-buttons-group-label"
            defaultValue=""
            name="radio-buttons-group"
            value={selectedRadio}
            onChange={(event) => {
              setSelectedRadio(event.target.value);
              toggleDrawer(true)(event);
            }}
            style={{ paddingLeft: 10 }}
          >
            <FormControlLabel
              value="desc"
              control={<BpRadio />}
              label="Giảm dần"
            />
            <FormControlLabel
              value="asc"
              control={<BpRadio />}
              label="Tăng dần"
            />
          </RadioGroup>
          <p style={{ fontSize: 15, fontWeight: 600, paddingLeft: 10 }}>
            Khoảng giá :
          </p>
          <RadioGroup
            aria-labelledby="demo-radio-buttons-group-label"
            defaultValue=""
            name="radio-buttons-group"
            value={selectedRadioPrice}
            onChange={(event) => {
              setSelectedRadioPrice(event.target.value);
              toggleDrawer(true)(event);
            }}
            style={{ paddingLeft: 10 }}
          >
            <FormControlLabel
              value="0-0"
              control={<BpRadio />}
              label="Miễn phí"
            />
            <FormControlLabel
              value="1000-5000"
              control={<BpRadio />}
              label="Dưới 10.000đ"
            />
            <FormControlLabel
              value="10000-100000"
              control={<BpRadio />}
              label="Từ 10.000đ đến 100.000đ"
            />
            <FormControlLabel
              value="100000-10000000000"
              control={<BpRadio />}
              label="Trên 100.000đ"
            />
          </RadioGroup>
          <p style={{ fontSize: 15, fontWeight: 600, paddingLeft: 10 }}>
            Lọc theo :
          </p>
          <RadioGroup
            aria-labelledby="demo-radio-buttons-group-label"
            defaultValue=""
            name="radio-buttons-group"
            value={selectedRadioFilter}
            onChange={(event) => {
              setSelectedRadioFilter(event.target.value);
              toggleDrawer(true)(event);
            }}
            style={{ paddingLeft: 10 }}
          >
            <FormControlLabel
              value="price"
              control={<BpRadio />}
              label="Sắp xếp theo giá"
            />
            <FormControlLabel
              value="create"
              control={<BpRadio />}
              label="Sắp xếp theo thời gian tạo"
            />
            <FormControlLabel
              value="view"
              control={<BpRadio />}
              label="Sắp xếp theo lượt xem"
            />
            <FormControlLabel
              value="favorite"
              control={<BpRadio />}
              label="Sắp xếp theo lượt yêu thích"
            />
          </RadioGroup>

          <div
            style={{
              position: "absolute",
              bottom: 0,
              left: 0,
              height: 60,
              display: "flex",
              flexDirection: "row",
              backgroundColor: "white",
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
                backgroundColor: "gray",
                position: "relative",
              }}
              onClick={() => {
                if (authentication) {
                  window.scrollTo({
                    top: 0,
                    behavior: "smooth",
                  });
                  setCreatingBucket(!creatingBucket);
                  // setOpenModalCreating(true);
                } else {
                  navigate("/login");
                }
              }}
            >
              Xóa tất cả
            </Button>
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
              }}
              onClick={() => {
                fetchDataWarehouse();
              }}
            >
              Tìm kiếm
            </Button>
          </div>
        </Box>
      </Drawer>
    </>
  );
}

export default DashboardSearch;
