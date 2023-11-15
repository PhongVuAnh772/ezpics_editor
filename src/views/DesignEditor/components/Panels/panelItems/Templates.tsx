import React, { useEffect, useState } from "react";
import { useEditor } from "@layerhub-io/react";
import { Block } from "baseui/block";
import { loadFonts } from "~/utils/fonts";
import Scrollable from "~/components/Scrollable";
import AngleDoubleLeft from "~/components/Icons/AngleDoubleLeft";
import { useStyletron } from "baseui";
import { SAMPLE_TEMPLATES } from "~/constants/editor";
import useSetIsSidebarOpen from "~/hooks/useSetIsSidebarOpen";
import useDesignEditorContext from "~/hooks/useDesignEditorContext";
import useEditorType from "~/hooks/useEditorType";
import { loadVideoEditorAssets } from "~/utils/video";
import axios from "axios";
import { toast } from "react-toastify";
import { useAppDispatch, useAppSelector } from "~/hooks/hook";
import { Button, SIZE } from "baseui/button";
import "../../Preview/newloading.css";

export default function () {
  const inputFileRef = React.useRef<HTMLInputElement>(null);
  const [uploads, setUploads] = React.useState<any[]>([]);
  const { currentDesign, setCurrentDesign } = useDesignEditorContext();
  const dispatch = useAppDispatch();
  const network = useAppSelector((state) => state.network.ipv4Address);
  const token = useAppSelector((state) => state.token.token);
  const [data, setData] = useState<any>(null);
  const [templates, setTemplates] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [loading, setLoading] = React.useState(false);

  const handleDropFiles = async (files: FileList) => {
    setLoading(true);
    const file = files[0];
    const url = URL.createObjectURL(file);
    // let blob = await fetch(url).then(r => r.blob());
    // Kiểm tra đuôi file
    if (!/(png|jpg|jpeg)$/i.test(file.name)) {
      toast.error("Chỉ chấp nhận file png, jpg hoặc jpeg");
      setLoading(false);

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

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    handleDropFiles(e.target.files!);
  };
  useEffect(() => {
    setIsLoading(true);
        setLoading(true);

    async function fetchData() {
      
      try {
        const response = await axios.post<any>(`${network}/listImage`, {
          token: token,
        });
        setTemplates(response.data.data);
        console.log(response.data.data);
        setIsLoading(false);
            setLoading(false);

      } catch (error) {
        console.error("Lỗi khi gửi yêu cầu GET:", error);
            setLoading(false);

      }
    }

    fetchData();
  }, []);
  const editor = useEditor();
  const setIsSidebarOpen = useSetIsSidebarOpen();
  const { setCurrentScene, currentScene } = useDesignEditorContext();
  const idProduct = useAppSelector((state) => state.token.id);
  const handleImage = async (item: any) => {
    const res = await axios.post(
      `${network}/addLayerImageUrlAPI`,
      {
        idproduct: idProduct,
        token: token,
        imageUrl: item.link,
      },
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    console.log(res.data);

    if (res.data.code === 1) {
      const upload = {
        id: res.data.data.id,
        url: res.data.data.content.banner,
      };

      const options = {
        type: "StaticImage",
        src: res.data.data.content.banner,
        id: res.data.data.id,
      };
      // editor.objects.add(options);
      addObject(item.link, item.width, item.height);
    }
  };
  const addObject = React.useCallback(
    (url: string, width: string, height: string) => {
      if (editor) {
        const options = {
          type: "StaticImage",
          src: url,
          width: width,
          height: height,
          lock: true,
        };
        editor.objects.add(options);
        //   editor.frame.resize({
        //   width: parseInt(width),
        //   height: parseInt(height),
        // })
        // setCurrentDesign({
        //   ...currentDesign,
        //   frame: {
        //     width: parseInt(width),
        //     height: parseInt(height),
        //   },
        // })
      }
    },
    [editor]
  );
  const addImageToCanvas = (url: string) => {
    const options = {
      type: "StaticImage",
      src: url,
    };
    editor.objects.add(options);
  };
  return (
    <>
      <Block $style={{ flex: 1, display: "flex", flexDirection: "column" }}>
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
          <Block>
            <h4 style={{ fontFamily: "Helvetica, Arial, sans-serif" }}>
              Tải ảnh lên
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
            <Button
              onClick={handleInputFileRefClick}
              size={SIZE.compact}
              overrides={{
                Root: {
                  style: {
                    width: "100%",
                  },
                },
              }}
            >
              Chọn từ máy tính
            </Button>
            <input
              onChange={handleFileInput}
              type="file"
              id="file"
              ref={inputFileRef}
              style={{ display: "none" }}
            />

            <div
              style={{
                marginTop: "1rem",
                display: "grid",
                gap: "0.5rem",
                gridTemplateColumns: "1fr 1fr",
              }}
            >
              {uploads.map((upload) => (
                <div
                  key={upload.id}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    cursor: "pointer",
                  }}
                  onClick={() => addImageToCanvas(upload.url)}
                >
                  <div>
                    <img width="100%" src={upload.url} alt="preview" />
                  </div>
                </div>
              ))}
            </div>
          </Block>
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
            <Block>
              <h4 style={{ fontFamily: "Helvetica, Arial, sans-serif" }}>
                Ảnh bạn đã tải
              </h4>
            </Block>
          </Block>
          <div style={{ padding: "0 1.5rem" }}>
            <div
              style={{
                display: "grid",
                gap: "0.5rem",
                gridTemplateColumns: "1fr 1fr",
              }}
            >
              {/* {templates.map((item, index) => {
              return (
                <ImageItem
                  onClick={() => loadTemplate(item)}
                  key={index}
                  preview={`${item.thumbnail}`}
                />
              );
            })} */}
              {templates.map((item, index) => {
                return (
                  <ImageItem
                    onClick={() => handleImage(item)}
                    key={index}
                    preview={`${item.link}`}
                  />
                );
              })}
            </div>
          </div>
        </Scrollable>
      </Block>
      {loading && (
        <div className="loadingio-spinner-dual-ring-hz44svgc0ld">
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
      )}
    </>
  );
}

