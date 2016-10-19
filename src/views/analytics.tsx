import * as t from '../types';
import * as React from 'react';
import main from './main';

const nestingFactor = 2;
const sizePercentage = (100/nestingFactor)+'%';

const analyticsView : t.View = function analyticsView(payload) {
  const {config} = payload;

  return (
    <div>
      analytics content
    </div>
  );
}

export default analyticsView;
