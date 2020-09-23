import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Switch, Route, Redirect, withRouter} from 'react-router-dom';

import Layout from './hoc/Layout/Layout';
import Accounting from './containers/Accounting/Accounting';
import Auth from './containers/Auth/Auth';
import Logout from './components/Logout/Logout';
import Info from './containers/Info/Info';
import Stat from './containers/Stat/Stat';

import {autoLogin} from './store/actions/auth';

class App extends Component {
  componentDidMount() {
    this.props.autoLogin();
  }

  render() {
    let routes = (
      <Switch>
        <Route path="/auth" component={Auth} />
        <Route path="/info" component={Info} />

        <Redirect to="/info" />
      </Switch>
    );

    if (this.props.isAuthenticated) {
      routes = (
        <Switch>
          <Route path="/" exact component={Accounting} />
          <Route path="/stat" component={Stat} />
          <Route path="/info" component={Info} />
          <Route path="/logout" component={Logout} />

          <Redirect to="/" />
        </Switch>
      );
    }

    return <Layout>{routes}</Layout>;
  }
}

function mapStateToProps(state) {
  return {
    isAuthenticated: !!state.auth.token,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    autoLogin: () => dispatch(autoLogin()),
  };
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
