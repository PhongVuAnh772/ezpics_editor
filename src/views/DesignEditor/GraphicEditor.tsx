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

function GraphicEditor() {
  const { setCurrentScene, currentScene } = useDesignEditorContext();
  const [templates, setTemplates] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const generateText = (id: string, detail: any) => {
    return {
      id: id,
      name: "StaticText",
      angle: 0,
      stroke: null,
      strokeWidth: 0,
      left: 390,
      top: 287.72,
      width: 420,
      height: 224.55,
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
      fill: "#333333",
      fontFamily: "OpenSans-Regular",
      fontSize: 92,
      lineHeight: 1.16,
      text: detail.content.text,
      textAlign: "center",
      fontURL:
        "https://fonts.gstatic.com/s/opensans/v27/memSYaGs126MiZpBA-UvWbX2vVnXBbObj2OVZyOOSr4dVJWUgsjZ0C4nY1M2xLER.ttf",
      metadata: {},
    };
  };

  const generateImage = (id: string, detail: any) => {
    console.log(detail);
    return {
      id: "5789a374-43d3-4c18-9263-e37b5cbb1993",
      name: "StaticImage",
      angle: 0,
      stroke: null,
      strokeWidth: 0,
      left: 110.60000000000002,
      top: 353.90999999999997,
      width: 926,
      height: 1003,
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
      src: "https://apis.ezpics.vn/upload/admin/images/50/50_2023_04_07_07_44_25_4457_rb.png",
      cropX: 0,
      cropY: 0,
      metadata: {},
    };
  };

  const generateLayer = (id: string, type: string, detail: any) => {
    switch (type) {
      case "text":
        return generateText(id, detail);
      case "image":
        return generateImage(id, detail);
    }
  };
  const editor = useEditor();
  const [dataRes, setDataRes] = useState(null);
  const loadGraphicTemplate = async (payload: IDesign) => {
    console.log(payload);
    //     console.log(typeof(payload));

    const scenes = [];
    // const { scenes: scns, ...design } = payload;
    const scns = payload.scenes;
    console.log(scns);

    for (const scn of scns) {
      const scene: IScene = {
        name: payload.name,
        frame: payload.frame,
        id: payload.id,
        layers: scn.layers,
        metadata: {},
      };
      console.log(scene);
      const loadedScene = await loadVideoEditorAssets(scene);
      console.log(typeof loadedScene);
      await loadTemplateFonts(loadedScene);

      const preview = (await editor.renderer.render(loadedScene)) as string;
      console.log(preview);
      scenes.push({ ...loadedScene, preview });
    }

    return { scenes };
  };
  const dataExample = {
    id: "hFlkEBdKmMV4wcxWZJUFa",
    name: "Untitled design",
    frame: {
      width: 1280,
      height: 720,
    },
    metadata: {
      animated: false,
    },
    preview: "https://ik.imagekit.io/scenify/2ZdeFFC6gdlw_LkzDN2J5cHs.png",
    layers: [
      {
        id: "background",
        name: "Initial Frame",
        angle: 0,
        stroke: null,
        strokeWidth: 0,
        left: 0,
        top: 0,
        width: 1280,
        height: 720,
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
        fill: "#F8E71D",
        metadata: {},
      },
      {
        id: "YgXmiNK_RuATY-xMyNf93",
        name: "StaticImage",
        angle: 0,
        stroke: null,
        strokeWidth: 0,
        left: 0,
        top: 0,
        width: 1280,
        height: 720,
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
        src: "https://images.pexels.com/photos/3493777/pexels-photo-3493777.jpeg?auto=compress&cs=tinysrgb&h=650&w=940",
        cropX: 0,
        cropY: 0,
        metadata: {
          brightness: 20,
        },
      },
      {
        id: "ZFuu3wPmsF-Dp_XF2HE1W",
        name: "StaticText",
        angle: 0,
        stroke: null,
        strokeWidth: 0,
        left: 0,
        top: 0,
        width: 618,
        height: 67.8,
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
        fill: "#333333",
        fontFamily: "ComicNeue-Regular",
        fontSize: 60,
        lineHeight: 1.16,
        text: "My awesome template",
        textAlign: "center",
        fontURL:
          "https://fonts.gstatic.com/s/comicneue/v3/4UaHrEJDsxBrF37olUeDx63j5pN1MwI.ttf",
        metadata: {},
      },
    ],
  };
  const dataFunction = (data: any) => {
    // console.log(data);
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
          left: 0,
          top: 0,
          width: data.width,
          height: data.height,
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
        // {
        //   id: uuidv4(),
        //   name: "StaticImage",
        //   width: data.width,
        //   height: data.height,
        //   angle: 0,
        //   stroke: null,
        //   strokeWidth: 0,
        //   left: 0,
        //   top: 0,
        //   opacity: 1,
        //   originX: "left",
        //   originY: "top",
        //   scaleX: 1,
        //   scaleY: 1,
        //   type: "StaticImage",
        //   flipX: false,
        //   flipY: false,
        //   brightness: 0,
        //   borderRadius: 0,
        //   skewX: 0,
        //   skewY: 0,
        //   visible: true,
        //   shadow: null,
        //   src: data.thumn,
        //   cropX: 0,
        //   cropY: 0,
        //   metadata: {},
        // },
        {
          id: "YgXmiNK_RuATY-xMyNf93",
          name: "StaticImage",
          angle: 0,
          stroke: null,
          strokeWidth: 0,
          left: 0,
          top: 0,
          width: data.width,
          height: data.height,
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
      data.productDetail.forEach((detail: any, index: number) => {
        const layerId = uuidv4();
        dataString.layers.push(
          generateLayer(layerId, detail.content.type, detail)
        );
      });
    }
    console.log(dataString);

    return dataString;
  };
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const token = urlParams.get("token");
  const id = urlParams.get("id");
  const networkAPI = useAppSelector((state) => state.network.ipv4Address);
  const loadTemplate = React.useCallback(
    async (template: any) => {
      if (editor) {
        const fonts: any[] = [];
        template.layers.forEach((object: any) => {
          if (object.type === "StaticText" || object.type === "DynamicText") {
            fonts.push({
              name: object.fontFamily,
              url: object.fontURL,
              options: { style: "normal", weight: 400 },
            });
          }
        });
        // const filteredFonts = fonts.filter((f) => !!f.url);
        // if (filteredFonts.length > 0) {
        //   await loadFonts(filteredFonts);
        // }

        setCurrentScene({ ...template, id: currentScene?.id });
      }
    },
    [editor, currentScene]
  );
  let convertData
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
          console.log(dataRes);

          // convertData = dataFunction(response.data.data);
          // console.log(response.data);
          // console.log(typeof convertData);
          // console.log(convertData);
          // console.log(convertData)
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
          // console.log(convertData);
          // let template = await loadGraphicTemplate(convertData);
          // setScenes(template.scenes);
          // //   @ts-ignore
          // setCurrentDesign(template.design);

          
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchDataBanks();
  }, []);
  useEffect(() => {
    const fetchDataBanks = async () => {
      try {
          console.log(dataRes)

          const convertData = dataFunction(dataRes);
          await loadTemplate(convertData)
          // console.log(response.data);
          // console.log(typeof convertData);
          // console.log(convertData);
          // console.log(convertData)
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
          // console.log(convertData);
          // let template = await loadGraphicTemplate(convertData);
          // setScenes(template.scenes);
          // //   @ts-ignore
          // setCurrentDesign(template.design);

          
        
      } catch (error) {
        console.log(error);
      }
    };
    fetchDataBanks();
  }, [dataRes])
  
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
      </EditorContainer>
    </>
  );
}

export default GraphicEditor;
