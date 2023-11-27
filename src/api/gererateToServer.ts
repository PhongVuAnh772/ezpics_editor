// export const generateToServer = (datas: any) => {
//   const initialData: any = [];
//   // const scenes = datas.scenes;
//     // console.log(datas[0])
// //     const flattenedArray = datas.flat();
//   datas[0].splice(0, 2);
//  datas.forEach((data:any, index:any) => {
//     if (data[0]?.id === 'background') {
//       data.splice(0,1)
      
//     }
// });
//     console.log(datas)
//   const flattenedArray = datas.flat();
//   console.log(flattenedArray)
// // // In ra kết quả
// // console.log(flattenedArray);
//   // console.log(datas);

//   flattenedArray.map((data: any, index: number) => {
//     console.log(data, index)

//     if (data.type === "StaticImage") {
//       // console.log(data, index);
//       initialData.push({
//         id: data.id,
//         content: {
//           type: "image",
//           text: "Layer 2",
//           color: data.fill,
//           size: ((data.fontSize * 100) / datas?.frame?.width).toString() + 'vw', //
//           font: data.fontFamily,
//           status: 1,
//           text_align: "left",
//           postion_left: (data.left * 100) / datas?.frame?.width, //
//           postion_top: (data.top * 100) / datas?.frame?.height, //
//           brightness: 100, //
//           contrast: 100, //
//           saturate: 100, //
//           opacity: data.opacity, //
//           gachchan: data.underline,
//           uppercase: "none",
//           innghieng: "normal",
//           indam: "normal",
//           linear_position: "to right",
//           border: 0,
//           rotate: "0deg", //
//           banner: data.src, //
//           gianchu: "normal",
//           giandong: "normal",
//           width: data.metadata.initialWidth, //
//           height: data.metadata.initialHeight, //
//           gradient: 0,
//           gradient_color: [],
//           variable: data.metadata.variable,
//           variableLabel: data.metadata.variableLabel,
//           lock: 0,
//           lat_anh: 0, //
//           naturalWidth: data.metadata.naturalWidth,
//           naturalHeight: data.metadata.naturalHeight,
//           image_svg: "",
//           page: data.metadata.page,

//         },
//         sort: index + 1,
//       });
//     } else if (data.type === "StaticText") {
//       // console.log(data, index);
//       initialData.push({
//         id: data.id,
//         content: {
//           type: "text",
//           text: data.text, //
//           color: data.fill, //
//           size: ((data.fontSize * 100) / datas?.frame?.width).toString() + 'vw' , //
//           font: data.fontFamily, //
//           status: 1,
//           text_align: data.textAlign, //
//           postion_left: (data.left * 100) / datas?.frame?.width, //
//           postion_top: (data.top * 100) / datas?.frame?.height, //
//           brightness: 100, //
//           contrast: 100, //
//           saturate: 100, //
//           opacity: data.opacity, //
//           gachchan: data.underline, //
//           uppercase: "none", //
//           innghieng: "normal", //
//           indam: "normal", //
//           linear_position: "to right", //
//           border: 0, //
//           rotate: "0deg", //
//           banner: "",
//           gianchu: "normal", //
//           giandong: "normal", //
//           width: ((data.width * 100) / datas?.frame?.width).toString() + 'vw', 
//           height: "0vh", //
//           gradient: 0,
//           gradient_color: [],
//           variable: data.metadata.variable,
//           variableLabel: data.metadata.variableLabel,
//           lock: data.metadata.lock,
//           lat_anh: 0,
//           naturalWidth:data.metadata.naturalWidth,
//           naturalHeight: data.metadata.naturalHeight
//         },
        
