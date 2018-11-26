import React, { Component } from 'react';
import moment from 'moment';
import { withStyles } from '@material-ui/core/styles';
import {
  Paper,
  Stepper,
  Step,
  StepLabel,
  Snackbar,
  SnackbarContent,
  IconButton,
  Slide,
} from '@material-ui/core';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import CloseIcon from '@material-ui/icons/Close';
import green from '@material-ui/core/colors/green';

import FormAuthorDetails from './FormAuthorDetails';
import FormDocumentDetails from './FormDocumentDetails';
import FormFileUpload from './FormFileUpload';
import Review from './Review';
import Success from './Success';

function TransitionLeft(props) {
  return <Slide {...props} direction="left" />;
}

const styles = theme => ({
  paper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    marginTop: theme.spacing.unit * 3,
    marginBottom: theme.spacing.unit * 3,
    padding: theme.spacing.unit * 2,
    paddingTop: theme.spacing.unit * 3,
    minHeight: 300,
    maxWidth: 800,
    margin: 'auto',
    [theme.breakpoints.up(600 + theme.spacing.unit * 3 * 2)]: {
      marginTop: theme.spacing.unit * 6,
      marginBottom: theme.spacing.unit * 6,
      padding: theme.spacing.unit * 3,
      paddingTop: theme.spacing.unit * 5,
    },
  },
  stepper: {
    width: '100%',
    backgroundColor: 'transparent',
  },
  snackbar: {
    top: 84,
  },
  snackbarContent: {
    backgroundColor: green[600],
  },
  snackbarMessage: {
    display: 'flex',
    alignItems: 'center',
  },
  snackbarIcon: {
    marginRight: theme.spacing.unit,
  },
});

class EtdForm extends Component {
  state = {
    ...this.getInitState(),
    step: 1,
    snackbarOpen: false,
    snackbarMessage: '',
  };

  getInitState() {
    const { submission } = this.props;

    return (
      submission || {
        authorFirstName: '',
        authorMiddleNames: '',
        authorLastName: '',
        authorEmail: '',
        showEmail: false,
        type: '',
        title: '',
        keywords: '',
        abstract: '',
        copyrightAgree: false,
        availability: '',
        restrictionYears: 0,
        defenseDate: moment().format(),
        degreeId: '',
        departmentId: '',
        semesterId: '',
        submissionId: null,
      }
    );
  }

  // Proceed to next step
  nextStep = () => {
    this.setState(({ step }) => ({ step: step + 1 }));
  };

  // Go to previous step
  prevStep = () => {
    this.setState(({ step }) => ({ step: step - 1 }));
  };

  // Handle fields change
  handleChange = input => e => {
    this.setState({ [input]: e.target.value });
  };

  // Handle date fields change
  handleDateChange = input => value => {
    this.setState({ [input]: value.format() });
  };

  // Handle fields check
  handleCheck = input => e => {
    this.setState({ [input]: e.target.checked });
  };

  setSubmissionId = submissionId => {
    this.setState({ submissionId });
  };

  handleOpenSnackbar = message => {
    this.setState({ snackbarMessage: message, snackbarOpen: true });

    setTimeout(() => {
      this.handleCloseSnackbar();
    }, 3000);
  };

  handleCloseSnackbar = () => {
    this.setState({ snackbarOpen: false });
  };

  getSteps = () => [
    'Author Details',
    'Document Details',
    'Review',
    'Attach Files',
  ];

  render() {
    const {
      step,
      snackbarOpen,
      snackbarMessage,
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
      // File paths
      documentPath,
      rightsFormPath,
    } = this.state;

    const values = {
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
    };

    const filePaths = {
      documentPath,
      rightsFormPath,
    };

    let component;

    /* eslint-disable */
    switch (step) {
      case 1:
        component = (
          <FormAuthorDetails
            nextStep={this.nextStep}
            onChange={this.handleChange}
            onDateChange={this.handleDateChange}
            onCheck={this.handleCheck}
            values={values}
          />
        );
        break;

      case 2:
        component = (
          <FormDocumentDetails
            nextStep={this.nextStep}
            prevStep={this.prevStep}
            onChange={this.handleChange}
            onCheck={this.handleCheck}
            values={values}
          />
        );
        break;
      case 3:
        component = (
          <Review
            nextStep={this.nextStep}
            prevStep={this.prevStep}
            setSubmissionId={this.setSubmissionId}
            values={values}
          />
        );
        break;
      case 4:
        component = (
          <FormFileUpload
            nextStep={this.nextStep}
            filePaths={filePaths}
            submissionId={submissionId}
            showAlert={this.handleOpenSnackbar}
          />
        );
        break;
      case 5:
        component = <Success />;
        break;
      default:
        break;
    }
    /* eslint-enable */

    const { classes } = this.props;
    const steps = this.getSteps();

    return (
      <>
        <Paper className={classes.paper} elevation={8}>
          <Stepper
            activeStep={step - 1}
            alternativeLabel
            className={classes.stepper}
          >
            {steps.map(label => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
          {component}
        </Paper>
        <Snackbar
          open={snackbarOpen}
          onClose={this.handleCloseSnackbar}
          TransitionComponent={TransitionLeft}
          ContentProps={{
            'aria-describedby': 'submission-success-snackbar',
          }}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        >
          <SnackbarContent
            className={classes.snackbarContent}
            aria-describedby="submission-success-snackbar"
            message={
              <span
                id="submission-success-snackbar"
                className={classes.snackbarMessage}
              >
                <CheckCircleIcon className={classes.snackbarIcon} />
                {snackbarMessage}
              </span>
            }
            action={[
              <IconButton
                key="close"
                aria-label="Close"
                color="inherit"
                onClick={this.handleCloseSnackbar}
              >
                <CloseIcon />
              </IconButton>,
            ]}
          />
        </Snackbar>
      </>
    );
  }
}

export default withStyles(styles)(EtdForm);
