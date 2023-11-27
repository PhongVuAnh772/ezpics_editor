import React, { useEffect } from "react";
import { Block } from "baseui/block";
import axios from "axios";
import { confirmAlert } from "react-confirm-alert"; // Import
import "react-confirm-alert/src/react-confirm-alert.css"; // Import css
import { toast } from "react-toastify";
import { useEditor } from "@layerhub-io/react";
import { useAppSelector } from "~/hooks/hook";
import { generateToServerSaving } from "~/api/gererateToServer";
import useDesignEditorContext from "~/hooks/useDesignEditorContext";
import "../../../../../src/components/Resizable/loading.css";
// window.addEventListener("online", () => getValueOnline());
// window.addEventListener("offline", () => handleOffline());
export default function ({ children }: { children: React.ReactNode }) {
  const editor = useEditor();
  const network = useAppSelector((state) => state.network.ipv4Address);
  const idProduct = useAppSelector((state) => state.token.id);
  const token = useAppSelector((state) => state.token.token);
  const {
    setCurrentScene,
    currentScene,
    scenes,
    currentDesign,
    setCurrentDesign,
  } = useDesignEditorContext();
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
  const handleSave = async () => {
    if (editor) {
      const retrievedData = localStorage.getItem("data-ezpics");
      if (retrievedData) {
        const dataParsed = JSON.parse(retrievedData);
        const template = editor.scene.exportToJSON();
        console.log(dataParsed);
        console.log(generateToServerSaving(dataParsed));
        try {
          const res = await axios.post(`${network}/addListLayerAPI`, {
            idProduct: idProduct,
            token: token,
            listLayer: JSON.stringify(generateToServerSaving(dataParsed)),
          });
          if (res.data.code === 1) {
            console.log(res);
            toast("Lưu mẫu thiết kế thành công !! 🦄", {
              position: "top-left",
              autoClose: 2000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: false,
              draggable: true,
              progress: undefined,
              theme: "dark",
            });
            document.cookie =
              "data-ezpics=; expires=Thu, 31 Dec 2099 23:59:59 GMT; path=/";
            localStorage.removeItem("data-ezpics");
          } else {
            toast.error("Lưu mẫu thiết kế thất bại !! 🦄", {
              position: "top-left",
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
          toast.error("Lưu mẫu thiết kế thất bại !! 🦄", {
            position: "top-left",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: true,
            progress: undefined,
            theme: "dark",
          });
          console.log(error);
        }
      }
    }
  };
  const loadTemplate = React.useCallback(
    async () => {
      if (editor) {
        const initial = editor.scene.exportToJSON();
        const template = JSON.parse(initial);

        const fonts: any[] = [];
        template.layers.forEach((object: any) => {
          if (object.type === "StaticText") {
            fonts.push({
              name: object.fontFamily,
              url: object.fontURL,
              // options: { style: "normal", weight: 400 },
            });
          }
        });
        // const filteredFonts = fonts.filter((f) => !!f.url);
        // if (filteredFonts.length > 0) {
        //   await loadFonts(filteredFonts);
        // }
        // setCurrentScene
        // setCurrentScene({ ...template, id: currentScene?.id });
        // scenes.push({ ...template, id: currentScene?.id });
        setCurrentScene({ ...template, id: currentScene?.id });
        // setCurrentDesign({...template, id: currentScene?.id });
      }
    },
    // editor,
    [scenes, currentScene, currentDesign]
  );

  const options = {
    title: "Có mạng trở lại",
    message: "Bạn có muốn lưu dữ liệu cũ không ?",
    buttons: [
      {
        label: "Có",
        onClick: async () => await handleSave(),
      },
      {
        label: "Không",
        onClick: async () => await loadTemplate(),
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
    const retrievedData = localStorage.getItem("data-ezpics");

    console.log(dataCookie == "");

    if (retrievedData === null) {
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
      const dataParsed = JSON.parse(retrievedData);
      console.log("Có dữ liệu" + dataParsed);
      confirmAlert(options);
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

      // const response = await axios.post()
    }
  };
  const handleOffline = () => {
    if (editor) {
      const template = editor.scene.exportToJSON();

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
      const jsonString = JSON.stringify(template);
      // const jsonString = "okkk";
      localStorage.setItem("data-ezpics", jsonString);

      console.log(jsonString);
      document.cookie = `data-ezpics=${jsonString}`;
    }
  };
  // const handleReload = (e) => {
  //   e.preventDefault();
  //   con
  // }
  useEffect(() => {
    window.addEventListener("online", getValueOnline);
    window.addEventListener("offline", handleOffline);
    // window.addEventListener("beforeunload", handleOffline);

    return () => {
      window.removeEventListener("online", getValueOnline);
    };
  }, [editor]);
  // window.addEventListener("beforeunload", (event) => {
  //   event.preventDefault();
  //   console.log("reset");
  // });
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
  );
}
