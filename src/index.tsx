import * as React from 'react';
import {render as reactRender} from 'react-dom';
import {createStore} from 'redux';
import {connect, Provider} from 'react-redux';
import {Avatar, LinkBlock} from 'rebass';
import {GITHUB_LOGO, HEADSHOT} from './base64Images';
import {assign, cloneDeep} from 'lodash';

enum ActionType {
  SwitchPage
}

enum Page {
  About,
  Resume
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

const navBarHeight = 3;

const navBarStyle = {
  backgroundColor: 'white',
  alignItems: 'center',
  borderRadius: '2px',
  boxShadow: '0 8px 17px 0 rgba(0,0,0,0.2),0 6px 20px 0 rgba(0,0,0,0.19)',
  color: 'white',
  display: 'flex',
  height: `${navBarHeight}em`,
  justifyContent: 'flex-end',
  left: 0,
  margin: 0,
  padding: '0 1em 0 1em',
  position: 'fixed',
  right: 0,
  top: 0,
  zIndex: 10
};

const viewStyle = {
  lineHeight: '1.25em'
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
  borderRadius: '6px',
  marginRight: 'auto',
  maxHeight: '75%',
  maxWidth: '75%',
  alignSelf: 'center'
};

const contentStyle = {
  position: 'absolute',
  width: '100%',
  top: `${navBarHeight * 2}em`
};

const pageContainerStyle = {
  display: 'flex',
  justifyContent: 'space-around',
  width: '66.6%',
  margin: '0 auto'
};

const resumeContainerStyle = assign({}, pageContainerStyle, {
  flexDirection: 'column'
});

const aboutItemStyle = {
  flexGrow: 1,
  width: 0,
};

const imageLinkStyle = {
  display: 'flex',
  marginRight: 'auto',
  height: '100%',
};

const profileImageLinkStyle = {
  flex: 'auto',
};

const profileImageStyle = {
  width: '100%',
  borderRadius: '6px',
  height: 'auto',
};

const textBodyStyle = {
  borderRadius: '0 0 3px 3px',
  borderColor: '#ddd',
  borderStyle: 'solid',
  padding: '2.81em',
  borderWidth: '0 1px 1px 1px',
};

const resumeBodyStyle = assign({}, textBodyStyle, {
  flexGrow: 1
});

const textHeaderStyle = {
  borderRadius: '3px 3px 0 0',
  border: '1px solid #ddd',
  fontWeight: 600,
  backgroundColor: '#f5f5f5',
  fontSize: '14px',
  padding: '.64em .72em .72em',
};

const resumeCategoryHeaderStyle = {
  borderStyle: 'solid',
  borderWidth: '0 0 1px 0',
  borderColor: '#e6e6e6',
  color: '#707070',
  paddingBottom: '.625em'
};

const resumeSectionBodyStyle = {
  paddingTop: '.625em'
};

const jobTitleStyle = {
  fontWeight: 700
};

const jobDatesStyle = {
  fontSize: '85%',
  paddingBottom: '.625em',
  color: '#777'
};

const jobDescriptionStyle = {
  fontSize: '85%',
  paddingBottom: '1.375em',
};

const skillTitleStyle = {
};

const aboutView : View = function aboutView(payload) {
  return (
    <div style={pageContainerStyle}>
      <div style={assign({}, aboutItemStyle, { flexGrow: 1 })}>
        <a style={profileImageLinkStyle} href="https://github.com/maxgurewitz" target="_blank">
          <img src={HEADSHOT} style={profileImageStyle}/>
        </a>
      </div>
      <div style={assign({}, aboutItemStyle, { flexGrow: 3, paddingLeft: '1.25em', borderRadius: '3px' })}>
        <div style={textHeaderStyle}> ABOUT </div>
        <div style={textBodyStyle}>
          Some about me text.
        </div>
      </div>
    </div>
  );
}
          // <div style={skillTitleStyle}>

const resumeView : View = function resumeView(payload) {
  return (
    <div style={resumeContainerStyle}>
      <div style={textHeaderStyle}>
        RESUME
      </div>
      <div style={resumeBodyStyle}>
        <div style={resumeCategoryHeaderStyle}>
          WORK EXPERIENCE
        </div>
        <div style={resumeSectionBodyStyle}>
          <div style={jobTitleStyle}>Software Engineer, Wanelo</div>
          <div style={jobDatesStyle}>July 2014 - April 2015</div>
          <div style={jobDescriptionStyle}>
            Full stack Ruby on Rails engineer.  Played a key role in developing Wanelo's search engine, its transaction system, and its visual layout and design.  Client side work with Backbone.  Helped to build Stripe and Shopify integration.  Utilized technologies include postgres, redis, solr, elastic search, chef etc.
          </div>
        </div>
        <div style={resumeCategoryHeaderStyle}>
          SKILLS
        </div>
        <div style={resumeSectionBodyStyle}>
          <div style={jobTitleStyle}>
            Languages
          </div>
          <div>
            Javascript, Ruby, Python, Java, Scala, Mathematica
          </div>
        </div>
      </div>
    </div>
  );
}

const PageViewCases : Cases<View> = {
  [Page.About]: aboutView,
  [Page.Resume]: resumeView,
  default: aboutView
};

const view : View = function view(payload) {
  const {state, dispatch} = payload;

  return (
    <div style={viewStyle}>
      <div style={navBarStyle}>

        <a style={imageLinkStyle} href="https://github.com/maxgurewitz" target="_blank">
          <img src={HEADSHOT} style={avatarStyle}/>
        </a>

        <div style={navItemStyle}>
          <div style={linkBlockStyle} onClick={switchPage(Page.About, dispatch)}> about </div>
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
      <div style={contentStyle}>
        {evaluateCase(state.page, PageViewCases)(payload)}
      </div>
    </div>
  );
}

interface Model {
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

interface Cases<T> {
  [index : number] : T,
  default : T
}

const INITIAL_STATE : Model = {
  page: Page.Resume
};

const PersonalSite = connect((state : Model) => ({state}), (dispatch : Dispatch) => ({dispatch}))(view);

const updateCases : Cases<Update> = {
  [ActionType.SwitchPage]: (state : Model, action : Action) =>
    assign(state, { page: action.payload }),

  default: (state : Model) => state
};

function evaluateCase<T>(type : number, cases : Cases<T>) : T {
  return cases[type] || cases.default;
}

function update(state : Model, action: Action) : Model {
  return evaluateCase(action.type, updateCases)(cloneDeep(state), action);
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
