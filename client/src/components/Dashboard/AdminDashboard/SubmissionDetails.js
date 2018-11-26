import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { CircularProgress, Paper, Typography, Button } from '@material-ui/core';
import { Query } from 'react-apollo';
import { Link } from 'react-router-dom';
import { SUBMISSION_QUERY } from '../../../apollo/queries';

const styles = theme => ({
  paper: {
    display: 'flex',
    flexDirection: 'column',
    flexGrow: 1,
    height: '100%',
    padding: theme.spacing.unit * 2,
    marginLeft: theme.spacing.unit * 5,
  },
});

const SubmissionDetails = ({ classes, reviewId, submissionId }) => (
  <Paper className={classes.paper} elevation={4}>
    <Typography variant="h4">Submission Details</Typography>
    {submissionId ? (
      <Query query={SUBMISSION_QUERY} variables={{ id: submissionId }}>
        {({ loading, data }) => {
          if (loading) {
            return <CircularProgress disableShrink />;
          }

          const {
            submission: {
              id,
              title,
              authorFirstName,
              authorMiddleNames,
              authorLastName,
              abstract,
              degree,
              user,
              department,
            },
          } = data;
          const authorName = `${authorFirstName} ${authorMiddleNames} ${authorLastName}`;

          return (
            <>
              <Typography variant="body1">Submission #{id}</Typography>
              <Typography variant="body1">User: {user.netId}</Typography>
              <Typography variant="body1">Title: {title}</Typography>
              <Typography variant="body1">Abstract: {abstract}</Typography>
              <Typography variant="body1">Author: {authorName}</Typography>
              <Typography variant="body1">Degree: {degree.name}</Typography>
              <Typography variant="body1">
                Department: {department.name}
              </Typography>
              <Typography variant="body1">
                College: {department.college.name}
              </Typography>
              <Button
                variant="contained"
                color="primary"
                component={Link}
                to={`/review/${reviewId}`}
              >
                Review
              </Button>
            </>
          );
        }}
      </Query>
    ) : (
      <Typography variant="body1">
        Select a submission on the left to see review details here.
      </Typography>
    )}
  </Paper>
);

SubmissionDetails.defaultProps = {
  submissionId: null,
  reviewId: null,
};

SubmissionDetails.propTypes = {
  classes: PropTypes.shape().isRequired,
  submissionId: PropTypes.string,
  reviewId: PropTypes.string,
};

export default withStyles(styles)(SubmissionDetails);
