import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import {
  CircularProgress,
  Typography,
  Button,
  Grid,
  List,
  ListItem,
  ListItemText,
} from '@material-ui/core';
import { Mutation } from 'react-apollo';
import { ADD_SUBMISSION } from '../../apollo/mutations';

const styles = theme => ({
  form: {
    width: 500,
    maxWidth: '100%',
    marginTop: theme.spacing.unit * 1,
    marginBottom: theme.spacing.unit * 2,
  },
  formButton: {
    marginTop: theme.spacing.unit * 3,
    marginBottom: theme.spacing.unit,
  },
  list: {
    width: '100%',
  },
});

class Confirm extends Component {
  confirm = () => {
    this.props.nextStep();
  };

  back = e => {
    e.preventDefault();
    this.props.prevStep();
  };

  render() {
    const { values, classes } = this.props;

    const {
      authorFirstName,
      authorMiddleNames,
      authorLastName,
      authorEmail,
      showEmail,
      type,
      title,
      keywords,
      abstract,
      copyrightAgree,
      availability,
      restrictionYears,
      defenseDate,
      degreeId,
      departmentId,
      semesterId,
    } = values;

    console.log('values:', values);

    return (
      <>
        <Typography variant="h5" align="center">
          Confirm:
        </Typography>
        <List className={classes.list}>
          <ListItem divider>
            <ListItemText primary="First Name" secondary={authorFirstName} />
          </ListItem>
          <ListItem divider>
            <ListItemText primary="Last Name" secondary={authorMiddleNames} />
          </ListItem>
          <ListItem divider>
            <ListItemText primary="Last Name" secondary={authorLastName} />
          </ListItem>
          <ListItem divider>
            <ListItemText primary="Email" secondary={authorEmail} />
          </ListItem>
          <ListItem divider>
            <ListItemText primary="Document Type" secondary={type} />
          </ListItem>
          <ListItem divider>
            <ListItemText primary="Title" secondary={title} />
          </ListItem>
          <ListItem divider>
            <ListItemText primary="Keywords" secondary={keywords} />
          </ListItem>
          <ListItem divider>
            <ListItemText primary="Abstract" secondary={abstract} />
          </ListItem>
          <ListItem divider>
            <ListItemText
              primary="Copyright Agree"
              secondary={copyrightAgree}
            />
          </ListItem>
          <ListItem divider>
            <ListItemText primary="Availability" secondary={availability} />
          </ListItem>
        </List>

        <Mutation mutation={ADD_SUBMISSION}>
          {(addSubmission, { data, loading, error }) => {
            console.log('data:', data);
            if (loading) {
              return (
                <CircularProgress
                  color="secondary"
                  style={{ margin: '1rem 0' }}
                />
              );
            }

            if (data) {
              console.log(data);
              this.confirm();
            }

            return (
              <form
                className={classes.form}
                onSubmit={async e => {
                  e.preventDefault();
                  await addSubmission({
                    variables: { ...values },
                  }).catch(err => console.log(err.message));
                }}
              >
                <Grid container justify="space-between">
                  <Button
                    color="secondary"
                    variant="contained"
                    className={classes.formButton}
                    onClick={this.back}
                  >
                    Back
                  </Button>

                  <Button
                    type="submit"
                    color="primary"
                    variant="contained"
                    className={classes.formButton}
                  >
                    Confirm
                  </Button>
                </Grid>
              </form>
            );
          }}
        </Mutation>
      </>
    );
  }
}

export default withStyles(styles)(Confirm);
