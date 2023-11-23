import React from "react";
import { Block } from "baseui/block";
import AngleDoubleLeft from "~/components/Icons/AngleDoubleLeft";
import Scrollable from "~/components/Scrollable";
import { Button, SIZE } from "baseui/button";
import DropZone from "~/components/Dropzone";
import { useEditor } from "@layerhub-io/react";
import useSetIsSidebarOpen from "~/hooks/useSetIsSidebarOpen";
import { nanoid } from "nanoid";
import { toast } from "react-toastify";
import { useAppDispatch, useAppSelector } from "~/hooks/hook";
import axios from "axios";
import "../../../../../components/Loading/Initial.css";
import { NavLink } from "react-router-dom";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import "./imageInput.css";
import { FontItem } from "~/interfaces/common";
import { loadFonts } from "~/utils/fonts";
import { IStaticText } from "@layerhub-io/types";
import "../../../../../../src/views/DesignEditor/components/Preview/newloading.css";
interface Tab {
  id: number;
  name: string;
  content: string;
}
export default function () {
  const inputFileRef = React.useRef<HTMLInputElement>(null);
  const [uploads, setUploads] = React.useState<any[]>([]);
  const network = useAppSelector((state) => state.network.ipv4Address);
  const editor = useEditor();
  const setIsSidebarOpen = useSetIsSidebarOpen();
  const idProduct = useAppSelector((state) => state.token.id);
  const token = useAppSelector((state) => state.token.token);
  const [loading, setLoading] = React.useState(false);
  const [nameTextVariable, setNameTextVariable] = React.useState("");
  const [nameTextLabel, setNameTextLabel] = React.useState("");
  const [nameImageVariable, setNameImageVariable] = React.useState("");
  const [nameImageLabel, setNameImageLabel] = React.useState("");
  const [contentTextVariable, setContentTextVariable] = React.useState("");
  const [selectedOption, setSelectedOption] = React.useState("");
  const addObjectImage = React.useCallback(
    (res: any,string1:any,string2:any) => {
      console.log("chạy hàm image added");
      if (editor) {
        const options = {
          id: res.data.data.id,
          type: "StaticImage",
          src: res.data?.data?.content?.banner,
          // width: 206,
          // height: 206,
          metadata: {
            naturalWidth: 206,
            naturalHeight: 206,
            initialHeight: 206,
            initialWidth: 206,

            lock: false,
            variable: string1,
            variableLabel: string2,
          },
        };
        editor.objects.add(options);
        console.log(options);
      }
    },
    [editor]
  );
  const options = [
    { value: "", label: "Chọn trạng thái" },
    { value: "0", label: "Mặc định" },
    { value: "1", label: "Viết hoa hết" },
    { value: "2", label: "Viết thường hết" },
  ];
  // const []
  const addObject = async () => {
    if (nameImageVariable === "" || nameImageLabel === "") {
      toast.error("Các trường bị thiếu, hãy thử lại", {
        position: "top-left",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    } else {
      setLoading(true);
      console.log(nameImageVariable,nameImageLabel)
      const res = await axios.post(
        `${network}/addLayerImageUrlAPI`,
        {
          idproduct: idProduct,
          token: token,
          imageUrl:
            "https://apis.ezpics.vn/plugins/ezpics_api/view/image/default-thumbnail-vuong.jpg",
        },
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log(res);

      if (res.data.code === 1) {
        addObjectImage(res,nameImageVariable,nameImageLabel);
        setLoading(false);
      }
    }
  };

  const addObjectText = async () => {
    if (
      selectedOption === "" ||
      nameTextLabel === "" ||
      contentTextVariable === "" ||
      nameTextVariable === ""
    ) {
      toast.error("Các trường bị thiếu, hãy thử lại", {
        position: "top-left",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    } else {
      setLoading(true);
      if (editor) {
        const font: FontItem = {
          name: "Helve",
          url: "https://apis.ezpics.vn/upload/admin/fonts/UTMHelve.woff",
        };
        await loadFonts([font]);
        const res = await axios.post(`${network}/addLayerText`, {
          idproduct: idProduct,
          token: token,
          text: contentTextVariable,
          color: "#333333",
          size: 92,
          font: font.name,
        });
        if (res.data.code === 1) {
          console.log(res.data);
          const options = {
            id: res.data.data.id,
            type: "StaticText",
            width: 420,
            text: contentTextVariable,
            fontSize: 92,
            fontFamily: font.name,
            textAlign: "center",
            fontStyle: "normal",
            fontURL: font.url,
            fill: "#000000",
            metadata: {
              variable: nameTextVariable,
              variableLabel: nameTextLabel,
              lock: false,
              uppercase: contentTextVariable,
            },
          };
          console.log(nameTextVariable,nameTextLabel);
          editor.objects.add<IStaticText>(options);
          setLoading(false);
        } else {
          setLoading(false);
          toast.error("Có lỗi khi tạo mới biến chữ", {
            position: "top-left",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
          });
        }
      }
    }
  };
  const handleDropFiles = async (files: FileList) => {
    setLoading(true);
    const file = files[0];
    const url = URL.createObjectURL(file);
    // let blob = await fetch(url).then(r => r.blob());
    // Kiểm tra đuôi file
    if (!/(png|jpg|jpeg)$/i.test(file.name)) {
      toast.error("Chỉ chấp nhận file png, jpg hoặc jpeg");
      // setLoading(false);

      return;
    }

    const res = await axios.post(
      `${network}/addLayerImageAPI`,
      {
        idproduct: idProduct,
        token: token,
        file: file,
      },
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    console.log(res);
    console.log(files);

    if (res.data.code === 1) {
      const upload = {
        id: res.data.data.id,
        url: res.data.data.content.banner,
      };
      setUploads([...uploads, upload]);
      const options = {
        type: "StaticImage",
        src: res.data.data.content.banner,
        id: res.data.data.id,
      };
      editor.objects.add(options);
      setLoading(false);
    }
  };

  const handleInputFileRefClick = () => {
    inputFileRef.current?.click();
  };
  const generateTabs = (): Tab[] => [
    { id: 1, name: "Tab 1", content: "This is content for Tab 1" },
    { id: 2, name: "Tab 2", content: "This is content for Tab 2" },
    { id: 3, name: "Tab 3", content: "This is content for Tab 3" },
  ];
  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    handleDropFiles(e.target.files!);
  };

  const addImageToCanvas = (url: string) => {
    const options = {
      type: "StaticImage",
      src: url,
    };
    editor.objects.add(options);
  };
  return (
      <Block
        $style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          position: "relative",
        }}
      >
        <Block
          $style={{
            display: "flex",
            alignItems: "center",
            fontWeight: 500,
            justifyContent: "space-between",
            paddingLeft: "1.5rem",
            paddingRight: "1.5rem",
          }}
        >
          <Block style={{}}>
            <h4 style={{ fontFamily: "Helvetica, Arial, sans-serif" }}>
              Mẫu in hàng loạt
            </h4>
          </Block>

          <Block
            onClick={() => setIsSidebarOpen(false)}
            $style={{ cursor: "pointer", display: "flex" }}
          >
            <AngleDoubleLeft size={18} />
          </Block>
        </Block>
        <Scrollable>
          <Block padding={"0 1.5rem"}>
            <div style={{}}>
              <Tabs forceRenderTabPanel defaultIndex={1}>
                <TabList
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    width: "100%",
                  }}
                >
                  <Tab
                    style={{
                      flex: 1,
                      height: 50,
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <h4 style={{ fontFamily: "Arial", textAlign: "center" }}>
                      Biến chữ
                    </h4>
                  </Tab>
                  <Tab
                    style={{
                      flex: 1,
                      height: 50,
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <h4 style={{ fontFamily: "Arial", textAlign: "center" }}>
                      Biến ảnh
                    </h4>
                  </Tab>
                </TabList>
                <TabPanel>
                  <div className="input-group">
                    <h4 style={{ fontFamily: "Arial" }}>Biến chữ</h4>
                    <p style={{ fontFamily: "Arial" }}>
                      Tên trường dữ liệu biến chữ
                    </p>

                    <input
                      type="text"
                      onChange={(e) => setNameTextLabel(e.target.value)}
                      placeholder="Tên trường dữ liệu biến chữ"
                    />
                  </div>
                  <div className="input-group">
                    <p style={{ fontFamily: "Arial" }}>Tên biến chữ</p>

                    <input
                      type="text"
                      onChange={(e) => setNameTextVariable(e.target.value)}
                      onBlur={(e) =>
                        e.target.value === ""
                          ? setContentTextVariable(``)
                          : setContentTextVariable(`%${e.target.value}%`)
                      }
                      placeholder="Tên biến chữ"
                    />
                  </div>
                  <div className="input-group">
                    <p style={{ fontFamily: "Arial" }}>Nội dung chữ</p>

                    <input
                      type="text"
                      value={contentTextVariable}
                      onChange={(e) => setContentTextVariable(e.target.value)}
                      placeholder="Nội dung chữ"
                    />
                  </div>
                  <div className="input-group">
                    <p style={{ fontFamily: "Arial" }}>Kiểu định dạng chữ</p>

                    <select
                      value={selectedOption}
                      onChange={(e) => setSelectedOption(e.target.value)}
                      style={{ width: "100%", height: "auto" }}
                    >
                      {options.map((option) => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                  </div>

                  <Button
                    onClick={() => addObjectText()}
                    size={SIZE.compact}
                    overrides={{
                      Root: {
                        style: {
                          width: "100%",
                          marginBottom: "30px",
                        },
                      },
                    }}
                  >
                    Tạo biến chữ
                  </Button>
                </TabPanel>
                <TabPanel>
                  <div className="input-group">
                    <h4 style={{ fontFamily: "Arial" }}>Biến ảnh</h4>
                    <p style={{ fontFamily: "Arial" }}>
                      Tên trường dữ liệu biến ảnh
                    </p>

                    <input
                      type="text"
                      // value={name}
                      onChange={(e) => setNameImageLabel(e.target.value)}
                      placeholder="Tên trường dữ liệu biến ảnh"
                    />
                  </div>
                  <div className="input-group">
                    <p style={{ fontFamily: "Arial" }}>Tên biến ảnh</p>

                    <input
                      type="text"
                      // value={description}
                      onChange={(e) => setNameImageVariable(e.target.value)}
                      placeholder="Tên biến ảnh"
                    />
                  </div>

                  <Button
                    onClick={() => addObject()}
                    size={SIZE.compact}
                    overrides={{
                      Root: {
                        style: {
                          width: "100%",
                          marginBottom: "30px",
                        },
                      },
                    }}
                  >
                    Tạo biến ảnh
                  </Button>
                </TabPanel>
              </Tabs>
            </div>
          </Block>
        </Scrollable>
        {loading && (
                  <div style={{width: '100%',height: '100%',backgroundColor: 'rgba(0,0,0,0.7)',position: 'absolute',zIndex: 20000000000}}>

          <div className="loadingio-spinner-dual-ring-hz44svgc0ld2">
            <div className="ldio-4qpid53rus9">
              <div></div>
              <div>
                <div></div>
              </div>
            </div>
            <img
              style={{
                position: "absolute",
                top: "12%",
                left: "16%",
                width: 40,
                height: 40,
              }}
              src="https://ezpics.vn/wp-content/uploads/2023/05/LOGO-EZPICS-300.png"
            />
          </div>
          </div>
        )}
      </Block>
  );
}
