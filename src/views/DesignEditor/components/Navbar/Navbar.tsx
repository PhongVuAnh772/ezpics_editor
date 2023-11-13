import React from "react";
import { styled, ThemeProvider, DarkTheme } from "baseui";
import { Theme } from "baseui/theme";
import { Button, KIND } from "baseui/button";
import Logo from "~/components/Icons/Logo";
import useDesignEditorContext from "~/hooks/useDesignEditorContext";
import Play from "~/components/Icons/Play";
import { Block } from "baseui/block";
import { useEditor } from "@layerhub-io/react";
import useEditorType from "~/hooks/useEditorType";
import { IScene } from "@layerhub-io/types";
import { loadTemplateFonts } from "~/utils/fonts";
import { loadVideoEditorAssets } from "~/utils/video";
import DesignTitle from "./DesignTitle";
import { IDesign } from "~/interfaces/DesignEditor";
import EzpicsLogo from "./avatar.png";
import { generateToServer } from "~/api/gererateToServer";
import { useAppSelector, useAppDispatch } from "~/hooks/hook";
import axios from "axios";
import { toast } from "react-toastify";
import AngleDoubleLeft from "~/components/Icons/AngleDoubleLeft";
import imageIcon from './Layer 1.png'
import exportIcon from './Layer 2.png'


const Container = styled<"div", {}, Theme>("div", ({ $theme }) => ({
  height: "64px",
  background: $theme.colors.black,
  display: "flex",
  padding: "0 1.25rem",
  gridTemplateColumns: "240px 1fr 240px",
  alignItems: "center",
  flexDirection: "row",
  justifyContent: "space-between",
}));

