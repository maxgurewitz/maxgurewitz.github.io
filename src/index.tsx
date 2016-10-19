import * as React from 'react';
import {render as reactRender} from 'react-dom';
import {applyMiddleware, createStore} from 'redux';
import {connect, Provider} from 'react-redux';
import * as t from './types';
import initialView from './views/initial';
import effectManagers from './effect-managers';
import buildInitialState from './build-initial-state';

const PersonalSite = connect((state : t.State) =>
  ({state}), (dispatch : t.MsgDispatch) => ({dispatch}))(initialView);

function updateFromMiddleware(state : t.State, updateAction : t.UpdateAction) {
  return updateAction.type === 'update' ? updateAction.state : state;
}

export default {
  render(selector: string) {
    const store = createStore(updateFromMiddleware, buildInitialState(), applyMiddleware(effectManagers));

    const app = (
      <Provider store = {store}>
        <PersonalSite />
      </Provider>
    );

    reactRender(app, document.querySelector(selector));
  }
};
