import * as React from 'react';
import {render as reactRender} from 'react-dom';
import {createStore} from 'redux';
import {connect, Provider} from 'react-redux';

function view(state : Model) {
  return (<div>count: {state.count}</div>);
}

interface Model {
  count: Number;
}

interface Action {
  type: String;
}

const PersonalSite = connect((state : Model) => state)(view);

function update(state : Model, action: Action) {
  return { count: 1 };
}

export default {
  render(selector: string) {
    const store = createStore(update);

    const app = (
      <Provider store = {store}>
        <PersonalSite />
      </Provider>
    );

    reactRender(app, document.querySelector(selector));
  }
};
