import { combineReducers } from "redux";

import { coursesReducer } from "./courses";
import { lessonsReducer } from "./lessons";
export default combineReducers({
  courses: coursesReducer,
  lessons: lessonsReducer
});
