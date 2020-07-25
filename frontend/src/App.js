import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Signup from "./Components/user/Signup";
import Signin from "./Components/user/Signin";
import PrivateRoute from "./Components/auth/PrivateRoutes";
import TodoScreen from "./Components/todo/TodoScreen";
import "./App.css";
require("dotenv").config();

const App = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/signup" exact component={Signup} />
        <Route path="/" exact component={Signup} />
        <Route path="/signin" exact component={Signin} />
        <PrivateRoute path="/user/todos" exact component={TodoScreen} />
      </Switch>
    </BrowserRouter>
  );
};

export default App;
