import * as t from '../types';
import * as React from 'react';

function switchPage(page : t.Page, dispatch : t.MsgDispatch) {
  return () => dispatch({ type: 'switchPage', page});
}

const navbarView : t.View = function navbarView(payload) {
  const {dispatch} = payload;
  return (
    <div>
      <div>
        <div onClick={switchPage('resume', dispatch)}> resume </div>
      </div>

      <div>
        <div onClick={switchPage('about', dispatch)}> about </div>
      </div>
    </div>
  );
}

export default navbarView;
