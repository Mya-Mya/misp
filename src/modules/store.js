import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import thunk from "redux-thunk";

import app from "./app/reducer";
import entity from "./entity/reducer";

const reducer = combineReducers({
  app,
  entity
});

export default configureStore({
  reducer,
  middleware: [thunk]
});
