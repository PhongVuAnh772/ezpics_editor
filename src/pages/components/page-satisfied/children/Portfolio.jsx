import React,{useState,useEffect} from 'react'
import axios from 'axios'
import { useSelector, useDispatch } from "react-redux";

function Portfolio() {
  const [dataImage,setDataImage] =useState('')
    const network = useSelector((state) => state.ipv4.network);
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
        setDataImage(response.data.data?.certificate);
      }
    };
    getData();
  }, []);
  return (
    <div style={{width: '100%',height:'100%',borderRadius: 10,paddingLeft: 10,paddingRight: 10}}>
      <img style={{width:'100%',height:'100%',}} alt="" src={dataImage}/>
    </div>
  )
}

export default Portfolio