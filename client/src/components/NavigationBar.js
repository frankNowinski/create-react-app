import React from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { logout } from '../actions/authActions';

class NavigationBar extends React.Component {
  logout(e) {
    e.preventDefault();
    this.props.logout();
  }

  render() {
    const { isAuthenticated } = this.props.auth;
    const navbarBorder = {borderRadius: '0px'}

    const userLinks = (
      <ul className="nav navbar-nav pull-right">
        <li className="nav-item">
          <Link to="/portfolio" className="nav-link active">Portfolio</Link>
        </li>
        <li className="nav-item">
          <a href="#" className="nav-link" onClick={this.logout.bind(this)}>Logout</a>
        </li>
      </ul>
    );

    const guestLinks = (
      <ul className="nav navbar-nav pull-right">
        <li className="nav-item">
          <Link to="/signup" className="nav-link">Signup</Link>
        </li>
        <li className="nav-item">
          <Link to="/login" className="nav-link">Login</Link>
        </li>
      </ul>
    );

    return (
      <nav className="navbar navbar-light container-fluid navbar-dark bg-primary navbar-full" style={navbarBorder}>
        <button className="navbar-toggler hidden-sm-up" type="button" data-toggle="collapse" data-target="#exCollapsingNavbar2" aria-controls="exCollapsingNavbar2" aria-expanded="false" aria-label="Toggle navigation">
        &#9776;
        </button>

        <div className="collapse navbar-toggleable-xs container" id="exCollapsingNavbar2">
          <Link to="/" className="navbar-brand">Stock Gains</Link>
          { isAuthenticated ? userLinks : guestLinks }
        </div>
      </nav>
    )
  }
}

NavigationBar.propTypes = {
  auth: React.PropTypes.object.isRequired,
  logout: React.PropTypes.func.isRequired
}

function mapStateToProps(state) {
  return {
    auth: state.auth
  };
}

export default connect(mapStateToProps, { logout })(NavigationBar);

// <nav className="nav" style={navbarBorder}>
//   <div className="container-fluid">
//     <div className="navbar-header">
//       <Link to="/">
//         <p className="navbar-brand">Frank</p>
//       </Link>
//     </div>
//
//     <div className="collapse navbar-collapse">
//       { isAuthenticated ? userLinks : guestLinks }
//     </div>
//   </div>
// </nav>
