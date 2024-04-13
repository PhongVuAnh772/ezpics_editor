 import {v4 as uuidv4} from 'uuid';  
import jsonData from './initialJSON.json';

const ts = [
  {
    id: "hFlkEBdKmMV4wcxWZJUFa",
    name: "Untitled design",
    frame: {
      width: 1280,
      height: 720,
    },
    metadata: {
      animated: false,
    },
    preview: "https://ik.imagekit.io/scenify/2ZdeFFC6gdlw_LkzDN2J5cHs.png",
    layers: [
      {
        id: "background",
        name: "Initial Frame",
        angle: 0,
        stroke: null,
        strokeWidth: 0,
        left: 0,
        top: 0,
        width: 1280,
        height: 720,
        opacity: 1,
        originX: "left",
        originY: "top",
        scaleX: 1,
        scaleY: 1,
        type: "Background",
        flipX: false,
        flipY: false,
        skewX: 0,
        skewY: 0,
        visible: true,
        shadow: {
          color: "#fcfcfc",
          blur: 4,
          offsetX: 0,
          offsetY: 0,
          affectStroke: false,
          nonScaling: false,
        },
        fill: "#F8E71D",
        metadata: {},
      },
      {
        id: "YgXmiNK_RuATY-xMyNf93",
        name: "StaticImage",
        angle: 0,
        stroke: null,
        strokeWidth: 0,
        left: 0,
        top: 0,
        width: 1280,
        height: 720,
        opacity: 1,
        originX: "left",
        originY: "top",
        scaleX: 1,
        scaleY: 1,
        type: "StaticImage",
        flipX: false,
        flipY: false,
        brightness: 0,
        borderRadius: 0,
        skewX: 0,
        skewY: 0,
        visible: true,
        shadow: null,
        src: "https://images.pexels.com/photos/3493777/pexels-photo-3493777.jpeg?auto=compress&cs=tinysrgb&h=650&w=940",
        cropX: 0,
        cropY: 0,
        metadata: {
          brightness: 20,
        },
      },
      {
        id: "ZFuu3wPmsF-Dp_XF2HE1W",
        name: "StaticText",
        angle: 0,
        stroke: null,
        strokeWidth: 0,
        left: 0,
        top: 0,
        width: 618,
        height: 67.8,
        opacity: 1,
        originX: "left",
        originY: "top",
        scaleX: 1,
        scaleY: 1,
        type: "StaticText",
        flipX: false,
        flipY: false,
        skewX: 0,
        skewY: 0,
        visible: true,
        shadow: null,
        charSpacing: 0,
        fill: "#333333",
        fontFamily: "ComicNeue-Regular",
        fontSize: 60,
        lineHeight: 1.16,
        text: "My awesome template",
        textAlign: "center",
        fontURL:
          "https://fonts.gstatic.com/s/comicneue/v3/4UaHrEJDsxBrF37olUeDx63j5pN1MwI.ttf",
        metadata: {},
      },
    ],
  },
];


function generateLayer(layerType, detail) {
  switch (layerType) {
    case 'text':
      return generateText(detail);
    case 'image':
      return generateFrame(detail);
    // case 'shapeLayer':
    //   return generateShape(detail);
    default:
      console.log("Không nhận dạng được kiểu Layer");
      return getDefaultSerializedLayer();
  }
}
function generateFrame(detail) {
  return {
    type: {
      resolvedName: 'FrameLayer',
    },
    props: {
      text: detail.content.text,
      position: {
        x: detail.content.position_left,
        y: detail.content.position_top,
      },
      boxSize: {
        width: convertValueToPixel(detail.content.width,viewportWidth),
        height: convertValueToPixel(detail.content.height,viewportHeight),
      },
      scale: 1,
      rotate: parseFloat(detail.content.rotate), 
      fonts: [
        {
          name: detail.content.font,
          fonts: [
            {
              urls: [detail.content.banner],
            },
          ],
        },
      ],
      colors: [detail.content.color],
      fontSizes: [parseFloat(detail.content.size)], 
    },
    locked: detail.content.lock,
    child: [],
    parent: 'ROOT', 
  };
}

function getDefaultSerializedLayer() {
  return {
    type: {
      resolvedName: 'DefaultLayer',
    },
    props: {
    },
    locked: false,
    child: [],
    parent: 'ROOT',
  };
}

export function generateDataJSON(data){
  let dataString = [
    {
      locked: false,
      layers: {
        ROOT: {
          type: {
            resolvedName: 'RootLayer',
          },
          props: {
            boxSize: {
              width: data.width,
              height: data.height,
            },
            position: {
              x: 0,
              y: 0,
            },
            rotate: 0,
            color: data.color,
            image: {
               url: data.thumn,
                        thumb: data.thumn,
                        boxSize: {
                            width: data.width,
                            height: data.height,
                        },
                        rotate: 0,
                        position: {
                            x: 0,
                            y: 0,
                        },
            },
          },
          locked: true,
          child: [],
          parent: null,
        },
      },
    },
  ];

  if (data.productDetail && data.productDetail.length > 0) {
    const rootLayer = dataString[0].layers.ROOT;

    data.productDetail.forEach((detail) => {
      const LayerId = uuidv4();

      rootLayer.child.push(LayerId);

      dataString[0].layers[LayerId] = generateLayer(detail.content.type, detail);
    });
  }

  return dataString;
}

console.log(generateDataJSON(jsonData));