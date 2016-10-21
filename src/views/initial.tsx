import * as t from '../types';
import * as React from 'react';
import main from './main';

const styles = `
  body {
    font-family: 'Roboto', sans-serif;
    margin: 0;
  }

  div {
    box-sizing: border-box;
  }

  .base-view::-webkit-scrollbar {
    width: 1em;
    height: 1em;
  }

  .base-view::-webkit-scrollbar-thumb {
    background-color: darkgrey;
    outline: 1px solid slategrey;
  }
`;

const initialView : t.View = function initalView(payload) {
  const initialConfig = {
    viewIndex: 0
  };

  const mainContent = main({
    dispatch: payload.dispatch,
    state: payload.state,
    config: initialConfig
  });

  return (
    <div>
      <style>
        { styles }
      </style>
      { mainContent }
    </div>
  );
};

export default initialView;
