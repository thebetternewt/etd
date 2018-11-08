import { Degree } from '../models';

export default {
  Degree: {
    submissions: degree => degree.getSubmissions(),
  },
  Query: {
    degree: (root, { id }) => Degree.findByPk(id),
    degrees: () => Degree.findAll(),
  },
  Mutation: {
    addDegree: (root, args) => Degree.create(args),
    updateDegree: async (root, { id, ...args }) => {
      const degree = await Degree.findByPk(id);
      return degree.update(args);
    },
  },
};
