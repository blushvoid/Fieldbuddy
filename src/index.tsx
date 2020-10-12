import React from "react";
import ReactDOM from "react-dom";
import App from "./App";

import { Client as Styletron } from "styletron-engine-atomic";
import { BaseProvider, LightTheme } from "baseui";
import { Provider as StyletronProvider } from "styletron-react";
import { store, StoreContext } from "./store";

const engine = new Styletron();

ReactDOM.render(
  <StoreContext.Provider value={store}>
    <StyletronProvider value={engine}>
      <BaseProvider theme={LightTheme}>
        <App />
      </BaseProvider>
    </StyletronProvider>
  </StoreContext.Provider>,
  document.getElementById("root")
);
