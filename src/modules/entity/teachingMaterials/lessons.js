import { createAction, createReducer } from "@reduxjs/toolkit";

const initialState = {
  /**@type {string[]} */
  lessonIds: [],
  /**@type {Object<string,{lessonId,lessonName,lessonEmbeddingSrc,lessonStartsAt:{year,month,date,hour,min}}>} */
  contents: {}
};

export const lessonsGetter = {
  /**@return {string[]} */
  lessonIds: (state) => state.entity.teachingMaterials.lessons.lessonIds,
  /**@return {Object<string,{lessonId,lessonName,lessonEmbeddingSrc,lessonStartsAt:{year,month,date,hour,min}}>} */
  contents: (state) => state.entity.teachingMaterials.lessons.contents
};

export const lessonsAction = {
  addLesson: createAction(
    "entity/teachingMaterials/lessons/addLesson",
    (
      lessonId,
      lessonName,
      lessonEmbeddingSrc,
      lessonStartsYear,
      lessonStartsMonth,
      lessonStartsDate,
      lessonStartsHour,
      lessonStartsMin
    ) => ({
      payload: {
        lessonId,
        lessonName,
        lessonEmbeddingSrc,
        lessonStartsYear,
        lessonStartsMonth,
        lessonStartsDate,
        lessonStartsHour,
        lessonStartsMin
      }
    })
  ),
  clearLessons: createAction("entity/teachingMaterials/lessons/clearLessons")
};

export const lessonsReducer = createReducer(initialState, (builder) =>
  builder
    .addCase(lessonsAction.addLesson, (state, action) => {
      const {
        lessonId,
        lessonName,
        lessonEmbeddingSrc,
        lessonStartsYear,
        lessonStartsMonth,
        lessonStartsDate,
        lessonStartsHour,
        lessonStartsMin
      } = action.payload;
      state.lessonIds.push(lessonId);
      state.contents[lessonId] = {
        lessonId,
        lessonName,
        lessonEmbeddingSrc,
        lessonStartsAt: {
          year: lessonStartsYear,
          month: lessonStartsMonth,
          date: lessonStartsDate,
          hour: lessonStartsHour,
          min: lessonStartsMin
        }
      };
    })
    .addCase(lessonsAction.clearLessons, (state, action) => {
      (state.lessonIds = []), (state.contents = {});
    })
);
