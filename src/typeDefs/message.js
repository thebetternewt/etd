import { gql } from 'apollo-server-express';

export default gql`
  type Message {
    id: ID!
    """
    (e.g. "Fall 2018")
    """
    content: String!
    submission: Submission!
    recipient: User!
    read: Boolean!
    createdAt: String!
  }

  extend type Query {
    message(id: ID!): Message
    messages(submissionId: ID, recipientId: ID): [Message!]!
  }

  extend type Mutation {
    addMessage(content: String!, submissionId: ID!): Message
    updateMessage(id: ID!, read: Boolean): Message
  }
`;
