import React from 'react';
import Lens from 'react-lens';

const TotalDailyReturn = (props) => {
  return (
    <div>
      <Lens filter="currency">{props.totalReturn ? parseFloat(props.totalReturn) : 0}</Lens>
    </div>
  )
}

export default TotalDailyReturn;
