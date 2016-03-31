import * as React from "react";
import { browserHistory, Router, Route } from "react-router";
import { Provider } from "react-redux";
import { store } from "./storage/Store";
import Main from "./components/Main.jsx";
import Search from "./components/Search.jsx";
import Upload from "./components/Upload.jsx";

export default (
  <Provider store={store}>
    <Router history={browserHistory}>
        <Route path="/" component={Main}>
          <Route path="search" component={Search}/>
          <Route path="upload" component={Upload}/>
        </Route>
    </Router>
  </Provider>
);
