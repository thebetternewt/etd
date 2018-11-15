import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import { CircularProgress, Typography, Button } from '@material-ui/core';
import { Query } from 'react-apollo';
import { SUBMISSIONS_QUERY } from '../../apollo/queries';
import { getAuthenticatedUser } from '../../apollo/client';
import Welcome from './Welcome';
import SubmissionReviewList from './SubmissionReviewList';
import Review from './Review';

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
});

class Dashboard extends Component {
  state = {
    selectedReview: null,
  };

  handleSelectReview = review => {
    this.setState({ selectedReview: review });
  };

  render() {
    const { classes } = this.props;
    const { selectedReview } = this.state;
    const user = getAuthenticatedUser();

    return (
      <div className={classes.root}>
        <Typography variant="h3" gutterBottom>
          Submissions
        </Typography>

        <div className={classes.submissions}>
          <div
            className={classes.flexColumn}
            style={{
              width: 400,
              justifyContent: 'center',
            }}
          >
            <Query query={SUBMISSIONS_QUERY} fetchPolicy="network-only">
              {({ loading, data }) => {
                if (loading) {
                  return <CircularProgress />;
                }

                const reviews = [];

                if (data) {
                  if (data.submissions.length === 0) {
                    return <Welcome />;
                  }

                  data.submissions.forEach(submission => {
                    const subReviews = submission.reviews.map(review => ({
                      ...review,
                      submissionTitle: submission.title,
                    }));
                    reviews.push(...subReviews);
                  });
                }

                return (
                  <>
                    <SubmissionReviewList
                      reviews={reviews}
                      selectReview={this.handleSelectReview}
                      selectedReview={selectedReview}
                    />
                    <Button
                      component={Link}
                      to="/submit"
                      variant="contained"
                      color="primary"
                    >
                      Create New Submission
                    </Button>
                  </>
                );
              }}
            </Query>
          </div>
          <Review review={selectedReview} />
        </div>
      </div>
    );
  }
}

Dashboard.propTypes = {
  classes: PropTypes.shape().isRequired,
  // match: PropTypes.shape().isRequired,
};

export default withStyles(styles)(Dashboard);
