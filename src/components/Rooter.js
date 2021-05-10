import { Box } from "@material-ui/core";
import { useSelector } from "react-redux";
import { RooterSelector } from "../presenters/Rooter";

import SceneName from "../consts/SceneName";
import Welcome from "./Welcome";
import Home from "./Home";
import Course from "./Course";
import Lesson from "./Lesson";
import About from "./About";

export default () => {
  const now = useSelector(RooterSelector.getNowScene);
  let dom;
  switch (now) {
    case SceneName.Welcome:
      dom = <Welcome />;
      break;
    case SceneName.Home:
      dom = <Home />;
      break;
    case SceneName.Course:
      dom = <Course />;
      break;
    case SceneName.Lesson:
      dom = <Lesson />;
      break;
    case SceneName.About:
      dom = <About />;
      break;
    default:
      break;
  }
  return <Box>{dom}</Box>;
};
