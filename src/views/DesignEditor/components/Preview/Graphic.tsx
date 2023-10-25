import React from "react";
import { Block } from "baseui/block";
import { useEditor } from "@layerhub-io/react";
import { toast } from "react-toastify";

export default function () {
  const editor = useEditor();
  const [loading, setLoading] = React.useState(true);
  const [state, setState] = React.useState({
    image: "",
  });
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
