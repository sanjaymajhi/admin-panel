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
    fetch("/users/list/", {
      method: "POST",
      body: JSON.stringify({ token: localStorage.getItem("token") }),
      headers: {
        "content-type": "application/json",
      },
    })
      .then((res) => res.json())
      .then(async (data) => await this.setState({ users: data }));
  };

  disableHandler = (e) => {
    e.preventDefault();
    fetch("/users/disable", {
      method: "POST",
      body: JSON.stringify({
        token: localStorage.getItem("token"),
        email: e.id,
      }),
      headers: {
        "content-type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => console.log(data));
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
                <td>{user.last_active}</td>
                <td>
                  {user.disbled ? (
                    "Disabled"
                  ) : (
                    <button id={user.email}>Disable</button>
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
