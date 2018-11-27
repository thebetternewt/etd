const { gql } = require('apollo-server-express');

module.exports = gql`
  enum SubmissionStatusType {
    PENDING
    ASSIGNED
    APPROVED
    CHANGES_REQUIRED
  }

  type SubmissionReview {
    id: ID!
    submission: Submission!
    submittedOn: String!
    status: SubmissionStatusType!
    comments: String
    reviewer: User
    reviewedOn: String
  }

  extend type Query {
    submissionReview(id: ID!): SubmissionReview
    submissionReviews(submissionId: ID, reviewerId: ID): [SubmissionReview!]!
  }

  extend type Mutation {
    addSubmissionReview(submissionId: ID!): SubmissionReview
    updateSubmissionReview(
      id: ID!
      submissionId: ID
      status: SubmissionStatusType
      comments: String
      reviewerId: ID
      reviewedOn: String
    ): SubmissionReview
  }
`;
