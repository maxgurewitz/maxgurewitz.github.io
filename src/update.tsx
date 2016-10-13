import * as t from './types';

const noCmd : t.NoCmd = { type: 'noCmd' };

const maxCounter = 5;

const primaryUpdate : t.Update = function primaryUpdate(state, msg) {
  switch (msg.type) {
    case 'togglePlaying':
      state.isPlaying = !state.isPlaying;

      const updateResponse : t.UpdateResponse = state.isPlaying ?
        update(state, { type: 'incrementUntilDone' }) :
        { state, cmd: noCmd };

      return updateResponse;

    case 'incrementUntilDone':
      if (state.counter < maxCounter && state.isPlaying) {
        state.counter = state.counter + 1;
      }

      if (state.counter >= maxCounter) {
        state.isPlaying = false;
      }

      const sleepCmd : t.Sleep = {
        type: 'sleep',
        timeout: 1000,
        msg: { type: 'incrementUntilDone' }
      };

      const cmd : t.Cmd = state.counter < maxCounter && state.isPlaying ? sleepCmd : noCmd;

      return { state, cmd };

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
