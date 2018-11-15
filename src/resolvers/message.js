import { Message } from '../models';

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
};
