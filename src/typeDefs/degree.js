import { gql } from 'apollo-server-express';

export default gql`
  type Degree {
    id: ID!
    name: String!
    shortName: String!
    submissions: [Submission!]!
  }

  extend type Query {
    degree(id: ID!): Degree
    degrees: [Degree!]!
  }

  extend type Mutation {
    addDegree(name: String!, shortName: String!): Degree
    updateDegree(id: ID!, name: String, shortName: String): Degree
  }
`;
