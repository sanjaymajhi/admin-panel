import React, { Component } from "react";
import { Link } from "react-router-dom";
class Anav extends Component {
  render() {
    return (
      <div className="a_nav">
        <h2>Menu</h2>
        <Link to="/admin/user_list">
          <p>
            <i className="material-icons"> format_list_bulleted</i> User List{" "}
          </p>
        </Link>
        <Link to="/admin/addUser">
          <p>
            <i className="material-icons">add_box</i>Add User{" "}
          </p>
        </Link>
      </div>
    );
  }
}

export default Anav;
