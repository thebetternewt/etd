import { Message } from '../models';

export default {
  Message: {
    submission: message => message.getSubmission(),
  },
  Query: {
    message: (root, { id }) => Message.findByPk(id),
    messages: (root, { submissionId }) => {
      const searchParams = {};

      if (submissionId) {
        searchParams.submissionId = submissionId;
      }
      Message.findAll({ where: searchParams });
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
