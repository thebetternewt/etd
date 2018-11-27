const { AcademicYear } = require('../models');

module.exports = {
  AcademicYear: {
    semesters: year => year.getSemesters(),
  },
  Query: {
    academicYear: (root, { id }) => AcademicYear.findByPk(id),
    academicYears: () => AcademicYear.findAll(),
  },
  Mutation: {
    addAcademicYear: (root, args) => AcademicYear.create(args),
    updateAcademicYear: async (root, { id, ...args }) => {
      const academicYear = await AcademicYear.findByPk(id);
      return academicYear.update(args);
    },
  },
};
