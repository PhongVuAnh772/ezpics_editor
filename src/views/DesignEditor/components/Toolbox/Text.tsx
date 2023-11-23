import React from "react";
import { useActiveObject, useEditor } from "@layerhub-io/react";
// import getSelectionType from "~/utils/get-selection-type"
import { Input } from "baseui/input";
import { Block } from "baseui/block";
import { ChevronDown } from "baseui/icon";
import Common from "./Common";
import TextColor from "~/components/Icons/TextColor";
import Bold from "~/components/Icons/Bold";
import Italic from "~/components/Icons/Italic";
import Underline from "~/components/Icons/Underline";
import TextAlignCenter from "~/components/Icons/TextAlignCenter";
import SliderBox from "@mui/material/Slider";
import { Button, SIZE, KIND } from "baseui/button";
import { StatefulTooltip, PLACEMENT } from "baseui/tooltip";
import LetterCase from "~/components/Icons/LetterCase";
import Spacing from "~/components/Icons/Spacing";
import { StatefulPopover } from "baseui/popover";
import TextAlignJustify from "~/components/Icons/TextAlignJustify";
import TextAlignLeft from "~/components/Icons/TextAlignLeft";
import TextAlignRight from "~/components/Icons/TextAlignRight";
import { Slider } from "baseui/slider";
import useAppContext from "~/hooks/useAppContext";
import { FONT_SIZES, SAMPLE_FONTS } from "~/constants/editor";
import getSelectionType from "~/utils/get-selection-type";
import { IStaticText } from "@layerhub-io/types";
import { getTextProperties, getTextPropertiesClone } from "../../utils/text";
import { loadFonts } from "~/utils/fonts";
import Scrollbar from "@layerhub-io/react-custom-scrollbar";
import RotateIcon from "~/components/Icons/RotateIcon";
import axios from "axios";
import { useAppSelector, useAppDispatch } from "~/hooks/hook";
import { toast } from "react-toastify";
import "../../../../../src/components/Loading/Initial.css";
interface TextState {
  color: string;
  bold: boolean;
  italic: boolean;
  underline: boolean;
  family: string;
  styleOptions: StyleOptions;
  boldURL: BoldURL;
}
import { Canvas } from "@layerhub-io/react";


interface StyleOptions {
  hasItalic: boolean;
  hasBold: boolean;
  options: any[];
}

interface BoldURL {
  URL: any[];
  name: any[];
}

