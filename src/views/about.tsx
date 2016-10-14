import * as t from '../types';
import * as React from 'react';

const aboutView : t.View = function mainView(payload) {
  const {state, dispatch} = payload;

  return (
    <div>
      about content
    </div>
  );
}

export default aboutView;
