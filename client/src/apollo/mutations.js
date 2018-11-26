import gql from 'graphql-tag';

const LOGIN = gql`
  mutation login($netId: String!, $password: String!) {
    login(netId: $netId, password: $password)
  }
`;

const SIGN_UP = gql`
  mutation SignUp(
    $netId: String!
    $idNumber: String!
    $firstName: String!
    $middleNames: String!
    $lastName: String!
    $email: String!
    $password: String!
  ) {
    signup(
      netId: $netId
      idNumber: $idNumber
      firstName: $firstName
      middleNames: $middleNames
      lastName: $lastName
      email: $email
      password: $password
    ) {
      id
    }
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

const UPDATE_SUBMISSION = gql`
  mutation UpdateSubmission(
    $id: ID!
    $authorFirstName: String
    $authorMiddleNames: String
    $authorLastName: String
    $authorEmail: String
    $showEmail: Boolean
    $type: SubmissionType
    $title: String
    $keywords: String
    $abstract: String
    $copyrightAgree: Boolean
    $availability: AvailabilityType
    $restrictionYears: Int
    $defenseDate: String
    $degreeId: ID
    $departmentId: ID
    $semesterId: ID
  ) {
    updateSubmission(
      id: $id
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

const ATTACH_FILES_TO_SUBMISSION = gql`
  mutation AttachFilesToSubmission(
    $id: ID!
    $documentPath: String!
    $rightsFormPath: String!
  ) {
    updateSubmission(
      id: $id
      documentPath: $documentPath
      rightsFormPath: $rightsFormPath
    ) {
      id
    }
  }
`;

const SUBMIT_FOR_REVIEW = gql`
  mutation SubmitForReview($submissionId: ID!) {
    addSubmissionReview(submissionId: $submissionId) {
      id
    }
  }
`;

const ASSIGN_SUBMISSION_REVIEW = gql`
  mutation AssignSubmission($id: ID!, $reviewerId: ID!) {
    updateSubmissionReview(id: $id, reviewerId: $reviewerId) {
      id
    }
  }
`;
const FINALIZE_SUBMISSION_REVIEW = gql`
  mutation FinalizeSubmissionReview(
    $id: ID!
    $status: SubmissionStatusType!
    $comments: String!
  ) {
    updateSubmissionReview(id: $id, status: $status, comments: $comments) {
      id
    }
  }
`;

const READ_MESSAGE = gql`
  mutation updateMessage($id: ID!) {
    updateMessage(id: $id, read: true) {
      id
    }
  }
`;

export {
  LOGIN,
  SIGN_UP,
  ADD_SUBMISSION,
  UPDATE_SUBMISSION,
  ATTACH_FILES_TO_SUBMISSION,
  SUBMIT_FOR_REVIEW,
  ASSIGN_SUBMISSION_REVIEW,
  FINALIZE_SUBMISSION_REVIEW,
  READ_MESSAGE,
};
