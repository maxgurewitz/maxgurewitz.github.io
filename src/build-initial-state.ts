import * as t from './types';

export default function buildInitialState() : t.State {
  return {
    msgHistory: [],
    page: 'resume'
  };
}
