import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Affiliate.css";
import gift from "./gift.png";
import { useSelector, useDispatch } from "react-redux";
import Button from "@mui/material/Button";
import { QRCodeSVG } from "qrcode.react";
import "./Table.scss";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import "./Table.scss";
import copy from 'copy-to-clipboard';
import { toast } from "react-toastify";

function Affiliate() {
  const network = useSelector((state) => state.ipv4.network);
  const [dataUser, setDataUser] = useState([]);
  const [dataAffiliate, setDataAffiliate] = useState([]);
  const [error, setError] = useState(false);
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
        setDataUser(response.data.data);
      }
    };
    getData();
  }, []);
  useEffect(() => {
    const getData = async () => {
      const response = await axios.post(`${network}/listUserGetAffsource`, {
        token: checkTokenCookie(),
      });
      if (response.data && response.data.code === 1) {
        setDataAffiliate(response.data.data);
      } else if (response.data && response.data.code === 2) {
        setError(true);
      }
    };
    getData();
  }, []);
  return (
    <div
      style={{
        paddingTop: "7%",
        display: "flex",
        flexDirection: "column",
        minHeight: "100%",
        flex: 1,
        paddingTop: "6%",
        paddingRight: "2%",
        paddingLeft: "19%",
      }}
    >
      {" "}
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          paddingLeft: "5%",
          paddingRight: "5%",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column" }}>
          <p className="affiliate-title">
            Giới thiệu cho bạn bè, nhận phần thưởng
          </p>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <div style={{ maxWidth: 380 }}>
              <p className="affiliate-description">
                Khi bạn bè của bạn tham gia Ezpics và tạo thiết kế, cả hai bạn sẽ
                được chọn một trong những ảnh, biểu tượng hoặc hình minh họa cao
                cấp của chúng tôi (ngoài ra, hai bạn có thể cộng tác để cùng
                nhau tạo thiết kế!)
              </p>
            </div>
            <img
              src={gift}
              style={{ width: 100, height: 100, marginLeft: 30 }}
            />
          </div>
          <div
            style={{
              width: 500,
              height: 60,
              backgroundColor: "rgb(244, 244, 246)",
              marginTop: 20,
              border: "2px solid rgb(216, 219, 223)",
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              paddingLeft: 10,
              justifyContent: "space-between",
            }}
          >
            {dataUser && <p style={{}}>{dataUser.link_affiliate}</p>}
            {/* {dataUser && <div style={{}}>{dataUser.link_affiliate}</div>} */}

            <Button
              variant="contained"
              size="medium"
              style={{
                height: 40,
                textTransform: "none",
                color: "white",
                backgroundColor: "rgb(255, 66, 78)",
                marginRight: 10,
              }}
              onClick={() => {
                copy(dataUser.link_affiliate);
                toast.success("Copy link thành công !! 🦄", {
          position: "top-right",
          autoClose: 1000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
              }}
            >
              Sao chép
            </Button>
          </div>
        </div>
        <div
          style={{
            paddingRight: "10%",
            paddingTop: "5%",
            position: "relative",
          }}
        >
          <img src={dataUser.link_codeQR} style={{ width: 200, height: 200 }} />
          <p
            style={{
              margin: 0,
              marginTop: 10,
              textAlign: "center",
              color: "black",
              fontWeight: "600",
            }}
          >
            {dataUser.name}
          </p>
        </div>
      </div>

      <p
        style={{
          margin: 0,
          marginTop: 10,
          color: "black",
          fontWeight: "600",
          paddingTop: 20,
        }}
      >
        Những người được bạn giới thiệu
      </p>
      <TableContainer component={Paper} className="table">
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell className="tableCell">Số thứ tự</TableCell>
              <TableCell className="tableCell">
                Tên người được giới thiệu
              </TableCell>

              <TableCell className="tableCell">Email</TableCell>
              <TableCell className="tableCell">Số điện thoại</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {error ? (
              <p style={{ textAlign: "center", fontWeight: "600" }}>
                Không có dữ liệu
              </p>
            ) : (
              dataAffiliate.map((row) => (
                <TableRow key={row.id}>
                  <TableCell className="tableCell">{row.id}</TableCell>

                  <TableCell className="tableCell">{row.name}</TableCell>

                  <TableCell className="tableCell">{row.email}</TableCell>
                  <TableCell className="tableCell">{row.phone}</TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}

export default Affiliate;
