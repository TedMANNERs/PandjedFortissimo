import * as React from "react";
import { Link } from "react-router";
import DevTools from "./DevTools.jsx";

class Main extends React.Component {
  render() {
    return (<div>
      <DevTools />
        <header>
          <h1>Pandjed Fortissimo</h1>
          <nav className="navigation">
            <Link to="/">Home</Link>
            <Link to="/search">Search</Link>
            <Link to="/upload">Upload</Link>
          </nav>
        </header>
      <div>
        {this.props.children}
      </div>
    </div>);
  }
}

export default Main;

