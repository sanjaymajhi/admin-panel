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
    fetch("/api/add_user", {
      method: "POST",
      body: JSON.stringify({ ...this.state }),
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
      </div>
    );
  }
}

export default Adduser;
