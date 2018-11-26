import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { MuiThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';

import Layout from './components/Layout';
import PrivateRoute from './components/common/PrivateRoute';
import Auth from './components/Auth';
import Dashboard from './components/Dashboard';
import GetSubmission from './components/EtdForm/GetSubmission';
import EtdForm from './components/EtdForm';
import UnassignedReviews from './components/UnassignedReviews';

import theme from './muiTheme';
import checkToken from './util/checkToken';
import ReviewSubmission from './components/ReviewSubmission';

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
        <Route exact path="/" component={Auth} />
        <Switch>
          <PrivateRoute exact path="/dashboard" component={Dashboard} />
        </Switch>
        <Switch>
          <PrivateRoute
            exact
            path="/unassigned"
            component={UnassignedReviews}
          />
        </Switch>
        <Switch>
          <PrivateRoute exact path="/submit" component={EtdForm} />
        </Switch>
        <Switch>
          <PrivateRoute
            exact
            path="/submit/:submissionId"
            component={GetSubmission}
          />
        </Switch>
        <Switch>
          <PrivateRoute
            exact
            path="/review/:reviewId"
            component={ReviewSubmission}
          />
        </Switch>
      </Layout>
    </div>
  </MuiThemeProvider>
);

export default App;
