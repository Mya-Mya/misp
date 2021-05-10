import { createAction, createReducer } from "@reduxjs/toolkit";

/**
 * 今開いている教材の情報を保持する。
 */
const initialState = {
  /**@type {string} */
  openingCourseId: String(),
  /**@type {string} */
  openingLessonId: String()
};

export const teachingMaterialsGetter = {
  /**@return {string} 開いているコースのID */
  openingCourseId: (state) => state.app.teachingMaterials.openingCourseId,
  /**@return {string} 開いているレッスンのID */
  openingLessonId: (state) => state.app.teachingMaterials.openingLessonId
};

export const teachingMaterialsAction = {
  setOpeningCourseId: createAction(
    "state.app.teachingMaterials.setOpeningCourseId",
    (openingCourseId) => ({ payload: openingCourseId })
  ),
  setOpeningLessonId: createAction(
    "state.app.teachingMaterials.setOpeningLessonId",
    (openingLessonId) => ({ payload: openingLessonId })
  )
};

export const teachinMaterialsReducer = createReducer(initialState, (builder) =>
  builder
    .addCase(teachingMaterialsAction.setOpeningCourseId, (state, action) => {
      state.openingCourseId = action.payload;
    })
    .addCase(teachingMaterialsAction.setOpeningLessonId, (state, action) => {
      state.openingLessonId = action.payload;
    })
);
