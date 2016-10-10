import * as t from './types';
import {cloneDeep} from 'lodash';

const update : t.Update = function update(state, msg) {
  let updatedState = cloneDeep(state);

  switch (msg.type) {
    case 'updatePlaying':
      updatedState.isPlaying = msg.isPlaying;
      return updatedState;

    case 'increment':
      updatedState.counter = 1;
      return updatedState;

    case 'noOp':
      return updatedState;

    case '@@redux/INIT':
      return updatedState;
  }
}

export default update;
