import {Dispatch, MiddlewareAPI} from 'redux';

interface State {
  msgHistory: Array<MsgMetadata>,
  counter: number,
  isPlaying: boolean
}

interface MsgMetadata {
  msg: Msg,
  timestamp: number
}

interface MsgDispatch {
  (msg : Msg) : Msg
}

interface IncrementUntilDone {
  type: 'incrementUntilDone'
}

interface NoOp {
  type: 'noOp'
}

interface TogglePlaying {
  type: 'togglePlaying'
}

interface PushMsgHistory {
  type: 'pushMsgHistory',
  msg: Msg,
  timestamp: number
}

interface Init {
  type: '@@redux/INIT'
}

type Msg = IncrementUntilDone | TogglePlaying | NoOp | Init | PushMsgHistory; //etc.

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
