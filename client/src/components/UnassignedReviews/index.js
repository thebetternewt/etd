import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Query } from 'react-apollo';
import { withStyles } from '@material-ui/core/styles';
import {
  CircularProgress,
  Typography,
  Snackbar,
  SnackbarContent,
  Slide,
  IconButton,
} from '@material-ui/core';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import CloseIcon from '@material-ui/icons/Close';
import green from '@material-ui/core/colors/green';

import { UNASSIGNED_SUBMISSION_REVIEWS_QUERY } from '../../apollo/queries';
// import SnackBars from '../common/SnackBars';
import SubmissionReviewList from '../common/SubmissionReviewList';
import SubmissionDetails from './SubmissionDetails';

const styles = theme => ({
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

function TransitionLeft(props) {
  return <Slide {...props} direction="left" />;
}

class UnassignedReviews extends Component {
  state = {
    selectedSubmissionId: null,
    selectedReviewId: null,
    snackbarOpen: false,
  };

  handleSelectReview = review => {
    this.setState({
      selectedSubmissionId: review.submission.id,
      selectedReviewId: review.id,
    });
  };

  clearSelection = () =>
    this.setState({ selectedSubmissionId: null, selectedReviewId: null });

  handleOpenSnackbar = () => {
    this.setState({ snackbarOpen: true });

    setTimeout(() => {
      this.handleCloseSnackbar();
    }, 3000);
  };

  handleCloseSnackbar = () => {
    this.setState({ snackbarOpen: false });
  };

  render() {
    const { classes } = this.props;
    const { selectedSubmissionId, selectedReviewId, snackbarOpen } = this.state;
    return (
      <div className={classes.root}>
        <Typography variant="h3" gutterBottom>
          Unassigned Reviews
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
            <Query query={UNASSIGNED_SUBMISSION_REVIEWS_QUERY}>
              {({ loading, data }) => {
                if (loading) {
                  return <CircularProgress />;
                }

                const { submissionReviews } = data;
                const flattenedReviews = submissionReviews.map(review => ({
                  ...review,
                  submissionTitle: review.submission.title,
                  submissionId: review.submission.id,
                }));

                if (flattenedReviews.length === 0) {
                  return (
                    <Typography variant="body1">
                      No unassigned reviews!
                    </Typography>
                  );
                }

                return (
                  <SubmissionReviewList
                    reviews={flattenedReviews}
                    selectReview={this.handleSelectReview}
                  />
                );
              }}
            </Query>
          </div>
          <SubmissionDetails
            submissionId={selectedSubmissionId}
            reviewId={selectedReviewId}
            clearSelection={this.clearSelection}
            showAlert={this.handleOpenSnackbar}
          />
          <Snackbar
            open={snackbarOpen}
            onClose={this.handleClose}
            TransitionComponent={TransitionLeft}
            ContentProps={{
              'aria-describedby': 'assigned-submission',
            }}
            anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
          >
            <SnackbarContent
              className={classes.snackbarContent}
              aria-describedby="client-snackbar"
              message={
                <span
                  id="assigned-submission"
                  className={classes.snackbarMessage}
                >
                  <CheckCircleIcon className={classes.snackbarIcon} />
                  Successfully assigned for review!
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
        </div>
      </div>
    );
  }
}

UnassignedReviews.propTypes = {
  classes: PropTypes.shape().isRequired,
};

export default withStyles(styles)(UnassignedReviews);
