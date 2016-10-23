import * as t from './types';

const noCmd : t.NoCmd = { type: 'noCmd' };

const viewUpdate : t.ViewUpdate = function viewUpdate(view, msg) {
  switch (msg.type) {
    case 'switchPage':
      view.page = msg.page;
      return view;
  }
};

const update : t.Update = function update(state, msg) {
  switch (msg.type) {
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
