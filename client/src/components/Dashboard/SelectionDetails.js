import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import { CircularProgress, Paper, Typography, Button } from '@material-ui/core';
import { Mutation } from 'react-apollo';
import { SUBMIT_FOR_REVIEW } from '../../apollo/mutations';

const styles = theme => ({
  paper: {
    display: 'flex',
    flexGrow: 1,
    flexDirection: 'column',
    padding: theme.spacing.unit * 2,
    marginLeft: theme.spacing.unit * 5,
    height: '100%',
  },
  button: {
    marginTop: theme.spacing.unit,
    marginBottom: theme.spacing.unit,
  },
});

const SelectionDetails = ({ classes, review, draft }) => {
  let content = (
    <>
      <Typography variant="h4" gutterBottom>
        Details
      </Typography>
      <Typography variant="body1">
        Select a submission or review on the left to see details here.
      </Typography>
    </>
  );

  if (review) {
    content = (
      <>
        <Typography variant="h4">Review</Typography>
        <Typography variant="body1">Review #{review.id}</Typography>
        <Typography variant="body1">Status: {review.status}</Typography>
        <Typography variant="body1">Comments: {review.comments}</Typography>
      </>
    );
  }

  if (draft) {
    content = (
      <>
        <Typography variant="h4">Draft</Typography>
        <Typography variant="body1">Submission #{draft.id}</Typography>
        <Button
          className={classes.button}
          variant="contained"
          color="secondary"
          component={Link}
          to={`/submit/${draft.id}`}
        >
          Edit
        </Button>
        <Mutation mutation={SUBMIT_FOR_REVIEW}>
          {(createReview, { loading }) => {
            if (loading) {
              return (
                <CircularProgress
                  color="primary"
                  style={{ margin: '1rem 0' }}
                  disableShrink
                />
              );
            }

            return (
              <Button
                className={classes.button}
                variant="contained"
                color="primary"
                onClick={async () => {
                  await createReview({
                    variables: { submissionId: draft.id },
                    refetchQueries: ['SubmissionsQuery'],
                  });
                  // TODO: Show snackbar alert
                }}
              >
                Submit for Review
              </Button>
            );
          }}
        </Mutation>
      </>
    );
  }

  return (
    <Paper className={classes.paper} elevation={4}>
      {content}
    </Paper>
  );
};

SelectionDetails.defaultProps = {
  review: null,
  draft: null,
};

SelectionDetails.propTypes = {
  classes: PropTypes.shape().isRequired,
  review: PropTypes.shape(),
  draft: PropTypes.shape(),
};

export default withStyles(styles)(SelectionDetails);
