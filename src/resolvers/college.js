const { College } = require('../models');

module.exports = {
  College: {
    departments: college => college.getDepartments(),
  },
  Query: {
    college: (root, { id }) => College.findByPk(id),
    colleges: () => College.findAll(),
  },
  Mutation: {
    addCollege: (root, args) => College.create(args),
    updateCollege: async (root, { id, ...args }) => {
      const college = await College.findByPk(id);
      return college.update(args);
    },
  },
};
