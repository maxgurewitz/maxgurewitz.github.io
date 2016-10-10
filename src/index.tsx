import * as React from 'react';
import {render as reactRender} from 'react-dom';
import {applyMiddleware, createStore, Dispatch} from 'redux';
import {connect, Provider} from 'react-redux';
import * as t from './types';
import initialView from './views/initial';
import update from './update';
import effectManagers from './effectManagers';

const PersonalSite = connect((state : t.State) =>
  ({state}), (dispatch : Dispatch<t.Input>) => ({dispatch}))(initialView);

export default {
  render(selector: string) {
    const initialState = {
      counter: 1
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
