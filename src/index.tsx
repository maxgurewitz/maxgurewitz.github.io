import * as React from 'react';
import {render as reactRender} from 'react-dom';
import {createStore} from 'redux';
import {connect, Provider} from 'react-redux';

export default {
  render(selector: string) {
    reactRender(<div>foo</div>, document.querySelector(selector));
  }
};
