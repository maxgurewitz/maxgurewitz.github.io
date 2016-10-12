import {Dispatch, MiddlewareAPI} from 'redux';
import {cloneDeep} from 'lodash';
import * as t from './types';
import update from './update';

function effectManagers({getState, dispatch, msg} : t.EffectManagers) {
  const state = cloneDeep(getState());

  const updateResponse = update(state, msg);

  dispatch({ type: 'update', state: updateResponse.state });

  const cmd = updateResponse.cmd;

  switch (cmd.type) {
    case 'sleep':
      setTimeout(() => {
        effectManagers({getState, msg: cmd.msg, dispatch});
      }, cmd.timeout);
      break;

    case 'noCmd':
      break;
  }
}

export default function effectManagersEntry({getState} : MiddlewareAPI<t.State>) {
  return (dispatch : t.MsgDispatch) => (msg : t.Msg) => {
    effectManagers({dispatch, getState, msg});
  }
}
