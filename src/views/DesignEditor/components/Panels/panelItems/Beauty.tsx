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
import { useAppDispatch, useAppSelector } from "~/hooks/hook";
import useAppContext from "~/hooks/useAppContext";
export default function () {
  const { currentDesign, setCurrentDesign } = useDesignEditorContext();

  const [data, setData] = useState<any>(null);
  const [templates, setTemplates] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const token = useAppSelector((state) => state.token.token);
  const network = useAppSelector((state) => state.network.ipv4Address);
  const { setActiveSubMenu } = useAppContext();

  useEffect(() => {
    setIsLoading(true);
    async function fetchData() {
      try {
        const response = await axios.post<any>(`${network}/listIngredientAPI`, {
          token: token,
        });
        setTemplates(response.data.data);
        console.log(response.data.data);
        setIsLoading(false);
      } catch (error) {
        console.error("Lỗi khi gửi yêu cầu GET:", error);
        setIsLoading(false);
      }
    }

    fetchData();
  }, []);
  const editor = useEditor();
  const setIsSidebarOpen = useSetIsSidebarOpen();
  const { setCurrentScene, currentScene } = useDesignEditorContext();

  // const loadTemplate = React.useCallback(
  //   async (template: any) => {
  //     if (editor) {
  //       const fonts: any[] = [];
  //       template.layers.forEach((object: any) => {
  //         if (object.type === "StaticText" || object.type === "DynamicText") {
  //           fonts.push({
  //             name: object.fontFamily,
  //             url: object.fontURL,
  //             options: { style: "normal", weight: 400 },
  //           });
  //         } else if (object.type === "StaticImage") {
  //           const image = new Image();
  //           image.src = object.src;
  //           const brightnessValue = object.brightness;
  //           image.onload = () => {
  //                           image.style.filter = `-moz-filter: brightness(50%);`;

  //             image.style.filter = `brightness(${200}%)`;

  //             image.style.filter = `-webkit-filter: brightness(200%);`;

  //             console.log(image);
  //                                 image.style.borderRadius = '50%';

  //           };

  //         }
  //       });
  //       const filteredFonts = fonts.filter((f) => !!f.url);
  //       if (filteredFonts.length > 0) {
  //         await loadFonts(filteredFonts);
  //       }

  //       setCurrentScene({ ...template, id: currentScene?.id });
  //     }
  //   },
  //   [editor, currentScene]
  // );
  const addObject = React.useCallback(
    (url: string) => {
      if (editor) {
        console.log(url);

        var img = new Image();
        img.src = url;
        img.onload = function () {
          const options = {
            type: "StaticImage",
            src: url,
            width: img.naturalWidth,
            height: img.naturalHeight,
            lock: false,
          };

          editor.objects.add(options);
          console.log(img.naturalWidth, img.naturalHeight);
        };
      }
    },
    [editor]
  );

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
              Thành phần
            </h4>
          </Block>

          <Block
            onClick={() => setActiveSubMenu("Graphics")}
            $style={{ cursor: "pointer", display: "flex" }}
          >
            <AngleDoubleLeft size={18} />
          </Block>
        </Block>
        <Scrollable>
          <div style={{ padding: "0 1.5rem" }}>
            <div
              style={{
                display: "flex",
                paddingBottom: "10px",
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <h4 style={{ fontFamily: "Helvetica, Arial, sans-serif" }}>
                Người mẫu
              </h4>
            </div>
            <div
              style={{
                display: "grid",
                gap: "0.5rem",
                gridTemplateColumns: "1fr 1fr",
              }}
            >
              {templates
                .filter((item) => item.keyword === "Mẫu Beauty")
                .map((item, index) => (
                  <ImageItem
                    onClick={() => addObject(item.image)}
                    key={index}
                    preview={`${item.image}`}
                  />
                ))}
            </div>
          </div>
        </Scrollable>
      </Block>
      {isLoading && (
        <div className="loadingio-spinner-dual-ring-hz44svgc0ld">
          <div className="ldio-4qpid53rus9">
            <div></div>
            <div>
              <div></div>
            </div>
          </div>
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
