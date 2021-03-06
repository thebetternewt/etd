const { gql } = require('apollo-server-express');

module.exports = gql`
  type SurveyOfEarnedDoctorate {
    id: ID!
    confirmationNumber: String!
    completionDate: String!
    submission: Submission!
  }

  extend type Query {
    surveyOfEarnedDoctorate(id: ID!): SurveyOfEarnedDoctorate
    surveysOfEarnedDoctorate: [SurveyOfEarnedDoctorate!]!
  }

  extend type Mutation {
    addSurveyOfEarnedDoctorate(
      confirmationNumber: String!
      completionDate: String!
      submissionId: Int!
    ): SurveyOfEarnedDoctorate
    updateSurveyOfEarnedDoctorate(
      id: ID!
      confirmationNumber: String
      completionDate: String
      submissionId: Int
    ): SurveyOfEarnedDoctorate
  }
`;
