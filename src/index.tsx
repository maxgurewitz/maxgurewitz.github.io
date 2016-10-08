import * as React from 'react';
import {render as reactRender} from 'react-dom';
import {createStore, applyMiddleware, MiddlewareAPI} from 'redux';
import {connect, Provider} from 'react-redux';
import {Avatar, LinkBlock} from 'rebass';
import {GITHUB_LOGO, HEADSHOT} from './base-64-images';
import {map, times, merge, cloneDeep, fromPairs} from 'lodash';
import {v4 as uuid} from 'node-uuid';

enum ActionType {
  SwitchPage,
  IncrementChild,
  StartReplay,
  WindowResized
}

enum Page {
  About,
  Analytics,
  Resume
}

function switchPage(page : Page, dispatch : Dispatch) {
  return () => dispatch({ type: ActionType.SwitchPage, payload: { page } });
}

interface ViewConfig {
  viewDepth: number,
  currentView: string
}

interface ViewPayload {
  config : ViewConfig,
  state : State,
  dispatch : Dispatch
}

interface View {
  (payload : ViewPayload) : JSX.Element;
}

const navBarHeight = 3;

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

const viewStyle = {
  lineHeight: '1.25em',
  overflowY: 'scroll',
  overflowX: 'hidden',
  width: '100%',
  height: '100%',
  right: 0,
  top: 0,
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
  borderRadius: '.375em',
  marginRight: 'auto',
  maxHeight: '75%',
  maxWidth: '75%',
  alignSelf: 'center'
};

const contentStyle = {
  width: '100%',
  paddingTop: `${navBarHeight * 2}em`
} ;

const pageContainerStyle = {
  display: 'flex',
  width: '66.6%',
  margin: '0 auto'
};

const centeredContainerStyle = merge({}, pageContainerStyle, {
  flexDirection: 'column'
});

const aboutItemStyle = {
  flexGrow: 1,
  width: 0,
};

const githubLinkStyle = {
  padding: '0 .5em 0 .5em',
  display: 'flex',
  marginRight: 'auto',
  color: 'black',
  fontWeight: 400,
  textDecoration: 'none'
};

const profileImageLinkStyle = {
  flex: 'auto',
};

const profileImageStyle = {
  width: '100%',
  borderRadius: '.375em',
  height: 'auto',
};

const textBodyStyle = {
  borderColor: '#ddd',
  borderRadius: '0 0 .19em .19em',
  borderStyle: 'solid',
  borderWidth: '0 1px 1px 1px',
  marginBottom: '2.81em',
  padding: '2.81em',
};

const resumeBodyStyle = merge({}, textBodyStyle, {
  flexGrow: 1
});

