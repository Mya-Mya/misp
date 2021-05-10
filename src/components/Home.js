import {
  Container,
  Button,
  Card,
  CardMedia,
  CardActionArea,
  CardContent,
  Typography,
  CardActions,
  Grid,
  Fade,
  LinearProgress,
  Snackbar,
  Divider
} from "@material-ui/core";
import { useSelector, useDispatch } from "react-redux";
import { HomeOperation, HomeSelector } from "../presenters/Home";

const Course = (name, id, iconSrc, bannerSrc, description, handleClick) => {
  return (
    <Card elevation={3} key={id}>
      <CardActionArea>
        <CardMedia>
          <img src={bannerSrc} alt="" style={{ width: "100%" }} />
        </CardMedia>

        <CardContent>
          <Typography variant="h4">{name}</Typography>
          <Typography color="textSecondary">{description}</Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button color="primary" onClick={() => handleClick()}>
          OPEN
        </Button>
      </CardActions>
    </Card>
  );
};
/**
 * @param {{id:string,name:string,iconSrc:string,bannerSrc:string,description:string}[]}courses
 */
const Courses = (courses, dispatch) => {
  return (
    <Grid container spacing={3}>
      {courses.map((course) => {
        const handleClick = () => dispatch(HomeOperation.openCourse(course.id));

        const card = Course(
          course.name,
          course.id,
          course.iconSrc,
          course.bannerSrc,
          course.description,
          handleClick
        );
        return (
          <Grid item xs={12} sm={6} key={course.id}>
            {card}
          </Grid>
        );
      })}
    </Grid>
  );
};
export default () => {
  console.log();

  const courses = useSelector(HomeSelector.getCourses);
  const dispatch = useDispatch();
  const isLoading = useSelector(HomeSelector.isLoading);
  const isLastError = useSelector(HomeSelector.isLastError);
  return (
    <Container>
      <Fade in={isLoading}>
        <LinearProgress />
      </Fade>
      <Snackbar open={isLastError} message="取得できませんでした" />

      <Typography variant="h5" color="primary">
        コース一覧
      </Typography>
      {Courses(courses, dispatch)}
    </Container>
  );
};
