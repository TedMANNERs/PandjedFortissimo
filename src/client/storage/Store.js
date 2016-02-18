// import update from "react-addons-update";
import { compose, createStore } from "redux";
import DevTools from "../components/DevTools.jsx";

const initialState = { };

function reducer(state = initialState, action) {
  console.log(action);
  switch (action.type) {

    default: {
      return state;
    }
  }
}

const finalCreateStore = compose(
  DevTools.instrument()
)(createStore);

const store = finalCreateStore(reducer);

export { store };
