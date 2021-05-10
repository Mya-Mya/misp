import {
  Avatar,
  Box,
  Container,
  Divider,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Typography
} from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import { CourseSelector, CourseOperation } from "../presenters/Course";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
const LessonAbstract = (name, key, startsAtText, handleClick) => (
  <ListItem button onClick={() => handleClick()} key={key}>
    <ListItemText primary={name} secondary={startsAtText} />
  </ListItem>
);

const LessonAbstractList = (lessons, dispatch) => {
  return (
    <List>
      {lessons.map((lesson) =>
        LessonAbstract(lesson.name, lesson.id, lesson.startsAtText, () =>
          dispatch(CourseOperation.openLesson(lesson.id))
        )
      )}
    </List>
  );
};

/**@param {string} name */
const CourseDetail = (name, description, iconSrc, bannerSrc) => (
  <Box>
    <img src={bannerSrc} style={{ width: "100%" }} />
    <Typography variant="h4" align="center">
      {name}
    </Typography>
    <Typography color="textSecondary" align="center">
      {description}
    </Typography>
  </Box>
);
export default () => {
  const lessons = useSelector(CourseSelector.getLessons);
  const course = useSelector(CourseSelector.getOpeningCourse);
  const dispatch = useDispatch();
  return (
    <Container>
      <IconButton
        edge="start"
        color="inherit"
        onClick={() => dispatch(CourseOperation.backToHome())}
      >
        <ArrowBackIcon />
      </IconButton>
      {CourseDetail(
        course.name,
        course.description,
        course.iconSrc,
        course.bannerSrc
      )}
      <Divider />
      {LessonAbstractList(lessons, dispatch)}
    </Container>
  );
};
