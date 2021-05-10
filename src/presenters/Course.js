import SceneName from "../consts/SceneName";
import { sceneAction } from "../modules/app/scene";
import {
  teachingMaterialsGetter,
  teachingMaterialsAction
} from "../modules/app/teachingMaterials";
import { coursesGetter } from "../modules/entity/teachingMaterials/courses";
import { lessonsGetter } from "../modules/entity/teachingMaterials/lessons";
const force2DigitText = (data) => {
  const text = String(data);
  return text.length === 1 ? "0" + text : text;
};
const createDateTimeText = (year, month, date, hour, min) => {
  const dateText =
    year !== "" && month !== "" && date !== ""
      ? year + "/" + force2DigitText(month) + "/" + force2DigitText(date) + " "
      : "";
  const timeText =
    hour !== "" && min !== ""
      ? force2DigitText(hour) + ":" + force2DigitText(min)
      : "";
  return dateText + timeText;
};

export const CourseSelector = {
  /**前もってapp.teachingMaterials.openingCourseIdを入力しておく必要がある*/
  getOpeningCourse: (state) => {
    const courseId = teachingMaterialsGetter.openingCourseId(state);
    if (courseId === "") return {};
    const course = coursesGetter.contents(state)[courseId];
    return {
      name: course.courseName,
      description: course.courseDescription,
      iconSrc: course.courseIconSrc,
      bannerSrc: course.courseBannerSrc
    };
  },
  /**
   * 前もってapp.teachingMaterials.openingCourseIdを入力しておく必要がある
   * @return {{id,name,startsYear,startsMonth,startsDate,startsHour,startsMin}[]}
   */
  getLessons: (state) => {
    const courseId = teachingMaterialsGetter.openingCourseId(state);
    if (courseId === "") return {};
    const lessonIds = coursesGetter.contents(state)[courseId].lessonIds;
    return lessonIds.map((lessonId) => {
      const content = lessonsGetter.contents(state)[lessonId];
      const startsAt = content.lessonStartsAt;
      return {
        id: content.lessonId,
        name: content.lessonName,
        startsAtText: createDateTimeText(
          startsAt.year,
          startsAt.month,
          startsAt.date,
          startsAt.hour,
          startsAt.min
        )
      };
    });
  }
};
export const CourseOperation = {
  openLesson: (lessonId) => {
    return (dispatch) => {
      dispatch(teachingMaterialsAction.setOpeningLessonId(lessonId));
      dispatch(sceneAction.setNowScene(SceneName.Lesson));
    };
  },
  backToHome: () => sceneAction.setNowScene(SceneName.Home)
};
