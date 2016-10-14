import * as t from '../types';
import * as React from 'react';
import page from './page';

const mainView : t.View = function mainView(payload) {
  const {state, dispatch} = payload;

  return (
    <div>
      {page(payload)}
    </div>
  );
}

export default mainView;
