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
import imageIcon from "./save.png";
import exportIcon from "./Layer 2.png";
import "../../components/Preview/newloading.css";

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
  const [loading, setLoading] = React.useState(false);
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

    const graphicTemplate: any = {
      id: currentDesign.id,
      type: "GRAPHIC",
      name: currentDesign.name,
      frame: currentDesign.frame,
      scenes: updatedScenes,
      metadata: {},
      preview: "",
    };
    // console.log(resultIndex);
    // console.log(graphicTemplate.scenes)
    // console.log(currentScene.id)
    // makeDownload(graphicTemplate);
    const allLayers = graphicTemplate.scenes.map((scene: any) => scene.layers);
    console.log(graphicTemplate);
    console.log(currentDesign.frame, allLayers);
    const newDesign = generateToServer({
      frame: currentDesign.frame,
      data: allLayers,
    });
    console.log(newDesign);
    return newDesign;
    // let newArr : any=[];
    // console.log(newArr)
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

  const makeDownloadTemplate = () => {
    return parseGraphicJSON();
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
      // if (data.type === "GRAPHIC") {
      // } else if (data.type === "PRESENTATION") {
      //   template = await loadPresentationTemplate(data);
      // } else if (data.type === "VIDEO") {
      //   template = await loadVideoTemplate(data);
      // }
      template = await loadGraphicTemplate(data);

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
  function base64toFile(base64Data: any, filename: any) {
    const arr = base64Data.split(",");
    const mime = arr[0].match(/:(.*?);/)[1];
    const bstr = atob(arr[1]);
    let n = bstr.length;
    const u8arr = new Uint8Array(n);
    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }
    return new File([u8arr], filename, { type: mime });
  }
  const handleConversion = async (base64String: any, filePath: any) => {
    // Remove the "data:image/png;base64," prefix
    const base64Data = base64String.split(",")[1];
    const template = editor.scene.exportToJSON();
    const image = (await editor.renderer.render(template)) as string;

    // Convert base64 to a Blob
    const blob = new Blob([base64Data], { type: "image/png" });

    // Create a FormData object
    const formData = new FormData();

    formData.append("file", base64toFile(image, "preview.png"));
    formData.append("idProduct", idProduct);
    formData.append("token", token);

    try {
      // Make an Axios POST request with the FormData
      const response = await axios.post(
        `${network}/saveImageProductAPI`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      if (response.data.code === 1) {
        // console.log(res);
        // console.log(generateToServer(template));
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
        setLoading(false);
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
        setLoading(false);
      }
      console.log("File uploaded successfully:", response.data);
    } catch (error) {
      console.error("Error uploading file:", error);
    }
  };
  const makePreview = async () => {
    const template = editor.scene.exportToJSON();
    const image = (await editor.renderer.render(template)) as string;

    // downloadImage(image, "preview.png");
    console.log(JSON.stringify(parseGraphicJSON()));
    setLoading(true);

    try {
      const res = await axios.post(`${network}/addListLayerAPI`, {
        idProduct: idProduct,
        token: token,
        listLayer: JSON.stringify(parseGraphicJSON()),
      });
      if (res.data.code === 1) {
        const imageGenerate = await handleConversion(image, "preview.png");
        console.log(imageGenerate);
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
        setLoading(false);
      }
      // console.log(res);
      // console.log(generateToServer(template));
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
      setLoading(false);
    }
  };
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
        console.log(design);

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
    <>
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
              onClick={makePreview}
              kind={KIND.tertiary}
              overrides={{
                StartEnhancer: {
                  style: {
                    marginRight: "4px",
                    paddingTop: "20px",
                    alignSelf: "center",
                    // marginBottom: "10px",
                  },
                },
              }}
            >
              <img
                src={imageIcon}
                style={{ width: 15, height: 15, marginRight: 10 }}
              />
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
                    paddingBottom: "10px",
                  },
                },
              }}
            >
              <img
                src={exportIcon}
                style={{ width: 15, height: 15, marginRight: 10 }}
              />
              Xuất ảnh
            </Button>
          </Block>
        </Container>
      </ThemeProvider>
      {loading && (
        <div
          style={{
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0,0,0,0.7)",
            position: "absolute",
            zIndex: 20000000000,
          }}
        >
          <div className="loadingio-spinner-dual-ring-hz44svgc0ld2">
            <div className="ldio-4qpid53rus92">
              <div></div>
              <div>
                <div></div>
              </div>
            </div>
            <img
              style={{
                position: "absolute",
                top: 10,
                left: 17,
                width: 40,
                height: 40,
                // alignSelf: 'center',
                zIndex: 999999,
              }}
              src="https://ezpics.vn/wp-content/uploads/2023/05/LOGO-EZPICS-300.png"
            />
          </div>
        </div>
      )}
    </>
  );
}
