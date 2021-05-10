import { createAction, createReducer } from "@reduxjs/toolkit";
import SceneName from "../../consts/SceneName";

const initialState = {
  /**@type {string} */
  now: SceneName.Welcome
};

export const sceneGetter = {
  /**@return {string} */
  now: (state) => state.app.scene.now
};

export const sceneAction = {
  setNowScene: createAction("app/scene/setNowScene", (scene) => ({
    payload: scene
  }))
};

export const sceneReducer = createReducer(initialState, (builder) => {
  builder.addCase(sceneAction.setNowScene, (state, action) => {
    state.now = action.payload;
  });
});
