import SceneName from "../consts/SceneName";
import { sceneAction } from "../modules/app/scene";
import { teachingMaterialsGetter } from "../modules/app/teachingMaterials";
import { lessonsGetter } from "../modules/entity/teachingMaterials/lessons";
export const LessonSelector = {
  getOpeningLesson: (state) => {
    const lessonId = teachingMaterialsGetter.openingLessonId(state);
    const content = lessonsGetter.contents(state)[lessonId];
    return {
      embeddingUrl: content.lessonEmbeddingSrc,
      name: content.lessonName
    };
  }
};
export const LessonOperation = {
  backToCourse: () => sceneAction.setNowScene(SceneName.Course)
};
