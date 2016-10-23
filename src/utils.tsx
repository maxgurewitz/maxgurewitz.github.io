import * as t from './types';

export function getViewModel(payload : t.ViewPayload) : t.ViewModel {
  const {state, config} = payload;

  return config.viewIndex === 0 ?
    state.view :
    state.replayViews[config.viewIndex - 1].updatedView;
}
