import React, { useRef } from "react";
import { Canvas } from "@layerhub-io/react";
import Playback from "../Playback";
import useDesignEditorContext from "~/hooks/useDesignEditorContext";

interface CanvasRef {
  getCanvas: () => HTMLCanvasElement; // Định nghĩa kiểu cho tham chiếu canvasRef
}

export default function CanvasComponent() {
  const { displayPlayback } = useDesignEditorContext();
  const canvasRef = useRef<CanvasRef | null>(null); // Sử dụng kiểu CanvasRef cho canvasRef

  const handleDownloadClick = () => {
    if (canvasRef.current) {
      const canvasElement = canvasRef.current.getCanvas(); // Lấy tham chiếu đến đối tượng canvas
      const dataURL = canvasElement.toDataURL("image/png"); // Chuyển canvas thành URL dữ liệu ảnh
      const a = document.createElement("a");
      a.href = dataURL;
      a.download = "my_image.png"; // Tên tệp tải xuống
      a.click();
    }
  };

  return (
    <div style={{ flex: 1, display: "flex", position: "relative" }}>
      {displayPlayback && <Playback />}
      <Canvas
        // ref={c anvasRef}
        config={{
          background: "#f1f2f6",
          controlsPosition: {
            rotation: "BOTTOM",
          },
          shadow: {
            blur: 4,
            color: "#fcfcfc",
            offsetX: 0,
            offsetY: 0,
          },
        }}
      />
      <button onClick={handleDownloadClick}>Tải ảnh</button>
    </div>
  );
}
