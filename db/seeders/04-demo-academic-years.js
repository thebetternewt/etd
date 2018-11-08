module.exports = {
  up: (queryInterface, Sequelize) =>
    queryInterface.bulkInsert(
      'AcademicYears',
      [
        {
          name: '2018-2019',
        },
      ],
      { timestamps: true }
    ),
};
