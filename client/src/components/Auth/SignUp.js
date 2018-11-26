import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Mutation } from 'react-apollo';

import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import Typography from '@material-ui/core/Typography';
import { CircularProgress } from '@material-ui/core';
import withStyles from '@material-ui/core/styles/withStyles';
import jwtDecode from 'jwt-decode';
import {
  setAuthenticatedUser,
  getRedirectPath,
  setRedirectPath,
} from '../../apollo/client';
import { SIGN_UP } from '../../apollo/mutations';

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
  form: {
    width: '100%', // Fix IE11 issue.
    marginTop: theme.spacing.unit,
  },
  submit: {
    marginTop: theme.spacing.unit * 3,
    marginBottom: theme.spacing.unit * 2,
  },
  error: {
    color: 'red',
    marginTop: theme.spacing.unit,
  },
});

class SignUp extends Component {
  state = {
    netId: '',
    idNumber: '',
    firstName: '',
    middleNames: '',
    lastName: '',
    email: '',
    password: '',
  };

  handleInputChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  render() {
    const { classes, switchToLogin } = this.props;
    const {
      netId,
      idNumber,
      firstName,
      middleNames,
      lastName,
      email,
      password,
    } = this.state;

    return (
      <>
        <Typography variant="h5">Sign up</Typography>
        <Mutation
          mutation={SIGN_UP}
          variables={{
            netId,
            idNumber,
            firstName,
            middleNames,
            lastName,
            email,
            password,
          }}
        >
          {(signUp, { data, loading, error }) => {
            if (loading) {
              return (
                <CircularProgress
                  color="secondary"
                  style={{ margin: '1rem 0' }}
                />
              );
            }

            return (
              <>
                {error && (
                  <Typography variant="body1" className={classes.error}>
                    {error.graphQLErrors.map(({ message }) => (
                      <span key={message}>{message}</span>
                    ))}
                  </Typography>
                )}
                <form
                  className={classes.form}
                  onSubmit={async e => {
                    e.preventDefault();
                    try {
                      await signUp();
                      this.setState({
                        netId: '',
                        idNumber: '',
                        firstName: '',
                        middleNames: '',
                        lastName: '',
                        email: '',
                        password: '',
                      });
                      switchToLogin();
                    } catch (err) {
                      console.error(err);
                    }
                  }}
                >
                  <FormControl margin="normal" required fullWidth>
                    <InputLabel htmlFor="netId">NetId</InputLabel>
                    <Input
                      type="text"
                      id="netId"
                      name="netId"
                      value={netId}
                      onChange={this.handleInputChange}
                      autoFocus
                      required
                    />
                  </FormControl>
                  <FormControl margin="normal" required fullWidth>
                    <InputLabel htmlFor="idNumber">
                      9-Digit ID Number
                    </InputLabel>
                    <Input
                      type="text"
                      id="idNumber"
                      name="idNumber"
                      value={idNumber}
                      onChange={this.handleInputChange}
                      required
                    />
                  </FormControl>
                  <FormControl margin="normal" required fullWidth>
                    <InputLabel htmlFor="firstName">First Name</InputLabel>
                    <Input
                      type="text"
                      id="firstName"
                      name="firstName"
                      value={firstName}
                      onChange={this.handleInputChange}
                      required
                    />
                  </FormControl>
                  <FormControl margin="normal" required fullWidth>
                    <InputLabel htmlFor="middleNames">
                      Middle Name(s)
                    </InputLabel>
                    <Input
                      type="text"
                      id="middleNames"
                      name="middleNames"
                      value={middleNames}
                      onChange={this.handleInputChange}
                      required
                    />
                  </FormControl>
                  <FormControl margin="normal" required fullWidth>
                    <InputLabel htmlFor="lastName">Last Name</InputLabel>
                    <Input
                      type="text"
                      id="lastName"
                      name="lastName"
                      value={lastName}
                      onChange={this.handleInputChange}
                      required
                    />
                  </FormControl>
                  <FormControl margin="normal" required fullWidth>
                    <InputLabel htmlFor="email">Email</InputLabel>
                    <Input
                      type="email"
                      id="email"
                      name="email"
                      value={email}
                      onChange={this.handleInputChange}
                      required
                    />
                  </FormControl>
                  <FormControl margin="normal" required fullWidth>
                    <InputLabel htmlFor="password">Password</InputLabel>
                    <Input
                      name="password"
                      type="password"
                      id="password"
                      value={password}
                      onChange={this.handleInputChange}
                      required
                    />
                  </FormControl>
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"
                    className={classes.submit}
                  >
                    Sign up
                  </Button>
                </form>
                <Typography variant="body1" color="secondary">
                  Already have an account?{' '}
                  <Button
                    onClick={() => switchToLogin()}
                    variant="contained"
                    size="small"
                    color="secondary"
                  >
                    Log in
                  </Button>
                </Typography>
              </>
            );
          }}
        </Mutation>
      </>
    );
  }
}

export default withStyles(styles)(SignUp);