const textHeaderStyle = {
  borderRadius: '.19em .19em 0 0',
  border: '1px solid #ddd',
  fontWeight: 600,
  backgroundColor: '#f5f5f5',
  fontSize: '.875em',
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

const resumeTitleStyle = {
  fontWeight: 700
};

const resumeDatesStyle = {
  fontSize: '85%',
  paddingBottom: '.625em',
  color: '#777'
};

const resumeDiscriptionStyle = {
  fontSize: '85%',
  paddingBottom: '1.375em',
};

const contactInfoStyle = {
  fontSize: '85%',
  textAlign: 'center',
  paddingTop: '1em'
};

const aboutView : View = function aboutView(payload) {
  return (
    <div style={pageContainerStyle}>
      <div style={merge({}, aboutItemStyle, { flexGrow: 1 })}>
        <a style={profileImageLinkStyle} href="https://github.com/maxgurewitz" target="_blank">
          <img src={HEADSHOT} style={profileImageStyle}/>
        </a>
      </div>
      <div style={merge({}, aboutItemStyle, { flexGrow: 3, paddingLeft: '1.25em', borderRadius: '3px' })}>
        <div style={textHeaderStyle}> ABOUT </div>
        <div style={textBodyStyle}>
          A voracious problem solver with a mind for details. Significant experience as a backend engineer, having worked extensively with Node.js and Ruby on Rails. A background in quantitative analysis, with a passion for machine learning and data science. Relentlessly optimistic about work and the future. Studied physics, loves math. Likes to read science fiction, ski, do brazillian jiu jitsu and make art.
        </div>
      </div>
    </div>
  );
}

function skillSection(payload : {
  title : string;
  items : Array<string>;
}, index : number) : JSX.Element {
  const { title, items } = payload;

  return (
    <div key={index}>
      <div style={resumeTitleStyle}>
        { title }
      </div>
      <div style={resumeDiscriptionStyle}>
        { items.join(', ') }
      </div>
    </div>
  );
}

function jobSection(payload : {
  title : string;
  description : string;
  date : string;
}, index : number) : JSX.Element {
  const { title, date, description } = payload;

  return (
    <div key={index}>
      <div style={resumeTitleStyle}>
        { title }
      </div>
      <div style={resumeDatesStyle}> {date} </div>
      <div style={resumeDiscriptionStyle}>
        { description }
      </div>
    </div>
  );
}

function educationDateSection(payload : {
    date : string;
    title : string;
}, index : number) : JSX.Element {
  const { title, date } = payload;

  return (
    <div key={index}>
      <div style={resumeTitleStyle}>
        { title }
      </div>
      <div style={resumeDatesStyle}> {date} </div>
    </div>
  );
}

const skillSections = [
  {
    title: 'Primary Languages',
    items: ['Javascript (Client, Server)', 'Ruby', 'HTML', 'CSS']
  },
  {
    title: 'Secondary Languages',
    items: ['Python', 'Java', 'Scala', 'Mathematica', 'Matlab', 'Haskell', 'Elm']
  },
  {
    title: 'Databases / Datastores',
    items: ['SQL (Postgres, MySQL)', 'Elastic Search', 'Solr', 'Redis', 'Couchbase', 'MongoDB']
  }
].map(skillSection);

const educationSections = [
  {
    title: 'B.A. Reed College, Physics',
    date: '2009-2013'
  },
  {
    title: 'High School Diploma, Oakwood School',
    date: '2005-2009'
  }
].map(educationDateSection);

const jobSections = [
  {
    title: 'Software Engineer, OpenTable',
    date: 'April 2015 - Current',
    description: 'Full stack node developer.  Primary architect of new search api for aggregating and caching internal service responses.  Developed internal library for automatically scaffolding tree of asynchronous service dependencies.  Primary maintainer of front end component for autocompletion and search submission.  Initiated AB tests responsible for creating hundreds of thousands of dollars of additional revenue per year.'
  },
  {
    title: 'Software Engineer, Wanelo',
    date: 'July 2014 - April 2015',
    description: 'Full stack Ruby on Rails engineer.  Played a key role in developing Wanelo\'s search engine, its transaction system, and its visual layout and design.  Client side work with Backbone.  Played key role in architecting Stripe and Shopify integration.  Utilized technologies include postgres, redis, solr, elastic search, chef etc.'
  },
  {
    title: 'Software Engineer, Beats Music',
    date: 'July 2013-- May 2014',
    description: 'Worked primarily as a Node.js backend engineer.  This entailed the use of Couchbase and MySQL databases.  Helped to build Facebook, twitter, vindicia cashbox and att integration.  Worked with elastic search and solr search engines.  Work extended to many areas including but not limited to music library data structures, music recommendations, search, billing services, and event handling.'
  },
  {
    title: 'Software Engineer, Intern, Topspin Media',
    date: 'Summer of 2012',
    description: 'Developed a tool for organizing and dynamically displaying customer and product metadata.  Building this tool required full stack development, using Ruby on Rails.'
  },
  {
    title: 'Intern, Epitaph Records',
    date: 'Summer of 2007',
    description: 'Assisted the company webmaster.  Organized company records.'
  }
].map(jobSection);

const resumeViewContents = (
  <div style={centeredContainerStyle}>
    <div style={textHeaderStyle}>
      RESUME:
    </div>
    <div style={resumeBodyStyle}>
      <div style={resumeCategoryHeaderStyle}>
        WORK EXPERIENCE
      </div>
      <div style={resumeSectionBodyStyle}>
        {jobSections}
      </div>
      <div style={resumeCategoryHeaderStyle}>
        SKILLS
      </div>
      <div style={resumeSectionBodyStyle}>
        {skillSections}
      </div>
      <div style={resumeCategoryHeaderStyle}>
        EDUCATION
      </div>
      <div style={resumeSectionBodyStyle}>
        {educationSections}
      </div>
      <div style={resumeCategoryHeaderStyle}>
        UNDERGRADUATE THESIS
      </div>
      <div style={resumeSectionBodyStyle}>
        <div>
          <div style={resumeTitleStyle}>
            Multilayer Perceptrons
          </div>
          <div style={resumeDatesStyle}> Supervisor, Joel Franklin </div>
          <div style={resumeDiscriptionStyle}>
            This thesis introduces the reader to the theory which underlies multilayer perceptrons, and supervised learning.  It also includes an implementation of multilayer perceptrons in python, as well as visualizations of overtraining multilayer perceptrons in video form.
          </div>
        </div>
      </div>
      <div style={contactInfoStyle}>
        maxgurewitz@gmail.com
      </div>
    </div>
  </div>
);

const resumeView : View = function resumeView(payload) { return resumeViewContents; }

const emptyEl = "";
const noOpDispatch = (action : Action) => {}

const maxViewDepth = 10;
const nestingFactor = 2;
const baseFontSize = 16;
const sizePercentage = (100/nestingFactor)+'%';

const previousActionButtonStyle = {
  float: 'left',
  width: '5%',
  textAlign: 'center',
  display: 'inline-block'
};
const nextActionButtonStyle = {
  margin: '0 auto',
  width: '5%',
  textAlign: 'center'
};

function incrementChild({
  dispatch,
  value,
  childNodeIndex
} : {
  dispatch: Dispatch,
  value: number,
  childNodeIndex: string
}) {
  return () => dispatch({ type: ActionType.IncrementChild, payload: { childNodeIndex, value } });
}

function startReplay(dispatch : Dispatch) {
  return () => dispatch({ type: ActionType.StartReplay });
}

const analyticsView : View = function analyticsView(payload) {
  const {state, config, dispatch} = payload;
  const viewModel = getViewModel(payload);
  const viewNode = getViewNode(payload);

  // FIXME: use state.windowHeight and state.windowWidth
  const nestedViewStyle = {
    position: 'relative',
    width: sizePercentage,
    height: sizePercentage,
    margin: '0 auto',
    zIndex: 5,
    border: '1px solid #ddd',
    fontSize: baseFontSize/Math.pow(nestingFactor, config.viewDepth) + 'px',
  };

  const sliderContainerStyle = {
    width: sizePercentage,
    height: '2em',
    borderStyle: 'solid',
    borderColor: '#ddd',
    margin: '0 auto',
    borderWidth: '0 1px 1px 1px'
  };

  const nestedView =
    viewNode.childNodeIndex ?
      view({
        config: {
          viewDepth: config.viewDepth + 1,
          currentView: viewNode.childNodeIndex
        },
        dispatch: noOpDispatch,
        state
      }) :
      emptyEl;

  return (
    <div>
      <div id="nestedViewContainer" style={nestedViewStyle}>
        {nestedView}
      </div>
      <div style={sliderContainerStyle}>
          <div
            style={nextActionButtonStyle}
            onClick={startReplay(dispatch)}>
            play
          </div>
      </div>
    </div>
  );
}

const PageViewCases : Cases<View> = {
  [Page.About]: aboutView,
  [Page.Resume]: resumeView,
  [Page.Analytics]: analyticsView,
  default: aboutView
};

function getViewModel(payload : ViewPayload) : ViewModel {
  const viewNode = getViewNode(payload);
  return viewNode ? viewNode.updatedView : null;
}

function getViewNode(payload : ViewPayload) : ViewNode {
  const {state, config} = payload;
  return state.viewTree[config.currentView];
}

const view : View = function view(payload) {
  const {dispatch} = payload;
  const viewModel = getViewModel(payload);

  return (
    <div className="base-view" style={viewStyle}>
      <div style={navBarStyle}>

        <a style={githubLinkStyle} href="https://github.com/maxgurewitz" target="_blank">
          github
        </a>

        <div style={navItemStyle}>
          <div style={linkBlockStyle} onClick={switchPage(Page.About, dispatch)}> about </div>
        </div>

        <div style={navItemStyle}>
          <a style={linkBlockStyle} onClick={switchPage(Page.Resume, dispatch)}> resume </a>
        </div>

        <div style={navItemStyle}>
          <a style={linkBlockStyle} onClick={switchPage(Page.Analytics, dispatch)}> analytics </a>
        </div>

        <div style={navItemStyle}>
          <a style={linkBlockStyle} href="https://github.com/maxgurewitz/personal-site-typescript" target="_blank">
            source
          </a>
        </div>
      </div>
      <div style={contentStyle}>
        {evaluateCase(viewModel.page, PageViewCases)(payload)}
      </div>
    </div>
  );
}

interface ViewModel {
  page: Page,
  windowHeight: number,
  initialViewIndex: string,
  windowWidth: number
}

interface State {
  baseInitialViewIndex: string,
  baseViewNodeIndex: string,
  initialViews: {
    [initialViewIndex: string]: ViewModel
  },
  viewTree: {
    [nodeIndex: string]: ViewNode
  },
  actions: {
    [initialViewIndex: string]: Array<Action>
  },
}

interface ViewNode {
  actionIndex: number,
  updatedView: ViewModel,
  childNodeIndex: string,
}

interface Action {
  type: ActionType,
  dateTime?: number,
  payload?: any
}

interface Dispatch {
  (action : Action) : void
}

interface Update {
  (state : State, action : Action) : State;
}

interface Cases<T> {
  [index : number] : T,
  default : T
}

function initializeState(payload : {
  windowHeight: number;
  windowWidth: number;
}) : State {
  const {windowWidth, windowHeight} = payload;
  const baseInitialViewIndex = uuid();

  const baseInitialView = {
    windowHeight,
    windowWidth,
    initialViewIndex: baseInitialViewIndex,
    page: Page.Resume
  };

  const uuids = times(maxViewDepth - 1, () => uuid());
  const viewTree = fromPairs(
    uuids.map((uuid, i) => (
      [uuid,
        {
          actionIndex: 1,
          childNodeIndex: uuids[i + 1] || null,
          updatedView: cloneDeep(baseInitialView)
        }
      ]
    ))
  );

  return {
    baseViewNodeIndex: uuids[0],
    baseInitialViewIndex,
    actions: {
      [baseInitialViewIndex]: []
    },
    initialViews: {
      [baseInitialViewIndex]: baseInitialView
    },
    viewTree
  };
}

const initialView : View = function initalView(payload) {
  const initialConfig = {
    viewDepth: 1,
    currentView: payload.state.baseViewNodeIndex
  };

  return view({
    dispatch: payload.dispatch,
    state: payload.state,
    config: initialConfig
  });
}

const PersonalSite = connect((state : State) =>
  ({state}), (dispatch : Dispatch) => ({dispatch}))(initialView);

function identity<T>(arg: T): T {
    return arg;
}

const noOpUpdate = identity;

const pageCases : Cases<Update> = {
  default: noOpUpdate
}

interface ViewUpdate {
  (view : ViewModel, action : Action): ViewModel
}

const viewUpdateCases : Cases<ViewUpdate> = {
  default: noOpUpdate
};

const update : Update = function update(state, action) {
  const clonedState = cloneDeep(state);
  clonedState.actions[clonedState.baseInitialViewIndex].push(action);
  return updateCase(clonedState, action);
}

const updateCase : Update = function updateCase(state, action) {
  return evaluateCase(action.type, updateCases)(state, action);
}

const updateCases : Cases<Update> = {
  [ActionType.SwitchPage]: (state : State, action : Action) => {
    const {viewNodeIndex, page} = action.payload;
    const withPageUpdate = evaluateCase(action.payload, pageCases)(state, action);
    const nodeIndex = viewNodeIndex || state.baseViewNodeIndex;
    withPageUpdate.viewTree[nodeIndex].updatedView.page = page;
    return withPageUpdate;
  },

  [ActionType.StartReplay]: (state : State, action : Action) => {
      return state;
  },

  [ActionType.IncrementChild]: (state : State, action : Action) => {
    const {childNodeIndex, value} = action.payload;
    const viewNode = state.viewTree[childNodeIndex];

    if (!viewNode || viewNode.actionIndex === 0) {
      return state;
    }

    const {initialViewIndex} = viewNode.updatedView;
    const childAction = cloneDeep(state.actions[initialViewIndex][viewNode.actionIndex]);
    childAction.payload.viewNodeIndex = childNodeIndex;
    childAction.payload.childNodeIndex = viewNode.childNodeIndex;
    viewNode.actionIndex = viewNode.actionIndex + value;
    return updateCase(state, childAction);
  },

  default: noOpUpdate
};

function evaluateCase<T>(type : number, cases : Cases<T>) : T {
  return cases[type] || cases.default;
}

interface Subscription {
  (dispatch : Dispatch) : void;
}

interface WindowTarget extends EventTarget {
  innerHeight: number;
  innerWidth: number;
}

interface ResizeEvent extends UIEvent {
  target: WindowTarget;
}

const windowSize : Subscription = function windowSize(dispatch) {
  window.onresize = (e : ResizeEvent) =>
    dispatch({
      type: ActionType.WindowResized,
      payload: {
        height: e.target.innerHeight,
        width: e.target.innerWidth
      }
    });
};

function actionDateTime() {
  return (next : Dispatch) => (action : Action) => {
    action.dateTime = Date.now();
    next(action);
  }
}

interface GetState {
  (): State;
}

interface EffectManager {
  (payload : {action : Action, state : State, dispatch : Dispatch}) : void;
}

const effectManagerCases : Cases<EffectManager> = {
  [ActionType.StartReplay]: ({action, dispatch, state}) => {
  },
  default: ({action, dispatch}) => dispatch(action)
};

function effectManagers({dispatch, getState} : MiddlewareAPI<State>) {
  return (dispatch : Dispatch) => (action : Action) => {
    const state = getState();
    const effectManager = evaluateCase(action.type, effectManagerCases);
    effectManager({dispatch, action, state});
  }
}

export default {
  render(selector: string) {
    const initialState = initializeState({
      windowWidth: window.innerWidth,
      windowHeight: window.innerHeight
    });

    const store = createStore(update, initialState, applyMiddleware(actionDateTime, effectManagers));

    const subscriptions : Array<Subscription> = [windowSize];

    subscriptions.forEach(subscription =>
      subscription(store.dispatch.bind(store))
    );

    const app = (
      <Provider store = {store}>
        <PersonalSite />
      </Provider>
    );

    reactRender(app, document.querySelector(selector));
  }
};
