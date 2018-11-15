import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import { ApolloProvider } from 'react-apollo';
import { MuiPickersUtilsProvider } from 'material-ui-pickers';
import MomentUtils from '@date-io/moment';
import client from './apollo/client';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import ScrollToTop from './components/common/ScrollToTop';

const app = (
  <ApolloProvider client={client}>
    <MuiPickersUtilsProvider utils={MomentUtils}>
      <Router>
        <ScrollToTop>
          <App />
        </ScrollToTop>
      </Router>
    </MuiPickersUtilsProvider>
  </ApolloProvider>
);

ReactDOM.render(app, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
