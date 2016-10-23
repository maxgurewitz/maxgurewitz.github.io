import * as t from './types';

const noCmd : t.NoCmd = { type: 'noCmd' };

// FIXME: add view index to arguments
const viewUpdate : t.ViewUpdate = function viewUpdate(view, msg) {
  switch (msg.type) {
    case 'switchPage':
      view.page = msg.page;
      return { view, cmd: noCmd };
  }
};

const update : t.Update = function update(state, msg) {
  switch (msg.type) {
    case 'updateView':
      const timestampCmd : t.Now = {
        type: 'now',
        toMsg: (timestamp : number) => ({ type: 'pushMsgHistory', viewMsg: msg.viewMsg, timestamp })
      };

      return {state, cmd: timestampCmd};

    case 'incrementMsg':
      const viewProgress = state.views[msg.viewIndex];
      const {updatedView, msgIndex} = viewProgress;
      const viewMsg = state.msgHistory[msgIndex].viewMsg;
      const {view, cmd} = viewUpdate(updatedView, viewMsg, msg.viewIndex);

      viewProgress.updatedView = view;
      viewProgress.msgIndex = msgIndex + 1;

      return {state, cmd};

    case 'pushMsgHistory':
      const msgMetadata = {viewMsg: msg.viewMsg, timestamp: msg.timestamp};

      state.msgHistory.push(msgMetadata);

      const updateResponse : t.UpdateResponse =
        update(state, { type: 'incrementMsg', viewIndex: 0 });

      return updateResponse;

    case 'noOp':
      return { state, cmd: noCmd };

    case '@@redux/INIT':
      return { state, cmd: noCmd };
  }
};

export default update;
