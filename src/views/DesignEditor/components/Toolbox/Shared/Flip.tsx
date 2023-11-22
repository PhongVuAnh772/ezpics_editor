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
import Box from "@mui/material/Box";
import SliderBox from "@mui/material/Slider";
import axios from "axios";
import { useAppSelector } from "~/hooks/hook";

export default function () {
  const editor = useEditor();
  const activeObject = useActiveObject() as any;
  const [state, setState] = React.useState({ flipX: false, flipY: false });
  const [stated, setStated] = React.useState({ opacity: 1 });
  const networkAPI = useAppSelector((state) => state.network.ipv4Address);
  const [angle, setAngle] = React.useState(0);
  const [sizeInitial, setSizeInitial] = React.useState({
    width: 0,
    height: 0,
  });
  const [distance, setDistance] = React.useState({
    left: 0,
    top: 0,
  });
  const [scale, setScale] = React.useState({
    scaleX: 0,
    scaleY: 0,
  });

  const token = useAppSelector((state) => state.token.token);
  React.useEffect(() => {
    if (activeObject) {
      setState({
        flipX: activeObject.flipX,
        flipY: activeObject.flipY,
      });
      setAngle(activeObject.angle);
      setSizeInitial({
        width: activeObject.width,
        height: activeObject.height,
      });
      setDistance({
        left: activeObject.left,
        top: activeObject.top,
      });
      setScale({
        scaleX: Math.abs(activeObject.scaleX),
        scaleY: Math.abs(activeObject.scaleX),
      });
      console.log(distance, sizeInitial);
    }
  }, [activeObject]);

  // Gọi hàm với URL blob và tên khóa tùy chọn
  // var imageUrl = 'URL_CUA_IMAGE_BLOB';
  // var storageKey = 'ten_khoa_luu';
  // saveBlobImageToLocal(imageUrl, storageKey);

  const flipHorizontally = React.useCallback(() => {
    editor.objects.update({ flipX: !state.flipX });
    setState({ ...state, flipX: !state.flipX });
  }, [editor, state]);
  async function urlToImageFile(imageUrl: string, fileName: string) {
    try {
      const response = await fetch(imageUrl);
      const blob = await response.blob();

      const imageFile = new File([blob], fileName, { type: blob.type });

      return imageFile;
    } catch (error) {
      console.error("Error: ", error);
      return null;
    }
  }
  const removeBackground = async (storageKey: string) => {
    // console.log(activeObject);
    const srcAttributeValue = activeObject._element.getAttribute("src");

    // fetch(srcAttributeValue)
    //   .then((response) => response.blob())
    //   .then((blob) => {
    //     return new Promise<any>((resolve, reject) => {
    //       const reader = new FileReader();
    //       reader.onload = () => resolve(reader.result);
    //       reader.onerror = reject;
    //       reader.readAsDataURL(blob);
    //     });
    //   })
    //   .then(async (base64Data) => {
    //     localStorage.setItem(storageKey, base64Data);
    //     console.log(
    //       "Hình ảnh đã được lưu vào local storage với khóa: " + storageKey
    //     );
    //     console.log(token);
    //     console.log(base64Data);
    //     const response = await axios.post<any>(
    //       `${networkAPI}/removeBackgroundImageAPI`,
    //       {
    //         token: token,
    //         image: base64Data,
    //       }
    //       // {
    //       //   headers: {
    //       //     "Access-Control-Allow-Origin": "*",
    //       //     "Access-Control-Allow-Methods": "*",
    //       //     "Access-Control-Allow-Headers": "*",
    //       //     "Content-Type": "application/json",
    //       //   },
    //       // }
    //     );

    //     console.log(response.data);
    //   })
    //   .catch((error) => {
    //     console.error("Lỗi xảy ra: ", error);
    //   });
    urlToImageFile(srcAttributeValue, "image-local.png").then(
      async (imageFile: File | null) => {
        if (imageFile) {
          console.log("Image File:", imageFile);
          const response = await axios.post<any>(
            `${networkAPI}/removeBackgroundImageAPI`,
            {
              token: token,
              image: imageFile,
              headers: {
                // "Access-Control-Allow-Origin": "*",
                // Accept: "application/json",

                "Content-Type": "multipart/form-data",
              },
            }
          );

          console.log(response.data);
        } else {
          console.log("Failed to create the image file.");
        }
      }
    );
  };
  const [sliderValue, setSliderValue] = React.useState(0.00000005);

  const handleSliderChange = (event: Event, newValue: number | number[]) => {
    setSliderValue(newValue as number);
    console.log(newValue);
    editor.objects.update({ scaleX: newValue, scaleY: newValue });
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
  function valuetext(value: number) {
    return `${value}°C`;
  }
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
            Lật ảnh dọc
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
            onClick={flipHorizontally}
          >
            Lật ảnh ngang
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
            onClick={() => removeBackground("storageKey")}
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
                <Block $style={{ fontSize: "14px" }}>Bo góc</Block>
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
            Bo góc
          </Button>
        </StatefulPopover>
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
        {/* <TransitionElement /> */}

        <StatefulPopover
          placement={PLACEMENT.bottomLeft}
          content={() => (
            <Block
              padding={"12px"}
              backgroundColor={"#ffffff"}
              display={"grid"}
              gridTemplateColumns={"1fr 1fr 1fr 1fr"}
              gridGap={"8px"}
            >
              <Button
                // isSelected={state.align === TEXT_ALIGNS[0]}
                // onClick={() => {
                //   // @ts-ignore
                //   editor.objects.update({ textAlign: TEXT_ALIGNS[0] });
                //   setState({ align: TEXT_ALIGNS[0] });
                // }}
                kind={KIND.tertiary}
                size={SIZE.mini}
                onClick={() => {
                  // @ts-ignore
                  editor.objects.update({ left: distance.left - 20 });
                  setDistance({ ...distance, left: distance.left - 20 });
                }}
              >
                <img
                  src="../../../../../../assets/moveleft.png"
                  style={{ width: "15px", height: "15px" }}
                />
              </Button>
              <Button
                // isSelected={state.align === TEXT_ALIGNS[1]}
                onClick={() => {
                  // @ts-ignore
                  editor.objects.update({ left: distance.left + 20 });
                  setDistance({ ...distance, left: distance.left + 20 });
                }}
                kind={KIND.tertiary}
                size={SIZE.mini}
              >
                <img
                  src="../../../../../../assets/moveright.png"
                  style={{ width: "30px", height: "auto" }}
                />
              </Button>
              <Button
                // isSelected={state.align === TEXT_ALIGNS[2]}
                onClick={() => {
                  // @ts-ignore
                  editor.objects.update({ top: distance.top + 20 });
                  setDistance({ ...distance, top: distance.top + 20 });
                }}
                kind={KIND.tertiary}
                size={SIZE.mini}
              >
                <img
                  src="../../../../../../assets/movebottom.png"
                  style={{ width: "15px", height: "auto" }}
                />
              </Button>
              <Button
                // isSelected={state.align === TEXT_ALIGNS[3]}
                // onClick={() => {
                //   // @ts-ignore
                //   editor.objects.update({ textAlign: TEXT_ALIGNS[3] });
                //   setState({ align: TEXT_ALIGNS[3] });
                // }}
                kind={KIND.tertiary}
                size={SIZE.mini}
                onClick={() => {
                  // @ts-ignore
                  editor.objects.update({ top: distance.top - 20 });
                  setDistance({ ...distance, top: distance.top - 20 });
                }}
              >
                <img
                  src="../../../../../../assets/movetop.png"
                  style={{ width: "17px", height: "auto" }}
                />
              </Button>
            </Block>
          )}
          returnFocus
          autoFocus
        >
          <Button kind={KIND.tertiary} size={SIZE.compact}>
            Di chuyển
          </Button>
        </StatefulPopover>
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
                <Block $style={{ fontSize: "14px" }}>Kích thước</Block>
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
                    value={sliderValue}
                  />
                </Block>
              </Block>

              <Block>
                <SliderBox
                  aria-label="Volume"
                  defaultValue={1}
                  getAriaValueText={valuetext}
                  step={0.01}
                  marks
                  min={0}
                  max={10}
                  onChangeCommitted={handleSliderChange}
                  valueLabelDisplay="auto"
                />
              </Block>
            </Block>
          )}
        >
          <Button kind={KIND.tertiary} size={SIZE.compact}>
            Chỉnh kích thước
          </Button>
        </StatefulPopover>
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
                <Block $style={{ fontSize: "14px" }}>Xoay góc</Block>
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
                    value={angle}
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
                  max={360}
                  marks={false}
                  value={[angle]}
                  // @ts-ignore
                  onChange={({ value }) => {
                    setAngle(value);
                    editor.objects.update({ angle: value });
                  }}
                />
              </Block>
            </Block>
          )}
        >
          <Button kind={KIND.tertiary} size={SIZE.compact}>
            Xoay góc
          </Button>
        </StatefulPopover>
      </Block>
    </StatefulPopover>
  );
}

