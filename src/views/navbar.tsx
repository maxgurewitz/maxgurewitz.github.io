import * as t from '../types';
import * as React from 'react';
import {navBarHeight} from '../settings';
import * as m from '../msg-builders';

function switchPage(page : t.Page, dispatch : t.MsgDispatch) {
  return () => dispatch(m.switchPage(page));
}

const navBarStyle = {
  backgroundColor: 'white',
  alignItems: 'center',
  borderRadius: '.125em',
  boxShadow: '0 .5em 1em 0 rgba(0,0,0,0.2),0 .375em 1.25em 0 rgba(0,0,0,0.19)',
  color: 'white',
  display: 'flex',
  height: `${navBarHeight}em`,
  left: 0,
  margin: 0,
  padding: '0 1em 0 1em',
  position: 'absolute',
  right: 0,
  top: 0,
  zIndex: 10
};

const navItemStyle = {
  padding: '0 .5em 0 .5em',
};

const linkBlockStyle = {
  color: 'black',
  fontWeight: 400,
  textDecoration: 'none'
};

function linkItem(dispatch : t.MsgDispatch, linkName : t.Page, key : number) : JSX.Element {
  return (
    <div key={key} style={navItemStyle}>
      <div style={linkBlockStyle} onClick={switchPage(linkName, dispatch)}> {linkName} </div>
    </div>
  );
};

const navbarView : t.View = function navbarView(payload) {
  const linkItems = ['resume', 'about', 'analytics'].map(linkItem.bind(null, payload.dispatch));

  return (
    <div style={navBarStyle}>
      {linkItems}
    </div>
  );
};

export default navbarView;
