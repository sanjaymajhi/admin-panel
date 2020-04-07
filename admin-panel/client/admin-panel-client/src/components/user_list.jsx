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
    const overlay = document.querySelector(".overlay");
    overlay.style.display = "block";
    fetch("/api/list/", {
      method: "POST",
      body: JSON.stringify({ token: localStorage.getItem("token") }),
      headers: {
        "content-type": "application/json",
      },
    })
      .then((res) => res.json())
      .then(async (data) => {
        if (data.saved === "unsuccessful") {
          const errors = document.getElementById("errors");
          errors.innerHTML += data.error.msg;
          window.location.hash = "errors";
          setTimeout(function () {
            errors.style.display = "none";
            errors.innerHTML = "Errors : ";
          }, 10000);
        } else {
          await this.setState({ users: data });
        }
        overlay.style.display = "none";
      });
  };

  disableHandler = (e) => {
    e.preventDefault();
    const overlay = document.querySelector(".overlay");
    overlay.style.display = "block";
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
      .then((data) => {
        overlay.style.display = "none";
        if (data.saved === "success") {
          document.getElementById(id).replaceWith("blocked");
        }
      });
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
                <td>
                  {user.last_active === undefined
                    ? "No logins"
                    : new Date(user.last_active).toLocaleString()}
                </td>
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
        <p id="errors" style={{ display: "none" }}>
          Errors :{" "}
        </p>
        <div className="overlay">
          <div
            className="circular-loader"
            style={{ position: "absolute", top: "45vh", left: "45vw" }}
          ></div>
          <p style={{ position: "absolute", top: "60vh", left: "43vw" }}>
            Please Wait...
          </p>
        </div>
      </div>
    );
  }
}

export default Userlist;
