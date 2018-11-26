import { withFilter } from 'apollo-server-express';
import { pubsub } from './index';

import { Message } from '../models';

const NEW_MESSAGE = 'NEW_MESSAGE';

export default {
  Message: {
    submission: message => message.getSubmission(),
    recipient: message => message.getRecipient(),
  },
  Query: {
    message: (root, { id }) => Message.findByPk(id),
    messages: (root, { submissionId, recipientId }) => {
      const searchParams = {};

      if (submissionId) {
        searchParams.submissionId = submissionId;
      }
      if (recipientId) {
        searchParams.recipientId = recipientId;
      }

      return Message.findAll({
        where: searchParams,
        order: [['createdAt', 'DESC']],
      });
    },
  },
  Mutation: {
    addMessage: (root, args) => Message.create(args),
    updateMessage: async (root, { id, ...args }) => {
      const message = await Message.findByPk(id);
      return message.update(args);
    },
  },
  Subscription: {
    newMessage: {
      subscribe: withFilter(
        () => pubsub.asyncIterator([NEW_MESSAGE]),
        (payload, variables) => {
          console.log('payload:', payload.newMessage.recipientId);
          console.log('variables:', variables);
          return (
            payload.newMessage.recipientId.toString() === variables.recipientId
          );
        }
      ),
    },
  },
};
