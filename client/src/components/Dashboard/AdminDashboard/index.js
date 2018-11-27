import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Query } from 'react-apollo';
import { withStyles } from '@material-ui/core/styles';
import { CircularProgress, Typography, Button } from '@material-ui/core';

import { getAuthenticatedUser } from '../../../apollo/client';
import { SUBMISSION_REVIEWS_QUERY } from '../../../apollo/queries';
import SubmissionReviewList from '../../common/SubmissionReviewList';
import SubmissionDetails from './SubmissionDetails';

const styles = {
  root: {
    width: '100%',
    maxWidth: 1000,
    display: 'flex',
    flexDirection: 'column',
  },
  flexColumn: {
    display: 'flex',
    flexDirection: 'column',
  },
  submissions: {
    width: '100%',
    display: 'flex',
    justifyContent: 'space-between',
  },
};

class AdminDashboard extends Component {
  state = {
    selectedReviewId: null,
    selectedSubmissionId: null,
    showCompleted: false,
  };

  handleSelectReview = review =>
    this.setState({
      selectedReviewId: review.id,
      selectedSubmissionId: review.submission.id,
    });

  toggleShowCompleted = () =>
    this.setState(({ showCompleted }) => ({
      showCompleted: !showCompleted,
    }));

  clearSelection = () =>
    this.setState({
      selectedReviewId: null,
      selectedSubmissionId: null,
    });

  render() {
    const { classes } = this.props;
    const {
      selectedReviewId,
      selectedSubmissionId,
      showCompleted,
    } = this.state;
    const user = getAuthenticatedUser();
    return (
      <div className={classes.root}>
        <Typography variant="h3" gutterBottom>
          Submissions
        </Typography>
        <Typography variant="h5" align="left" gutterBottom>
          Assigned to Me
        </Typography>
        <div className={classes.submissions}>
          <div
            className={classes.flexColumn}
            style={{
              width: 400,
              justifyContent: 'flex-start',
              alignItems: 'center',
            }}
          >
            <Query
              query={SUBMISSION_REVIEWS_QUERY}
              variables={{ reviewerId: user.id }}
            >
              {({ loading, data }) => {
                if (loading) {
                  return (
                    <CircularProgress
                      style={{ alignSelf: 'center' }}
                      disableShrink
                    />
                  );
                }

                if (data) {
                  const { submissionReviews } = data;
                  const flattenedReviews = submissionReviews.map(review => ({
                    ...review,
                    submissionTitle: review.submission.title,
                    submissionId: review.submission.id,
                  }));
                  const pendingReviews = flattenedReviews.filter(
                    review => review.status === 'PENDING'
                  );
                  const completedReviews = flattenedReviews.filter(
                    review => review.status !== 'PENDING'
                  );

                  if (flattenedReviews.length === 0) {
                    return (
                      <Typography variant="body1">
                        No assigned reviews!
                      </Typography>
                    );
                  }

                  return (
                    <>
                      <SubmissionReviewList
                        reviews={pendingReviews}
                        selectReview={this.handleSelectReview}
                      />

                      {showCompleted ? (
                        <>
                          <Typography
                            variant="h5"
                            align="left"
                            style={{ alignSelf: 'flex-start' }}
                            gutterBottom
                          >
                            Completed Reviews{' '}
                            <Button
                              onClick={() => {
                                this.toggleShowCompleted();
                                this.clearSelection();
                              }}
                            >
                              Hide
                            </Button>
                          </Typography>
                          <SubmissionReviewList
                            reviews={completedReviews}
                            selectReview={this.handleSelectReview}
                          />
                        </>
                      ) : (
                        <Button onClick={this.toggleShowCompleted}>
                          Show Completed
                        </Button>
                      )}
                    </>
                  );
                }

                return null;
              }}
            </Query>
          </div>
          <SubmissionDetails
            submissionId={selectedSubmissionId}
            reviewId={selectedReviewId}
          />
        </div>
      </div>
    );
  }
}

AdminDashboard.propTypes = {
  classes: PropTypes.shape().isRequired,
};

export default withStyles(styles)(AdminDashboard);
