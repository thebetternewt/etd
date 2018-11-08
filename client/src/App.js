import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { MuiThemeProvider } from '@material-ui/core/styles';
import theme from './muiTheme';
import Layout from './components/Layout'


class App extends Component {
  render() {
    return (
      <MuiThemeProvider theme={theme}>
        <div className="App">
          <Helmet>
            <title>Timeclock 3</title>
          </Helmet>
          <Layout>
            <Route exact path="/" render={() => <h1>Welcome to the ETD Workflow</h1>} />
            {/* <Switch>
              <PrivateRoute path="/dashboard" component={Dashboard} />
            </Switch> */}
          </Layout>
        </div>
      </MuiThemeProvider>
    );
  }
}

export default App;