const initialOptions: TextState = {
  family: "CoreLang",
  bold: false,
  italic: false,
  underline: false,
  color: "#00000",
  styleOptions: {
    hasBold: true,
    hasItalic: true,
    options: [],
  },
  boldURL: {
    URL: [],
    name: [],
  },
};
export default function () {
  const [state, setState] = React.useState<TextState>(initialOptions);
  const activeObject = useActiveObject() as Required<IStaticText>;
  const { setActiveSubMenu } = useAppContext();
  const editor = useEditor();
  const networkAPI = useAppSelector((state) => state.network.ipv4Address);
  const [commonFonts, setCommonFonts] = React.useState<any[]>([]);
  const [loadedFonts, setLoadedFonts] = React.useState<any[]>([]);
  const token = useAppSelector((state) => state.token.token);
  const [loading, setLoading] = React.useState<boolean>(false);
  const listFont = useAppSelector(state => state.newFont.font)
  const handleLoadFont = async (x: any) => {
    if (editor) {
      let selectedFont = null;

      if (x.font) {
        selectedFont = {
          name: x.name,
          url: x.font,
        };
      } else if (x.font_woff) {
        selectedFont = {
          name: x.name,
          url: x.font_woff,
        };
      } else if (x.font_woff2) {
        selectedFont = {
          name: x.name,
          url: x.font_woff2,
        };
      } else if (x.font_otf) {
        selectedFont = {
          name: x.name,
          url: x.font_otf,
        };
      } else if (x.font_ttf) {
        selectedFont = {
          name: x.name,
          url: x.font_ttf,
        };
      }

      if (selectedFont) {
        await loadFonts([selectedFont]);
        // @ts-ignore
        // editor.objects.update<IStaticText>({
        //   fontFamily: x.name,
        //   fontURL: selectedFont.url,
        // });
      }
    }
  };

  React.useEffect(() => {
    if (activeObject && activeObject.type === "StaticText") {
      const textProperties = getTextPropertiesClone(activeObject, commonFonts);
      console.log(textProperties, activeObject, commonFonts);

      setState({ ...state, ...textProperties });
    }
  }, [activeObject]);

  React.useEffect(() => {
    let watcher = async () => {
      if (activeObject && activeObject.type === "StaticText") {
        const textProperties = getTextPropertiesClone(
          activeObject,
          commonFonts
        );
        console.log(textProperties, activeObject, commonFonts);
      }
    };
    if (editor) {
          console.log(listFont)

      editor.on("history:changed", watcher);
    }
    return () => {
      if (editor) {
        editor.off("history:changed", watcher);
      }
    };
  }, [editor, activeObject]);

  const makeBold = React.useCallback(async () => {
   editor.objects.canvas._originalCanvasStyle.fontSize = "100px"
    console.log(editor.objects.canvas)
  }, [editor, state]);

  const makeItalic = React.useCallback(async () => {
    editor.objects.update({underline: true})
  }, [editor, state]);

  const makeUnderline = React.useCallback(() => {
    editor.objects.update({
      underline: !state.underline,
    });
    setState({ ...state, underline: !state.underline });
  }, [editor, state,commonFonts]);
  return (
    <>
      <Block
        $style={{
          flex: 1,
          display: "flex",
          alignItems: "center",
          padding: "0 12px",
          justifyContent: "space-between",
        }}
      >
        <Block display={"flex"} gridGap="0.5rem" alignItems={"center"}>
          <Block
            onClick={() => setActiveSubMenu("FontSelector")}
            $style={{
              border: "1px solid rgb(185,185,185)",
              borderRadius: "4px",
              padding: "0.2rem 0.45rem",
              cursor: "pointer",
              fontWeight: 500,
              fontSize: "14px",
              gap: "0.5rem",
            }}
            height={"24px"}
            display={"flex"}
            alignItems={"center"}
          >
            <Block>{state.family}</Block>
            <Block display={"flex"}>
              <ChevronDown size={22} />
            </Block>
          </Block>

          <TextFontSize />
          <Block display={"flex"} alignItems={"center"}>
            <StatefulTooltip
              placement={PLACEMENT.bottom}
              showArrow={true}
              accessibilityType={"tooltip"}
              content="Text color"
            >
              <Button
                onClick={() => setActiveSubMenu("TextFill")}
                size={SIZE.mini}
                kind={KIND.tertiary}
              >
                <TextColor color={state.color} size={22} />
              </Button>
            </StatefulTooltip>

            <StatefulTooltip
              placement={PLACEMENT.bottom}
              showArrow={true}
              accessibilityType={"tooltip"}
              content="In đậm"
            >
              <Button
                $style={{ ...(!state.bold && { color: "rgb(169,169,169)" }) }}
                // disabled={!state.styleOptions.hasBold}
                onClick={makeBold}
                size={SIZE.mini}
                kind={KIND.tertiary}
              >
                <Bold size={20} />
              </Button>
            </StatefulTooltip>

            <StatefulTooltip
              placement={PLACEMENT.bottom}
              showArrow={true}
              accessibilityType={"tooltip"}
              content="In nghiêng"
            >
              <Button
                $style={{ ...(!state.italic && { color: "rgb(169,169,169)" }) }}
                // disabled={!state.styleOptions.hasItalic}
                onClick={makeItalic}
                size={SIZE.mini}
                kind={KIND.tertiary}
              >
                <Italic size={20} />
              </Button>
            </StatefulTooltip>

            <StatefulTooltip
              placement={PLACEMENT.bottom}
              showArrow={true}
              accessibilityType={"tooltip"}
              content="Gạch dòng"
            >
              <Button
                $style={{
                  ...(!state.underline && { color: "rgb(169,169,169)" }),
                }}
                onClick={makeUnderline}
                size={SIZE.mini}
                kind={KIND.tertiary}
              >
                <Underline size={24} />
              </Button>
            </StatefulTooltip>

            <TextLetterCase />

            <Block
              width={"1px"}
              height={"24px"}
              backgroundColor="rgb(213,213,213)"
              margin={"0 4px"}
            />

            <TextAlign />

            <Block
              width={"1px"}
              height={"24px"}
              backgroundColor="rgb(213,213,213)"
              margin={"0 4px"}
            />

            <TextSpacing />
            <Block
              width={"1px"}
              height={"24px"}
              backgroundColor="rgb(213,213,213)"
              margin={"0 4px"}
            />
            {/* <Button size={SIZE.compact} kind={KIND.tertiary}>
            Hiệu ứng
          </Button> */}
            <Rotating />
            <Block
              width={"1px"}
              height={"24px"}
              backgroundColor="rgb(213,213,213)"
              margin={"0 4px"}
            />
            {/* <Button size={SIZE.compact} kind={KIND.tertiary}>
            Animate
          </Button> */}
            <EditWord />
            <Block
              width={"1px"}
              height={"24px"}
              backgroundColor="rgb(213,213,213)"
              margin={"0 4px"}
            />
            {/* <Button size={SIZE.compact} kind={KIND.tertiary}>
            Animate
          </Button> */}
            <TransitionElement />
            <Block
              width={"1px"}
              height={"24px"}
              backgroundColor="rgb(213,213,213)"
              margin={"0 4px"}
            />
            {/* <Button size={SIZE.compact} kind={KIND.tertiary}>
            Animate
          </Button> */}
            <ModifyLength />
          </Block>
        </Block>
        <Common />
      </Block>
      {/* {loading && (
        // <div className="content-bg">
        <div className="contentupload">
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
        // </div>
      )} */}
    </>
  );
}

