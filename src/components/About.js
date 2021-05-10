import { Typography, Container, Button } from "@material-ui/core";
import { useDispatch } from "react-redux";
import { AboutOperation } from "../presenters/About";
export default () => {
  const dispatch = useDispatch();
  return (
    <Container>
      <Typography color="primary" variant="h4">
        MISPについて
      </Typography>
      <Typography color="textSecondary">
        MI塾に通う生徒さん用のポータルアプリです。授業で用いる教材、MI塾からのお知らせ等の置き場にする予定です。
        開発途中のため不具合等あるかもしれませんが、ご了承ください。
      </Typography>
      <Typography>URL: misp.mi-juku.com</Typography>
      <Typography>developed by Y.M</Typography>
      <Button
        variant="outlined"
        onClick={() => dispatch(AboutOperation.onBackToWelcome())}
      >
        戻る
      </Button>
    </Container>
  );
};
