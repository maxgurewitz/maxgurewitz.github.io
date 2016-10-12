import * as t from './types';

const noCmd : t.NoCmd = { type: 'noCmd' };

const maxCounter = 5;

const update : t.Update = function update(state, msg) {
  switch (msg.type) {
    case 'togglePlaying': {
      state.isPlaying = !state.isPlaying;

      const updateResponse : t.UpdateResponse = state.isPlaying ?
        update(state, { type: 'incrementUntilDone' }) :
        { state, cmd: noCmd };

      return updateResponse;
    }

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

    case 'noOp':
      return { state, cmd: noCmd };

    case '@@redux/INIT':
      return { state, cmd: noCmd };
  }
}

export default update;
