import * as React from "react";
import DevTools from "./DevTools.jsx";

class Main extends React.Component {
  render() {
    return (<div>
      <DevTools />
      <div>
        {this.props.children}
      </div>
    </div>);
  }
}

export default Main;

