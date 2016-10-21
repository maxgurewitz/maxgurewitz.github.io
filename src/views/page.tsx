import * as React from 'react';
import * as t from '../types';
import resume from './resume';
import about from './about';
import analytics  from './analytics';
import {navBarHeight} from '../settings';
import {getViewModel} from '../utils';

const contentStyle = {
  width: '100%',
  paddingTop: `${navBarHeight * 2}em`
} ;

function pickView(page : t.Page) : t.View {
  switch (page) {
    case 'resume':
      return resume;

    case 'about':
      return about;

    case 'analytics':
      return analytics;
  }
}

const pageView : t.View = function mainView(payload) {
  const view = getViewModel(payload);

  return (
    <div style={contentStyle}>
      {pickView(view.page)(payload)}
    </div>
  );
}

export default pageView;
