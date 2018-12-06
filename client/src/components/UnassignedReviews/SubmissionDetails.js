import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { CircularProgress, Paper, Typography, Button } from '@material-ui/core';
import { Query, Mutation } from 'react-apollo';
import { SUBMISSION_QUERY } from '../../apollo/queries';
import { ASSIGN_SUBMISSION_REVIEW } from '../../apollo/mutations';
import { getAuthenticatedUser } from '../../apollo/client';

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

const Review = ({
  classes,
  submissionId,
  reviewId,
  clearSelection,
  showAlert,
}) => (
  <Paper className={classes.paper} elevation={4}>
    <Typography variant="h4">Submission Details</Typography>
    {submissionId ? (
      <Query query={SUBMISSION_QUERY} variables={{ id: submissionId }}>
        {({ loading, data }) => {
          if (loading) {
            return <CircularProgress />;
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
              <Mutation mutation={ASSIGN_SUBMISSION_REVIEW}>
                {(assignToMe, { loading }) => {
                  const user = getAuthenticatedUser();

                  if (loading) {
                    return <CircularProgress />;
                  }

                  return (
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={async () => {
                        await assignToMe({
                          variables: { id: reviewId, reviewerId: user.id },
                          refetchQueries: [
                            'UnassignedSubmissionReviewsQuery',
                            'SubmissionReviewsQuery',
                          ],
                        });
                        showAlert();
                        clearSelection();
                      }}
                    >
                      Assign to Me
                    </Button>
                  );
                }}
              </Mutation>
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

Review.defaultProps = {
  submissionId: null,
  reviewId: null,
};

Review.propTypes = {
  classes: PropTypes.shape().isRequired,
  submissionId: PropTypes.string,
  reviewId: PropTypes.string,
  clearSelection: PropTypes.func.isRequired,
  showAlert: PropTypes.func.isRequired,
};

export default withStyles(styles)(Review);
