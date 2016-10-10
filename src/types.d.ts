import {Dispatch} from 'redux';

interface State {
  counter: number,
  isPlaying: boolean
}

type InputDispatch = Dispatch<Input>;

interface Increment {
  type: 'increment'
}

interface NoOp {
  type: 'noOp'
}

interface UpdatePlaying {
  type: 'updatePlaying',
  isPlaying: boolean
}

interface Init {
  type: '@@redux/INIT'
}

type Msg = Increment | UpdatePlaying | NoOp | Init; //etc.

interface Sleep {
  type: 'sleep',
  msg: Msg
}

interface Now {
  type: 'now',
  toMsg(time: number): Msg
}

interface InputMsg {
  type: 'msg',
  msg: Msg
}

interface InputCmd {
  type: 'cmd',
  cmd:  Cmd
}

type Cmd = Sleep | Now;
type Input = InputCmd | InputMsg;

interface ViewConfig {
  viewDepth: number
}

interface Update {
  (state : State, msg : Msg) : State;
}

interface ViewPayload {
  config : ViewConfig,
  state : State,
  dispatch : Dispatch<Input>
}

interface View {
  (payload : ViewPayload) : JSX.Element;
}
