import gql from 'graphql-tag';

const LOGIN = gql`
  mutation login($netId: String!, $password: String!) {
    login(netId: $netId, password: $password)
  }
`;

const ADD_SUBMISSION = gql`
  mutation AddSubmission(
    $authorFirstName: String!
    $authorMiddleNames: String
    $authorLastName: String!
    $authorEmail: String!
    $showEmail: Boolean!
    $type: SubmissionType!
    $title: String!
    $keywords: String!
    $abstract: String!
    $copyrightAgree: Boolean!
    $availability: AvailabilityType!
    $restrictionYears: Int
    $defenseDate: String
    $degreeId: ID!
    $departmentId: ID!
    $semesterId: ID!
  ) {
    addSubmission(
      authorFirstName: $authorFirstName
      authorMiddleNames: $authorMiddleNames
      authorLastName: $authorLastName
      authorEmail: $authorEmail
      showEmail: $showEmail
      type: $type
      title: $title
      keywords: $keywords
      abstract: $abstract
      copyrightAgree: $copyrightAgree
      availability: $availability
      restrictionYears: $restrictionYears
      defenseDate: $defenseDate
      degreeId: $degreeId
      departmentId: $departmentId
      semesterId: $semesterId
    ) {
      id
    }
  }
`;

export { LOGIN, ADD_SUBMISSION };
