import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import {
  Paper,
  CircularProgress,
  Typography,
  Button,
  Grid,
  List,
  ListItem,
  ListItemText,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from '@material-ui/core';
import { Query, Mutation } from 'react-apollo';
import { SUBMISSION_REVIEW_QUERY } from '../apollo/queries';
import { FINALIZE_SUBMISSION_REVIEW } from '../apollo/mutations';

const styles = theme => ({
  paper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    marginTop: theme.spacing.unit * 3,
    marginBottom: theme.spacing.unit * 3,
    padding: theme.spacing.unit * 2,
    paddingTop: theme.spacing.unit * 3,
    minHeight: 300,
    maxWidth: 800,
    margin: 'auto',
    [theme.breakpoints.up(600 + theme.spacing.unit * 3 * 2)]: {
      marginTop: theme.spacing.unit * 6,
      marginBottom: theme.spacing.unit * 6,
      padding: theme.spacing.unit * 3,
      paddingTop: theme.spacing.unit * 5,
    },
  },
  detailsContainer: {
    width: '100%',
    marginBottom: '3rem',
  },
  form: {
    width: 500,
    maxWidth: '100%',
    marginTop: theme.spacing.unit * 1,
    marginBottom: theme.spacing.unit * 2,
  },
  formControl: {
    marginTop: theme.spacing.unit,
    marginBottom: theme.spacing.unit * 3,
  },
  formButton: {
    margin: theme.spacing.unit,
    marginTop: theme.spacing.unit * 3,
  },
  list: {
    width: '100%',
  },
});

class ReviewSubmission extends Component {
  state = {
    comments: '',
    status: 'PENDING',
  };

  handleChange = input => e => {
    this.setState({ [input]: e.target.value });
  };

  done = () => this.props.history.push('/dashboard');

  render() {
    const { values, classes } = this.props;
    const { status, comments } = this.state;
    const { reviewId } = this.props.match.params;

    return (
      <Paper className={classes.paper}>
        <Typography variant="h5" align="center">
          Review Submission
        </Typography>
        <Query query={SUBMISSION_REVIEW_QUERY} variables={{ id: reviewId }}>
          {({ data, loading }) => {
            if (loading) {
              return (
                <CircularProgress
                  color="primary"
                  style={{ margin: '1rem 0' }}
                  disableShrink
                />
              );
            }

            console.log(data);

            if (!data.submissionReview) {
              return <h1>Review not found!</h1>;
            }

            const {
              id: submissionId,
              authorFirstName,
              authorMiddleNames,
              authorLastName,
              authorEmail,
              showEmail,
              type,
              title,
              keywords,
              abstract,
              copyrightAgree,
              availability,
              restrictionYears,
              defenseDate,
              degreeId,
              departmentId,
              semesterId,
              documentPath,
              rightsFormPath,
            } = data.submissionReview.submission;

            return (
              <>
                <div className={classes.detailsContainer}>
                  <Typography variant="h6" align="center">
                    #{submissionId}
                  </Typography>
                  <List className={classes.list}>
                    <ListItem divider>
                      <ListItemText
                        primary="First Name"
                        secondary={authorFirstName}
                      />
                    </ListItem>
                    <ListItem divider>
                      <ListItemText
                        primary="Last Name"
                        secondary={authorMiddleNames}
                      />
                    </ListItem>
                    <ListItem divider>
                      <ListItemText
                        primary="Last Name"
                        secondary={authorLastName}
                      />
                    </ListItem>
                    <ListItem divider>
                      <ListItemText primary="Email" secondary={authorEmail} />
                    </ListItem>
                    <ListItem divider>
                      <ListItemText primary="Document Type" secondary={type} />
                    </ListItem>
                    <ListItem divider>
                      <ListItemText primary="Title" secondary={title} />
                    </ListItem>
                    <ListItem divider>
                      <ListItemText primary="Keywords" secondary={keywords} />
                    </ListItem>
                    <ListItem divider>
                      <ListItemText primary="Abstract" secondary={abstract} />
                    </ListItem>
                    <ListItem divider>
                      <ListItemText
                        primary="Copyright Agree"
                        secondary={copyrightAgree.toString()}
                      />
                    </ListItem>
                    <ListItem divider>
                      <ListItemText
                        primary="Availability"
                        secondary={availability}
                      />
                    </ListItem>
                    <Grid container justify="center">
                      <Button
                        className={classes.formButton}
                        variant="contained"
                        color="primary"
                        component="a"
                        href={`/api/submissions/${submissionId}/${documentPath}`}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        View Document
                      </Button>
                      <Button
                        className={classes.formButton}
                        variant="contained"
                        color="primary"
                        component="a"
                        href={`/api/submissions/${submissionId}/${rightsFormPath}`}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        View Rights Form
                      </Button>
                    </Grid>
                  </List>
                </div>

                <Typography variant="h5" gutterBottom>
                  Review
                </Typography>
                <Mutation
                  mutation={FINALIZE_SUBMISSION_REVIEW}
                  variables={{ id: reviewId, status, comments }}
                >
                  {(finalize, { loading, error }) => {
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
                      <>
                        {error && (
                          <Typography variant="body1" className={classes.error}>
                            {error.graphQLErrors.map(({ message }) => (
                              <span key={message}>{message}</span>
                            ))}
                          </Typography>
                        )}
                        <form
                          className={classes.form}
                          onSubmit={async e => {
                            e.preventDefault();
                            await finalize({
                              refetchQueries: ['SubmissionReviewsQuery'],
                            });
                            this.done();
                          }}
                        >
                          <TextField
                            className={classes.formControl}
                            label="Comments"
                            onChange={this.handleChange('comments')}
                            value={comments}
                            fullWidth
                            multiline
                          />

                          <FormControl
                            className={classes.formControl}
                            fullWidth
                            required
                          >
                            <InputLabel htmlFor="status">Status</InputLabel>
                            <Select
                              value={status}
                              onChange={this.handleChange('status')}
                            >
                              <MenuItem value="PENDING">Pending</MenuItem>
                              <MenuItem value="ASSIGNED">Assigned</MenuItem>
                              <MenuItem value="APPROVED">Approved</MenuItem>
                              <MenuItem value="CHANGES_REQUIRED">
                                Changes Required
                                </MenuItem>
                            </Select>
                          </FormControl>
                          <Button
                            className={classes.formButton}
                            type="submit"
                            variant="contained"
                            color="primary"
                          >
                            Submit
                            </Button>
                        </form>
                      </>
                    );
                  }}
                </Mutation>
              </>
            );
          }}
        </Query>
      </Paper>
    );
  }
}

export default withStyles(styles)(ReviewSubmission);
