import React, { Component } from "react";
import { Link } from "react-router-dom";

class Navbar extends Component {
  logout = (e) => {
    this.props.handleToken(null);
    localStorage.removeItem("token");
  };
  render() {
    return (
      <div className="navbar">
        <div className="nav">
          <Link className="nav-left" to="/">
            <p>Website</p>
          </Link>
          {!this.props.token ? (
            <ul id="navdiv1">
              <Link to="/login">
                <li>Login</li>
              </Link>
            </ul>
          ) : this.props.admin === true ? (
            <ul id="navdiv2">
              <Link to="/admin/">
                <li>Profile</li>
              </Link>
              <li>
                <a href="/" onClick={this.logout}>
                  Log Out
                </a>
              </li>
            </ul>
          ) : (
            <ul id="navdiv2">
              <Link to="/user/profile">
                <li>Profile</li>
              </Link>
              <li>
                <a href="/" id="logout" onClick={this.logout}>
                  Log Out
                </a>
              </li>
            </ul>
          )}
        </div>
      </div>
    );
  }
}

export default Navbar;
