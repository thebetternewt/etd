import gql from 'graphql-tag';

const AUTH_QUERY = gql`
  query AuthQuery {
    isAuthenticated @client
    user @client {
      id
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
  query Submissions($userId: ID) {
    submissions(userId: $userId) {
      id
      title
      reviews {
        id
        submittedOn
        status
      }
    }
  }
`;

const MESSAGES_QUERY = gql`
  query Messages($recipientId: ID!) {
    messages(recipientId: $recipientId) {
      id
      content
      createdAt
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
  MESSAGES_QUERY,
};