export default function () {
  const {
    setDisplayPreview,
    setScenes,
    setCurrentDesign,
    currentDesign,
    scenes,
  } = useDesignEditorContext();
  const editorType = useEditorType();
  const editor = useEditor();
  const inputFileRef = React.useRef<HTMLInputElement>(null);
  const [state, setState] = React.useState({
    image: "",
  });
  const [loading, setLoading] = React.useState(true);
  const network = useAppSelector((state) => state.network.ipv4Address);
  const idProduct = useAppSelector((state) => state.token.id);
  const token = useAppSelector((state) => state.token.token);

  const parseGraphicJSON = () => {
    const currentScene = editor.scene.exportToJSON();

    const updatedScenes = scenes.map((scn) => {
      if (scn.id === currentScene.id) {
        return {
          id: currentScene.id,
          layers: currentScene.layers,
          name: currentScene.name,
        };
      }
      return {
        id: scn.id,
        layers: scn.layers,
        name: scn.name,
      };
    });

    if (currentDesign) {
      const graphicTemplate: IDesign = {
        id: currentDesign.id,
        type: "GRAPHIC",
        name: currentDesign.name,
        frame: currentDesign.frame,
        scenes: updatedScenes,
        metadata: {},
        preview: "",
      };
      makeDownload(graphicTemplate);
      generateToServer(graphicTemplate);
    } else {
      console.log("NO CURRENT DESIGN");
    }
  };

  const parsePresentationJSON = () => {
    const currentScene = editor.scene.exportToJSON();
    console.log(currentScene);
    const updatedScenes = scenes.map((scn) => {
      if (scn.id === currentScene.id) {
        return {
          id: currentScene.id,
          duration: 5000,
          layers: currentScene.layers,
          name: currentScene.name,
        };
      }
      return {
        id: scn.id,
        duration: 5000,
        layers: scn.layers,
        name: scn.name,
      };
    });

    if (currentDesign) {
      const presentationTemplate: IDesign = {
        id: currentDesign.id,
        type: "PRESENTATION",
        name: currentDesign.name,
        frame: currentDesign.frame,
        scenes: updatedScenes,
        metadata: {},
        preview: "",
      };
      makeDownload(presentationTemplate);
    } else {
      console.log("NO CURRENT DESIGN");
    }
  };

  const parseVideoJSON = () => {
    const currentScene = editor.scene.exportToJSON();
    const updatedScenes = scenes.map((scn) => {
      if (scn.id === currentScene.id) {
        return {
          id: scn.id,
          duration: scn.duration,
          layers: currentScene.layers,
          name: currentScene.name ? currentScene.name : "",
        };
      }
      return {
        id: scn.id,
        duration: scn.duration,
        layers: scn.layers,
        name: scn.name ? scn.name : "",
      };
    });
    if (currentDesign) {
      const videoTemplate: IDesign = {
        id: currentDesign.id,
        type: "VIDEO",
        name: currentDesign.name,
        frame: currentDesign.frame,
        scenes: updatedScenes,
        metadata: {},
        preview: "",
      };
      makeDownload(videoTemplate);
    } else {
      console.log("NO CURRENT DESIGN");
    }
  };

  const makeDownload = (data: Object) => {
    const dataStr =
      "data:text/json;charset=utf-8," +
      encodeURIComponent(JSON.stringify(data));
    const a = document.createElement("a");
    a.href = dataStr;
    a.download = "template.json";
    a.click();
  };

  const makeDownloadTemplate = async () => {
    if (editor) {
      if (editorType === "GRAPHIC") {
        return parseGraphicJSON();
      } else if (editorType === "PRESENTATION") {
        return parsePresentationJSON();
      } else {
        return parseVideoJSON();
      }
    }
  };

  const loadGraphicTemplate = async (payload: IDesign) => {
    const scenes = [];
    const { scenes: scns, ...design } = payload;
    console.log("payload" + payload);
    for (const scn of scns) {
      const scene: IScene = {
        name: scn.name,
        frame: payload.frame,
        id: scn.id,
        layers: scn.layers,
        metadata: {},
      };
      console.log("scns" + scene);

      const loadedScene = await loadVideoEditorAssets(scene);
      await loadTemplateFonts(loadedScene);

      const preview = (await editor.renderer.render(loadedScene)) as string;
      scenes.push({ ...loadedScene, preview });
    }

    return { scenes, design };
  };

  const loadPresentationTemplate = async (payload: IDesign) => {
    const scenes = [];
    const { scenes: scns, ...design } = payload;

    for (const scn of scns) {
      const scene: IScene = {
        name: scn.name,
        frame: payload.frame,
        id: scn,
        layers: scn.layers,
        metadata: {},
      };
      const loadedScene = await loadVideoEditorAssets(scene);

      const preview = (await editor.renderer.render(loadedScene)) as string;
      await loadTemplateFonts(loadedScene);
      scenes.push({ ...loadedScene, preview });
    }
    return { scenes, design };
  };

  const loadVideoTemplate = async (payload: IDesign) => {
    const scenes = [];
    const { scenes: scns, ...design } = payload;

    for (const scn of scns) {
      const design: IScene = {
        name: "Awesome template",
        frame: payload.frame,
        id: scn.id,
        layers: scn.layers,
        metadata: {},
        duration: scn.duration,
      };
      const loadedScene = await loadVideoEditorAssets(design);

      const preview = (await editor.renderer.render(loadedScene)) as string;
      await loadTemplateFonts(loadedScene);
      scenes.push({ ...loadedScene, preview });
    }
    return { scenes, design };
  };

  const handleImportTemplate = React.useCallback(
    async (data: any) => {
      let template;
      if (data.type === "GRAPHIC") {
        template = await loadGraphicTemplate(data);
      } else if (data.type === "PRESENTATION") {
        template = await loadPresentationTemplate(data);
      } else if (data.type === "VIDEO") {
        template = await loadVideoTemplate(data);
      }
      //   @ts-ignore
      setScenes(template.scenes);
      //   @ts-ignore
      setCurrentDesign(template.design);
    },
    [editor]
  );
  const downloadImage = (imageData: any, fileName: any) => {
    const link = document.createElement("a");
    link.href = imageData;
    link.download = fileName;
    link.click();
  };
  const makePreview = React.useCallback(async () => {
    if (editor) {
      const template = editor.scene.exportToJSON();
      const image = (await editor.renderer.render(template)) as string;
      setState({ image });
      setLoading(false);
      if (image) {
        // downloadImage(image, "preview.png");
        try {
          const res = await axios.post(`${network}/updateListLayerAPI`, {
            idProduct: idProduct,
            token: token,
            listLayer: JSON.stringify(generateToServer(template)),
          });
          if (res.data.code === 1) {
            setState({ image });

            console.log(res);
            console.log(generateToServer(template));
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
          console.log(error)
        }
      }
    }
  }, [editor]);
  const handleInputFileRefClick = () => {
    inputFileRef.current?.click();
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files![0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (res) => {
        const result = res.target!.result as string;
        const design = JSON.parse(result);
        console.log(typeof design);

        handleImportTemplate(design);
      };
      reader.onerror = (err) => {
        console.log(err);
      };

      reader.readAsText(file);
    }
  };

  return (
    // @ts-ignore
    <ThemeProvider theme={DarkTheme}>
      <Container>
        <div style={{ color: "#ffffff" }}>
          <img src={EzpicsLogo} style={{ width: 60, height: 60 }} />
        </div>
        {/* <DesignTitle /> */}
        <Block
          $style={{
            alignSelf: "center",
            gap: "0.5rem",
            alignItems: "center",
            paddingBottom: "10px",
          }}
        >
          <input
            multiple={false}
            onChange={handleFileInput}
            type="file"
            id="file"
            ref={inputFileRef}
            style={{ display: "none" }}
          />
          <Button
            size="compact"
            onClick={handleInputFileRefClick}
            kind={KIND.tertiary}
            overrides={{
              StartEnhancer: {
                style: {
                  marginRight: "4px",
                },
              },
            }}
          >
            Nhập dữ liệu JSON
          </Button>

          <Button
            size="compact"
            onClick={makeDownloadTemplate}
            kind={KIND.tertiary}
            overrides={{
              StartEnhancer: {
                style: {
                  marginRight: "4px",
                },
              },
            }}
          >
            Xuất dữ liệu JSON
          </Button>
          {/* <Button
            size="mini"
            onClick={}
            kind={KIND.tertiary}
            overrides={{
              StartEnhancer: {
                
              },
            }}
          >
            Xem ảnh
          </Button> */}
          <Button
            size="compact"
            onClick={() => makePreview()}
            kind={KIND.tertiary}
            overrides={{
              StartEnhancer: {
                style: {
                  marginRight: "4px",
                },
              },
            }}
          >
            <img src={imageIcon}  style={{width:15, height :15,marginRight: 10}}/>
            Lưu mẫu thiết kế
          </Button>
          <Button
            size="compact"
            onClick={() => setDisplayPreview(true)}
            kind={KIND.tertiary}
            overrides={{
              StartEnhancer: {
                style: {
                  marginRight: "4px",
                },
              },
            }}
          >
            <img src={exportIcon}  style={{width:15, height :15,marginRight: 10}}/>Xuất ảnh
          </Button>
        </Block>
      </Container>
    </ThemeProvider>
  );
}