function TextFontSize() {
  const editor = useEditor();
  const activeObject = useActiveObject();
  const [value, setValue] = React.useState(12);

  React.useEffect(() => {
    // @ts-ignore
    if (activeObject && activeObject.type === "StaticText") {
      // @ts-ignore
      setValue(activeObject.fontSize);
    }
  }, [activeObject]);
  const onChange = (size: number) => {
    editor.objects.update({ fontSize: size });
    setValue(size);
  };

  return (
    <StatefulPopover
      content={({ close }) => (
        <Scrollbar style={{ height: "320px", width: "90px" }}>
          <Block backgroundColor={"#ffffff"} padding={"10px 0"}>
            {FONT_SIZES.map((size, index) => (
              <Block
                onClick={() => {
                  onChange(size);
                  close();
                }}
                $style={{
                  height: "32px",
                  fontSize: "14px",
                  cursor: "pointer",
                  padding: "0 20px",
                  display: "flex",
                  alignItems: "center",
                  ":hover": {
                    background: "rgb(243,243,243)",
                  },
                }}
                key={index}
              >
                {size}
              </Block>
            ))}
          </Block>
        </Scrollbar>
      )}
    >
      <Block width={"80px"}>
        <Input
          value={value}
          onChange={(e: any) => onChange(e.target.value)}
          endEnhancer={<ChevronDown size={22} />}
          overrides={{
            Input: {
              style: {
                backgroundColor: "#ffffff",
                paddingRight: 0,
                fontWeight: 500,
                fontFamily: "Uber Move Text",
                fontSize: "14px",
              },
            },
            EndEnhancer: {
              style: {
                paddingRight: "8px",
                paddingLeft: 0,
                backgroundColor: "#ffffff",
              },
            },
            Root: {
              style: {
                paddingRight: 0,
                borderTopWidth: "1px",
                borderBottomWidth: "1px",
                borderRightWidth: "1px",
                borderLeftWidth: "1px",
                borderBottomColor: "rgb(185,185,185)",
                borderTopColor: "rgb(185,185,185)",
                borderRightColor: "rgb(185,185,185)",
                borderLeftColor: "rgb(185,185,185)",
                borderEndEndRadius: "4px",
                borderTopLeftRadius: "4px",
                borderTopRightRadius: "4px",
                borderStartEndRadius: "4px",
                borderBottomLeftRadius: "4px",
                backgroundColor: "#ffffff",
              },
            },
          }}
          type="number"
          size={SIZE.mini}
        />
      </Block>
    </StatefulPopover>
  );
}

