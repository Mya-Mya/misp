import { coursesGetter } from "../modules/entity/teachingMaterials/courses";
import { sceneAction } from "../modules/app/scene";
import SceneName from "../consts/SceneName";
import { teachingMaterialsAction } from "../modules/app/teachingMaterials";
import FetchStatus from "../consts/FetchStatus";

export const HomeSelector = {
  getCourses: (state) => {
    const courseIds = coursesGetter.courseIds(state);
    return courseIds.map((cdMasterId) => {
      const content = coursesGetter.contents(state)[cdMasterId];
      return {
        id: content.courseId,
        name: content.courseName,
        iconSrc: content.courseIconSrc,
        bannerSrc: content.courseBannerSrc,
        description: content.courseDescription
      };
    });
  },
  isLoading: (state) =>
    coursesGetter.fetchStatus(state) === FetchStatus.Loading,
  isLastError: (state) =>
    coursesGetter.fetchStatus(state) === FetchStatus.LastError
};
export const HomeOperation = {
  openCourse: (courseId) => {
    return (dispatch) => {
      dispatch(teachingMaterialsAction.setOpeningCourseId(courseId));
      dispatch(sceneAction.setNowScene(SceneName.Course));
    };
  }
};
