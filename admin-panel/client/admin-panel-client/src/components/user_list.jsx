import React, { Component } from "react";

class Userlist extends Component {
  constructor(props) {
    super(props);

    this.state = {
      users: [],
    };
  }

  componentDidMount() {
    this.fetchUserList();
  }

  fetchUserList = () => {
    fetch("/api/list/", {
      method: "POST",
      body: JSON.stringify({ token: localStorage.getItem("token") }),
      headers: {
        "content-type": "application/json",
      },
    })
      .then((res) => res.json())
      .then(async (data) => {
        await this.setState({ users: data });
      });
  };

  disableHandler = (e) => {
    e.preventDefault();
    const id = e.target.id;
    fetch("/api/disable", {
      method: "POST",
      body: JSON.stringify({
        token: localStorage.getItem("token"),
        email: e.target.id,
      }),
      headers: {
        "content-type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => document.getElementById(id).replaceWith("blocked"));
  };

  render() {
    return (
      <div>
        <h2>User List</h2>
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Password</th>
              <th>Last Active</th>
              <th>Disable</th>
            </tr>
          </thead>
          <tbody>
            {this.state.users.map((user) => (
              <tr key={user._id}>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.password}</td>
                <td>{new Date(user.last_active).toLocaleString()}</td>
                <td>
                  {user.disabled ? (
                    "Blocked"
                  ) : (
                    <button id={user.email} onClick={this.disableHandler}>
                      Disable
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}

export default Userlist;
