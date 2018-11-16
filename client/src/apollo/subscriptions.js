import { gql } from 'apollo-boost';

const SUBMISSIONS_SUBSCRIPTION = gql`
  subscription SubmissionAdded($recipientId: ID!) {
    submissionAdded(recipientId: $recipientId) {
      id
      content
      createdAt
    }
  }
`;

export { SUBMISSIONS_SUBSCRIPTION };
