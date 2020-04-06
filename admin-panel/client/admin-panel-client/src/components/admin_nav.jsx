import React, { Component } from "react";
import { Link } from "react-router-dom";
class Anav extends Component {
  shouldComponentUpdate() {
    return false;
  }

  render() {
    return (
      <div className="a_nav">
        <h2>Menu</h2>
        <Link to="/admin/user_list">
          <p>
            <i className="material-icons">local_activity</i> User List{" "}
          </p>
        </Link>
        <Link to="/admin/addUser">
          <p>
            <i className="material-icons">update</i>Add User{" "}
          </p>
        </Link>
      </div>
    );
  }
}

export default Anav;
