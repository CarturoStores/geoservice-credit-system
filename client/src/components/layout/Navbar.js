import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import world from '../../img/satellite-in-orbit-40.png';
import login from '../../img/enter-50.png';
import logout from '../../img/exit-filled-50.png';
import dashboard from '../../img/dashboard-50.png';
import feed from '../../img/feed-up-down-50.png';
import logo from '../../img/avatar-name-50.png';

import { logoutUser } from '../../actions/userAuthActions';

class Navbar extends Component {

  onLogoutClick(e) {
    e.preventDefault();
    this.props.clogoutUser();
  }

  render() {

    const { isAuthenticated, user } = this.props.auth;

    const authLinks = (
      <ul className="navbar-nav ml-auto">
        <li className="nav-item">
          <Link className="nav-link" to="/feed">
            <img
              src={feed}
              style={{ width: "83px", margin: "auto", display: "block" }}
              alt="Loading..."
            />
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/dashboard">
            <img
              src={dashboard}
              style={{ width: "90px", margin: "auto", display: "block" }}
              alt="Loading..."
            />
          </Link>
        </li>
        <li className="nav-item">
          <img
            className="rounded-circle"
            src={user.avatar}
            alt={user.name}
            style={{ width: "30px", marginTop: "12px", display: "block" }}
          />
        </li>
        <li className="nav-item">
          <a
            href=""
            onClick={this.onLogoutClick.bind(this)}
            className="nav-link"
          >
            <img
              src={logout}
              style={{ width: "115px", margin: "auto", display: "block" }}
              alt="Loading..."
            />
          </a>
        </li>
      </ul>
    );

    const guestLinks = (
      <ul className="navbar-nav ml-auto">
        <li className="nav-item">
          <Link className="nav-link" to="/login2">
            <img
              src={login}
              style={{ width: "80px", margin: "auto", display: "block" }}
              alt="Loading..."
            />
          </Link>
        </li>
      </ul>
    );

    return (
      <nav
        className="navbar navbar-expand-sm navbar-dark bg-dark mb-4"
        style={{
          boxShadow: "5px 5px 5px grey"
        }}
      >
        <div className="container">
          <img
            src={world}
            style={{ width: "50px", marginRight: "6px", display: "block" }}
            alt="Loading..."
          />
          <Link className="navbar-brand" to="/">
            <img
              src={logo}
              style={{ width: "80px", margin: "auto", display: "inline-block" }}
              alt="Loading..."
            />
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#mobile-nav"
          >
            <span className="navbar-toggler-icon" />
          </button>

          <div className="collapse navbar-collapse" id="mobile-nav">
            <ul className="navbar-nav mr-auto">
              <li className="nav-item" />
            </ul>
            {isAuthenticated ? authLinks : guestLinks}
          </div>
        </div>
      </nav>
    );
  }
}

Navbar.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { logoutUser }
)(Navbar);