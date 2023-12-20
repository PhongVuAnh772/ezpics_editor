import "./Widget.scss";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import AccountBalanceWalletOutlinedIcon from "@mui/icons-material/AccountBalanceWalletOutlined";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import MonetizationOnOutlinedIcon from "@mui/icons-material/MonetizationOnOutlined";
import {
  BrowserRouter as Router,
  Route,
  Link,
  Routes,
  useLocation,
  Outlet,
  useOutletContext,
  useNavigate,
  Navigate,
  useParams,
} from "react-router-dom";
const Widget = ({ type }) => {
  let data;
    const navigate = useNavigate();

  const min = 10;
  const max = 99;
const minSold = 0;
  const maxSold = 4;
  const amount = Math.floor(Math.random() * (max - min + 1)) + min;
    const sold = Math.floor(Math.random() * (maxSold - minSold + 1)) + minSold;

  //temporary
  const diff = 20;

  switch (type) {
    case "user":
      data = {
        title: "Số lượng giao dịch",
        isMoney: false,
        link: "Xem thêm",
        icon: (
          <PersonOutlinedIcon
            className="icon"
            style={{
              color: "crimson",
              backgroundColor: "rgba(255, 0, 0, 0.2)",
            }}
          />
        ),
      };
      break;
    case "order":
      data = {
        title: "Đã mua trong tuần",
        isMoney: false,
        link: "Xem thêm",
        icon: (
          <ShoppingCartOutlinedIcon
            className="icon"
            style={{
              backgroundColor: "rgba(218, 165, 32, 0.2)",
              color: "goldenrod",
            }}
          />
        ),
      };
      break;
    case "earning":
      data = {
        title: "Đã bán trong tuần",
        isMoney: false,
        link: "Xem thêm",
        icon: (
          <MonetizationOnOutlinedIcon
            className="icon"
            style={{ backgroundColor: "rgba(0, 128, 0, 0.2)", color: "green" }}
          />
        ),
      };
      break;
    case "balance":
      data = {
        title: "BALANCE",
        isMoney: true,
        link: "See details",
        icon: (
          <AccountBalanceWalletOutlinedIcon
            className="icon"
            style={{
              backgroundColor: "rgba(128, 0, 128, 0.2)",
              color: "purple",
            }}
          />
        ),
      };
      break;
    default:
      break;
  }

  return (
    <div className="widget">
      <div className="left">
        <span className="title">{data.title}</span>
        <span className="counter">
          {data.isMoney && "$"} {type === 'earning' ? sold : amount}
        </span>
        <span className="link" onClick={()=> navigate('/your-design/purchase-form')}>{data.link}</span>
      </div>
      <div className="right">
        <div className="percentage positive">
          <KeyboardArrowUpIcon style={{color: 'rgb(255, 66, 78)'}}/>
        </div>
        {data.icon}
        
      </div>
    </div>
  );
};

export default Widget;