import React, { Component } from 'react';
import Layout from './hoc/Layout/Layout';
import Expenses from './containers/Expenses/Expenses';
import YearStat from './containers/YearStat/YearStat';
import { Switch, Route, Redirect, withRouter } from 'react-router-dom';
// import Income from './containers/Income/Income';
import Invest from './containers/Invest/Invest';
import Auth from './containers/Auth/Auth';
import { connect } from 'react-redux';
import Logout from './components/Logout/Logout';
import { autoLogin } from './store/actions/auth';

class App extends Component {
  componentDidMount() {
    this.props.autoLogin();
  }

  render() {
    let routes = (
      <Switch>
        <Route path="/auth" component={Auth} />
        <Redirect to="/" />
      </Switch>
    );

    if (this.props.isAuthenticated) {
      routes = (
        <Switch>
          <Route path="/" exact component={Expenses} />
          <Route path="/income" component={Expenses} />
          <Route path="/invest" component={Invest} />
          <Route path="/yearstat" component={YearStat} />
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