//         sort: index + 1,
//       });
//     }
//   });
//   return initialData;
// };
export const generateToServer = (datas: any) => {
  // Remove the first two elements from the first sub-array
  console.log(datas)
  datas.data[0].splice(0, 2);
  console.log(datas.frame)
  // Remove elements with id 'background' from each sub-array
  datas.data.forEach((data: any) => {
    const indexToRemove = data.findIndex((element: any) => element.id === 'background');
    if (indexToRemove !== -1) {
      data.splice(indexToRemove, 1);
    }
  });

  // Flatten the modified array
  const flattenedArray = datas.data.flat();

  // Rest of your code...
  const initialData: any[] = [];

  flattenedArray.map((data: any, index: number) => {

    if (data.type === "StaticImage") {
      initialData.push({
        id: data.id,
        content: {
          type: "image",
          text: "Layer 2",
          color: data.fill,
          size: ((data.fontSize * 100) / datas?.frame?.width).toString() + 'vw', //
          font: data.fontFamily,
          status: 1,
          text_align: "left",
          postion_left: (data.left * 100) / datas?.frame?.width, //
          postion_top: (data.top * 100) / datas?.frame?.height, //
          brightness: 100, //
          contrast: 100, //
          saturate: 100, //
          opacity: data.opacity, //
          gachchan: data.underline,
          uppercase: "none",
          innghieng: "normal",
          indam: "normal",
          linear_position: "to right",
          border: 0,
          rotate: "0deg", //
          banner: data.src, //
          gianchu: "normal",
          giandong: "normal",
          width: `${(data.scaleX * 100 * data.metadata.naturalWidth ) / datas?.frame?.width}vw`, //
          height: data.metadata.initialHeight, //
          gradient: 0,
          gradient_color: [],
          variable: data.metadata.variable,
          variableLabel: data.metadata.variableLabel,
          lock: 0,
          lat_anh: 0, //
          naturalWidth: data.metadata.naturalWidth,
          naturalHeight: data.metadata.naturalHeight,
          image_svg: "",
          page: Number(data.metadata.page),

        },
        sort: index + 1,
      });
    } else if (data.type === "StaticText") {
      // console.log(data, index);
      initialData.push({
        id: data.id,
        content: {
          type: "text",
          text: data.text, //
          color: data.fill, //
          size: ((data.fontSize * 100) / datas?.frame?.width).toString() + 'vw' , //
          font: data.fontFamily, //
          status: 1,
          text_align: data.textAlign, //
          postion_left: (data.left * 100) / datas?.frame?.width, //
          postion_top: (data.top * 100) / datas?.frame?.height, //
          brightness: 100, //
          contrast: 100, //
          saturate: 100, //
          opacity: data.opacity, //
          gachchan: data.underline, //
          uppercase: "none", //
          innghieng: "normal", //
          indam: "normal", //
          linear_position: "to right", //
          border: 0, //
          rotate: "0deg", //
          banner: "",
          gianchu: "normal", //
          giandong: "normal", //
          width: ((data.width * 100) / datas?.frame?.width).toString() + 'vw', 
          height: "0vh", //
          gradient: 0,
          gradient_color: [],
          variable: data.metadata.variable,
          variableLabel: data.metadata.variableLabel,
          lock: data.metadata.lock,
          lat_anh: 0,
          naturalWidth:data.metadata.naturalWidth,
          naturalHeight: data.metadata.naturalHeight,
          page: Number(data.metadata.page)
        },
        
        sort: index + 1,
      });
    }
  });
  // console.log(initialData)
  return initialData;
};


export const generateToServerSaving = (datas: any) => {
  const initialData: any = [];
  console.log(datas)
  const layers = datas.layers;
  layers.splice(0, 2);
  console.log(datas);

  layers.forEach((data: any, index: number) => {
    // console.log(data, index)

    if (data.type === "StaticImage") {
      console.log(data, index);
      initialData.push({
        id: data.id,
        content: {
          type: "image",
          text: "Layer 2",
          color: data.fill,
          size: ((data.fontSize * 100) / datas?.frame?.width).toString() + 'vw', //
          font: data.fontFamily,
          status: 1,
          text_align: "left",
          postion_left: (data.left * 100) / datas?.frame?.width, //
          postion_top: (data.top * 100) / datas?.frame?.height, //
          brightness: 100, //
          contrast: 100, //
          saturate: 100, //
          opacity: data.opacity, //
          gachchan: data.underline,
          uppercase: "none",
          innghieng: "normal",
          indam: "normal",
          linear_position: "to right",
          border: 0,
          rotate: "0deg", //
          banner: data.src, //
          gianchu: "normal",
          giandong: "normal",
          width: data.metadata.initialWidth, //
          height: data.metadata.initialHeight, //
          gradient: 0,
          gradient_color: [],
          variable: "",
          variableLabel: "",
          lock: 0,
          lat_anh: 0, //
          naturalWidth: data.metadata.naturalWidth,
          naturalHeight: data.metadata.naturalHeight,
          image_svg: ""
        },
        sort: index + 1,
      });
    } else if (data.type === "StaticText") {
      console.log(data, index);
      initialData.push({
        id: data.id,
        content: {
          type: "text",
          text: data.text, //
          color: data.fill, //
          size: ((data.fontSize * 100) / datas?.frame?.width).toString() + 'vw' , //
          font: data.fontFamily, //
          status: 1,
          text_align: data.textAlign, //
          postion_left: (data.left * 100) / datas?.frame?.width, //
          postion_top: (data.top * 100) / datas?.frame?.height, //
          brightness: 100, //
          contrast: 100, //
          saturate: 100, //
          opacity: data.opacity, //
          gachchan: data.underline, //
          uppercase: "none", //
          innghieng: "normal", //
          indam: "normal", //
          linear_position: "to right", //
          border: 0, //
          rotate: "0deg", //
          banner: "",
          gianchu: "normal", //
          giandong: "normal", //
          width: ((data.width * 100) / datas?.frame?.width).toString() + 'vw', 
          height: "0vh", //
          gradient: 0,
          gradient_color: [],
          variable: data.metadata.variable,
          variableLabel: data.metadata.variableLabel,
          lock: 0,
          lat_anh: 0,
        },
        
        sort: index + 1,
      });
    }
  });
  return initialData;
};
