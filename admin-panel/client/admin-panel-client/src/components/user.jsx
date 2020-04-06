import React, { Component } from "react";
class User extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: "",
      email: "",
    };
  }
  componentDidMount() {
    this.fetchUser();
  }

  fetchUser = () => {
    fetch("/api/profile", {
      method: "POST",
      body: JSON.stringify({ token: localStorage.getItem("token") }),
      headers: {
        "content-type": "application/json",
      },
    })
      .then((res) => res.json())
      .then(async (data) => {
        if (data.saved === "unsuccessful") {
          alert("You are not logged in...");
          this.props.history.push("/login");
        } else {
          await this.setState({
            name: data.name,
            email: data.email,
          });
        }
      });
  };
  render() {
    return (
      <div className="main">
        <div id="login_form">
          <h2 style={{ gridColumn: "span 2" }}>Profile</h2>
          <h2>Name :</h2>
          <h2>{this.state.name}</h2>
          <h2>Email :</h2>
          <h2>{this.state.email}</h2>
        </div>
      </div>
    );
  }
}

export default User;
