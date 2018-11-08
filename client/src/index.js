import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import { ApolloProvider } from 'react-apollo';
// import client from './apollo/client';
// import MuiPickersUtilsProvider from 'material-ui-pickers/utils/MuiPickersUtilsProvider';
// import MomentUtils from 'material-ui-pickers/utils/moment-utils';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import ScrollToTop from './components/common/ScrollToTop';


const app = (
  <Router>
    <ScrollToTop>
      <App />
    </ScrollToTop>
  </Router>
);

ReactDOM.render(app, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
