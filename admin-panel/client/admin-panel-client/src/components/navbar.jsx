import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";

class Navbar extends Component {
  logout = (e) => {
    e.preventDefault();
    localStorage.removeItem("token");
    this.props.loginNavHandler(false);
    this.props.history.push("/login");
  };
  render() {
    return (
      <div className="navbar">
        <div className="nav">
          <Link className="nav-left" to="/">
            <p>Website</p>
          </Link>
          {!this.props.loggedin ? (
            <ul id="navdiv1">
              <Link to="/login">
                <li>Login</li>
              </Link>
            </ul>
          ) : (
            <ul id="navdiv2">
              <li>
                <a onClick={this.logout}>Log Out</a>
              </li>
            </ul>
          )}
        </div>
      </div>
    );
  }
}

export default withRouter(Navbar);
