import * as t from '../types';
import * as React from 'react';
import main from './main';

const initialView : t.View = function initalView(payload) {
  const initialConfig = {
    viewDepth: 1
  };

  return main({
    dispatch: payload.dispatch,
    state: payload.state,
    config: initialConfig
  });
};

export default initialView;
