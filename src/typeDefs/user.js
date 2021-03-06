const { gql } = require('apollo-server-express');

module.exports = gql`
  type User {
    id: ID!
    netId: String!
    idNumber: String!
    firstName: String!
    middleNames: String!
    lastName: String!
    email: String!
    admin: Boolean!
    agent: Boolean!
    active: Boolean!
    createdAt: String!
    submissions: [Submission!]!
    messages: [Message!]!
  }

  extend type Query {
    me: User
    user(id: ID!): User
    users: [User!]!
  }

  extend type Mutation {
    signup(
      netId: String!
      idNumber: String!
      firstName: String!
      middleNames: String!
      lastName: String!
      email: String!
      password: String!
    ): User
    login(netId: String!, password: String!): String
  }
`;
