import * as React from 'react';
import {render as reactRender} from 'react-dom';
import {applyMiddleware, createStore} from 'redux';
import {connect, Provider} from 'react-redux';
import * as t from './types';
import initialView from './views/initial';
import update from './update';
import effectManagers from './effect-managers';

const PersonalSite = connect((state : t.State) =>
  ({state}), (dispatch : t.InputDispatch) => ({dispatch}))(initialView);

export default {
  render(selector: string) {
    const initialState = {
      counter: 1,
      isPlaying: false
    };

    const store = createStore(update, initialState, applyMiddleware(effectManagers));

    const app = (
      <Provider store = {store}>
        <PersonalSite />
      </Provider>
    );

    reactRender(app, document.querySelector(selector));
  }
};
