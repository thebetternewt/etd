import { gql } from 'apollo-server-express';

export default gql`
  type CommitteeMember {
    id: ID!
    name: String!
    title: String
    email: String!
    submission: Submission!
  }

  extend type Query {
    committeeMember(id: ID!): CommitteeMember
    committeeMembers: [CommitteeMember!]!
  }

  extend type Mutation {
    addCommitteeMember(
      name: String!
      title: String
      email: String!
      submissionId: ID!
    ): CommitteeMember
    updateCommitteeMember(
      id: ID!
      name: String
      title: String
      email: String
      submissionId: ID
    ): CommitteeMember
  }
`;
