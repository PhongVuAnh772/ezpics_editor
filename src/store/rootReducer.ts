import { combineReducers } from "@reduxjs/toolkit";
import { designEditorReducer } from "./slices/design-editor/reducer";
import { fontsReducer } from "./slices/fonts/reducer";
import { uploadsReducer } from "./slices/uploads/reducer";
import { resourcesReducer } from "./slices/resources/reducer";
import tokenReducer from "./slices/token/reducers";
import networkReducer from "./slices/network/networkSlice";
import fontReducer from "./slices/font/fontSlice";
import typeUserReducer from './slices/type/typeSlice'
import variableReducer from "./slices/variable/variableSlice";

const rootReducer = combineReducers({
  designEditor: designEditorReducer,
  fonts: fontsReducer,
  uploads: uploadsReducer,
  resources: resourcesReducer,
  token: tokenReducer,
  network: networkReducer,
  newFont: fontReducer,
  typeUser: typeUserReducer,
  variable: variableReducer

});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
