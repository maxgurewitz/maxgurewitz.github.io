import * as t from '../types';
import * as React from 'react';
import page from './page';
import navbar from './navbar';

const mainView : t.View = function mainView(payload) {
  return (
    <div>
      {navbar(payload)}
      {page(payload)}
    </div>
  );
}

export default mainView;
