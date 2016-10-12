import * as t from '../types';
import * as React from 'react';

function playInput(dispatch : t.MsgDispatch) {
  return () => dispatch({ type: 'togglePlaying' });
}

const mainView : t.View = function mainView(payload) {
  const {state, dispatch} = payload;
  const playMessage = state.isPlaying ? 'pause' : 'play';

  return (
    <div>
      <div>
        counter: { state.counter }
      </div>
      <button onClick={playInput(dispatch)} > {playMessage} </button>
    </div>
  );
}

export default mainView;
