import {Dispatch, MiddlewareAPI} from 'redux';

type Page = 'resume' | 'about' | 'analytics';

interface State {
  msgHistory: Array<MsgMetadata>,
  page: Page
}

interface MsgMetadata {
  msg: Msg,
  timestamp: number
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
  msg: Msg,
  timestamp: number
}

interface Init {
  type: '@@redux/INIT'
}

type Msg = NoOp | Init | PushMsgHistory | SwitchPage; //etc.

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
  viewDepth: number
}

interface Update {
  (state : State, msg : Msg) : UpdateResponse;
}

interface UpdateResponse {
  cmd: Cmd,
  state: State
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