function TransitionElement() {
  const editor = useEditor();
  const activeObject = useActiveObject();
  const [state, setState] = React.useState<{ align: string }>({
    align: "left",
  });

  React.useEffect(() => {
    if (activeObject) {
      // @ts-ignore
      setState({ align: activeObject.textAlign });
    }
  }, [activeObject]);
  return (
    <StatefulPopover
      showArrow={true}
      placement={PLACEMENT.bottom}
      content={() => (
        <Block
          padding={"12px"}
          backgroundColor={"#ffffff"}
          display={"grid"}
          gridTemplateColumns={"1fr 1fr 1fr 1fr"}
          gridGap={"8px"}
        >
          <Button
            // isSelected={state.align === TEXT_ALIGNS[0]}
            // onClick={() => {
            //   // @ts-ignore
            //   editor.objects.update({ textAlign: TEXT_ALIGNS[0] });
            //   setState({ align: TEXT_ALIGNS[0] });
            // }}
            kind={KIND.tertiary}
            size={SIZE.mini}
          >
            <img
              src="../../../../../../assets/moveleft.png"
              style={{ width: "15px", height: "15px" }}
            />
          </Button>
          <Button
            // isSelected={state.align === TEXT_ALIGNS[1]}
            // onClick={() => {
            //   // @ts-ignore
            //   editor.objects.update({ textAlign: TEXT_ALIGNS[1] });
            //   setState({ align: TEXT_ALIGNS[1] });
            // }}
            kind={KIND.tertiary}
            size={SIZE.mini}
          >
            <img
              src="../../../../../../assets/moveright.png"
              style={{ width: "30px", height: "auto" }}
            />
          </Button>
          <Button
            // isSelected={state.align === TEXT_ALIGNS[2]}
            // onClick={() => {
            //   // @ts-ignore
            //   editor.objects.update({ textAlign: TEXT_ALIGNS[2] });
            //   setState({ align: TEXT_ALIGNS[2] });
            // }}
            kind={KIND.tertiary}
            size={SIZE.mini}
          >
            <img
              src="../../../../../../assets/movebottom.png"
              style={{ width: "15px", height: "auto" }}
            />
          </Button>
          <Button
            // isSelected={state.align === TEXT_ALIGNS[3]}
            // onClick={() => {
            //   // @ts-ignore
            //   editor.objects.update({ textAlign: TEXT_ALIGNS[3] });
            //   setState({ align: TEXT_ALIGNS[3] });
            // }}
            kind={KIND.tertiary}
            size={SIZE.mini}
          >
            <img
              src="../../../../../../assets/movetop.png"
              style={{ width: "17px", height: "auto" }}
            />
          </Button>
        </Block>
      )}
      returnFocus
      autoFocus
    >
      <Block>
        <StatefulTooltip
          placement={PLACEMENT.bottom}
          showArrow={true}
          accessibilityType={"tooltip"}
        >
          <Button
            size={SIZE.compact}
            kind={KIND.tertiary}
            // onClick={flipHorizontally}
          >
            Lật ảnh ngang
          </Button>
        </StatefulTooltip>
      </Block>
    </StatefulPopover>
  );
}
