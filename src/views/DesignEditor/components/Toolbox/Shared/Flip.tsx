import React, { useState } from "react";
import { useActiveObject, useEditor } from "@layerhub-io/react";
import { Block } from "baseui/block";
import { Input } from "baseui/input";
import { Slider } from "baseui/slider";
import { Button, SIZE, KIND } from "baseui/button";
import { PLACEMENT, StatefulPopover } from "baseui/popover";
import { StatefulTooltip } from "baseui/tooltip";
import FlipHorizontal from "~/components/Icons/FlipHorizontal";
import FlipVertical from "~/components/Icons/FlipVertical";
import axios from "axios";
import { useAppSelector } from "~/hooks/hook";

export default function () {
  const editor = useEditor();
  const activeObject = useActiveObject() as any;
  const [state, setState] = React.useState({ flipX: false, flipY: false });
  const [stated, setStated] = React.useState({ opacity: 1 });
  const networkAPI = useAppSelector((state) => state.network.ipv4Address);
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
    // console.log(activeObject);
    const srcAttributeValue = activeObject._element.getAttribute("src");
    console.log(srcAttributeValue);
    const response = await axios.post<any>(
      `${networkAPI}/removeBackgroundImageAPI`,
      {
        token: "nKdAS2QRmJVZgk5UoyDXqaFbN1698211167",
        image: srcAttributeValue,
      },
      {
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "*",
          "Access-Control-Allow-Headers": "*",
          'Content-Type': 'application/json',
        },
      }
    );
    if (response.data.code === 1) {
      console.log("ngu");
      console.log(response.data);
    } else {
      console.log("khôn");
      console.log(response.data);
    }
    console.log(response.data);
  };
  const flipVertically = React.useCallback(() => {
    editor.objects.update({ flipY: !state.flipY });
    setState({ ...state, flipY: !state.flipY });
  }, [editor, state]);

  const changingBrightness = React.useCallback(() => {
    editor.objects.update({ flipY: !state.flipY });
    setState({ ...state, flipY: !state.flipY });
  }, [editor, state]);
  const onChange = React.useCallback(
    (value: number) => {
      setStated({ opacity: value });
      editor.objects.update({ opacity: value / 100 });
    },
    [editor]
  );
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
        <StatefulPopover
          placement={PLACEMENT.bottomLeft}
          content={() => (
            <Block width={"200px"} backgroundColor={"#ffffff"} padding={"20px"}>
              <Block
                $style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <Block $style={{ fontSize: "14px" }}>Độ sáng</Block>
                <Block width={"52px"}>
                  <Input
                    overrides={{
                      Input: {
                        style: {
                          backgroundColor: "#ffffff",
                          textAlign: "center",
                        },
                      },
                      Root: {
                        style: {
                          borderBottomColor: "rgba(0,0,0,0.15)",
                          borderTopColor: "rgba(0,0,0,0.15)",
                          borderRightColor: "rgba(0,0,0,0.15)",
                          borderLeftColor: "rgba(0,0,0,0.15)",
                          borderTopWidth: "1px",
                          borderBottomWidth: "1px",
                          borderRightWidth: "1px",
                          borderLeftWidth: "1px",
                          height: "26px",
                        },
                      },
                      InputContainer: {},
                    }}
                    size={SIZE.mini}
                    onChange={() => {}}
                    value={Math.round(stated.opacity)}
                  />
                </Block>
              </Block>

              <Block>
                <Slider
                  overrides={{
                    InnerThumb: () => null,
                    ThumbValue: () => null,
                    TickBar: () => null,
                    Track: {
                      style: {
                        paddingRight: 0,
                        paddingLeft: 0,
                      },
                    },
                    Thumb: {
                      style: {
                        height: "12px",
                        width: "12px",
                      },
                    },
                  }}
                  min={0}
                  max={100}
                  marks={false}
                  value={[stated.opacity]}
                  // @ts-ignore
                  onChange={({ value }) => onChange(value)}
                />
              </Block>
            </Block>
          )}
        >
          <Button kind={KIND.tertiary} size={SIZE.compact}>
            Độ sáng
          </Button>
        </StatefulPopover>
        <StatefulTooltip
          placement={PLACEMENT.bottom}
          showArrow={true}
          accessibilityType={"tooltip"}
          content={() => (
            <Block width={"200px"} backgroundColor={"#ffffff"} padding={"20px"}>
              <Block
                $style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <Block $style={{ fontSize: "14px" }}>Độ sáng</Block>
                <Block width={"52px"}>
                  <Input
                    overrides={{
                      Input: {
                        style: {
                          backgroundColor: "#ffffff",
                          textAlign: "center",
                        },
                      },
                      Root: {
                        style: {
                          borderBottomColor: "rgba(0,0,0,0.15)",
                          borderTopColor: "rgba(0,0,0,0.15)",
                          borderRightColor: "rgba(0,0,0,0.15)",
                          borderLeftColor: "rgba(0,0,0,0.15)",
                          borderTopWidth: "1px",
                          borderBottomWidth: "1px",
                          borderRightWidth: "1px",
                          borderLeftWidth: "1px",
                          height: "26px",
                        },
                      },
                      InputContainer: {},
                    }}
                    size={SIZE.mini}
                    onChange={() => {}}
                    value={Math.round(stated.opacity)}
                  />
                </Block>
              </Block>

              <Block>
                <Slider
                  overrides={{
                    InnerThumb: () => null,
                    ThumbValue: () => null,
                    TickBar: () => null,
                    Track: {
                      style: {
                        paddingRight: 0,
                        paddingLeft: 0,
                      },
                    },
                    Thumb: {
                      style: {
                        height: "12px",
                        width: "12px",
                      },
                    },
                  }}
                  min={0}
                  max={100}
                  marks={false}
                  value={[stated.opacity]}
                  // @ts-ignore
                  onChange={({ value }) => onChange(value)}
                />
              </Block>
            </Block>
          )}
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
