import * as React from 'react';
import * as t from '../types';
import resume from './resume';
import about from './about';
import {navBarHeight} from '../settings';

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
  }
}

const pageView : t.View = function mainView(payload) {
  const {state} = payload;

  return (
    <div style={contentStyle}>
      {pickView(state.page)(payload)}
    </div>
  );
}

export default pageView;
