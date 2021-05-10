import { sceneAction } from "../modules/app/scene";
import SceneName from "../consts/SceneName";
export const AboutOperation = {
  onBackToWelcome: () => sceneAction.setNowScene(SceneName.Welcome)
};
