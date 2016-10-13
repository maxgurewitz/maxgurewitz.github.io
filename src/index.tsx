import * as React from 'react';
import {render as reactRender} from 'react-dom';
import {applyMiddleware, createStore} from 'redux';
import {connect, Provider} from 'react-redux';
import * as t from './types';
import initialView from './views/initial';
import effectManagers from './effect-managers';

const initialState : t.State = {
  counter: 1,
  isPlaying: false,
  msgHistory: []
};

const PersonalSite = connect((state : t.State) =>
  ({state}), (dispatch : t.MsgDispatch) => ({dispatch}))(initialView);

function updateFromMiddleware(state : t.State, updateAction : t.UpdateAction) {
  return updateAction.type === 'update' ? updateAction.state : state || initialState;
}

export default {
  render(selector: string) {
    const store = createStore(updateFromMiddleware, applyMiddleware(effectManagers));

    const app = (
      <Provider store = {store}>
        <PersonalSite />
      </Provider>
    );

    reactRender(app, document.querySelector(selector));
  }
};
