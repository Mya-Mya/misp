import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";

import { accountReducer } from "./account";
import { sceneReducer } from "./scene";
import { teachinMaterialsReducer } from "./teachingMaterials";
export default combineReducers({
  account: accountReducer,
  scene: sceneReducer,
  teachingMaterials: teachinMaterialsReducer
});
