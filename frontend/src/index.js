import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { HelmetProvider } from "react-helmet-async";
import { BrowserRouter } from "react-router-dom";

import { Provider } from "react-redux";

import configureStore from './configureStore'
import { rootSaga } from './modules/index'

const store = configureStore()
store.runSaga(rootSaga)

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <HelmetProvider>
        <App />
      </HelmetProvider>
    </BrowserRouter>
  </Provider>,
  document.getElementById("root")
);