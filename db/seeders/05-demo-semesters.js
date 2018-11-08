module.exports = {
  up: (queryInterface, Sequelize) =>
    queryInterface.bulkInsert(
      'Semesters',
      [
        {
          name: 'Summer 2018',
          academicYearId: 1,
        },
        {
          name: 'Fall 2018',
          academicYearId: 1,
        },
      ],
      { timestamps: true }
    ),
};
