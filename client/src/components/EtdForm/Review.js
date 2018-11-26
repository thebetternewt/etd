import React, { Component } from 'react';
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
import CreateSubmission from './CreateSubmission';
import UpdateSubmission from './UpdateSubmission';

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

class Review extends Component {
  continue = () => this.props.nextStep();

  back = e => {
    e.preventDefault();
    this.props.prevStep();
  };

  render() {
    const { values, classes, setSubmissionId } = this.props;

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
      submissionId,
    } = values;

    return (
      <>
        <Typography variant="h5" align="center">
          Review:
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
              secondary={copyrightAgree.toString()}
            />
          </ListItem>
          <ListItem divider>
            <ListItemText primary="Availability" secondary={availability} />
          </ListItem>
        </List>

        {submissionId ? (
          <UpdateSubmission
            back={this.back}
            nextStep={this.continue}
            values={values}
          />
        ) : (
          <CreateSubmission
            back={this.back}
            nextStep={this.continue}
            values={values}
            setSubmissionId={setSubmissionId}
          />
        )}
      </>
    );
  }
}

export default withStyles(styles)(Review);
