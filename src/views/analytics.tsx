import {identity} from 'lodash';
import * as t from '../types';
import * as React from 'react';
import main from './main';
import {baseFontSize, nestingFactor} from '../settings';

const sizePercentage = (100/nestingFactor)+'%';

const analyticsView : t.View = function analyticsView(payload) {
  const {state, config} = payload;

  const nestedViewStyle = {
    position: 'relative',
    width: sizePercentage,
    height: sizePercentage,
    margin: '0 auto',
    zIndex: 5,
    border: '1px solid #ddd',
    fontSize: baseFontSize/Math.pow(nestingFactor, config.viewIndex + 1) + 'px',
  };

  const controlsContainerStyle = {
    width: sizePercentage,
    height: '2em',
    borderStyle: 'solid',
    borderColor: '#ddd',
    margin: '0 auto',
    borderWidth: '0 1px 1px 1px',
    lineHeight: '2em',
    textAlign: 'center'
  };

  const nestedView = (config.viewIndex + 1) < state.views.length ?
    main({
      config: { viewIndex: config.viewIndex + 1 },
      dispatch: identity,
      state
    }) : "";

  return (
    <div>
      <div style={nestedViewStyle} >
        {nestedView}
      </div>
      <div style={controlsContainerStyle}>
        <div>
          play
        </div>
      </div>
    </div>
  );
}

export default analyticsView;
