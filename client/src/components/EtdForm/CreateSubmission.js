import React from 'react';
import { Mutation } from 'react-apollo';
import { withStyles } from '@material-ui/core/styles';
import { CircularProgress, Button, Grid } from '@material-ui/core';
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
});

const CreateSubmission = ({
  classes,
  back,
  nextStep,
  setSubmissionId,
  values,
}) => (
  <Mutation mutation={ADD_SUBMISSION}>
    {(addSubmission, { data, loading, error }) => {
      if (loading) {
        return (
          <CircularProgress color="secondary" style={{ margin: '1rem 0' }} />
        );
      }

      if (data) {
        console.log(data);
      }

      return (
        <form
          className={classes.form}
          onSubmit={async e => {
            e.preventDefault();
            try {
              const {
                data: { addSubmission: newSubmission },
              } = await addSubmission({
                variables: { ...values },
                refetchQueries: ['SubmissionsQuery']
              });
              setSubmissionId(newSubmission.id);
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

export default withStyles(styles)(CreateSubmission);
