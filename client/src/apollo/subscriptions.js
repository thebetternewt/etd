import { gql } from 'apollo-boost';

const MESSAGES_SUBSCRIPTION = gql`
  subscription NewMessage($recipientId: ID!) {
    newMessage(recipientId: $recipientId) {
      id
      content
      createdAt
      read
    }
  }
`;

export { MESSAGES_SUBSCRIPTION }; // eslint-disable-line
