const { gql } = require('apollo-server-express');

module.exports = gql`
  """
  Departments within a college.
  """
  type Department {
    id: ID!
    """
    (e.g. "Communication")
    """
    name: String!
    """
    The parent college.
    """
    college: College!
    submissions: [Submission!]!
  }

  extend type Query {
    department(id: ID!): Department
    departments(collegeId: ID): [Department!]!
  }

  extend type Mutation {
    addDepartment(name: String!, collegeId: ID!): Department
    updateDepartment(id: ID!, name: String, collegeId: ID): Department
  }
`;
