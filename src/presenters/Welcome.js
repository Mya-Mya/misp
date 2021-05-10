import axios from "axios";
import { v4 } from "uuid";
import FetchStatus from "../consts/FetchStatus";
import { coursesAction } from "../modules/entity/teachingMaterials/courses";
import { lessonsAction } from "../modules/entity/teachingMaterials/lessons";
import { sceneAction } from "../modules/app/scene";
import { get as postMispApi } from "../utils/MispApi";
import SceneName from "../consts/SceneName";
import { accountAction, accountGetter } from "../modules/app/account";

const onError = () => coursesAction.setFetchStatus(FetchStatus.LastError);

const onCoursedocv3CoursesPostReturned = (result, dispatch) => {
  dispatch(lessonsAction.clearLessons());
  dispatch(coursesAction.clearCourses());
  //複数のコースの解析
  result.forEach((course) => {
    const {
      courseId,
      courseName,
      courseDescription,
      courseIconSrc,
      courseBannerSrc,
      lessons
    } = course;
    let lessonIds = [];
    //複数のレッスンの解析
    lessons.forEach((lesson) => {
      const { lessonName, lessonEmbeddingSrc, lessonStartsAt } = lesson;
      const { year, month, date, hour, min } = lessonStartsAt;
      const lessonId = v4();
      lessonIds.push(lessonId);
      //レッスンを追加
      dispatch(
        lessonsAction.addLesson(
          lessonId,
          lessonName,
          lessonEmbeddingSrc,
          year,
          month,
          date,
          hour,
          min
        )
      );
    });
    //コースを追加
    dispatch(
      coursesAction.addCourse(
        courseId,
        courseName,
        courseDescription,
        courseIconSrc,
        courseBannerSrc,
        lessonIds
      )
    );
  });
  dispatch(coursesAction.setFetchStatus(FetchStatus.Pending));
};

/**@param {string[]} courseIds */
const fetchCoursesData = (name, password, courseIds, dispatch) => {
  dispatch(coursesAction.setFetchStatus(FetchStatus.Loading));
  postMispApi("coursedocv3.courses", name, password, { courseIds })
    .then((response) => {
      const body = response.data;
      const logined = body.logined;
      if (logined === undefined || !logined) {
        //認証に失敗
        dispatch(onError());
      } else {
        //認証に成功
        const result = body.result;
        onCoursedocv3CoursesPostReturned(result, dispatch);
      }
    })
    .catch((e) => {
      dispatch(onError());
    });
};
export const WelcomeSelector = {
  isLoading: (state) =>
    accountGetter.fetchStatus(state) === FetchStatus.Loading,
  isLastError: (state) =>
    accountGetter.fetchStatus(state) === FetchStatus.LastError
};
export const WelcomeOperation = {
  onAboutButtonPushed: () => sceneAction.setNowScene(SceneName.About),
  onLoginButtonPushed: (name, password) => {
    return (dispatch) => {
      dispatch(accountAction.setFetchStatus(FetchStatus.Loading));
      postMispApi("account.info", name, password, {})
        .then((response) => {
          const body = response.data;
          console.log(body);
          //認証に成功しているかどうか
          const logined = body.logined;
          if (logined === undefined || !logined) {
            //認証に失敗
            dispatch(accountAction.setFetchStatus(FetchStatus.LastError));
          } else {
            //認証に成功
            const accountInfo = body.result.accountInfo;
            //名前・パスワード・アカウント情報を保存
            dispatch(accountAction.setName(name));
            dispatch(accountAction.setPassword(password));
            dispatch(accountAction.setInfo(accountInfo));
            //ホーム画面に移動
            dispatch(sceneAction.setNowScene(SceneName.Home));
            console.log("認証に成功 info:" + accountInfo);
            //複数のコースを読み込む
            const courseIds = accountInfo.courseIds;
            fetchCoursesData(name, password, courseIds, dispatch);
          }
        })
        .catch((e) =>
          dispatch(accountAction.setFetchStatus(FetchStatus.LastError))
        );
    };
  }
};
