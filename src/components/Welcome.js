import {
  Button,
  Card,
  CardContent,
  Container,
  makeStyles,
  TextField,
  CardActions,
  Snackbar,
  Typography,
  Fade,
  LinearProgress,
  CardMedia
} from "@material-ui/core";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { WelcomeOperation, WelcomeSelector } from "../presenters/Welcome";

const useStyles = makeStyles((theme) => ({
  vertical: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  }
}));

const LoginCard = () => {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const classes = useStyles();
  const dispatch = useDispatch();
  const iconSrc =
    "https://drive.google.com/uc?export=view&id=1fGgljQwTnjM7_urznYgH4vCNf_j23zI3&usp=sharing";
  return (
    <Card className={classes.vertical}>
      <img src={iconSrc} alt="" style={{ width: "80px" }} />
      <CardContent className={classes.vertical}>
        <Typography color="textSecondary">MI Student Portal</Typography>
        <Typography color="primary" variant="h4">
          ログイン
        </Typography>
      </CardContent>

      <CardActions className={classes.vertical}>
        <TextField
          label="名前"
          value={name}
          onChange={(e) => setName(e.target.value)}
        ></TextField>
        <TextField
          label="パスワード"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        ></TextField>
      </CardActions>

      <CardActions className={classes.vertical}>
        <Button
          variant="contained"
          color="primary"
          onClick={() =>
            dispatch(WelcomeOperation.onLoginButtonPushed(name, password))
          }
        >
          GO
        </Button>
        <Button
          variant="text"
          onClick={() => dispatch(WelcomeOperation.onAboutButtonPushed())}
        >
          このアプリについて
        </Button>
      </CardActions>
    </Card>
  );
};

export default () => {
  const isLoading = useSelector(WelcomeSelector.isLoading);
  const isLastError = useSelector(WelcomeSelector.isLastError);
  const dispatch = useDispatch();
  return (
    <Container>
      <Fade in={isLoading}>
        <LinearProgress />
      </Fade>
      <Snackbar open={isLastError} message="ログインに失敗しました" />
      <LoginCard />
    </Container>
  );
};
