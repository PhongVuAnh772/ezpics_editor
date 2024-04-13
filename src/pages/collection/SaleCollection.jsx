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
import stamp from "./stamp-collecting.png";
import xMark from "./x-button.png";
import downloadIcon from "./direct-download (1).png";
import copy from "copy-to-clipboard";
import eye from "./eye.png";
import share from "./share.png";

function SaleCollection() {
  const [idWarehouseChoosing, setIdWarehouseChoosing] = React.useState("");
  const [imgSrcImage, setImgSrcImage] = React.useState(null);
  const [deletingItemId, setDeletingItemId] = React.useState(null);
  const [allCategories, setAllCategories] = React.useState([]);
  const [newModal, setNewModal] = React.useState(false);
  const [loadingBuyingFunc, setLoadingBuyingFunc] = React.useState(false);
  const [selectedFile, setSelectedFile] = React.useState(null);
  const [loading, setLoading] = React.useState(true);
  const network = useSelector((state) => state.ipv4.network);
  const [data, setData] = useState([]);
  const itemsPerRow = 4;
  const [modalBuyingFree, setModalBuyingFree] = React.useState(false);
  const [modalBuying, setModalBuying] = React.useState(false);

  const [textNewing, setTextNewing] = React.useState("");
  const [textMoneyValue, setTextMoneyValue] = React.useState("");
  const [textDate, setTextDate] = React.useState("");
  const [specifiedCart, setSpecifiedCart] = React.useState(false);
  const [cartSpecifiedInside, setCartSpecifiedInside] = React.useState([]);
  const [nameCollection, setNameCollection] = React.useState("");
  const [valueCollection, setValueCollection] = React.useState("");
  const [dateCollection, setDateCollection] = React.useState("");
  const handleFixingCustomCollection = async (e) => {
    e.preventDefault();
    console.log(idWarehouseChoosing);
    setLoadingButtonModalCreate(true);

    if (selectedFile) {
      const response = await axios.post(`${network}/updateWarehouseAPI`, {
        token: checkTokenCookie(),
        name: nameCollection,
        idWarehouse: idWarehouseChoosing,
        price: parseInt(valueCollection),
        data_use: parseInt(dateCollection),
      });
      if (response && response.data && response.data.code === 1) {
        const response = await axios.post(`${network}/getInfoMemberAPI`, {
          token: checkTokenCookie(),
        });
        if (response && response.data.code === 0) {
          setModalBuyingFree(false);
          setNewModal(false);
          setLoadingButtonModalCreate(false);
          document.body.style.overflowY = "auto";

          toast.success("Tạo bộ sưu tập thành công !! 🦄", {
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
            setCookie("user_login", response.data.data, 1);
            dispatch(CHANGE_VALUE(response.data.data));
            window.location.reload();
          }, 1500);
        }
      }
      if (response && response.data && response.data.code === 4) {
        setLoadingButtonModalCreate(false);
        toast.error("Bạn không đủ tiền, hãy nạp tiền và thử lại !! 🦄", {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
      }
    } else {
      setModalBuyingFree(false);
      setNewModal(false);
      setLoadingButtonModalCreate(false);
      toast.error("Tạo bộ sưu tập thất bại !! 🦄", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    }
  };
  const handleCreateCustom = async (e) => {
    e.preventDefault();
    setLoadingButtonModalCreate(true);

    if (selectedFile) {
      const response = await axios.post(
        `${network}/addWarehouseLostMoneyAPI`,
        {
          token: checkTokenCookie(),
          name: textNewing,
          price: textMoneyValue,
          date_use: textDate,
          keyword: "Mẫu đẹp",
          description: "",
          file: selectedFile,
        },
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      if (response && response.data && response.data.code === 1) {
        const response = await axios.post(`${network}/getInfoMemberAPI`, {
          token: checkTokenCookie(),
        });
        if (response && response.data.code === 0) {
          setModalBuyingFree(false);
          setNewModal(false);
          setLoadingButtonModalCreate(false);
          document.body.style.overflowY = "auto";

          toast.success("Tạo bộ sưu tập thành công !! 🦄", {
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
            setCookie("user_login", response.data.data, 1);
            dispatch(CHANGE_VALUE(response.data.data));
            window.location.reload();
          }, 1500);
        }
      }
      if (response && response.data && response.data.code === 4) {
        setLoadingButtonModalCreate(false);
        toast.error("Bạn không đủ tiền, hãy nạp tiền và thử lại !! 🦄", {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
      }
    } else {
      setModalBuyingFree(false);
      setNewModal(false);
      setLoadingButtonModalCreate(false);
      toast.error("Tạo bộ sưu tập thất bại !! 🦄", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    }
    // console.log(response.data);
    // console.log(selectedFile)
  };
  const ezpicsProContainer = {
    position: "absolute",
    backgroundColor: "rgba(0, 0, 0, 0.4)",
    width: "100%",
    height: "100%",
    zIndex: 99999,
    // alignItems: "center",
    paddingTop: "5%",
    justifyContent: "center",
    backdropFilter: "blur(3px)",
    display: "flex",
  };
  const handleFileChange = (event) => {
    const fileInput = event.target;
    const files = fileInput.files;

    if (files.length > 0) {
      const file = files[0];
      console.log("Selected file:", file);

      setSelectedFile(file);
      // setImgSrcImage()
      setImgSrcImage(URL.createObjectURL(file));

      // Bạn có thể thực hiện các xử lý khác tại đây
    }
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
  const [loadingButtonModalCreate, setLoadingButtonModalCreate] =
    React.useState(false);
  const handleLoadTemplate = async (item) => {
    setLoadingBuyingFunc(true);
    try {
      const response = await axios.post(`${network}/getProductsWarehousesAPI`, {
        idWarehouse: item.id,
        limit: 50,
        page: 1,
      });
      if (response && response.data.code === 1) {
        setAllCategories(response.data.data);
      } else if (response && response.data.code === 2) {
        setSpecifiedCart(true);
        setAllCategories(null);
      } else {
        toast.error("Không lấy được thông tin kho, hãy thử lại !! 🦄", {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
      }
    } catch (error) {
      console.error("Error fetching data:", error.message);
      setLoadingBuyingFunc(false);
    }
  };
  const handleFixing = async (idWarehouse) => {
    //
    const response = await axios.post(`${network}/getInfoWarehouseAPI`, {
      idWarehouse: idWarehouse,
    });
    if (response.data && response.data.code === 1) {
      console.log(response.data);
      setNameCollection(response.data?.data?.name);
      setValueCollection(response.data?.data?.price);
      setDateCollection(response.data?.data?.date_use);
      setImgSrcImage(response.data?.data?.thumbnail);

      setModalBuying(true);
    } else {
      toast.error("Kho không tồn tại, vui lòng thử lại !!", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    }
    // console.log(idWarehouse)
  };
  const navigate = useNavigate();
  const styleModalBuyingFree = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "30%",
    bgcolor: "background.paper",
    boxShadow: 24,
    display: "flex",
    alignItems: "center",
    flexDirection: "column",
    paddingTop: "15px",
    paddingLeft: "15px",
    paddingRight: "15px",
    borderRadius: "15px",
    height: "45%",
  };
  const styleModalBuyingFreeNew = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "30%",
    bgcolor: "background.paper",
    boxShadow: 24,
    display: "flex",
    alignItems: "center",
    flexDirection: "column",
    paddingTop: "15px",
    paddingLeft: "15px",
    paddingRight: "15px",
    borderRadius: "15px",
  };

  // const []
  // const []

  const handleCloseModalFree = () => {
    setModalBuyingFree(false);
    setDeletingItemId(null);
    setNewModal(false);
  };
  const handleCloseModal = () => {
    setModalBuying(false);
  };
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
          `${network}/getListWarehouseDesignerAPI`,
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

  const rows = [];
  for (let i = 0; i < data.length; i += itemsPerRow) {
    const rowItems = data.slice(i, i + itemsPerRow);
    rows.push(rowItems);
  }
  const getData = async (item) => {
    try {
      const response = await axios.post(`${network}/getProductsWarehousesAPI`, {
        idWarehouse: item.id,
        limit: 10,
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
  const handleButtonCopy = (e, id) => {
    copy(`https://ezpics.vn/collection-buying/${id}`);
    toast.success("Đã sao chép đường link vào clipboard !! 🦄", {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });
  };
  return (
    <>
      <div
        style={{
          width: "100%",
          justifyContent: `${specifiedCart ? "space-between" : "flex-end"}`,
          display: "flex",
        }}
      >
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
            }}
          >
            &lt; Quay lại
          </Button>
        )}
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
            color: "white",
            backgroundColor: "rgb(255, 66, 78)",
          }}
          onClick={() => {
            setModalBuyingFree(true);
          }}
        >
          +{"  "}Tạo mới bộ sưu tập
        </Button>
      </div>

      {specifiedCart ? (
        <>
          {cartSpecifiedInside !== null ? (
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
        <div style={{ display: "flex", flexWrap: "wrap" }}>
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
                    position: "absolute",
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    background: "rgba(0, 0, 0, 0.7)",
                    borderRadius: 10,
                    opacity: 0,
                    transition: "opacity 0.3s",
                    zIndex: 1000,
                    display: "flex",
                    flexDirection: "column",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.opacity = 1;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.opacity = 0;
                  }}
                >
                  <div
                    style={{
                      width: "100%",
                      flexDirection: "row",
                      alignItems: "center",
                      justifyContent: "center",
                      display: "flex",
                    }}
                  >
                    <Button
                      onClick={() => {
                        setIdWarehouseChoosing(item.id);
                        handleFixing(item.id);
                      }}
                      style={{
                        color: "black",
                        margin: "5px",
                        cursor: "pointer",
                        borderRadius: 10,
                        backgroundColor: "white",
                        width: 100,
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
                    <Button
                      onClick={(e) => {
                        handleButtonCopy(e, item.id);
                      }}
                      style={{
                        color: "black",
                        margin: "5px",
                        cursor: "pointer",
                        borderRadius: 10,
                        backgroundColor: "white",
                        width: 100,
                      }}
                    >
                      <img
                        src={share}
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
                        Chia sẻ
                      </p>
                    </Button>
                  </div>
                  <div
                    style={{
                      width: "100%",
                      flexDirection: "row",
                      alignItems: "center",
                      justifyContent: "center",
                      display: "flex",
                    }}
                  >
                    <Button
                      onClick={(e) => {
                        console.log(data);
                        handleLoadTemplate(item);
                      }}
                      style={{
                        color: "black",
                        margin: "5px",
                        cursor: "pointer",
                        borderRadius: 10,
                        backgroundColor: "white",
                        width: 100,
                      }}
                    >
                      <img src={eye} alt="" style={{ width: 20, height: 20 }} />
                      <p
                        style={{
                          margin: 0,
                          paddingLeft: 5,
                          textTransform: "none",
                        }}
                      >
                        Xem kho
                      </p>
                    </Button>
                  </div>
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
                    handleLoadTemplate(item);
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
              </div>
            ))
          ) : (
            <div style={{ textAlign: "center", width: "100%", height: "100%" }}>
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
                  setModalBuyingFree(true);
                }}
              >
                Tạo mới
              </Button>
            </div>
          )}
        </div>
      )}
      <Modal
        open={modalBuyingFree}
        onClose={handleCloseModalFree}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        {newModal ? (
          <>
            {/* <Box sx={styleModalBuyingFreeNew}> */}
            <div className="ezpics-pro-modal" style={ezpicsProContainer}>
              <div
                className="container-modal-create"
                style={{
                  animation: "fadeIn 0.5s ease-in-out",
                  width: 1000,
                  height: 300,
                }}
              >
                <div className="card---create-newing">
                  <div className="card-image---create-newing-last">
                    <h2 className="card-heading---create-newing">
                      Bắt đầu tạo bộ sưu tập <br></br>
                      <small style={{ fontSize: 15 }}>
                        Hãy điền đầy đủ thông tin trước khi tạo nhé
                      </small>
                    </h2>
                  </div>

                  <form className="card-form---create-newing">
                    {/* <div className="input---create-newing">
                      <input
                        type="text"
                        className="input-field---create-newing"
                        required
                      />
                      <label className="input-label---create-newing">
                        Tên mẫu thiết kế
                      </label>
                    </div> */}

                    <div
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        width: "100%",
                      }}
                    >
                      <div
                        className="input---create-newing"
                        style={{ width: "50%" }}
                      >
                        {/* <input type="file" className="input-field" required accept="image/png, image/jpeg"/>
                         */}
                        <label className="input-label---create-newing">
                          Ảnh minh họa
                        </label>

                        <form
                          id="file-upload-form"
                          class="uploader"
                          style={{ marginTop: 40 }}
                        >
                          <input
                            id="file-upload"
                            type="file"
                            name="fileUpload"
                            accept="image/*"
                            onChange={handleFileChange}
                          />

                          <label
                            for="file-upload"
                            id="file-drag"
                            style={{ height: 200, cursor: "pointer" }}
                          >
                            <img
                              id="file-image"
                              src="#"
                              alt="Preview"
                              class="hidden"
                            />
                            <div id="start---create-newing">
                              <img
                                src={downloadIcon}
                                alt=""
                                style={{
                                  width: 30,
                                  height: 30,
                                  alignSelf: "center",
                                  margin: "0 auto",
                                  marginBottom: "2%",
                                }}
                              />

                              {selectedFile !== null ? (
                                ""
                              ) : (
                                <div id="notimage" class="hidden">
                                  Hãy chọn ảnh
                                </div>
                              )}
                              <span
                                id="file-upload-btn"
                                class="btn btn-primary"
                              >
                                {selectedFile !== null
                                  ? "Chọn lại"
                                  : "Chọn ảnh"}
                              </span>
                            </div>
                            <div id="response" class="hidden">
                              <div id="messages"></div>
                              <progress
                                class="progress"
                                id="file-progress"
                                value="0"
                              >
                                <span>0</span>%
                              </progress>
                            </div>
                          </label>
                        </form>
                      </div>
                      <div
                        // className="input---create-newing"
                        style={{ width: "50%", paddingTop: 23 }}
                      >
                        <label style={{ marginLeft: 13 }}>Tên bộ sưu tập</label>
                        <input
                          style={{
                            marginLeft: 15,
                            marginTop: 5,
                            height: 35,
                            marginBottom: 15,
                          }}
                          onChange={(e) => setTextNewing(e.target.value)}
                        />
                        <label style={{ marginLeft: 13 }}>Giá tiền</label>
                        <input
                          style={{
                            marginLeft: 15,
                            marginTop: 5,
                            height: 35,
                            marginBottom: 15,
                          }}
                          onChange={(e) => setTextMoneyValue(e.target.value)}
                        />
                        <label style={{ marginLeft: 13 }}>
                          Số ngày sử dụng
                        </label>
                        <input
                          style={{
                            marginLeft: 15,
                            marginTop: 5,
                            height: 35,
                            marginBottom: 15,
                          }}
                          onChange={(e) => setTextDate(e.target.value)}
                        />
                      </div>
                    </div>

                    <div className="action---create-newing">
                      {selectedFile !== null &&
                      textNewing !== "" &&
                      textMoneyValue !== "" &&
                      textDate !== "" ? (
                        <button
                          className="action-button---create-newing"
                          style={{
                            cursor: "pointer",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                          }}
                          onClick={(e) => handleCreateCustom(e)}
                        >
                          {loadingButtonModalCreate ? (
                            <span class="loader-create-film"></span>
                          ) : (
                            "Bắt đầu tạo "
                          )}
                        </button>
                      ) : (
                        <button
                          className="action-button---create-newing"
                          style={{ backgroundColor: "rgba(255, 66, 78,0.3)" }}
                          disabled
                        >
                          Bắt đầu tạo
                        </button>
                      )}
                    </div>
                  </form>

                  <img
                    src={xMark}
                    alt=""
                    style={{
                      width: 20,
                      height: 20,
                      marginRight: -30,
                      right: 0,
                      top: 0,
                      cursor: "pointer",
                      position: "absolute",
                    }}
                    onClick={() => {
                      setModalBuyingFree(false);
                      setNewModal(false);
                    }}
                  />
                </div>
              </div>
            </div>
            {/* </Box> */}
          </>
        ) : (
          <>
            <Box sx={styleModalBuyingFree}>
              <p
                style={{
                  margin: 0,
                  fontSize: 22,
                  fontWeight: "bold",
                  paddingBottom: "10px",
                }}
              >
                Tạo bộ sưu tập
              </p>
              <img
                src={stamp}
                alt=""
                style={{ width: "20%", height: "30%", marginBottom: "10px" }}
              />
              <p
                style={{
                  margin: 0,
                  fontSize: 17,
                  fontWeight: "500",
                  paddingTop: "10px",
                  textAlign: "center",
                }}
              >
                Phí tạo bộ sưu tập là 999.000đ. Bạn có đồng ý để tiếp tục tạo bộ
                sưu tập ?
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
                    marginRight: 10,
                    width: 100,
                  }}
                  onClick={() => {
                    setModalBuyingFree(false);
                    setDeletingItemId(null);
                  }}
                >
                  Hủy bỏ
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
                    width: 100,
                  }}
                  onClick={() => {
                    setNewModal(true);
                  }}
                >
                  {" "}
                  {loadingBuyingFunc ? (
                    <span class="loaderNew"></span>
                  ) : (
                    "Tạo mới"
                  )}
                </Button>
              </div>
            </Box>
          </>
        )}
      </Modal>
      <Modal
        open={modalBuying}
        onClose={handleCloseModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <>
          {/* <Box sx={styleModalBuyingFreeNew}> */}
          <div className="ezpics-pro-modal" style={ezpicsProContainer}>
            <div
              className="container-modal-create"
              style={{
                animation: "fadeIn 0.5s ease-in-out",
                width: 1000,
                height: 300,
              }}
            >
              <div className="card---create-newing">
                <div className="card-image---create-newing-last">
                  <h2 className="card-heading---create-newing">
                    Sửa thông tin bộ sưu tập <br></br>
                    <small style={{ fontSize: 15 }}>
                      Hãy điền đầy đủ thông tin nhé
                    </small>
                  </h2>
                </div>

                <form className="card-form---create-newing">
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      width: "100%",
                    }}
                  >
                    <div
                      className="input---create-newing"
                      style={{ width: "50%" }}
                    >
                      {/* <input type="file" className="input-field" required accept="image/png, image/jpeg"/>
                       */}
                      <label className="input-label---create-newing">
                        Ảnh minh họa
                      </label>

                      {imgSrcImage ? (
                        <>
                          <div
                            style={{
                              maxHeight: 200,
                              width: "auto",
                              cursor: "pointer",
                              display: "flex",
                              justifyContent: "center",
                              position: "relative",
                            }}
                          >
                            <img
                              src={imgSrcImage}
                              style={{
                                maxHeight: 200,
                                width: "auto",
                                cursor: "pointer",
                              }}
                            />
                            <div
                              style={{
                                position: "absolute",
                                width: "100%",
                                height: 200,
                                backgroundColor: "rgba(0,0,0,0.7)",
                                borderRadius: 20,
                                transition: "opacity 0.3s",
                              }}
                              onMouseEnter={(e) => {
                                e.currentTarget.style.opacity = 1;
                              }}
                              onMouseLeave={(e) => {
                                e.currentTarget.style.opacity = 0;
                              }}
                            ><form
                          id="file-upload-form"
                          class="uploader"
                          style={{ marginTop: 40 }}
                        >
                          <input
                            id="file-upload"
                            type="file"
                            name="fileUpload"
                            accept="image/*"
                            onChange={handleFileChange}
                          />

                          <label
                            for="file-upload"
                            id="file-drag"
                            style={{ cursor: "pointer" }}
                          >
                            <img
                              id="file-image"
                              src="#"
                              alt="Preview"
                              class="hidden"
                            />
                            <div id="start---create-newing">
                              <img
                                src={downloadIcon}
                                alt=""
                                style={{
                                  width: 30,
                                  height: 30,
                                  alignSelf: "center",
                                  margin: "0 auto",
                                  marginBottom: "2%",
                                }}
                              />

                              {selectedFile !== null ? (
                                ""
                              ) : (
                                <div id="notimage" class="hidden">
                                  Hãy chọn ảnh
                                </div>
                              )}
                              <span
                                id="file-upload-btn"
                                class="btn btn-primary"
                              >
                                {selectedFile !== null
                                  ? "Chọn lại"
                                  : "Chọn ảnh"}
                              </span>
                            </div>
                            <div id="response" class="hidden">
                              <div id="messages"></div>
                              <progress
                                class="progress"
                                id="file-progress"
                                value="0"
                              >
                                <span>0</span>%
                              </progress>
                            </div>
                          </label>
                        </form></div>
                          </div>
                        </>
                      ) : (
                        <form
                          id="file-upload-form"
                          class="uploader"
                          style={{ marginTop: 40 }}
                        >
                          <input
                            id="file-upload"
                            type="file"
                            name="fileUpload"
                            accept="image/*"
                            onChange={handleFileChange}
                          />

                          <label
                            for="file-upload"
                            id="file-drag"
                            style={{ height: 200, cursor: "pointer" }}
                          >
                            <img
                              id="file-image"
                              src="#"
                              alt="Preview"
                              class="hidden"
                            />
                            <div id="start---create-newing">
                              <img
                                src={downloadIcon}
                                alt=""
                                style={{
                                  width: 30,
                                  height: 30,
                                  alignSelf: "center",
                                  margin: "0 auto",
                                  marginBottom: "2%",
                                }}
                              />

                              {selectedFile !== null ? (
                                ""
                              ) : (
                                <div id="notimage" class="hidden">
                                  Hãy chọn ảnh
                                </div>
                              )}
                              <span
                                id="file-upload-btn"
                                class="btn btn-primary"
                              >
                                {selectedFile !== null
                                  ? "Chọn lại"
                                  : "Chọn ảnh"}
                              </span>
                            </div>
                            <div id="response" class="hidden">
                              <div id="messages"></div>
                              <progress
                                class="progress"
                                id="file-progress"
                                value="0"
                              >
                                <span>0</span>%
                              </progress>
                            </div>
                          </label>
                        </form>
                      )}
                    </div>
                    <div
                      // className="input---create-newing"
                      style={{ width: "50%", paddingTop: 23 }}
                    >
                      <label style={{ marginLeft: 13 }}>Tên bộ sưu tập</label>
                      <input
                        style={{
                          marginLeft: 15,
                          marginTop: 5,
                          height: 35,
                          marginBottom: 15,
                        }}
                        value={nameCollection}
                        onChange={(e) => setNameCollection(e.target.value)}
                      />
                      <label style={{ marginLeft: 13 }}>Giá tiền</label>
                      <input
                        style={{
                          marginLeft: 15,
                          marginTop: 5,
                          height: 35,
                          marginBottom: 15,
                        }}
                        value={valueCollection}
                        onChange={(e) => setValueCollection(e.target.value)}
                      />
                      <label style={{ marginLeft: 13 }}>Số ngày sử dụng</label>
                      <input
                        style={{
                          marginLeft: 15,
                          marginTop: 5,
                          height: 35,
                          marginBottom: 15,
                        }}
                        value={dateCollection}
                        onChange={(e) => setDateCollection(e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="action---create-newing">
                    {imgSrcImage !== null &&
                    dateCollection !== "" &&
                    valueCollection !== "" &&
                    nameCollection !== "" ? (
                      <button
                        className="action-button---create-newing"
                        style={{
                          cursor: "pointer",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                        onClick={(e) => handleFixingCustomCollection(e)}
                      >
                        {loadingButtonModalCreate ? (
                          <span class="loader-create-film"></span>
                        ) : (
                          "Bắt đầu sửa "
                        )}
                      </button>
                    ) : (
                      <button
                        className="action-button---create-newing"
                        style={{ backgroundColor: "rgba(255, 66, 78,0.3)" }}
                        disabled
                      >
                        Bắt đầu tạo
                      </button>
                    )}
                  </div>
                </form>

                <img
                  src={xMark}
                  alt=""
                  style={{
                    width: 20,
                    height: 20,
                    marginRight: -30,
                    right: 0,
                    top: 0,
                    cursor: "pointer",
                    position: "absolute",
                  }}
                  onClick={() => {
                    setModalBuying(false);
                  }}
                />
              </div>
            </div>
          </div>
          {/* </Box> */}
        </>
      </Modal>
    </>
  );
}

export default SaleCollection;
