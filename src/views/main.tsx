import * as t from '../types';
import * as React from 'react';

function playInput(isPlaying : boolean, dispatch : t.InputDispatch) {
  return () => dispatch({ type: 'msg', msg: { type: 'updatePlaying', isPlaying } });
}

const mainView : t.View = function mainView(payload) {
  const {state, dispatch} = payload;
  const playMessage = state.isPlaying ? 'pause' : 'play';

  return (
    <div>
      <div>
        counter: { state.counter }
      </div>
      <button onClick={playInput(!state.isPlaying, dispatch)} > {playMessage} </button>
    </div>
  );
}

export default mainView;
