import {Dispatch, MiddlewareAPI} from 'redux';
import {cloneDeep} from 'lodash';
import * as t from './types';
import update from './update';

function getEffectManager({getState, dispatch, cmd} : t.GetEffectManagerPayload) : t.EmptyFn {
  switch (cmd.type) {
    case 'sleep':
      return () => {
        setTimeout(() => {
          effectManagers({getState, msg: cmd.msg, dispatch});
        }, cmd.timeout);
      };

    case 'batch':
      return () => {
        cmd.cmds.forEach(subCmd => {
          getEffectManager({getState, dispatch, cmd: subCmd})();
        });
      };

    case 'now':
      return () => {
        const timestamp = Date.now();
        const msg = cmd.toMsg(timestamp);
        effectManagers({getState, msg, dispatch});
      };

    case 'noCmd':
      return () => {};
  }
}

function effectManagers({getState, dispatch, msg} : t.EffectManagers) {
  const state = cloneDeep(getState());

  const updateResponse = update(state, msg);

  dispatch({ type: 'update', state: updateResponse.state });

  getEffectManager({getState, dispatch, cmd: updateResponse.cmd})();
}

export default function effectManagersEntry({getState} : MiddlewareAPI<t.State>) {
  return (dispatch : t.MsgDispatch) => (msg : t.Msg) => {
    effectManagers({dispatch, getState, msg});
  }
}
