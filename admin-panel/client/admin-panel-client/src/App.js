import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Login from "./components/login";
import Navbar from "./components/navbar";
import Admin from "./components/admin";
import User from "./components/user";

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loggedin: false,
    };
  }

  loginNavHandler = (value) => {
    this.setState({ loggedin: value });
  };

  render() {
    return (
      <div className="App">
        <Router>
          <Navbar
            loggedin={this.state.loggedin}
            loginNavHandler={this.loginNavHandler}
          />
          <Switch>
            <Route path="/" exact>
              <h2>Welcome To Website</h2>
            </Route>
            <Route
              path="/login/"
              render={(props) => (
                <Login {...props} loginNavHandler={this.loginNavHandler} />
              )}
            />
            <Route path="/admin/" component={Admin} />
            <Route path="/user/profile" component={User} />
          </Switch>
        </Router>
      </div>
    );
  }
}

export default App;
