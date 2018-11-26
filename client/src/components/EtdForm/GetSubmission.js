import React from 'react';
import { Redirect } from 'react-router-dom';
import moment from 'moment';
import { CircularProgress } from '@material-ui/core';
import { Query } from 'react-apollo';
import { getAuthenticatedUser } from '../../apollo/client';
import { SUBMISSION_QUERY } from '../../apollo/queries';
import EtdForm from './index';

const GetSubmission = ({ match }) => {
  const { submissionId: subId } = match.params;
  const user = getAuthenticatedUser();

  return (
    <Query
      query={SUBMISSION_QUERY}
      variables={{ id: subId }}
      fetchPolicy="network-only"
    >
      {({ data, loading }) => {
        if (loading) {
          return (
            <CircularProgress color="secondary" style={{ margin: '1rem 0' }} />
          );
        }

        if (data) {
          const { submission } = data;

          // Redirect if current user does not own requested submission.
          if (submission && +submission.user.id !== user.id) {
            return <Redirect to="/" />;
          }
          submission.defenseDate = moment(submission.defenseDate, 'x').format();
          submission.degreeId = submission.degree.id;
          submission.departmentId = submission.department.id;
          submission.semesterId = submission.semester.id;
          submission.submissionId = submission.id;
          if (submission) return <EtdForm submission={submission} />;
        }

        return <h1>Submission not found.</h1>;
      }}
    </Query>
  );
};

export default GetSubmission;
