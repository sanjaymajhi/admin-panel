import React, { Component } from "react";
class Adduser extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: "",
      email: "",
      password: "",
    };
  }

  handleChange = async (e) => {
    const target = e.target;
    const name = target.name;
    const value = target.value;
    await this.setState({
      [name]: value,
    });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const overlay = document.querySelector(".overlay");
    overlay.style.display = "block";
    fetch("/api/add_user", {
      method: "POST",
      body: JSON.stringify({
        ...this.state,
        token: localStorage.getItem("token"),
      }),
      headers: {
        "content-type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.saved === "success") {
          const h2 = document.getElementById("saved");
          h2.innerHTML = "User successfully created...";
          h2.style.display = "block";
        } else {
          let errors = document.getElementById("errors");
          errors.style.display = "block";
          if (data.error) {
            errors.innerHTML += data.error.msg;
          }
          if (data.errors) {
            data.errors.map((err) => {
              errors.innerHTML += "<p>" + err.msg + "<br/></p>";
            });
          }
          window.location.hash = "errors";
          setTimeout(function () {
            errors.style.display = "none";
            errors.innerHTML = "Errors : ";
          }, 10000);
        }
        overlay.style.display = "none";
      });
  };

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit} id="login_form">
          <h2 style={{ gridColumn: "span 2" }}>Add User</h2>
          <label htmlFor="name">Name : </label>
          <input
            type="text"
            name="name"
            value={this.state.name}
            onChange={this.handleChange}
          />
          <label htmlFor="email">Email : </label>
          <input
            type="email"
            name="email"
            value={this.state.email}
            onChange={this.handleChange}
          />
          <label htmlFor="password">Password : </label>
          <input
            type="password"
            name="password"
            value={this.state.password}
            onChange={this.handleChange}
          />
          <div />
          <input type="submit" value="Save User" />
        </form>
        <h2 id="saved" style={{ display: "none" }}></h2>
        <p id="errors">Errors : </p>
        <div className="overlay">
          <div
            className="circular-loader"
            style={{ position: "absolute", top: "45vh", left: "45vw" }}
          ></div>
          <p style={{ position: "absolute", top: "60vh", left: "43vw" }}>
            Verifying Credentials...
          </p>
        </div>
      </div>
    );
  }
}

export default Adduser;
