import { coursesAction } from "./modules/entity/teachingMaterials/courses";
import { lessonsAction } from "./modules/entity/teachingMaterials/lessons";
import { sceneAction } from "./modules/app/scene";
import SceneName from "./consts/SceneName";
import { teachingMaterialsAction } from "./modules/app/teachingMaterials";
import { get } from "./utils/MispApi";
export default (store) => {
  // teachingMaterialsMock(store);
};
const accountinfoTest = (store) => {
  get("account.info", "admin", "483", { dummy: "dummy" })
    .then((response) => console.log(JSON.stringify(response.data)))
    .catch((e) => console.log(e));
};
const coursedocv3coursesTest = (store) => {
  get("coursedocv3.courses", "admin", "483", { courseIds: ["08"] })
    .then((response) => console.log(JSON.stringify(response.data)))
    .catch((e) => console.log(e));
};
const teachingMaterialsMock = (store) => {
  const dispatch = store.dispatch;
  console.log(store.getState());
  dispatch(
    lessonsAction.addLesson(
      "l1",
      "レッスン1",
      "https://docs.google.com/document/d/e/2PACX-1vQu0mPPezX2FZnTSHTemaPNVUaqczlXhBEX6L4Vrpc7EgI6Dj0Zt3uIg9wHp2hhZEEvCuNabOxbwAmf/pub?embedded=true",
      2021,
      1,
      2,
      16,
      0
    )
  );
  dispatch(
    lessonsAction.addLesson("l2", "レッスン2", "l2emb", 2021, 1, 3, 17, 0)
  );
  dispatch(
    lessonsAction.addLesson("l3", "レッスン3", "l3emb", "", "", "", "", "")
  );
  dispatch(
    lessonsAction.addLesson("l4", "レッスン4", "l4emb", 2021, 1, 4, 18, 0)
  );
  dispatch(
    coursesAction.addCourse(
      "c1",
      "コース1",
      "コース1の説明",
      "https://drive.google.com/uc?export=view&id=1rwaUCnBwe5hNqcY1ybryBe7iZeMrQ5jV&usp=sharing",
      "https://drive.google.com/uc?export=view&id=15nD4i3MvyAOnvK66oqjBKkCx46IM-kzI&usp=sharing",
      ["l1", "l2", "l3"]
    )
  );
  dispatch(
    coursesAction.addCourse(
      "c2",
      "コース2",
      "コース2の説明",
      "c2icon",
      "c2banner",
      ["l4"]
    )
  );
  console.log(store.getState());
  dispatch(teachingMaterialsAction.setOpeningLessonId("l1"));
  dispatch(sceneAction.setNowScene(SceneName.Lesson));
};
