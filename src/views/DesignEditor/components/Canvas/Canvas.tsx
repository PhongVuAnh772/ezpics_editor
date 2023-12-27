import React, { useRef } from "react";
import { Canvas } from "@layerhub-io/react";
import Playback from "../Playback";
import useDesignEditorContext from "~/hooks/useDesignEditorContext";

export default function CanvasComponent() {
  const { displayPlayback } = useDesignEditorContext();

  return (
    <div style={{ flex: 1, display: "flex", position: "relative",overflow:'auto' }}>
      {displayPlayback && <Playback />}
      <Canvas
        config={{
          background: "#f1f2f6",
          controlsPosition: {
            rotation: "BOTTOM",
          },
          overflow: "visible" as any,
          shadow: {
            blur: 0.5,
            color: "#fcfcfc",
            offsetX: 0,
            offsetY: 0,
          },
        }}
      />
    </div>
  );
}
