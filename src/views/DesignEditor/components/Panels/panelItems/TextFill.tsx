import React from "react";
import { Block } from "baseui/block";
import Scrollable from "~/components/Scrollable";
import { HexColorPicker, HexColorInput } from "react-colorful";
import { Delete } from "baseui/icon";
import { throttle } from "lodash";
import { useActiveObject, useEditor } from "@layerhub-io/react";
import { REPLACE_color,ADD_COLOR } from "~/store/slices/color/colorSlice";
import { useAppSelector,useAppDispatch } from "~/hooks/hook";

const PRESET_COLORS = [
  "#f44336",
  "#ff9800",
  "#ffee58",
  "#66bb6a",
  "#26a69a",
  "#03a9f4",
  "#3f51b5",
  "#673ab7",
  "#9c27b0",
  "#ec407a",
  "#8d6e63",
  "#d9d9d9",
];

export default function () {
  const [color, setColor] = React.useState("#b32aa9");
  const activeObject = useActiveObject();
  const editor = useEditor();
  const colorList = useAppSelector(state => state.color.colorList)
  const updateObjectFill = throttle((color: string) => {
    if (activeObject) {
      editor.objects.update({ fill: color });
    }

    setColor(color);
  }, 1);

  return (
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
        <Block>Màu</Block>

        <Block $style={{ cursor: "pointer", display: "flex" }}>
          <Delete size={24} />
        </Block>
      </Block>
      <Scrollable>
        <Block padding={"1rem 1.5rem"}>
          
          <input type="color" style={{ width: "100%" }} onChange={(e) => updateObjectFill(e.target.value)} />
          {/* <HexColorInput color={color} onChange={updateObjectFill} style={{marginTop: '1rem'}}/> */}

          <Block>
            <Block
              $style={{
                padding: "0.75rem ",
                fontWeight: 500,
                fontSize: "14px",
              }}
            >
              Màu mặc định
            </Block>
            <Block
              $style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr 1fr 1fr 1fr 1fr",
                gap: "0.25rem",
              }}
            >
              {colorList.length > 0 && colorList.map((color, index) => (
                <Block
                  $style={{
                    cursor: "pointer",
                  }}
                  onClick={() => updateObjectFill(color)}
                  backgroundColor={color}
                  height={"38px"}
                  key={index}
                ></Block>
              ))}
            </Block>
            <Block
              $style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr 1fr 1fr 1fr 1fr",
                gap: "0.25rem",
              }}
            >
              {PRESET_COLORS.map((color, index) => (
                <Block
                  $style={{
                    cursor: "pointer",
                  }}
                  onClick={() => updateObjectFill(color)}
                  backgroundColor={color}
                  height={"38px"}
                  key={index}
                ></Block>
              ))}
            </Block>

          </Block>
        </Block>
      </Scrollable>
    </Block>
  );
}
