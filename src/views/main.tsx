import * as t from '../types';
import * as React from 'react';
import page from './page';
import navbar from './navbar';

const mainStyle = {
  lineHeight: '1.25em',
  overflowY: 'scroll',
  overflowX: 'hidden',
  width: '100%',
  height: '100%',
  right: 0,
  top: 0,
};

const mainView : t.View = function mainView(payload) {
  return (
    <div className="base-view" style={mainStyle}>
      {navbar(payload)}
      {page(payload)}
    </div>
  );
}

export default mainView;
