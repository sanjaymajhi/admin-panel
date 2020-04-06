import React, { Component } from "react";

import { Route, Switch } from "react-router-dom";
import Anav from "./admin_nav";
import Userlist from "./user_list";
import Adduser from "./addUser";

class Admin extends Component {
  render() {
    return (
      <div className="admin">
        <Anav />

        <Switch>
          <Route
            path="/admin/user_list"
            exact
            render={(props) => <Userlist {...props} />}
          />
          <Route
            path="/admin/addUser"
            exact
            render={(props) => <Adduser {...props} />}
          />
        </Switch>
      </div>
    );
  }
}

export default Admin;
