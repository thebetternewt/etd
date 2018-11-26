import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { Mutation } from 'react-apollo';
import { withStyles } from '@material-ui/core/styles';
import { CircularProgress, Typography, Button, Grid } from '@material-ui/core';

import { FilePond, registerPlugin } from 'react-filepond';
import FilePondPluginFileValidateType from 'filepond-plugin-file-validate-type';
import {
  ATTACH_FILES_TO_SUBMISSION,
  SUBMIT_FOR_REVIEW,
} from '../../apollo/mutations';
import 'filepond/dist/filepond.min.css';

registerPlugin(FilePondPluginFileValidateType);

const styles = theme => ({
  form: {
    width: 500,
    maxWidth: '100%',
    marginTop: theme.spacing.unit * 2,
    marginBottom: theme.spacing.unit * 2,
  },
  formControl: {
    marginTop: theme.spacing.unit,
    marginBottom: theme.spacing.unit * 3,

    '& legend': {
      marginBottom: theme.spacing.unit,
    },
  },
  formButton: {
    marginTop: theme.spacing.unit * 3,
    marginBottom: theme.spacing.unit,
  },
  group: {
    margin: `${theme.spacing.unit}px 0`,
  },
  radioOption: {
    alignItems: 'flex-start',

    '& > span:nth-of-type(2)': {
      paddingTop: 14,
    },
  },
});

class FormFileUpload extends Component {
  state = {
    documentPath: null,
    rightsFormPath: null,
    ...this.props.filePaths,
  };

  continue = () => this.props.nextStep();

  back = e => {
    e.preventDefault();
    this.props.prevStep();
  };

  handleProcessFile = item => (err, file) => {
    this.setState({ [item]: file.serverId });
  };

  render() {
    const { classes, submissionId, history, showAlert } = this.props;
    const { documentPath, rightsFormPath } = this.state;
    console.log(this.props);
    return (
      <>
        <Typography variant="h5" align="center">
          Upload Submission Documents:
        </Typography>
        <Mutation mutation={SUBMIT_FOR_REVIEW} variables={{ submissionId }}>
          {(submitForReview, { loading: submitLoading }) => (
            <Mutation
              mutation={ATTACH_FILES_TO_SUBMISSION}
              variables={{ id: submissionId, documentPath, rightsFormPath }}
            >
              {(attachFiles, { loading: attachFilesLoading, error }) => {
                if (submitLoading || attachFilesLoading) {
                  return (
                    <CircularProgress
                      color="secondary"
                      style={{ margin: '1rem 0' }}
                    />
                  );
                }

                return (
                  <form className={classes.form}>
                    <Typography variant="h6">
                      Thesis or Dissertation Document:
                    </Typography>
                    <FilePond
                      server={`/api/upload-submission/${submissionId}`}
                      name="etd"
                      acceptedFileTypes={[
                        'application/pdf',
                        'application/msword',
                        'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
                      ]}
                      onprocessfile={this.handleProcessFile('documentPath')}
                    />
                    <Typography variant="body1" color="secondary" gutterBottom>
                      <a
                        href={`/api/submissions/${submissionId}/${documentPath}`}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Click to view current document.
                      </a>
                    </Typography>
                    <Typography variant="h6">
                      Rights and Availability Form:
                    </Typography>
                    <FilePond
                      server={`/api/upload-submission/${submissionId}`}
                      name="rights"
                      acceptedFileTypes={[
                        'application/pdf',
                        'application/msword',
                        'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
                      ]}
                      onprocessfile={this.handleProcessFile('rightsFormPath')}
                    />
                    {rightsFormPath && (
                      <Typography
                        variant="body1"
                        color="secondary"
                        gutterBottom
                      >
                        <a
                          href={`/api/submissions/${submissionId}/${rightsFormPath}`}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          Click to view rights and availability form.
                        </a>
                      </Typography>
                    )}
                    <Grid container justify="space-between">
                      <Button
                        type="submit"
                        color="secondary"
                        variant="contained"
                        className={classes.formButton}
                        onClick={async e => {
                          e.preventDefault();
                          await attachFiles({
                            refetchQueries: ['SubmissionsQuery'],
                          });
                          history.push('/');
                        }}
                      >
                        Save as Draft
                      </Button>
                      <Button
                        type="submit"
                        color="primary"
                        variant="contained"
                        className={classes.formButton}
                        onClick={async e => {
                          e.preventDefault();
                          await attachFiles();
                          await submitForReview({
                            refetchQueries: ['SubmissionsQuery'],
                          });
                          showAlert('Successfully submitted!');
                          this.continue();
                        }}
                      >
                        Submit for Review
                      </Button>
                    </Grid>
                  </form>
                );
              }}
            </Mutation>
          )}
        </Mutation>
      </>
    );
  }
}

export default withStyles(styles)(withRouter(FormFileUpload));
