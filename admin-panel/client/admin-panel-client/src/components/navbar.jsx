import React, { Component } from "react";
import { Link } from "react-router-dom";

class Navbar extends Component {
  logout = (e) => {
    localStorage.removeItem("token");
    this.props.history.push({
      path: "/",
    });
  };
  render() {
    return (
      <div className="navbar">
        <div className="nav">
          <Link className="nav-left" to="/">
            <p>Website</p>
          </Link>
          {!localStorage.getItem("token") ? (
            <ul id="navdiv1">
              <Link to="/login">
                <li>Login</li>
              </Link>
            </ul>
          ) : (
            <ul id="navdiv2">
              <li>
                <a href="/" onClick={this.logout}>
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