function ImageItem({
  preview,
  onClick,
}: {
  preview: any;
  onClick?: (option: any) => void;
}) {
  const [css] = useStyletron();
  return (
    <div
      onClick={onClick}
      className={css({
        position: "relative",
        background: "#f8f8fb",
        cursor: "pointer",
        borderRadius: "8px",
        overflow: "hidden",
        "::before:hover": {
          opacity: 1,
        },
      })}
    >
      <div
        className={css({
          backgroundImage: `linear-gradient(to bottom,
          rgba(0, 0, 0, 0) 0,
          rgba(0, 0, 0, 0.006) 8.1%,
          rgba(0, 0, 0, 0.022) 15.5%,
          rgba(0, 0, 0, 0.047) 22.5%,
          rgba(0, 0, 0, 0.079) 29%,
          rgba(0, 0, 0, 0.117) 35.3%,
          rgba(0, 0, 0, 0.158) 41.2%,
          rgba(0, 0, 0, 0.203) 47.1%,
          rgba(0, 0, 0, 0.247) 52.9%,
          rgba(0, 0, 0, 0.292) 58.8%,
          rgba(0, 0, 0, 0.333) 64.7%,
          rgba(0, 0, 0, 0.371) 71%,
          rgba(0, 0, 0, 0.403) 77.5%,
          rgba(0, 0, 0, 0.428) 84.5%,
          rgba(0, 0, 0, 0.444) 91.9%,
          rgba(0, 0, 0, 0.45) 100%)`,
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          opacity: 0,
          transition: "opacity 0.3s ease-in-out",
          height: "100%",
          width: "100%",
          ":hover": {
            opacity: 1,
          },
        })}
      ></div>
      <img
        src={preview}
        className={css({
          width: "100%",
          height: "100%",
          objectFit: "contain",
          pointerEvents: "none",
          verticalAlign: "middle",
        })}
      />
    </div>
  );
}
