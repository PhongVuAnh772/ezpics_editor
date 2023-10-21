import React from "react";
import { useActiveObject, useEditor } from "@layerhub-io/react";
import { Block } from "baseui/block";
import { Button, SIZE, KIND } from "baseui/button";
import { PLACEMENT, StatefulPopover } from "baseui/popover";
import { StatefulTooltip } from "baseui/tooltip";
import FlipHorizontal from "~/components/Icons/FlipHorizontal";
import FlipVertical from "~/components/Icons/FlipVertical";
import axios from "axios";

export default function () {
  const editor = useEditor();
  const activeObject = useActiveObject() as any;
  const [state, setState] = React.useState({ flipX: false, flipY: false });

  React.useEffect(() => {
    if (activeObject) {
      setState({
        flipX: activeObject.flipX,
        flipY: activeObject.flipY,
      });
    }
  }, [activeObject]);

  const flipHorizontally = React.useCallback(() => {
    editor.objects.update({ flipX: !state.flipX });
    setState({ ...state, flipX: !state.flipX });
  }, [editor, state]);
  const removeBackground = async () => {
    console.log(activeObject);
    // const srcAttributeValue = activeObject._element.getAttribute("src");
    // console.log(srcAttributeValue);
    // const response = await axios.post<any>(
    //   "https://apis.ezpics.vn/apis/removeBackgroundImageAPI",
    //   {
    //     token: "379599",
    //     // image: srcAttributeValue,
    //   }
    // );
    // if (response.data.code === 1) {
    //   console.log("ngu");
    // } else {
    //   console.log("khôn");
    // }
    // console.log(response.data)
  };
  const flipVertically = React.useCallback(() => {
    editor.objects.update({ flipY: !state.flipY });
    setState({ ...state, flipY: !state.flipY });
  }, [editor, state]);
  
  const changingBrightness = React.useCallback(() => {
    editor.objects.update({ flipY: !state.flipY });
    setState({ ...state, flipY: !state.flipY });
  }, [editor, state]);

  return (
    <StatefulPopover placement={PLACEMENT.bottom}>
      <Block>
        <StatefulTooltip
          placement={PLACEMENT.bottom}
          showArrow={true}
          accessibilityType={"tooltip"}
        >
          <Button
            size={SIZE.compact}
            kind={KIND.tertiary}
            onClick={flipVertically}
          >
            Lật ảnh
          </Button>
        </StatefulTooltip>
        <StatefulTooltip
          placement={PLACEMENT.bottom}
          showArrow={true}
          accessibilityType={"tooltip"}
        >
          <Button
            size={SIZE.compact}
            kind={KIND.tertiary}
            onClick={removeBackground}
          >
            Xóa nền
          </Button>
        </StatefulTooltip>
        <StatefulTooltip
          placement={PLACEMENT.bottom}
          showArrow={true}
          accessibilityType={"tooltip"}
        >
          <Button
            size={SIZE.compact}
            kind={KIND.tertiary}
            onClick={changingBrightness}
          >
            Độ sáng
          </Button>
        </StatefulTooltip>
        <StatefulTooltip
          placement={PLACEMENT.bottom}
          showArrow={true}
          accessibilityType={"tooltip"}
        >
          <Button
            size={SIZE.compact}
            kind={KIND.tertiary}
            onClick={removeBackground}
          >
            Bo góc
          </Button>
        </StatefulTooltip>
      </Block>
    </StatefulPopover>
  );
}
