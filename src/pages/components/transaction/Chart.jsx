import { React, useState, useEffect } from "react";

import "./chart.scss";
import {
  AreaChart,
  Area,
  XAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";

const data = [
  { name: "Tháng 1", Tổng: 2 },
  { name: "Tháng 2", Tổng: 4 },
  { name: "Tháng 3", Tổng: 4 },
  { name: "Tháng 4", Tổng: 5 },
  { name: "Tháng 5", Tổng: 6 },
  { name: "Tháng 6", Tổng: 7 },
  { name: "Tháng 7", Tổng: 8 },
  { name: "Tháng 8", Tổng: 4 },
  { name: "Tháng 9", Tổng: 3 },
  { name: "Tháng 10", Tổng: 5 },
  { name: "Tháng 11", Tổng: 5 },
  { name: "Tháng 12", Tổng: 6 },
];

const Chart = ({ aspect, title }) => {
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
  const [datas, setData] = useState([]);
  useEffect(() => {
    const getDataUser = async () => {
      const response = await axios.post(`${network}/getHistoryTransactionAPI`, {
        page: 1,
        token: checkTokenCookie(),
      });
      if (response && response.data.listData) {
        setData(response.data.listData);
      }
    };
    getDataUser();
  }, []);
  return (
    <div className="chart">
      <div className="title">{title}</div>
      <ResponsiveContainer width="100%" aspect={aspect}>
        <AreaChart
          width={730}
          height={250}
          data={data}
          margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
        >
          <defs>
            <linearGradient id="total" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="rgb(255, 66, 78)" stopOpacity={0.8} />
              <stop offset="95%" stopColor="rgb(255, 66, 78)" stopOpacity={0} />
            </linearGradient>
          </defs>
          <XAxis dataKey="name" stroke="gray" />
          <CartesianGrid strokeDasharray="3 3" className="chartGrid" />
          <Tooltip />
          <Area
            type="monotone"
            dataKey="Tổng"
            stroke="rgb(255, 66, 78)"
            fillOpacity={1}
            fill="url(#total)"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default Chart;
