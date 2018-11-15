import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import LeftArrowIcon from '@material-ui/icons/KeyboardArrowLeft';
import RightArrowIcon from '@material-ui/icons/KeyboardArrowRight';
import EventIcon from '@material-ui/icons/Event';
import { DatePicker } from 'material-ui-pickers';
import moment from 'moment';
import {
  TextField,
  Typography,
  FormControlLabel,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Checkbox,
  Button,
  Grid,
} from '@material-ui/core';
import { Query } from 'react-apollo';
import {
  DEPARTMENTS_QUERY,
  DEGREES_QUERY,
  SEMESTERS_QUERY,
} from '../../apollo/queries';

const styles = theme => ({
  form: {
    width: 500,
    maxWidth: '100%',
    marginTop: theme.spacing.unit * 1,
    marginBottom: theme.spacing.unit * 2,
  },
  formControl: {
    marginTop: theme.spacing.unit,
    marginBottom: theme.spacing.unit,
  },
  formButton: {
    marginTop: theme.spacing.unit * 3,
    marginBottom: theme.spacing.unit,
  },
});

class FormUserDetails extends Component {
  continue = e => {
    e.preventDefault();
    this.props.nextStep();
  };

  render() {
    const { values, onChange, onCheck, onDateChange, classes } = this.props;
    return (
      <>
        <Typography variant="h5" align="center">
          Enter Author Details:
        </Typography>
        <form className={classes.form}>
          <TextField
            className={classes.formControl}
            label="First Name"
            helperText="Author's first name"
            onChange={onChange('authorFirstName')}
            value={values.authorFirstName}
            autoFocus
            fullWidth
            required
          />
          <TextField
            className={classes.formControl}
            label="Middle Name(s)"
            helperText="Author's middle name(s)"
            onChange={onChange('authorMiddleNames')}
            value={values.authorMiddleNames}
            fullWidth
          />
          <TextField
            className={classes.formControl}
            label="Last Name"
            helperText="Author's last name"
            onChange={onChange('authorLastName')}
            value={values.authorLastName}
            fullWidth
            required
          />
          <TextField
            className={classes.formControl}
            label="Email"
            helperText="Author's email address"
            onChange={onChange('authorEmail')}
            value={values.authorEmail}
            type="email"
            fullWidth
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={values.showEmail}
                onChange={onCheck('showEmail')}
                value="showEmail"
                color="primary"
              />
            }
            label="Show author email in repository"
          />

          <Query query={DEPARTMENTS_QUERY}>
            {({ loading, data: { departments } }) => {
              if (loading) {
                return <p>Loading departments...</p>;
              }

              const deptItems = departments.map(dept => (
                <MenuItem key={dept.id} value={dept.id}>
                  {dept.name}
                </MenuItem>
              ));

              return (
                <FormControl className={classes.formControl} fullWidth required>
                  <InputLabel htmlFor="department">Department</InputLabel>
                  <Select
                    name="department"
                    value={values.departmentId}
                    onChange={onChange('departmentId')}
                  >
                    {deptItems}
                  </Select>
                </FormControl>
              );
            }}
          </Query>

          <Query query={DEGREES_QUERY}>
            {({ loading, data: { degrees } }) => {
              if (loading) {
                return <p>Loading degrees...</p>;
              }

              const degreeItems = degrees.map(deg => (
                <MenuItem key={deg.id} value={deg.id}>
                  {deg.name}
                </MenuItem>
              ));

              return (
                <FormControl className={classes.formControl} fullWidth required>
                  <InputLabel htmlFor="degree">Degree</InputLabel>
                  <Select
                    name="degree"
                    value={values.degreeId}
                    onChange={onChange('degreeId')}
                  >
                    {degreeItems}
                  </Select>
                </FormControl>
              );
            }}
          </Query>

          <Query query={SEMESTERS_QUERY}>
            {({ loading, data: { semesters } }) => {
              if (loading) {
                return <p>Loading semesters...</p>;
              }

              const semesterItems = semesters.map(semester => (
                <MenuItem key={semester.id} value={semester.id}>
                  {semester.name}
                </MenuItem>
              ));

              return (
                <FormControl className={classes.formControl} fullWidth required>
                  <InputLabel htmlFor="semester">
                    Expected Graduation Semester
                  </InputLabel>
                  <Select
                    name="semester"
                    value={values.semesterId}
                    onChange={onChange('semesterId')}
                  >
                    {semesterItems}
                  </Select>
                </FormControl>
              );
            }}
          </Query>

          <DatePicker
            keyboard
            allowKeyboardControl
            name="defenseDate"
            value={moment(values.defenseDate)}
            onChange={onDateChange('defenseDate')}
            label="Defense Date"
            fullWidth
            format="MMM Do, YYYY"
            disablePast
            className={classes.formControl}
            leftArrowIcon={<LeftArrowIcon />}
            rightArrowIcon={<RightArrowIcon />}
            keyboardIcon={<EventIcon />}
          />

          <Grid container justify="space-between">
            <Button
              component={Link}
              to="/"
              variant="contained"
              color="secondary"
              className={classes.formButton}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              color="primary"
              variant="contained"
              className={classes.formButton}
              onClick={this.continue}
            >
              Continue
            </Button>
          </Grid>
        </form>
      </>
    );
  }
}

export default withStyles(styles)(FormUserDetails);
