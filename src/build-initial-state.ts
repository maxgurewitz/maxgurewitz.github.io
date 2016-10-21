import * as t from './types';
import {maxViewDepth} from './settings';
import {times, cloneDeep} from 'lodash';

export default function buildInitialState() : t.State {
  const initialView : t.ViewModel = {
    page: 'resume'
  };

  const views = times(maxViewDepth, () => ({
    msgIndex: 0,
    updatedView: initialView
  }));

  return {
    msgHistory: [],
    views
  };
}
