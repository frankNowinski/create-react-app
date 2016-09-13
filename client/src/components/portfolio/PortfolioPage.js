import React from 'react';
import { connect } from 'react-redux';
import AddStockForm from './AddStockForm';

class PortfolioPage extends React.Component {
  render() {
    return (
      <div className="container">
        <h2 className="text-center">Your Portfolio</h2><hr />

        <div className="col-md-3">
          <AddStockForm user={this.props.user} />
        </div>

        <div className="col-md-9">
          <h1>Stock Data</h1>
        </div>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    user: state.auth.user
  }
}

PortfolioPage.propTypes = {
  user: React.PropTypes.object.isRequired
}

export default connect(mapStateToProps)(PortfolioPage);
