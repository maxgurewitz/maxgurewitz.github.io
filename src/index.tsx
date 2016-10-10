import * as React from 'react';
import {render as reactRender} from 'react-dom';
import {createStore, Dispatch} from 'redux';
import {connect, Provider} from 'react-redux';
import * as t from './types';

const view : t.View = function view(payload) {
  return (<div> foo </div>);
}

const initialView : t.View = function initalView(payload) {
  const initialConfig = {
    viewDepth: 1
  };

  return view({
    dispatch: payload.dispatch,
    state: payload.state,
    config: initialConfig
  });
}

const PersonalSite = connect((state : t.State) =>
  ({state}), (dispatch : Dispatch<t.Input>) => ({dispatch}))(initialView);

const update : t.Update = function update(state, action) {
  return state;
}

export default {
  render(selector: string) {
    const initialState = {
      counter: 1
    };

    const store = createStore(update, initialState);

    const app = (
      <Provider store = {store}>
        <PersonalSite />
      </Provider>
    );

    reactRender(app, document.querySelector(selector));
  }
};
