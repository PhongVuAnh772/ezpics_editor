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

export default function () {
  const inputFileRef = React.useRef<HTMLInputElement>(null);
  const [uploads, setUploads] = React.useState<any[]>([]);
  const network = useAppSelector((state) => state.network.ipv4Address);
  const editor = useEditor();
  const setIsSidebarOpen = useSetIsSidebarOpen();
  const idProduct = useAppSelector((state) => state.token.id);
  const token = useAppSelector((state) => state.token.token);
  const handleDropFiles = async (files: FileList) => {
    const file = files[0];
    const url = URL.createObjectURL(file);
    // let blob = await fetch(url).then(r => r.blob());
    // Kiểm tra đuôi file
    if (!file.name.endsWith(".png")) {
      toast.error("Chỉ chấp nhận file png");
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
        url,
      };

      setUploads([...uploads, upload]);
      const options = {
      type: "StaticImage",
      src: url,
              id: res.data.data.id,

    };
    editor.objects.add(options);
    }
  };

  const handleInputFileRefClick = () => {
    inputFileRef.current?.click();
  };

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
    <DropZone handleDropFiles={handleDropFiles}>
      <Block $style={{ flex: 1, display: "flex", flexDirection: "column" }}>
        <Block
          $style={{
            display: "flex",
            alignItems: "center",
            fontWeight: 500,
            justifyContent: "space-between",
            padding: "1.5rem",
          }}
        >
          <Block>Đẩy ảnh lên</Block>

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
        </Scrollable>
      </Block>
    </DropZone>
  );
}
