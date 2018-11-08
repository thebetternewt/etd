module.exports = {
  up: (queryInterface, Sequelize) =>
    queryInterface.bulkInsert(
      'Degrees',
      [
        {
          name: 'Master of Arts',
          shortName: 'M.A.',
        },
        {
          name: 'Master of Science',
          shortName: 'M.S.',
        },
        {
          name: 'Doctor of Philosophy',
          shortName: 'Ph.D.',
        },
        {
          name: 'Educational Specialist',
          shortName: 'Edu.S.',
        },
      ],
      { timestamps: true }
    ),
};
