import React from 'react';
import { Mutation } from 'react-apollo';
import { withStyles } from '@material-ui/core/styles';
import {
  CircularProgress,
  Button,
  Grid,
  Snackbar,
  SnackbarContent,
} from '@material-ui/core';
import { UPDATE_SUBMISSION } from '../../apollo/mutations';

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
});

const UpdateSubmission = ({ classes, back, nextStep, values }) => (
  <Mutation mutation={UPDATE_SUBMISSION}>
    {(updateSubmission, { data, loading, error }) => {
      if (loading) {
        return (
          <CircularProgress color="secondary" style={{ margin: '1rem 0' }} />
        );
      }

      return (
        <form
          className={classes.form}
          onSubmit={async e => {
            e.preventDefault();
            try {
              await updateSubmission({
                variables: { id: values.submissionId, ...values },
                refetchQueries: ['SubmissionsQuery'],
              });
              nextStep();
            } catch (err) {
              console.log(err.message);
            }
          }}
        >
          <Grid container justify="space-between">
            <Button
              color="secondary"
              variant="contained"
              className={classes.formButton}
              onClick={back}
            >
              Back
            </Button>

            <Button
              type="submit"
              color="primary"
              variant="contained"
              className={classes.formButton}
            >
              Continue
            </Button>
          </Grid>
        </form>
      );
    }}
  </Mutation>
);

export default withStyles(styles)(UpdateSubmission);
