import {
  AppBar,
  Box,
  IconButton,
  makeStyles,
  Toolbar,
  Typography
} from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import { LessonOperation, LessonSelector } from "../presenters/Lesson";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";

const useStyles = makeStyles((theme) => ({
  offset: theme.mixins.toolbar
}));

export default () => {
  const lesson = useSelector(LessonSelector.getOpeningLesson);
  const dispatch = useDispatch();
  const classes = useStyles();
  return (
    <Box style={{ height: "99vh" }}>
      <AppBar style={{ position: "fixed", height: "8%" }}>
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            onClick={() => dispatch(LessonOperation.backToCourse())}
          >
            <ArrowBackIcon />
          </IconButton>
          <Typography variant="h5">{lesson.name}</Typography>
        </Toolbar>
      </AppBar>
      <div className={classes.offset} />
      <iframe
        height="92%"
        src={lesson.embeddingUrl}
        style={{ width: "100%", border: "none" }}
      />
    </Box>
  );
};
