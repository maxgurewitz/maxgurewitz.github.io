import {Dispatch, MiddlewareAPI} from 'redux';
import * as t from './types';

export default function effectManagers({dispatch, getState} : MiddlewareAPI<t.State>) {
  return (dispatch : Dispatch<t.Msg>) => (input : t.Input) => {
    const msg = input.type === 'msg' ? input.msg : { type: 'noOp' };
    dispatch(msg);
  }
}
