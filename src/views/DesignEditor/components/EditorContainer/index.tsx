import React from "react"
import { Block } from "baseui/block"
import axios from "axios";
import { confirmAlert } from "react-confirm-alert"; // Import
import "react-confirm-alert/src/react-confirm-alert.css"; // Import css
import { toast } from "react-toastify";

function getCookie(cname: any) {
  let name = cname + "=";
  let decodedCookie = decodeURIComponent(document.cookie);
  let ca = decodedCookie.split(";");
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) == " ") {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}

const options = {
  title: "Có mạng trở lại",
  message: "Bạn có muốn lưu dữ liệu cũ không ?",
  buttons: [
    {
      label: "Có",
      onClick: () => alert("Click Yes"),
    },
    {
      label: "Không",
      onClick: () => alert("Click No"),
    },
  ],
  closeOnEscape: true,
  closeOnClickOutside: true,
  keyCodeForClose: [8, 32],
  willUnmount: () => {},
  afterClose: () => {},
  onClickOutside: () => {},
  onKeypress: () => {},
  onKeypressEscape: () => {},
  overlayClassName: "overlay-custom-class-name",
};
const getValueOnline = async () => {
  let dataCookie = getCookie("data-ezpics");
  toast("Có mạng !! 🦄", {
    position: "top-left",
    autoClose: 2000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: false,
    draggable: true,
    progress: undefined,
    theme: "dark",
  });
  console.log(dataCookie == "");

  if (dataCookie === null) {
    toast("Dữ liệu trống", {
      position: "top-left",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });
  } else {
    const dataParsed = JSON.parse(dataCookie);
    console.log("Có dữ liệu" + dataParsed);
    confirmAlert(options);

    // const response = await axios.post()
  }
};
const handleOffline = () => {
  toast.error("Mất mạng, tự động lưu lịch sử chỉnh sửa vào bộ nhớ tạm", {
    position: "top-left",
    autoClose: 2000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: false,
    draggable: true,
    progress: undefined,
    theme: "dark",
  });
  document.cookie = `data-ezpics=${jsonString}`;
};
const data = "oke";
const jsonString = JSON.stringify(data);

window.addEventListener("online", () => getValueOnline());
window.addEventListener("offline", () => handleOffline());
export default function ({ children }: { children: React.ReactNode }) {
  return (
    <Block
      $style={{
        width: "100vw",
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        background: "#FFFFFF",
        fontFamily: "Uber Move Text",
      }}
    >
      {children}
    </Block>
  )
}
