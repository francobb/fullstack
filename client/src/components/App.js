import React, { Component } from "react";
import { BrowserRouter, Route } from "react-router-dom";
import { connect } from "react-redux";
import * as actions from "../actions";

import Header from "./Header";
import Landing from "./Landing";
import Dashboard from "./Dashboard";
import SurveyNew from "./surveys/SurveyNew";

/**
 * Steps
 *
 * 1: App component automatically calls action creator(s) fetchUser
 * 2: ActionCreator call fetchUser which makes an Ajax request to 'api/current_user'
 * 3: After request is resolved, we get access to the dispatch function where we manually dispatch an action.
 * 4: Action gets sent to all of the REDUCERS which is responsible for knowing what to change the state to based on an action.
 *  Reducers take previous state + action and return a new state.
 * 5: authReducer is responsible for figuring out to change the state whether or not a user is logged in or not with 'current_user'
 */

class App extends Component {
  componentDidMount() {
    this.props.fetchUser();
  }

  render() {
    return (
      <BrowserRouter>
        <div className={"container"}>
          <Header />
          <Route exact path={"/"} component={Landing} />
          <Route exact path={"/surveys"} component={Dashboard} />
          <Route path={"/surveys/new"} component={SurveyNew} />
        </div>
      </BrowserRouter>
    );
  }
}

export default connect(
  null,
  actions
)(App);
