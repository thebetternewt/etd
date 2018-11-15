import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
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
  FormLabel,
  RadioGroup,
  Radio,
} from '@material-ui/core';

const styles = theme => ({
  form: {
    width: 500,
    maxWidth: '100%',
    marginTop: theme.spacing.unit * 1,
    marginBottom: theme.spacing.unit * 2,
  },
  formControl: {
    marginTop: theme.spacing.unit,
    marginBottom: theme.spacing.unit * 3,

    '& legend': {
      marginBottom: theme.spacing.unit,
    },
  },
  formButton: {
    marginTop: theme.spacing.unit * 3,
    marginBottom: theme.spacing.unit,
  },
  group: {
    margin: `${theme.spacing.unit}px 0`,
  },
  radioOption: {
    alignItems: 'flex-start',

    '& > span:nth-of-type(2)': {
      paddingTop: 14,
    },
  },
});

class FormPersonalDetails extends Component {
  continue = e => {
    e.preventDefault();
    this.props.nextStep();
  };

  back = e => {
    e.preventDefault();
    this.props.prevStep();
  };

  render() {
    const { values, onChange, onCheck, classes } = this.props;
    return (
      <>
        <Typography variant="h5" align="center">
          Enter Document Details:
        </Typography>
        <form className={classes.form}>
          <FormControl className={classes.formControl} fullWidth required>
            <InputLabel htmlFor="type">Document Type</InputLabel>
            <Select value={values.type} onChange={onChange('type')} autoFocus>
              <MenuItem value="THESIS">Thesis</MenuItem>
              <MenuItem value="DISSERTATION">Dissertation</MenuItem>
            </Select>
          </FormControl>
          <TextField
            className={classes.formControl}
            label="Title"
            onChange={onChange('title')}
            value={values.title}
            fullWidth
            required
          />
          <TextField
            className={classes.formControl}
            label="Abstract"
            onChange={onChange('abstract')}
            value={values.abstract}
            fullWidth
            multiline
            rows={8}
            required
          />
          <TextField
            className={classes.formControl}
            label="Keywords"
            helperText="3 to 5 keywords about the subject of your paper, separated by commas"
            onChange={onChange('keywords')}
            value={values.keywords}
            fullWidth
            multiline
          />

          <div className={classes.formControl}>
            <FormLabel>Copyright</FormLabel>
            <Typography variant="body1" gutterBottom style={{ marginTop: 8 }}>
              I hereby certify that, if appropriate, I have obtained and
              attached hereto a written permission statement from the owner(s)
              of each third party copyrighted matter to be included in my
              thesis, Dissertation, or project report, allowing distribution as
              specified below. I certify that the version I submitted is the
              same as that approved by my advisory committee.
            </Typography>

            <Typography variant="body1" gutterBottom>
              I hereby grant to Mississippi State University Libraries or its
              agents the non-exclusive license to archive and make accessible,
              under the conditions specified below, my thesis, Dissertation, or
              project report in whole or in part in all forms of media, now or
              hereafter known. I retain all other ownership rights to the
              copyright of the thesis, Dissertation or project report. I also
              retain the right to use in future works (such as articles or
              books) all or part of this thesis, Dissertation, or project
              report.
            </Typography>
          </div>
          <FormControlLabel
            control={
              <Checkbox
                checked={values.copyrightAgree}
                onChange={onCheck('copyrightAgree')}
                value="copyrightAgree"
                color="primary"
              />
            }
            label="I agree."
          />

          <FormControl component="fieldset" className={classes.formControl}>
            <Typography variant="body1" gutterBottom>
              My advisory committee and I agree that the above mentioned
              document be placed in the ETD archive with the following status
              (choose one):
            </Typography>
            <FormLabel component="legend">Availability</FormLabel>
            <RadioGroup
              aria-label="Availability"
              name="availability"
              className={classes.group}
              value={values.availability}
              onChange={onChange('availability')}
            >
              <FormControlLabel
                value="WORLDWIDE"
                control={<Radio color="primary" />}
                label="Release the entire work immediately for access worldwide."
                className={classes.radioOption}
              />
              <FormControlLabel
                value="MSU_ONLY"
                control={<Radio color="primary" />}
                label="Release the entire work for Mississippi State University access only."
                className={classes.radioOption}
              />
              <FormControlLabel
                value="PATENT"
                control={<Radio color="primary" />}
                label="Secure the entire work for patent and/or proprietary purposes for a period of one year. During this period the copyright owner also agrees not to exercise her/his ownership rights, including public use in works, without prior authorization from Mississippi State University. At the end of the one year period, either we or Mississippi State University may request an automatic extension for one additional year. At the end of the one year secure period (or its extension, if such is requested), the work will be handled under option 1 above, unless we request option 2 in writing."
                className={classes.radioOption}
              />
            </RadioGroup>
          </FormControl>

          {values.availability === 'MSU_ONLY' && (
            <FormControl className={classes.formControl} fullWidth required>
              <InputLabel htmlFor="restrictionYears">
                Restriction Period (years)
              </InputLabel>
              <Select
                name="restrictionYears"
                value={values.restrictionYears}
                onChange={onChange('restrictionYears')}
              >
                <MenuItem value={1}>1</MenuItem>
                <MenuItem value={2}>2</MenuItem>
                <MenuItem value={3}>3</MenuItem>
              </Select>
            </FormControl>
          )}

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

export default withStyles(styles)(FormPersonalDetails);
