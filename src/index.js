import { StrictMode } from "react";
import { ThemeProvider } from "@material-ui/core";
import ReactDOM from "react-dom";

import myTheme from "./consts/myTheme";
import Rooter from "./components/Rooter";
import store from "./modules/store";
import { Provider } from "react-redux";

import debug from "./debugger";

const rootElement = document.getElementById("root");

debug(store);

ReactDOM.render(
  <StrictMode>
    <Provider store={store}>
      <ThemeProvider theme={myTheme}>
        <Rooter />
      </ThemeProvider>
    </Provider>
  </StrictMode>,
  rootElement
);
