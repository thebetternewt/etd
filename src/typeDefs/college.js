import { gql } from 'apollo-server';

export default gql`
  type College {
    id: ID!
    """
    The name of the college.
    (e.g. "College of Engineering")
    """
    name: String!
    """
    A list of departments within the college.
    """
    departments: [Department!]!
  }

  extend type Query {
    college(id: ID!): College
    colleges: [College!]!
  }

  extend type Mutation {
    addCollege(name: String!): College
    updateCollege(id: ID!, name: String): College
  }
`;
