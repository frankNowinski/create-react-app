import React from 'react';
import isEmpty from 'lodash/isEmpty';

class TotalDailyReturn extends React.Component {
  render() {
    return <div>{this.props.totalReturn ? this.props.totalReturn : ''}</div>
  }
}

export default TotalDailyReturn;
