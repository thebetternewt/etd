import Sequelize from 'sequelize';
import { User, Message } from '../models';

const { Op } = Sequelize;

export default {
  User: {
    submissions: user => user.getSubmissions(),
    messages: async user => {
      const submissions = await user.getSubmissions();
      const submissionIds = submissions.map(sub => sub.id);
      return Message.findAll({
        where: { submissionId: { [Op.in]: submissionIds } },
      });
    },
  },
  Query: {
    user: (root, { id }) => User.findById(id),
    users: () => User.findAll(),
  },
  Mutation: {
    signup: (root, args) => User.create(args),
  },
};
