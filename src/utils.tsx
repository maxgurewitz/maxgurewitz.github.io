import * as t from './types';

export function getViewModel(payload : t.ViewPayload) : t.ViewModel {
  const {state, config} = payload;
  return state.views[config.viewIndex].updatedView;
}
