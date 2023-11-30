import React from "react";
import { Block } from "baseui/block";
import { useEditor } from "@layerhub-io/react";
import { toast } from "react-toastify";
import axios from "axios";
import { useAppSelector } from "~/hooks/hook";
import { generateToServer } from "~/api/gererateToServer";
import useDesignEditorContext from "~/hooks/useDesignEditorContext";
export default function () {
  const editor = useEditor();
  const [loading, setLoading] = React.useState(true);
  const {
    setDisplayPreview,
    setScenes,
    setCurrentDesign,
    currentDesign,
    scenes,
  } = useDesignEditorContext();
  const [state, setState] = React.useState({
    image: "",
  });
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
      function findIndexById(arr: any, targetId: any) {
        for (let i = 0; i < arr.length; i++) {
          if (arr[i].id === targetId) {
            return i;
          }
        }
        return -1; // Trả về -1 nếu không tìm thấy
      }
      let resultIndex = findIndexById(graphicTemplate.scenes, currentScene.id);

      const allLayers = graphicTemplate.scenes.map((scene:any) => scene.layers);

      const newDesign = generateToServer({
        frame: currentDesign.frame,
        data:allLayers
      });
      console.log(newDesign)
      return newDesign;
    
  };
  const handleConversion = async (base64String:any,filePath:any) => {
    // Remove the "data:image/png;base64," prefix
    const base64Data = base64String.split(',')[1];

    // Convert base64 to a Blob
    const blob = new Blob([atob(base64Data)], { type: 'image/png' });

    // Create a FormData object
    const formData = new FormData();
   
    formData.append('file', blob, filePath);
    formData.append('idProduct', idProduct);
    formData.append('token', token);


    try {
      // Make an Axios POST request with the FormData
      const response = await axios.post(`${network}/saveImageProductAPI`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      console.log('File uploaded successfully:', response.data);
    } catch (error) {
      console.error('Error uploading file:', error);
    }
  };
  const network = useAppSelector((state) => state.network.ipv4Address);
  const downloadImage = (imageData: any, fileName: any) => {
    const link = document.createElement("a");
    link.href = imageData;
    link.download = fileName;
    link.click();
  };
  const idProduct = useAppSelector((state) => state.token.id);
  const token = useAppSelector((state) => state.token.token);
  const makePreview = React.useCallback(async () => {
    if (editor) {
      const template = editor.scene.exportToJSON();
      const image = (await editor.renderer.render(template)) as string;
      setLoading(false);
      if (image) {
        const res = await axios.post(`${network}/addListLayerAPI`, {
          idProduct: idProduct,
          token: token,
          listLayer: JSON.stringify(parseGraphicJSON()),
        });
        if (res.data.code === 1) {
          downloadImage(image, "preview.png");
          setState({ image });
          await handleConversion(image,"preview.png")
          toast("Xuất ảnh thành công !! 🦄", {
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
          toast("Xuất ảnh thất bại !! 🦄", {
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
      }
    }
  }, [editor]);
  const makePreviewNotDown = React.useCallback(async () => {
    if (editor) {
      const template = editor.scene.exportToJSON();
      const image = (await editor.renderer.render(template)) as string;
      setState({ image });
      setLoading(false);
      if (image) {
        downloadImage(image, "preview.png");
      }
      toast("Tải thành công !! 🦄", {
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
  }, [editor]);

  React.useEffect(() => {
    makePreview();
  }, [editor]);

  return (
    <Block
      $style={{
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        display: "flex",
        padding: "5rem",
      }}
    >
      {!loading && <img width={"auto"} height={"100%"} src={state.image} />}
    </Block>
  );
}
