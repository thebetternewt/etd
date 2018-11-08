import { gql } from 'apollo-server';

export default gql`
  type AcademicYear {
    id: ID!
    """
    (e.g. "Fall 2018")
    """
    name: String!
    semesters: [Semester!]!
  }

  extend type Query {
    academicYear(id: ID!): AcademicYear
    academicYears: [AcademicYear!]!
  }

  extend type Mutation {
    addAcademicYear(name: String!): AcademicYear
    updateAcademicYear(id: ID!, name: String): AcademicYear
  }
`;
