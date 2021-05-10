import { sceneGetter } from "../modules/app/scene";

export const RooterSelector = {
  getNowScene: (state) => sceneGetter.now(state)
};
