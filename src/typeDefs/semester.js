import { gql } from 'apollo-server';

export default gql`
  type Semester {
    id: ID!
    """
    (e.g. "Fall 2018")
    """
    name: String!
    academicYear: AcademicYear
    submissions: [Submission!]!
  }

  extend type Query {
    semester(id: ID!): Semester
    semesters: [Semester!]!
  }

  extend type Mutation {
    addSemester(name: String!, academicYearId: ID!): Semester
    updateSemester(id: ID!, name: String, academicYearId: ID!): Semester
  }
`;
