module.exports = {
  up: (queryInterface, Sequelize) =>
    queryInterface.bulkInsert(
      'Colleges',
      [
        {
          name: 'College of Art, Architecture, and Design',
        },
        {
          name: 'College of Engineering',
        },
        {
          name: 'College of Arts & Sciences',
        },
        {
          name: 'College of Education',
        },
      ],
      { timestamps: true }
    ),
};
