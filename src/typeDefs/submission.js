const { gql } = require('apollo-server-express');

module.exports = gql`
  enum SubmissionType {
    THESIS
    DISSERTATION
  }

  enum AvailabilityType {
    MSU_ONLY
    PATENT
    WORLDWIDE
  }

  type Submission {
    id: ID!
    authorFirstName: String!
    authorMiddleNames: String
    authorLastName: String!
    authorEmail: String!
    showEmail: Boolean!
    type: SubmissionType!
    title: String!
    keywords: String!
    abstract: String!
    copyrightAgree: Boolean!
    availability: AvailabilityType!
    restrictionYears: Int
    defenseDate: String
    readyForFinal: Boolean!
    submittedToUmi: Boolean!
    approved: Boolean!
    approvalDate: String
    user: User!
    degree: Degree
    department: Department
    semester: Semester!
    surveyOfEarnedDoctorate: SurveyOfEarnedDoctorate
    messages: [Message!]!
    reviews: [SubmissionReview!]!
    documentPath: String
    rightsFormPath: String
    updatedAt: String!
  }

  extend type Query {
    submission(id: ID!): Submission
    submissions(userId: ID): [Submission!]!
  }

  extend type Mutation {
    addSubmission(
      authorFirstName: String!
      authorMiddleNames: String
      authorLastName: String!
      authorEmail: String!
      showEmail: Boolean!
      type: SubmissionType!
      title: String!
      keywords: String!
      abstract: String!
      copyrightAgree: Boolean!
      availability: AvailabilityType!
      restrictionYears: Int
      defenseDate: String
      degreeId: ID!
      departmentId: ID!
      semesterId: ID!
      documentPath: String
      rightsFormPath: String
    ): Submission
    updateSubmission(
      id: ID!
      authorFirstName: String
      authorMiddleNames: String
      authorLastName: String
      authorEmail: String
      showEmail: Boolean
      type: SubmissionType
      title: String
      keywords: String
      abstract: String
      copyrightAgree: Boolean
      availability: AvailabilityType
      restrictionYears: Int
      defenseDate: String
      readyForFinal: Boolean
      submittedToUmi: Boolean
      approved: Boolean
      approvalDate: String
      degreeId: ID
      departmentId: ID
      semesterId: ID
      documentPath: String
      rightsFormPath: String
    ): Submission
  }
`;
