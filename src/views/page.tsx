import * as t from '../types';
import * as React from 'react';
import resume from './resume';
import about from './about';

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
    <div>
      {pickView(state.page)(payload)}
    </div>
  );
}

export default pageView;
