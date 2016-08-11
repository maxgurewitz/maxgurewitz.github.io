import * as React from 'react';
import {render as reactRender} from 'react-dom';
import {createStore} from 'redux';
import {connect, Provider} from 'react-redux';
import {Avatar, LinkBlock} from 'rebass';
import {GITHUB_LOGO, HEADSHOT} from './base64Images';
import {assign} from 'lodash';

enum ActionType {
  Increment,
  SwitchPage
}

function increment(dispatch : Dispatch) {
  return () => dispatch({ type: ActionType.Increment });
}

function switchPage(page : Page, dispatch : Dispatch) {
  return () => dispatch({ type: ActionType.SwitchPage, payload: page });
}

interface ViewPayload {
  state : Model,
  dispatch : Dispatch
}

interface View {
  (payload : ViewPayload) : JSX.Element;
}

const navBarStyle = {
  alignItems: 'center',
  borderRadius: '2px',
  boxShadow: '0 8px 17px 0 rgba(0,0,0,0.2),0 6px 20px 0 rgba(0,0,0,0.19)',
  color: 'white',
  display: 'flex',
  height: '3em',
  justifyContent: 'flex-end',
  left: 0,
  margin: 0,
  padding: '0 1em 0 1em',
  position: 'fixed',
  right: 0,
  top: 0,
  zIndex: 10
};

const linkBlockStyle = {
  color: 'black',
  fontWeight: 400,
  textDecoration: 'none'
};

const navItemStyle = {
  padding: '0 .5em 0 .5em',
};

const avatarStyle = {
  borderRadius: '100%',
  marginRight: 'auto',
  maxHeight: '80%',
  maxWidth: '80%'
};

const view : View = function view(payload) {
  const {state, dispatch} = payload;

  return (
    <div>
      <div style={navBarStyle}>
        <img src={HEADSHOT} style={avatarStyle}/>

        <div style={navItemStyle}>
          <a style={linkBlockStyle} onClick={switchPage(Page.About, dispatch)}> about </a>
        </div>

        <div style={navItemStyle}>
          <a style={linkBlockStyle} onClick={switchPage(Page.Resume, dispatch)}> resume </a>
        </div>

        <div style={navItemStyle}>
          <a style={linkBlockStyle} href="https://github.com/maxgurewitz/personal-site-typescript" target="_blank">
            source
          </a>
        </div>
      </div>
    </div>
  );
}

enum Page {
  About,
  Resume
}

interface Model {
  count: number;
  page: Page;
}

interface Action {
  type: ActionType;
  payload?: any;
}

interface Dispatch {
  (action : Action) : void
}

interface Update {
  (state : Model, action : Action) : Model;
}

interface Cases {
  [index : number] : Update,
  default : Update
}

const INITIAL_STATE : Model = {
  count: 1,
  page: Page.About
};

const PersonalSite = connect((state : Model) => ({state}), (dispatch : Dispatch) => ({dispatch}))(view);

const cases : Cases = {
  [ActionType.Increment]: (state : Model) => assign(state, { count: state.count + 1 }),

  [ActionType.SwitchPage]: (state : Model, action : Action) =>
    assign(state, { page: action.payload }),

  default: (state : Model) => state
};

function update(state : Model, action: Action) {
  const updateCase : Update = cases[action.type] || cases.default;

  return updateCase(state, action);
}

export default {
  render(selector: string) {
    const store = createStore(update, INITIAL_STATE);

    const app = (
      <Provider store = {store}>
        <PersonalSite />
      </Provider>
    );

    reactRender(app, document.querySelector(selector));
  }
};
