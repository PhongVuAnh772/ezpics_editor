import React, { useEffect } from "react";
import ArrowBackOutline from "~/components/Icons/ArrowBackOutline";
import Search from "~/components/Icons/Search";
import { Input, SIZE } from "baseui/input";
import useAppContext from "~/hooks/useAppContext";
import { useStyletron } from "baseui";
import { IStaticText } from "@layerhub-io/types";
import { useEditor } from "@layerhub-io/react";
import { loadFonts } from "~/utils/fonts";
import { SAMPLE_FONTS } from "~/constants/editor";
import { groupBy } from "lodash";
import Scrollable from "~/components/Scrollable";
import { Block } from "baseui/block";
import AngleDoubleLeft from "~/components/Icons/AngleDoubleLeft";
import useSetIsSidebarOpen from "~/hooks/useSetIsSidebarOpen";
import axios from "axios";
import { toast } from "react-toastify";
import { useFont } from "@react-hooks-library/core";
import { useAppSelector } from "~/hooks/hook";

export default function () {
  const [query, setQuery] = React.useState("");
  const { setActiveSubMenu } = useAppContext();
  const setIsSidebarOpen = useSetIsSidebarOpen();

  const [commonFonts, setCommonFonts] = React.useState<any[]>([]);
  const [loadedFonts, setLoadedFonts] = React.useState<any[]>([]);
  const [searchedFonts, setSearchedFonts] = React.useState(commonFonts);
  const token = useAppSelector((state) => state.token.token);
  const [css] = useStyletron();
  const editor = useEditor();
  const networkAPI = useAppSelector((state) => state.network.ipv4Address);
  useEffect(() => {
    const fetchFonts = async () => {
      console.log(networkAPI);
      try {
        const response = await axios.post(`${networkAPI}/listFont`, {
          token: token,
        });
        const data = response.data.data;
        if (data) {
          setCommonFonts(data);
          response.data.data.map(async (font: any) => {
            handleLoadFont(font);
          });
        }
        console.log(response);
        // if (commonFonts.length > 0) {
        //   commonFonts.map(async (font) => {
        //     handleLoadFont(font);
        //   });
        //   console.log(data);
        // }
      } catch (error) {
        console.error("Error fetching fonts:", error);
        toast.error("Lỗi tìm nạp phông chữ, hãy thử lại", {
          position: "top-left",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
      }
    };

    fetchFonts();
  }, []);
  // useEffect(() => {

  // }, [commonFonts]);

  const handleFontFamilyChange = async (x: any) => {
    if (editor) {
      let selectedFont = null;

      if (x.font_ttf) {
        selectedFont = x.font_ttf;
      } else if (x.font_woff) {
        selectedFont = x.font_woff;
      } else if (x.font_woff2) {
        selectedFont = x.font_woff2;
      }
      const font = {
        name: x.name,
        url: selectedFont,
      };
      console.log(font);
      await loadFonts([font]);
      // @ts-ignore
      editor.objects.update<IStaticText>({
        fontFamily: font.name,
        fontURL: font.url,
      });
    }
  };
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
        <Block
          $style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}
          onClick={() => setActiveSubMenu("Text")}
        >
          <ArrowBackOutline size={24} />
          <Block>Chọn kiểu chữ</Block>
        </Block>
        <Block
          onClick={() => setIsSidebarOpen(false)}
          $style={{ cursor: "pointer", display: "flex" }}
        >
          <AngleDoubleLeft size={18} />
        </Block>
      </Block>

      <Block $style={{ padding: "0 1.5rem 1rem" }}>
        <Input
          overrides={{
            Root: {
              style: {
                paddingLeft: "8px",
              },
            },
          }}
          clearable
          onChange={(e) => setQuery((e.target as any).value)}
          placeholder="Tìm kiếm"
          size={SIZE.compact}
          startEnhancer={<Search size={16} />}
        />
      </Block>

      <Scrollable>
        <div style={{ padding: "0 1.5rem", display: "grid", gap: "0.2rem" }}>
          {commonFonts.map((font, index) => {
            return (
              <div
                key={index}
                onClick={() => handleFontFamilyChange(font)}
                className={css({
                  height: "40px",
                  display: "flex",
                  alignItems: "center",
                  cursor: "pointer",
                  fontSize: "14px",
                  paddingBottom: "10px",
                  ":hover": {
                    backgroundColor: "rgb(245,246,247)",
                  },
                })}
                id={font.id}
              >
                <h3
                  // className={css({

                  // })}
                  style={{
                    fontFamily: font.name, // Use useFont here
                    fontWeight: font.weight,
                  }}
                >
                  {font.name} - Dùng là thích
                </h3>
                {/* {font.} */}
              </div>
            );
          })}
        </div>
      </Scrollable>
    </Block>
  );
}
