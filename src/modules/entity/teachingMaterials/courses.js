import { createAction, createReducer } from "@reduxjs/toolkit";
import FetchStatus from "../../../consts/FetchStatus";
const initialState = {
  /**@type {string} */
  fetchStatus: FetchStatus.Pending,
  /**@type {string[]}*/
  courseIds: [],
  /**@type {Object<string,{courseId,courseName,courseDescription,courseIconSrc,courseBannerSrc,lessonIds:string[]}>} */
  contents: {}
};
export const coursesGetter = {
  /**@return {string} */
  fetchStatus: (state) => state.entity.teachingMaterials.courses.fetchStatus,
  /**@return {string[]}*/
  courseIds: (state) => state.entity.teachingMaterials.courses.courseIds,
  /**@return {Object<string,{courseId,courseName,courseDescription,courseIconSrc,courseBannerSrc,lessonIds:string[]}>} */
  contents: (state) => state.entity.teachingMaterials.courses.contents
};

export const coursesAction = {
  addCourse: createAction(
    "entity/teachingMaterials/courses/addCourse",
    /**@param {string[]} lessonIds */
    (
      courseId,
      courseName,
      courseDescription,
      courseIconSrc,
      courseBannerSrc,
      lessonIds
    ) => ({
      payload: {
        courseId,
        courseName,
        courseDescription,
        courseIconSrc,
        courseBannerSrc,
        lessonIds
      }
    })
  ),
  clearCourses: createAction("entity/teachingMaterials/courses/clearCourses"),
  setFetchStatus: createAction(
    "entity/teachingMaterials/courses/setFetchStatus",
    (fetchStatus) => ({ payload: fetchStatus })
  )
};

export const coursesReducer = createReducer(initialState, (builder) =>
  builder
    .addCase(coursesAction.addCourse, (state, action) => {
      const {
        courseId,
        courseName,
        courseDescription,
        courseIconSrc,
        courseBannerSrc,
        lessonIds
      } = action.payload;
      state.courseIds.push(courseId);
      state.contents[courseId] = {
        courseId,
        courseName,
        courseDescription,
        courseIconSrc,
        courseBannerSrc,
        lessonIds
      };
    })
    .addCase(coursesAction.clearCourses, (state, action) => {
      state.courseIds = [];
      state.contents = {};
    })
    .addCase(coursesAction.setFetchStatus, (state, action) => {
      state.fetchStatus = action.payload;
    })
);
