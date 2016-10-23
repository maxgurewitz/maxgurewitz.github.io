import * as t from './types';
import {maxViewDepth} from './settings';
import {times, cloneDeep} from 'lodash';

export default function buildInitialState() : t.State {
  const initialView : t.ViewModel = {
    page: 'resume',
    isPlaying: false
  };

  const replayViews = times(maxViewDepth - 1, () => ({
    msgIndex: 0,
    updatedView: cloneDeep(initialView)
  }));

  return {
    view: cloneDeep(initialView),
    msgHistory: [],
    replayViews
  };
}
