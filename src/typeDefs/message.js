const { gql } = require('apollo-server-express');

module.exports = gql`
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

  extend type Subscription {
    newMessage(recipientId: ID!): Message
  }
`;
