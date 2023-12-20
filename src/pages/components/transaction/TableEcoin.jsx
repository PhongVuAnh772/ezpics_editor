import { React, useState, useEffect } from "react";
import "./Table.scss";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";

const TableEcoin = () => {
  const network = useSelector((state) => state.ipv4.network);
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
  const rows = [
    {
      id: 1143155,
      product: "Acer Nitro 5",
      img: "https://m.media-amazon.com/images/I/81bc8mA3nKL._AC_UY327_FMwebp_QL65_.jpg",
      customer: "John Smith",
      date: "1 March",
      amount: 785,
      method: "Cash on Delivery",
      status: "Approved",
    },
    {
      id: 2235235,
      product: "Playstation 5",
      img: "https://m.media-amazon.com/images/I/31JaiPXYI8L._AC_UY327_FMwebp_QL65_.jpg",
      customer: "Michael Doe",
      date: "1 March",
      amount: 900,
      method: "Online Payment",
      status: "Pending",
    },
    {
      id: 2342353,
      product: "Redragon S101",
      img: "https://m.media-amazon.com/images/I/71kr3WAj1FL._AC_UY327_FMwebp_QL65_.jpg",
      customer: "John Smith",
      date: "1 March",
      amount: 35,
      method: "Cash on Delivery",
      status: "Pending",
    },
    {
      id: 2357741,
      product: "Razer Blade 15",
      img: "https://m.media-amazon.com/images/I/71wF7YDIQkL._AC_UY327_FMwebp_QL65_.jpg",
      customer: "Jane Smith",
      date: "1 March",
      amount: 920,
      method: "Online",
      status: "Approved",
    },
    {
      id: 2342355,
      product: "ASUS ROG Strix",
      img: "https://m.media-amazon.com/images/I/81hH5vK-MCL._AC_UY327_FMwebp_QL65_.jpg",
      customer: "Harold Carol",
      date: "1 March",
      amount: 2000,
      method: "Online",
      status: "Pending",
    },
  ];
  function formatDateString(dateString) {
    const dateObject = new Date(dateString);

    const options = {
      year: "numeric",
      month: "numeric",
      day: "numeric",
    };

    const formatter = new Intl.DateTimeFormat("en-US", options);
    const formattedString = formatter.format(dateObject);

    return formattedString;
  }
  const [data, setData] = useState([]);
  useEffect(() => {
    const getDataUser = async () => {
      const response = await axios.post(`${network}/getHistoryTransactionEcoinAPI`, {
        page: 1,
        token: checkTokenCookie(),
        type: 1
      });
      if (response && response.data.listData) {
        setData(response.data.listData);
      }
    };
    getDataUser();
  }, []);
  const handleType = (type) => {
    if (type === 0) {
      return 'Mua hàng'
    }
    else if (type === 1) {
      return 'Nạp tiền'
    }else if (type === 2) {
      return 'Rút tiền'
    }else if (type === 3) {
      return 'bán được hàng'
    }else if (type === 4) {
      return 'Xóa ảnh nền'
    }else if (type === 5) {
      return 'Chiết khấu'
    }else if (type === 6) {
      return 'Tạo nội dung'
    }else if (type === 7) {
      return 'Mua kho mẫu thiết kế'
    }else if (type === 8) {
      return 'Bán kho mẫu thiết kế'
    }else if (type === 9) {
      return 'Nâng cấp bản pro'
    }else if (type === 10) {
      return 'Tạo kho'
    }
  }
  return (
    <TableContainer component={Paper} className="table">
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell className="tableCell">Số thứ tự</TableCell>
            <TableCell className="tableCell">Kiểu giao dịch</TableCell>

            <TableCell className="tableCell">Ngày giao dịch</TableCell>
            <TableCell className="tableCell">Trạng thái</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row) => (
            <TableRow key={row.id}>
              <TableCell className="tableCell">{row.id}</TableCell>

              <TableCell className="tableCell">{handleType(row.type)}</TableCell>

              
              <TableCell className="tableCell">
                {formatDateString(row.created_at)}
              </TableCell>

              <TableCell className="tableCell">
                <span className={`status Approved`}>
                  {row.status === 1 ? "Đang chờ" : "Hoàn thành"}
                </span>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default TableEcoin;
