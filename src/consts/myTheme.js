import { createMuiTheme } from "@material-ui/core";
export default createMuiTheme({
  palette: {
    primary: { main: "#216780" },
    secondary: { main: "#f26c38" },
    background: { paper: "#ffffff", default: "#eeeeee" },
    common: { white: "#eeeeee", black: "#434343" },
    text: {
      primary: "#434343",
      secondary: "#666666",
      hint: "#666666",
      disabled: "#aaaaaa"
    }
  }
});
