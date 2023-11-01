import Navbar from "./components/Navbar";
import Panels from "./components/Panels";
import Canvas from "./components/Canvas";
import Footer from "./components/Footer";
import Toolbox from "./components/Toolbox";
import EditorContainer from "./components/EditorContainer";
import Dashboard from "~/views/Dashboard";
import PresentationEditor from "./PresentationEditor";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useAppSelector } from "~/hooks/hook";
import { useEditor } from "@layerhub-io/react";
import { IDesign } from "~/interfaces/DesignEditor";
import { IScene } from "@layerhub-io/types";
import { loadVideoEditorAssets } from "~/utils/video";
import { loadTemplateFonts } from "~/utils/fonts";
import { v4 as uuidv4 } from "uuid";
import useDesignEditorContext from "~/hooks/useDesignEditorContext";
import { loadFonts } from "~/utils/fonts";
import { toast } from "react-toastify";
import { useAppDispatch } from "~/hooks/hook";
import { REPLACE_TOKEN, REPLACE_ID_USER } from "~/store/slices/token/reducers";
// import
function GraphicEditor() {
  const dispatch = useAppDispatch();
  const [commonFonts, setCommonFonts] = React.useState<any[]>([]);
  const [loadedFonts, setLoadedFonts] = React.useState<any[]>([]);
  const [widthSrc, setWidthSrc] = useState<number>(0);
  const [heightSrc, setHeightSrc] = useState<number>(0);
  const [fontURLInitial, setFontURLInitial] = React.useState<string>("");
  const [errorMessage, setError] = React.useState<boolean>(false);
  const {
    setCurrentScene,
    currentScene,
    scenes,
    currentDesign,
    setCurrentDesign,
  } = useDesignEditorContext();
  const [templates, setTemplates] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const handleLoadFont = async (x: any) => {
    if (editor) {
      let selectedFont = null;

      if (x.font) {
        selectedFont = {
          name: x.name,
          url: x.font,
        };
      } else if (x.font_woff) {
        selectedFont = {
          name: x.name,
          url: x.font_woff,
        };
      } else if (x.font_woff2) {
        selectedFont = {
          name: x.name,
          url: x.font_woff2,
        };
      } else if (x.font_otf) {
        selectedFont = {
          name: x.name,
          url: x.font_otf,
        };
      } else if (x.font_ttf) {
        selectedFont = {
          name: x.name,
          url: x.font_ttf,
        };
      }

      if (selectedFont) {
        await loadFonts([selectedFont]);
        // @ts-ignore
        // editor.objects.update<IStaticText>({
        //   fontFamily: x.name,
        //   fontURL: selectedFont.url,
        // });
      }
    }
  };

  const getDataFontTextInitial = async (fontInitial: any) => {
    //

    try {
      const response = await axios.post(`${networkAPI}/listFont`, {
        token: token,
      });
      const data = response.data.data;
      setCommonFonts(data);
      if (commonFonts.length > 0) {
        commonFonts.map(function (font) {
          if (font.name.includes(fontInitial)) {
            // return fontURLInitial[0].font_ttf
            setFontURLInitial(font.font_ttf);
            return fontURLInitial;
          }
        });
      }
    } catch (error) {
      console.error("Error fetching fonts:", error);
      toast.error("Lỗi tìm nạp phông chữ, hãy thử lại", {
        position: "top-left",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
      // setError(true) 
    }
  };
  const generateText = (id: string, detail: any) => {
    getDataFontTextInitial(detail.content.font);
    return {
      id: uuidv4(),
      name: "StaticText",
      angle: 0,
      stroke: null,
      strokeWidth: 0,
      left: detail.content.postion_left,
      top: detail.content.postion_top,
      opacity: 1,
      originX: "left",
      originY: "top",
      scaleX: 1,
      scaleY: 1,
      type: "StaticText",
      flipX: false,
      flipY: false,
      skewX: 0,
      skewY: 0,
      visible: true,
      shadow: null,
      charSpacing: 0,
      fill: detail.content.color,
      fontFamily: detail.content.font,
      fontSize: 80,
      lineHeight: 1.16,
      text: detail.content.text,
      textAlign: "center",
      fontURL: fontURLInitial,
      metadata: {},
    };
  };

  const generateImage = (id: string, detail: any) => {
    return {
      id: uuidv4(),
      name: "StaticImage",
      angle: 0,
      stroke: null,
      strokeWidth: 0,
      left: detail.content.postion_left,
      top: detail.content.postion_top,
      // width: 926,
      // height: 1003,
      opacity: 1,
      originX: "left",
      originY: "top",
      scaleX: 0.36,
      scaleY: 0.36,
      type: "StaticImage",
      flipX: false,
      flipY: false,
      skewX: 0,
      skewY: 0,
      visible: true,
      shadow: null,
      src: detail.content.banner,
      cropX: 0,
      cropY: 0,
      metadata: {},
    };
  };

  const editor = useEditor();
  const [dataRes, setDataRes] = useState(null);
  const loadGraphicTemplate = async (payload: IDesign) => {
    const scenes = [];
    // const { scenes: scns, ...design } = payload;
    const scns = payload.scenes;

    for (const scn of scns) {
      const scene: IScene = {
        name: payload.name,
        frame: payload.frame,
        id: payload.id,
        layers: scn.layers,
        metadata: {},
      };
      const loadedScene = await loadVideoEditorAssets(scene);
      await loadTemplateFonts(loadedScene);

      const preview = (await editor.renderer.render(loadedScene)) as string;
      scenes.push({ ...loadedScene, preview });
    }

    return { scenes };
  };

  const dataFunction = (data: any) => {
    const dataString = {
      id: uuidv4(),
      name: "Untitled Design",
      frame: {
        width: data.width,
        height: data.height,
      },
      layers: [
        {
          id: "background",
          name: "Initial Frame",
          angle: 0,
          stroke: null,
          strokeWidth: 0,
          // left: 0,
          // top: 0,
          // width: data.width,
          // height: data.height,
          opacity: 1,
          originX: "left",
          originY: "top",
          scaleX: 1,
          scaleY: 1,
          type: "Background",
          flipX: false,
          flipY: false,
          skewX: 0,
          skewY: 0,
          visible: true,
          shadow: {
            color: "#fcfcfc",
            blur: 4,
            offsetX: 0,
            offsetY: 0,
            affectStroke: false,
            nonScaling: false,
          },
          fill: "#FFFFFF",
          metadata: {},
        },
        {
          id: "YgXmiNK_RuATY-xMyNf93",
          name: "StaticImage",
          angle: 0,
          stroke: null,
          strokeWidth: 0,
          // left: 0,
          // top: 0,
          // width: data.width,
          // height: data.height,
          opacity: 1,
          originX: "left",
          originY: "top",
          scaleX: 1,
          scaleY: 1,
          type: "StaticImage",
          flipX: false,
          flipY: false,
          brightness: 0,
          borderRadius: 0,
          skewX: 0,
          skewY: 0,
          visible: true,
          shadow: null,
          src: data.thumn,
          cropX: 0,
          cropY: 0,
          metadata: {
            brightness: 20,
          },
        },
      ],

      metadata: {},
      preview: "",
    };

    if (data.productDetail) {
      data.productDetail.forEach(
        async (detail: any, index: number) => {
          if (detail.content.type == "text") {
            // getDataFontTextInitial()
            // console.log(detail);
            let stringMerged;
            stringMerged  = detail.content.text.replace(/<br\s*\/>/g, '\n');
            dataString.layers.push({
              id: uuidv4(),
              name: "StaticText",
              angle: 0,
              stroke: null,
              strokeWidth: 0,
              left: (detail.content.postion_left / 100) * data.width,
              top: (detail.content.postion_top / 100) * data.height,
              opacity: detail.content.opacity,
              originX: "left",
              originY: "top",
              // scaleX: (parseInt(detail.content.width, 10) / data.width) * 100,
              // scaleY: (parseInt(detail.content.width, 10) / data.width) * 100,
              type: "StaticText",
              flipX: false,
              flipY: false,
              skewX: 0,
              skewY: 0,
              visible: true,
              shadow: null,
              charSpacing: 0,
              fill:
                detail.content.gradient === 1
                  ? detail.content.gradient_color[0]?.color
                  : detail.content.color,
              // fill: 'white',
              width:
                (parseInt(detail.content.width.replace(/vw/g, "")) *
                  data.width) /
                100,
              // height: null,
              // fontFamily: detail.content.font,
              fontFamily: detail.content.font,
              fontSize:
                (parseInt(detail.content.size.replace(/vw/g, "")) *
                  data.width) /
                100,
              // (parseInt(detail.content.width, 10) / data.width) * 10000
              lineHeight: parseInt(detail.content.gianchu),
              text: stringMerged,
              textAlign: detail.content.text_align,
              // fontURL: "https://apis.ezpics.vn/upload/admin/files/UTM%20AvoBold.ttf",
              // fontURLInitial
              metadata: {},
            });
          } else if (detail.content.type == "image") {
            // getMeta(detail.content.banner).then((img) => {
            //   if (img.naturalHeight && img.naturalWidth) {
            // console.log(detail);

            dataString.layers.push({
              id: uuidv4(),
              name: "StaticImage",
              angle: 0,
              stroke: null,
              strokeWidth: 0,
              left: (detail.content.postion_left / 100) * data.width,
              top: (detail.content.postion_top / 100) * data.height,

              opacity: 1,
              originX: "left",
              originY: "top",
              scaleX:
                (parseInt(detail.content.width.replace(/vw/g, "")) *
                  data.width) /
                100 /
                detail.content.naturalWidth,
              // img.naturalWidth,
              scaleY:
                (parseInt(detail.content.width.replace(/vw/g, "")) *
                  data.width) /
                100 /
                detail.content.naturalWidth,
              // img.naturalWidth,
              // data.width,
              type: "StaticImage",
              flipX: detail.content.lat_anh,
              flipY: false,
              skewX: 0,
              skewY: 0,
              visible: true,
              shadow: null,
              src: detail.content.banner,
              cropX: 0,
              cropY: 0,
              metadata: {},
            });
            // }
            // else {
            //   console.warn("Đợi tí")
            // }
            // });
          }
        }
        //  (
        //   generateLayer(layerId, detail.content.type, detail)
        // );
      );
    }
    console.log(dataString);

    return dataString;
  };
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const token = urlParams.get("token");
  const id = urlParams.get("id");
  if (token && id) {
    dispatch(REPLACE_TOKEN(token));
    dispatch(REPLACE_ID_USER(id));
  }
  

  const networkAPI = useAppSelector((state) => state.network.ipv4Address);
  const loadTemplate = React.useCallback(
    async (template: any) => {
      if (editor) {
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
  let convertData;
  useEffect(() => {
    const fetchFonts = async () => {
      try {
        const response = await axios.post(`${networkAPI}/listFont`, {
          token: token,
        });
        const data = response.data.data;
        setCommonFonts(data);
        if (commonFonts.length > 0) {
          commonFonts.map(async (font) => {
            handleLoadFont(font);
          });
        }
        // else {
        //                   setError(true)

        // }
      } catch (error) {
                setError(true)

        console.error("Error fetching fonts:", error);
      }
    };

    fetchFonts();
  }, [currentScene]);
  useEffect(() => {
    const fetchDataBanks = async () => {
      try {
        const data = {
          idproduct: id,
          token: token,
        };

        const response = await axios.post(`${networkAPI}/listLayerAPI`, data);

        if (response) {
          setDataRes(response.data.data);

        } else {
        }
      } catch (error) {
        toast.error("Không định danh được người dùng, hãy đăng nhập lại", {
          position: "top-left",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
        setError(true)
      }
    };
    fetchDataBanks();
  }, []);
  useEffect(() => {
    const fetchDataBanks = async () => {
      try {
        // await .then(async (data) => {
        //   // await loadGraphicTemplate(data);
        // });
        const dataRender = dataFunction(dataRes);
        // console.log(dataRender)
        await loadTemplate(dataRender);

        // React.useCallback(
        //   async (data: any) => {
        //     let template;
        //     if (data.type === "GRAPHIC") {

        //       template = await loadGraphicTemplate(convertData);
        //     }
        //     //   @ts-ignore
        //     setScenes(template.scenes);
        //     //   @ts-ignore
        //     setCurrentDesign(template.design);
        //   },
        //   [editor]
        // );
        // let template = await loadGraphicTemplate(convertData);
        // setScenes(template.scenes);
        // //   @ts-ignore
      } catch (error) {
        console.log(error);
      }
    };
    fetchDataBanks();
  }, [dataRes]);

  return (
    <>
      <EditorContainer>
        <Navbar />
        <div style={{ display: "flex", flex: 1 }}>
          <Panels />
          <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
            <Toolbox />
            <Canvas />
            <Footer />
          </div>
        </div>
        { (token === null || id ===null) && errorMessage  && (
          <div
            style={{
              position: "absolute",
              width: "100%",
              height: "100%",
              backgroundColor: "white",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "column",
            }}
          >
            <img
              src="../../../assets/error.jpg"
              alt="lỗi"
              style={{ width: 300, height: 300, alignSelf: "center" }}
            />
            <h2
              style={{
                color: "black",
                fontFamily: "Arial, Helvetica, sans-serif",
              }}
            >
              Bạn không có quyền truy cập, hãy thử lại
            </h2>
          </div>
        )}
      </EditorContainer>
    </>
  );
}

export default GraphicEditor;
