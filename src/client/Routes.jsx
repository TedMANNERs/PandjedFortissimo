import * as React from "react";
import { Router, Route } from "react-router";
import * as History from "history";
import { Provider } from "react-redux";
import { store } from "./storage/Store";
import Main from "./components/Main.jsx";

const history = History.createHistory();

export default (
  <Provider store={store}>
    <Router history={history}>
        <Route path="/" component={Main}>
        </Route>
    </Router>
  </Provider>
);
