import * as React from "react";
import { browserHistory, Router, Route } from "react-router";
import { Provider } from "react-redux";
import { store } from "./storage/Store";
import Main from "./components/Main.jsx";

export default (
  <Provider store={store}>
    <Router history={browserHistory}>
        <Route path="/" component={Main}>
        </Route>
    </Router>
  </Provider>
);
