import {Dispatch, MiddlewareAPI} from 'redux';
import {cloneDeep} from 'lodash';
import * as t from './types';
import update from './update';

function getEffectManager({getState, dispatch, msg} : t.EffectManagers, cmd : t.Cmd) : t.EmptyFn {
  switch (cmd.type) {
    case 'sleep':
      return () => {
        setTimeout(() => {
          effectManagers({getState, msg: cmd.msg, dispatch});
        }, cmd.timeout);
      };

    case 'batch':
      return () => {};

    case 'now':
      return () => {};

    case 'noCmd':
      return () => {};
  }
}

function effectManagers({getState, dispatch, msg} : t.EffectManagers) {
  const state = cloneDeep(getState());

  const updateResponse = update(state, msg);

  dispatch({ type: 'update', state: updateResponse.state });

  getEffectManager({getState, dispatch, msg}, updateResponse.cmd)();
}

export default function effectManagersEntry({getState} : MiddlewareAPI<t.State>) {
  return (dispatch : t.MsgDispatch) => (msg : t.Msg) => {
    effectManagers({dispatch, getState, msg});
  }
}
