import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { MuiThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';

import Layout from './components/Layout';
import PrivateRoute from './components/common/PrivateRoute';
import SignIn from './components/Auth/SignIn';
import Dashboard from './components/Dashboard';
import SubmissionForm from './components/SubmissionForm';

import theme from './muiTheme';
import checkToken from './util/checkToken';

// Check for token in LS
checkToken();

const App = () => (
  <MuiThemeProvider theme={theme}>
    <CssBaseline />
    <div className="App">
      <Helmet>
        <title>MSU ETD</title>
      </Helmet>
      <Layout>
        <Route exact path="/" component={SignIn} />
        <Switch>
          <PrivateRoute exact path="/dashboard" component={Dashboard} />
        </Switch>
        <Switch>
          <PrivateRoute exact path="/submit" component={SubmissionForm} />
        </Switch>
      </Layout>
    </div>
  </MuiThemeProvider>
);

export default App;
