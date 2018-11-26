import React, { Component, Fragment } from 'react';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';

import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import LockIcon from '@material-ui/icons/LockOutlined';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import withStyles from '@material-ui/core/styles/withStyles';
import { isAuthenticated } from '../../apollo/client';

import Login from './Login';
import SignUp from './SignUp';

const styles = theme => ({
  layout: {
    width: 'auto',
    display: 'block', // Fix IE11 issue.
    marginLeft: theme.spacing.unit * 3,
    marginRight: theme.spacing.unit * 3,
    [theme.breakpoints.up(400 + theme.spacing.unit * 3 * 2)]: {
      width: 400,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  },
  paper: {
    marginTop: theme.spacing.unit * 8,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme
      .spacing.unit * 3}px`,
  },
  avatar: {
    margin: theme.spacing.unit,
    backgroundColor: theme.palette.secondary.main,
  },
});

class Auth extends Component {
  state = {
    isSigningUp: false,
  };

  toggleSignUp = () =>
    this.setState(({ isSigningUp }) => ({
      isSigningUp: !isSigningUp,
    }));

  render() {
    const { classes } = this.props;
    const { isSigningUp } = this.state;
    if (isAuthenticated()) {
      return <Redirect to="/dashboard" />;
    }

    return (
      <Fragment>
        <div className={classes.layout}>
          <Paper className={classes.paper} elevation={4}>
            <Avatar className={classes.avatar}>
              <LockIcon />
            </Avatar>
            {isSigningUp ? (
              <SignUp switchToLogin={this.toggleSignUp} />
            ) : (
              <Login switchToSignUp={this.toggleSignUp} />
            )}
          </Paper>
        </div>
      </Fragment>
    );
  }
}

Auth.propTypes = {
  classes: PropTypes.shape().isRequired,
};

export default withStyles(styles)(Auth);
