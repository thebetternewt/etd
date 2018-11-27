import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import { CircularProgress, Typography, Button } from '@material-ui/core';
import { Query } from 'react-apollo';
import { SUBMISSIONS_QUERY } from '../../apollo/queries';
import { getAuthenticatedUser } from '../../apollo/client';
import Welcome from './Welcome';
import SubmissionReviewList from '../common/SubmissionReviewList';
import SubmissionDraftList from './SubmissionDraftList';
import SelectionDetails from './SelectionDetails';
import AdminDashboard from './AdminDashboard';

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

class Dashboard extends Component {
  state = {
    selectedReview: null,
    selectedDraft: null,
    showApproved: false,
  };

  handleSelectReview = review =>
    this.setState({ selectedReview: review, selectedDraft: null });

  handleSelectDraft = draft =>
    this.setState({ selectedDraft: draft, selectedReview: null });

  toggleShowApproved = () =>
    this.setState(({ showApproved }) => ({
      showApproved: !showApproved,
    }));

  clearSelection = () =>
    this.setState({
      selectedReview: null,
      selectedDraft: null,
    });

  render() {
    const { classes } = this.props;
    const { selectedReview, selectedDraft, showApproved } = this.state;
    const user = getAuthenticatedUser();

    if (user.admin) {
      return <AdminDashboard />;
    }

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
              justifyContent: 'flex-start',
              alignItems: 'center',
            }}
          >
            <Query
              query={SUBMISSIONS_QUERY}
              variables={{ userId: user.id }}
              fetchPolicy="network-only"
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
                  console.log(data);
                  if (data.submissions.length === 0) {
                    return <Welcome />;
                  }

                  const reviews = [];

                  const drafts = data.submissions.filter(
                    sub => sub.reviews.length === 0
                  );

                  // Flatten reviews with submission data
                  data.submissions.forEach(submission => {
                    const subReviews = submission.reviews.map(review => ({
                      ...review,
                      submissionTitle: submission.title,
                    }));
                    reviews.push(...subReviews);
                  });

                  const awaitingReview = reviews.filter(
                    review => review.status === 'PENDING'
                  );

                  const actionRequired = reviews.filter(
                    review => review.status === 'CHANGES_REQUIRED'
                  );

                  const approvedReviews = reviews.filter(
                    review => review.status === 'APPROVED'
                  );

                  return (
                    <>
                      {drafts.length > 0 && (
                        <>
                          <Typography
                            variant="h5"
                            style={{ alignSelf: 'flex-start' }}
                            gutterBottom
                          >
                            Drafts
                          </Typography>
                          <SubmissionDraftList
                            drafts={drafts}
                            selectDraft={this.handleSelectDraft}
                            selectedDraft={selectedDraft}
                          />
                        </>
                      )}
                      {actionRequired.length > 0 && (
                        <>
                          <Typography
                            variant="h5"
                            style={{ alignSelf: 'flex-start' }}
                            gutterBottom
                          >
                            Action Required
                          </Typography>
                          <SubmissionReviewList
                            reviews={actionRequired}
                            selectReview={this.handleSelectReview}
                            selectedReview={selectedReview}
                          />
                        </>
                      )}
                      {awaitingReview.length > 0 && (
                        <>
                          <Typography
                            variant="h5"
                            style={{ alignSelf: 'flex-start' }}
                            gutterBottom
                          >
                            Awaiting Review
                          </Typography>
                          <SubmissionReviewList
                            reviews={awaitingReview}
                            selectReview={this.handleSelectReview}
                            selectedReview={selectedReview}
                          />
                        </>
                      )}

                      <Button
                        component={Link}
                        to="/submit"
                        variant="contained"
                        color="primary"
                        style={{ marginBottom: '2rem' }}
                      >
                        Create New Submission
                      </Button>

                      {approvedReviews.length > 0 &&
                        (showApproved ? (
                          <>
                            <Typography
                              variant="h5"
                              align="left"
                              style={{ alignSelf: 'flex-start' }}
                              gutterBottom
                            >
                              Approved Reviews{' '}
                              <Button
                                onClick={() => {
                                  this.toggleShowApproved();
                                  this.clearSelection();
                                }}
                              >
                                Hide
                              </Button>
                            </Typography>
                            <SubmissionReviewList
                              reviews={approvedReviews}
                              selectReview={this.handleSelectReview}
                            />
                          </>
                        ) : (
                          <Button onClick={this.toggleShowApproved}>
                            Show Approved
                          </Button>
                        ))}
                    </>
                  );
                }

                return null;
              }}
            </Query>
          </div>
          <SelectionDetails review={selectedReview} draft={selectedDraft} />
        </div>
      </div>
    );
  }
}

Dashboard.propTypes = {
  classes: PropTypes.shape().isRequired,
};

export default withStyles(styles)(Dashboard);
