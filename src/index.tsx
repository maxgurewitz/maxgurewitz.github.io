import * as React from 'react';
import {render as reactRender} from 'react-dom';
import {createStore} from 'redux';
import {connect, Provider} from 'react-redux';

function increment(dispatch : Dispatch) {
  return () => dispatch({ type: 'increment' });
}


interface ViewPayload {
  state : Model,
  dispatch : Dispatch
}

interface View {
  (payload : ViewPayload) : JSX.Element;
}

const view : View = function view(payload) {
  const {state, dispatch} = payload;

  return (
    <div>
      count: {state.count}
      <button onClick={increment(dispatch)}> increment </button>
    </div>
  );
}

interface Model {
  count: number;
}

interface Action {
  type: string;
}

interface Dispatch {
  (action : Action) : void
}

interface Update {
  (state : Model, action : Action) : Model;
}

interface Cases {
  [index : string] : Update,
  default : Update
}

const INITIAL_STATE : Model = { count: 1 };

const PersonalSite = connect((state : Model) => ({state}), (dispatch : Dispatch) => ({dispatch}))(view);

function update(state : Model, action: Action) {
  const cases : Cases = {
    increment: (state : Model) => ({ count: state.count + 1 }),
    default: (state : Model) => state
  };

  const updateCase : Update = cases[action.type] || cases.default;

  return updateCase(state, action);
}

export default {
  render(selector: string) {
    const store = createStore(update, INITIAL_STATE);

    const app = (
      <Provider store = {store}>
        <PersonalSite />
      </Provider>
    );

    reactRender(app, document.querySelector(selector));
  }
};
