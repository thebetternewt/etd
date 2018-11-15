import Sequelize from 'sequelize';
import jwt from 'jsonwebtoken';
import { AuthenticationError } from 'apollo-server-express';
import { User, Message } from '../models';

const { Op } = Sequelize;

export default {
  User: {
    submissions: user => user.getSubmissions(),
    messages: async user =>
      user.getMessages({ order: [['createdAt', 'DESC']] }),
  },
  Query: {
    me: async (parent, args, { user }) => {
      if (!user) {
        throw new AuthenticationError('You are not authenticated!');
      }

      // user is authenticated
      return user;
    },
    user: (root, { id }) => User.findById(id),
    users: (root, args, { user }) => {
      if (!user) {
        throw new AuthenticationError('Not Authorized');
      }
      return User.findAll();
    },
  },
  Mutation: {
    signup: (root, args) => User.create(args),
    login: async (parent, { netId, password }) => {
      const user = await User.findOne({ where: { netId } });

      if (!user) {
        throw new Error("User doesn't exist"); // eslint-disable-line quotes
      }

      const valid = await user.isValidPassword(password);

      if (!valid) {
        throw new Error('Invalid credentials');
      }

      return jwt.sign(
        { id: user.id, netId: user.netId, admin: user.admin },
        process.env.JWT_SECRET,
        { expiresIn: '1d' }
      );
    },
  },
};
