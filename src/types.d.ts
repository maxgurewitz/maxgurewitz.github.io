import {Dispatch, MiddlewareAPI} from 'redux';

type Page = 'resume' | 'about' | 'analytics';

interface State {
  msgHistory: Array<MsgMetadata>,
  views: Array<ViewProgress>
}

interface ViewProgress {
  msgIndex: number,
  updatedView: ViewModel
}

interface ViewModel {
  page: Page
}

interface MsgMetadata {
  viewMsg: ViewMsg,
  timestamp: number
}

interface MsgDispatch {
  (msg : Msg) : Msg
}

interface MsgDispatch {
  (msg : Msg) : Msg
}

interface NoOp {
  type: 'noOp'
}

interface SwitchPage {
  type: 'switchPage',
  page: Page
}

interface PushMsgHistory {
  type: 'pushMsgHistory',
  viewMsg: ViewMsg,
  timestamp: number
}

interface Init {
  type: '@@redux/INIT'
}

type ViewMsg = SwitchPage;

interface IncrementMsg {
  type: 'incrementMsg',
  viewIndex: number
}

interface UpdateView {
  type: 'updateView',
  viewMsg: ViewMsg
}

type Msg = NoOp | Init | PushMsgHistory | IncrementMsg | UpdateView; //etc.

interface Sleep {
  type: 'sleep',
  timeout: number,
  msg: Msg
}

interface Now {
  type: 'now',
  toMsg(time: number): Msg
}

interface EffectManagers extends MiddlewareAPI<State> {
  msg: Msg
}

interface NoCmd {
  type: 'noCmd'
}

type Cmd = Sleep | Now | NoCmd | Batch;

interface Batch {
  type: 'batch',
  cmds: Array<Cmd>
}

interface GetEffectManagerPayload {
  cmd: Cmd,
  dispatch: MsgDispatch,
  getState(): State
}

interface EmptyFn {
  () : void
}

interface ViewConfig {
  viewIndex: number
}

interface Update {
  (state : State, msg : Msg) : UpdateResponse;
}

interface UpdateResponse {
  cmd: Cmd,
  state: State
}

interface ViewUpdate {
  (view : ViewModel, msg : ViewMsg) : { view: ViewModel, cmd: Cmd }
}

interface UpdateAction {
  type: 'update',
  state: State
}

interface ViewPayload {
  config : ViewConfig,
  state : State,
  dispatch : MsgDispatch
}

interface View {
  (payload : ViewPayload) : JSX.Element;
}