function Rotate() {
  const [state, setState] = React.useState<{ upper: boolean }>({
    upper: false,
  });
  const editor = useEditor();
  return (
    <StatefulTooltip
      placement={PLACEMENT.bottom}
      showArrow={true}
      accessibilityType={"tooltip"}
      content="Định dạng chữ"
    >
      <Button
        onClick={() => {
          if (!state.upper) {
            setState({ upper: true });
            editor.objects.toUppercase();
          } else {
            setState({ upper: false });
            editor.objects.toLowerCase();
          }
        }}
        size={SIZE.mini}
        kind={KIND.tertiary}
      >
        <img
          src="../../../../../assets/rotating.png"
          style={{ width: "15px", height: "15px" }}
        />
      </Button>
    </StatefulTooltip>
  );
}
function TextLetterCase() {
  const [state, setState] = React.useState<{ upper: boolean }>({
    upper: false,
  });
  const [textInput, setTextInput] = React.useState<string>("");
  const activeObject = useActiveObject();
  React.useEffect(() => {
    if (activeObject) {
      // @ts-ignore
      const { charSpacing, lineHeight } = activeObject;
      setTextInput(activeObject?.text);
      console.log(textInput);
    }
  }, [activeObject]);
  let initialText;
  initialText = textInput;
  const editor = useEditor();
  return (
    <StatefulPopover
      showArrow={true}
      placement={PLACEMENT.bottom}
      content={() => (
        <Block
          padding={"12px"}
          backgroundColor={"#ffffff"}
          display={"grid"}
          gridTemplateColumns={"1fr 1fr 1fr"}
          gridGap={"8px"}
        >
          <Button
            onClick={() => {
              // @ts-ignore
              setState({ upper: true });
              editor.objects.toUppercase();
            }}
            kind={KIND.tertiary}
            size={SIZE.mini}
          >
            <img
              src="../../../../../assets/upper.png"
              style={{ width: "18px", height: "auto" }}
            />
          </Button>
          <Button
            onClick={() => {
              // @ts-ignore
              setState({ upper: false });
              editor.objects.toLowerCase();
            }}
            kind={KIND.tertiary}
            size={SIZE.mini}
          >
            <img
              src="../../../../../assets/lower.png"
              style={{ width: "18px", height: "auto" }}
            />
          </Button>
          <Button
            onClick={() => {
              // @ts-ignore
              editor.objects.update({ text: initialText });
            }}
            kind={KIND.tertiary}
            size={SIZE.mini}
          >
            <img
              src="../../../../../assets/initialtext.png"
              style={{ width: "18px", height: "auto" }}
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
          content="Định dạng chữ"
        >
          <Button size={SIZE.mini} kind={KIND.tertiary}>
            <LetterCase size={24} />
          </Button>
        </StatefulTooltip>
      </Block>
    </StatefulPopover>
  );
}
function rotateAngle() {
  const [state, setState] = React.useState<{ upper: boolean }>({
    upper: false,
  });
  const editor = useEditor();
  return (
    <StatefulTooltip
      placement={PLACEMENT.bottom}
      showArrow={true}
      accessibilityType={"tooltip"}
      content="Định dạng chữ"
    >
      <Button
        onClick={() => {
          if (!state.upper) {
            setState({ upper: true });
            editor.objects.toUppercase();
          } else {
            setState({ upper: false });
            editor.objects.toLowerCase();
          }
        }}
        size={SIZE.mini}
        kind={KIND.tertiary}
      >
        <LetterCase size={24} />
      </Button>
    </StatefulTooltip>
  );
}

function TextSpacing() {
  const editor = useEditor();
  const activeObject = useActiveObject();
  const [state, setState] = React.useState<{
    charSpacing: number;
    lineHeight: number;
  }>({ charSpacing: 0, lineHeight: 0 });

  React.useEffect(() => {
    if (activeObject) {
      // @ts-ignore
      const { charSpacing, lineHeight } = activeObject;
      setState({
        ...state,
        charSpacing: charSpacing / 10,
        lineHeight: lineHeight * 10,
      });
    }
  }, [activeObject]);

  const handleChange = (type: string, value: number[]) => {
    if (editor) {
      if (type === "charSpacing") {
        setState({ ...state, [type]: value[0] });

        // @ts-ignore
        editor.objects.update({
          [type]: value[0] * 10,
        });
      } else {
        setState({ ...state, [type]: value[0] });
        // @ts-ignore

        editor.objects.update({
          [type]: value[0] / 10,
        });
      }
    }
  };
  return (
    <StatefulPopover
      showArrow={true}
      placement={PLACEMENT.bottom}
      content={() => (
        <Block
          padding={"12px"}
          width={"200px"}
          backgroundColor={"#ffffff"}
          display={"grid"}
          gridGap={"8px"}
        >
          <Block>
            <Block
              $style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <Block $style={{ fontSize: "14px" }}>Chiều cao dòng chữ</Block>
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
                  value={Math.round(state.lineHeight)}
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
                // step
                marks={false}
                value={[state.lineHeight]}
                onChange={({ value }) => handleChange("lineHeight", value)}
              />
            </Block>
          </Block>
          <Block>
            <Block
              $style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <Block $style={{ fontSize: "14px" }}>Kí tự cách nhau</Block>
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
                  value={Math.round(state.charSpacing)}
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
                min={-20}
                max={100}
                marks={false}
                value={[state.charSpacing]}
                onChange={({ value }) => handleChange("charSpacing", value)}
              />
            </Block>
          </Block>
        </Block>
      )}
    >
      <Block>
        <StatefulTooltip
          placement={PLACEMENT.bottom}
          showArrow={true}
          accessibilityType={"tooltip"}
          content="Chỉnh chiều cao/ Cách đều"
        >
          <Button size={SIZE.mini} kind={KIND.tertiary}>
            <Spacing size={24} />
          </Button>
        </StatefulTooltip>
      </Block>
    </StatefulPopover>
  );
}

const TEXT_ALIGNS = ["left", "center", "right", "justify"];

function TextAlign() {
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
            isSelected={state.align === TEXT_ALIGNS[0]}
            onClick={() => {
              // @ts-ignore
              editor.objects.update({ textAlign: TEXT_ALIGNS[0] });
              setState({ align: TEXT_ALIGNS[0] });
            }}
            kind={KIND.tertiary}
            size={SIZE.mini}
          >
            <TextAlignLeft size={24} />
          </Button>
          <Button
            isSelected={state.align === TEXT_ALIGNS[1]}
            onClick={() => {
              // @ts-ignore
              editor.objects.update({ textAlign: TEXT_ALIGNS[1] });
              setState({ align: TEXT_ALIGNS[1] });
            }}
            kind={KIND.tertiary}
            size={SIZE.mini}
          >
            <TextAlignCenter size={24} />
          </Button>
          <Button
            isSelected={state.align === TEXT_ALIGNS[2]}
            onClick={() => {
              // @ts-ignore
              editor.objects.update({ textAlign: TEXT_ALIGNS[2] });
              setState({ align: TEXT_ALIGNS[2] });
            }}
            kind={KIND.tertiary}
            size={SIZE.mini}
          >
            <TextAlignRight size={24} />
          </Button>
          <Button
            isSelected={state.align === TEXT_ALIGNS[3]}
            onClick={() => {
              // @ts-ignore
              editor.objects.update({ textAlign: TEXT_ALIGNS[3] });
              setState({ align: TEXT_ALIGNS[3] });
            }}
            kind={KIND.tertiary}
            size={SIZE.mini}
          >
            <TextAlignJustify size={24} />
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
          content="Căn lề"
        >
          <Button size={SIZE.mini} kind={KIND.tertiary}>
            <TextAlignCenter size={24} />
          </Button>
        </StatefulTooltip>
      </Block>
    </StatefulPopover>
  );
}

function Rotating() {
  const editor = useEditor();
  const activeObject = useActiveObject();
  const [state, setState] = React.useState<{
    charSpacing: number;
    lineHeight: number;
  }>({ charSpacing: 0, lineHeight: 0 });
  const [angle, setAngle] = React.useState<number>(0);

  React.useEffect(() => {
    if (activeObject) {
      // @ts-ignore
      const { charSpacing, lineHeight } = activeObject;
      setState({
        ...state,
        charSpacing: charSpacing / 10,
        lineHeight: lineHeight * 10,
      });
    }
  }, [activeObject]);

  const handleChange = (type: string, value: number[]) => {
    if (editor) {
      if (type === "charSpacing") {
        setState({ ...state, [type]: value[0] });

        // @ts-ignore
        editor.objects.update({
          [type]: value[0] * 10,
        });
      } else {
        setState({ ...state, [type]: value[0] });
        // @ts-ignore

        editor.objects.update({
          [type]: value[0] / 10,
        });
      }
    }
  };
    const [sliderValue, setSliderValue] = React.useState(0);

  const handleSliderChange = (event: Event, newValue: number | number[]) => {
    setSliderValue(newValue as number);
    console.log(sliderValue);
    // editor.objects.update({ scaleX: sliderValue, scaleY: sliderValue });
    setAngle(newValue);
                  editor.objects.update({ angle: newValue });
  };
  return (
    <StatefulPopover
      showArrow={true}
      placement={PLACEMENT.bottom}
      content={() => (
        <Block
          padding={"12px"}
          width={"200px"}
          backgroundColor={"#ffffff"}
          display={"grid"}
          gridGap={"8px"}
        >
          <Block>
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
              {/* <SliderBox
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
                // step
                marks={false}
                value={[angle]}
                // handleChange("lineHeight", value)
                onChange={({ value }) => {
                  setAngle(value);
                  editor.objects.update({ angle: value });
                }}
              /> */}
              <SliderBox
                  aria-label="Volume"
                  defaultValue={1}
                  // getAriaValueText={valuetext}
                  step={1}
                  marks
                  min={0}
                max={360}
                  onChangeCommitted={handleSliderChange}
                  valueLabelDisplay="auto"
                />
            </Block>
          </Block>
        </Block>
      )}
    >
      <Block>
        <StatefulTooltip
          placement={PLACEMENT.bottom}
          showArrow={true}
          accessibilityType={"tooltip"}
          content="Xoay góc"
        >
          <Button size={SIZE.mini} kind={KIND.tertiary}>
            <img
              src="../../../../../assets/rotating.png"
              style={{ width: "15px", height: "15px" }}
            />
          </Button>
        </StatefulTooltip>
      </Block>
    </StatefulPopover>
  );
}

function EditWord() {
  const editor = useEditor();
  const activeObject = useActiveObject();
  const [state, setState] = React.useState<{
    charSpacing: number;
    lineHeight: number;
  }>({ charSpacing: 0, lineHeight: 0 });
  const [textInput, setTextInput] = React.useState<string>("");

  React.useEffect(() => {
    if (activeObject) {
      // @ts-ignore
      const { charSpacing, lineHeight } = activeObject;
      setState({
        ...state,
        charSpacing: charSpacing / 10,
        lineHeight: lineHeight * 10,
      });
      setTextInput(activeObject?.text);
      console.log(textInput);
    }
  }, [activeObject]);

  const handleChange = (type: string, value: number[]) => {
    if (editor) {
      if (type === "charSpacing") {
        setState({ ...state, [type]: value[0] });

        // @ts-ignore
        editor.objects.update({
          [type]: value[0] * 10,
        });
      } else {
        setState({ ...state, [type]: value[0] });
        // @ts-ignore

        editor.objects.update({
          [type]: value[0] / 10,
        });
      }
    }
  };

  return (
    <StatefulPopover
      showArrow={true}
      placement={PLACEMENT.bottom}
      content={() => (
        <Block
          padding={"12px"}
          width={"200px"}
          backgroundColor={"#ffffff"}
          display={"grid"}
          gridGap={"8px"}
        >
          <Block>
            <Block
              $style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <Block $style={{ fontSize: "14px" }}>Sửa chữ</Block>
            </Block>

            <Block>
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
                onChange={(e: any) => setTextInput(e.target.value)}
                // setTextInput(value)

                value={textInput}
              />
              <Button
                // isSelected={state.align === TEXT_ALIGNS[0]}
                // onClick={() => {
                //   // @ts-ignore
                //   editor.objects.update({ textAlign: TEXT_ALIGNS[0] });
                //   setState({ align: TEXT_ALIGNS[0] });
                // }}
                kind={KIND.tertiary}
                size={SIZE.mini}
                style={{
                  marginTop: "10px",
                  backgroundColor: "rgb(246, 246, 246)",
                }}
                onClick={() => {
                  editor.objects.update({ text: textInput });
                }}
              >
                Tiếp tục
              </Button>
            </Block>
          </Block>
        </Block>
      )}
    >
      <Block>
        <StatefulTooltip
          placement={PLACEMENT.bottom}
          showArrow={true}
          accessibilityType={"tooltip"}
          content="Sửa chữ"
        >
          <Button size={SIZE.mini} kind={KIND.tertiary}>
            <img
              src="../../../../../assets/text.png"
              style={{ width: "15px", height: "15px" }}
            />
          </Button>
        </StatefulTooltip>
      </Block>
    </StatefulPopover>
  );
}

function TransitionElement() {
  const editor = useEditor();
  const activeObject = useActiveObject() as any;
  const [state, setState] = React.useState<{ align: string }>({
    align: "left",
  });
  const [sizeInitial, setSizeInitial] = React.useState({
    width: 0,
    height: 0,
  });
  const [distance, setDistance] = React.useState({
    left: 0,
    top: 0,
  });

  React.useEffect(() => {
    if (activeObject) {
      // @ts-ignore
      setState({ align: activeObject.textAlign });
      // setSizeInitial({
      //   width: activeObject?.width,
      //   height: activeObject?.height,
      // })
      // setDistance({
      //   left: activeObject?.left,
      //   top: activeObject?.top
      // })
      // console.log(sizeInitial,distance)
    }
  }, [activeObject]);
  React.useEffect(() => {
    if (activeObject) {
      setSizeInitial({
        width: activeObject.width,
        height: activeObject.height,
      });
      // setDistance({
      //   left: activeObject.left,
      //   top: activeObject.top,
      // });
      console.log(distance, sizeInitial);
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
            onClick={() => {
              // @ts-ignore
              editor.objects.update({ left: distance.left - 20 });
              setDistance({ ...distance, left: distance.left - 20 });
            }}
            kind={KIND.tertiary}
            size={SIZE.mini}
          >
            <img
              src="../../../../../assets/moveleft.png"
              style={{ width: "15px", height: "15px" }}
            />
          </Button>
          <Button
            onClick={() => {
              // @ts-ignore
              editor.objects.update({ left: distance.left + 20 });
              setDistance({ ...distance, left: distance.left + 20 });
            }}
            kind={KIND.tertiary}
            size={SIZE.mini}
          >
            <img
              src="../../../../../assets/moveright.png"
              style={{ width: "30px", height: "auto" }}
            />
          </Button>
          <Button
            onClick={() => {
              // @ts-ignore
              editor.objects.update({ top: distance.top + 20 });
              setDistance({ ...distance, top: distance.top + 20 });
            }}
            kind={KIND.tertiary}
            size={SIZE.mini}
          >
            <img
              src="../../../../../assets/movebottom.png"
              style={{ width: "15px", height: "auto" }}
            />
          </Button>
          <Button
            onClick={() => {
              // @ts-ignore
              editor.objects.update({ top: distance.top - 20 });
              setDistance({ ...distance, top: distance.top - 20 });
            }}
            kind={KIND.tertiary}
            size={SIZE.mini}
          >
            <img
              src="../../../../../assets/movetop.png"
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
          content="Di chuyển"
        >
          <Button size={SIZE.mini} kind={KIND.tertiary}>
            <img
              src="../../../../../assets/move.png"
              style={{ width: "14px", height: "14px" }}
            />
          </Button>
        </StatefulTooltip>
      </Block>
    </StatefulPopover>
  );
}

function ModifyLength() {
  const editor = useEditor();
  const activeObject = useActiveObject();
  const [state, setState] = React.useState<{
    charSpacing: number;
    lineHeight: number;
  }>({ charSpacing: 0, lineHeight: 0 });
  const [sizeInitial, setSizeInitial] = React.useState({
    width: 0,
    height: 0,
  });
  React.useEffect(() => {
    if (activeObject) {
      // @ts-ignore
      const { charSpacing, lineHeight } = activeObject;
      setState({
        ...state,
        charSpacing: charSpacing / 10,
        lineHeight: lineHeight * 10,
      });
      setSizeInitial({
        width: activeObject?.width,
        height: activeObject?.height,
      });
    }
  }, [activeObject]);

  const handleChange = (type: string, value: number[]) => {
    if (editor) {
      if (type === "charSpacing") {
        setState({ ...state, [type]: value[0] });

        // @ts-ignore
        editor.objects.update({
          [type]: value[0] * 10,
        });
      } else {
        setState({ ...state, [type]: value[0] });
        // @ts-ignore

        editor.objects.update({
          [type]: value[0] / 10,
        });
      }
    }
  };
  const [sliderValue, setSliderValue] = React.useState(0.00000005);
  function valuetext(value: number) {
    return `${value}°C`;
  }
  const handleSliderChange = (event: Event, newValue: number | number[]) => {
    setSliderValue(newValue as number);
    console.log(newValue);
    editor.objects.update({ scaleX: newValue, scaleY: newValue });
  };
  return (
    <>
      <StatefulPopover
        showArrow={true}
        placement={PLACEMENT.bottom}
        content={() => (
          <Block
            padding={"12px"}
            width={"200px"}
            backgroundColor={"#ffffff"}
            display={"grid"}
            gridGap={"8px"}
          >
            <Block>
              <Block
                $style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <Block $style={{ fontSize: "14px" }}>Chỉnh kích thước</Block>
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
                  max={2}
                  onChangeCommitted={handleSliderChange}
                  valueLabelDisplay="auto"
                />
              </Block>
            </Block>
          </Block>
        )}
      >
        <Block>
          <StatefulTooltip
            placement={PLACEMENT.bottom}
            showArrow={true}
            accessibilityType={"tooltip"}
            content="Chỉnh kích thước"
          >
            <Button size={SIZE.mini} kind={KIND.tertiary}>
              <img
                src="../../../../../assets/changing-length.png"
                style={{ width: "15px", height: "15px" }}
              />
            </Button>
          </StatefulTooltip>
        </Block>
      </StatefulPopover>
    </>
  );
}
