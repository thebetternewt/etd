import React, { Component } from 'react';
import moment from 'moment';
import { withStyles } from '@material-ui/core/styles';
import { Paper, Stepper, Step, StepLabel } from '@material-ui/core';
import FormAuthorDetails from './FormAuthorDetails';
import FormDocumentDetails from './FormDocumentDetails';
import Confirm from './Confirm';
import Success from './Success';

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
});

class EtdForm extends Component {
  state = {
    step: 1,
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
  };

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

  getSteps = () => ['Author Info', 'Document Info', 'Confirm'];

  render() {
    const {
      step,
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
    };

    let component;

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
          <Confirm
            nextStep={this.nextStep}
            prevStep={this.prevStep}
            values={values}
          />
        );
        break;
      case 4:
        component = <Success />;
        break;
      default:
        break;
    }

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
      </>
    );
  }
}

export default withStyles(styles)(EtdForm);
