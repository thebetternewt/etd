const { Semester } = require('../models');

module.exports = {
  Semester: {
    academicYear: semester => semester.getAcademicYear(),
  },
  Query: {
    semester: (root, { id }) => Semester.findByPk(id),
    semesters: () => Semester.findAll(),
  },
  Mutation: {
    addSemester: (root, args) => Semester.create(args),
    updateSemester: async (root, { id, ...args }) => {
      const semester = await Semester.findByPk(id);
      return semester.update(args);
    },
  },
};
