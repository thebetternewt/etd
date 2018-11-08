module.exports = {
  up: (queryInterface, Sequelize) =>
    queryInterface.bulkInsert(
      'Departments',
      [
        {
          name: 'Art',
          collegeId: 1,
        },
        {
          name: 'Architecture',
          collegeId: 1,
        },
        {
          name: 'Mechanical Engineering',
          collegeId: 2,
        },
        {
          name: 'Archaeology',
          collegeId: 3,
        },
        {
          name: 'Educational Psychology',
          collegeId: 4,
        },
        {
          name: 'Secondary Education',
          collegeId: 4,
        },
      ],
      { timestamps: true }
    ),

  // down: (queryInterface, Sequelize) => {
  //   /*
  //     Add reverting commands here.
  //     Return a promise to correctly handle asynchronicity.

  //     Example:
  //     return queryInterface.bulkDelete('People', null, {});
  //   */
  // },
};
