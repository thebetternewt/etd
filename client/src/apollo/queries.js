import gql from 'graphql-tag';

const AUTH_QUERY = gql`
  query AuthQuery {
    isAuthenticated @client
    user @client {
      id
      admin
    }
  }
`;

const REDIRECT_QUERY = gql`
  query RedirectQuery {
    redirectPath @client
  }
`;

// Users
const CURRENT_USER_QUERY = gql`
  query CurrentUserQuery {
    me {
      id
      idNumber
      netId
      admin
      firstName
      lastName
    }
  }
`;

const USERS_QUERY = gql`
  query UsersQuery {
    users {
      id
      netId
      idNumber
      firstName
      lastName
      admin
    }
  }
`;

const USER_QUERY = gql`
  query UserQuery($id: ID!) {
    user(id: $id) {
      id
      netId
      idNumber
      firstName
      lastName
      admin
    }
  }
`;

const DEPARTMENTS_QUERY = gql`
  query DepartmentsQuery {
    departments {
      id
      name
      college {
        id
        name
      }
    }
  }
`;

const DEGREES_QUERY = gql`
  query DegreesQuery {
    degrees {
      id
      name
      shortName
    }
  }
`;
const SEMESTERS_QUERY = gql`
  query SemestersQuery {
    semesters {
      id
      name
      academicYear {
        id
        name
      }
    }
  }
`;

const SUBMISSIONS_QUERY = gql`
  query SubmissionsQuery($userId: ID) {
    submissions(userId: $userId) {
      id
      title
      updatedAt
      reviews {
        id
        submittedOn
        status
        comments
      }
    }
  }
`;

const SUBMISSION_QUERY = gql`
  query SubmissionQuery($id: ID!) {
    submission(id: $id) {
      id
      title
      authorFirstName
      authorMiddleNames
      authorLastName
      authorEmail
      type
      title
      keywords
      abstract
      copyrightAgree
      availability
      restrictionYears
      defenseDate
      documentPath
      rightsFormPath
      user {
        id
        firstName
        middleNames
        lastName
        netId
        idNumber
      }
      degree {
        id
        name
      }
      department {
        id
        name
        college {
          id
          name
        }
      }
      semester {
        id
        name
      }
      surveyOfEarnedDoctorate {
        id
        confirmationNumber
        completionDate
      }
    }
  }
`;

const SUBMISSION_REVIEWS_QUERY = gql`
  query SubmissionReviewsQuery($reviewerId: ID) {
    submissionReviews(reviewerId: $reviewerId) {
      id
      submittedOn
      status
      submission {
        id
        title
      }
    }
  }
`;

const SUBMISSION_REVIEW_QUERY = gql`
  query SubmissionReviewsQuery($id: ID!) {
    submissionReview(id: $id) {
      id
      submittedOn
      status
      comments
      reviewer {
        id
        netId
        firstName
        lastName
      }
      submission {
        id
        title
        authorFirstName
        authorMiddleNames
        authorLastName
        authorEmail
        type
        title
        keywords
        abstract
        copyrightAgree
        availability
        restrictionYears
        defenseDate
        documentPath
        rightsFormPath
        user {
          id
          firstName
          middleNames
          lastName
          netId
          idNumber
        }
        degree {
          id
          name
        }
        department {
          id
          name
          college {
            id
            name
          }
        }
        semester {
          id
          name
        }
        surveyOfEarnedDoctorate {
          id
          confirmationNumber
          completionDate
        }
      }
    }
  }
`;

const UNASSIGNED_SUBMISSION_REVIEWS_QUERY = gql`
  query UnassignedSubmissionReviewsQuery {
    submissionReviews(reviewerId: null) {
      id
      submittedOn
      status
      submission {
        id
        title
      }
    }
  }
`;

const MESSAGES_QUERY = gql`
  query MessagesQuery($recipientId: ID!) {
    messages(recipientId: $recipientId) {
      id
      content
      createdAt
      read
    }
  }
`;

export {
  AUTH_QUERY,
  REDIRECT_QUERY,
  CURRENT_USER_QUERY,
  USERS_QUERY,
  USER_QUERY,
  DEPARTMENTS_QUERY,
  DEGREES_QUERY,
  SEMESTERS_QUERY,
  SUBMISSIONS_QUERY,
  SUBMISSION_QUERY,
  SUBMISSION_REVIEWS_QUERY,
  SUBMISSION_REVIEW_QUERY,
  UNASSIGNED_SUBMISSION_REVIEWS_QUERY,
  MESSAGES_QUERY,
};
