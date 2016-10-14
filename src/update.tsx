import * as t from './types';

const noCmd : t.NoCmd = { type: 'noCmd' };

const primaryUpdate : t.Update = function primaryUpdate(state, msg) {
  switch (msg.type) {
    case 'switchPage':
      state.page = msg.page;
      return { state, cmd: noCmd };

    case 'pushMsgHistory':
      const msgMetadata = {msg: msg.msg, timestamp: msg.timestamp};
      state.msgHistory.push(msgMetadata);
      return { state, cmd: noCmd };

    case 'noOp':
      return { state, cmd: noCmd };

    case '@@redux/INIT':
      return { state, cmd: noCmd };
  }
};

const update : t.Update = function update(state, msg) {
  const updateResult = primaryUpdate(state, msg);

  const withTimestampCmd : t.Cmd = msg.type !== 'pushMsgHistory' ? {
    type: 'batch',
    cmds: [
      updateResult.cmd,
      {
        type: 'now',
        toMsg: (timestamp : number) => ({ type: 'pushMsgHistory', msg, timestamp })
      }
    ]
  } : updateResult.cmd;

  return {state: updateResult.state, cmd: withTimestampCmd};
}

export default update;
