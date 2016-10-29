import * as t from './types';
import {setIsPlaying} from './msg-builders';

const noCmd : t.NoCmd = { type: 'noCmd' };

const viewUpdate : t.ViewUpdate = function viewUpdate(view, msg) {
  switch (msg.type) {
    case 'switchPage':
      view.page = msg.page;
      return view;

    case 'setIsPlaying':
      view.isPlaying = msg.isPlaying;
      return view;
  }
};

const update : t.Update = function update(state, msg) {
  switch (msg.type) {
    case 'toggleReplay': {
      let updateResponse : t.UpdateResponse;

      if (!state.view.isPlaying) {
        updateResponse = update(state, setIsPlaying(true));
      } else {
        updateResponse = update(state, setIsPlaying(false));
      }

      return updateResponse;
    }

    case 'replayUntilDone': {
      if (state.view.isPlaying) {
        let playingViewIndex = 0;

        while (true) {
          const viewProgress = state.replayViews[playingViewIndex];
          if (viewProgress && viewProgress.updatedView.isPlaying) {
            playingViewIndex++;
          } else {
            break;
          }
        }

        const playingViews = state.replayViews.slice(0, playingViewIndex + 1);
      }

      return {state, cmd: noCmd};
    }

    case 'updateView':
      const timestampCmd : t.Now = {
        type: 'now',
        toMsg: (timestamp : number) => ({ type: 'pushMsgHistory', viewMsg: msg.viewMsg, timestamp })
      };

      state.view = viewUpdate(state.view, msg.viewMsg);

      return {state, cmd: timestampCmd};

    case 'incrementMsg':
      const viewProgress = state.replayViews[msg.viewIndex];
      const {updatedView, msgIndex} = viewProgress;
      const viewMsg = state.msgHistory[msgIndex].viewMsg;
      const view = viewUpdate(updatedView, viewMsg);

      viewProgress.updatedView = view;
      viewProgress.msgIndex = msgIndex + 1;

      return { state, cmd: noCmd };

    case 'pushMsgHistory':
      const msgMetadata = {viewMsg: msg.viewMsg, timestamp: msg.timestamp};

      state.msgHistory.push(msgMetadata);

      return { state, cmd: noCmd };

    case 'noOp':
      return { state, cmd: noCmd };

    case '@@redux/INIT':
      return { state, cmd: noCmd };
  }
};

export default update;
