module.exports = {
  up: (queryInterface, Sequelize) =>
    queryInterface.bulkInsert(
      'SurveysOfEarnedDoctorate',
      [
        {
          confirmationNumber: Math.floor(Math.random() * 100000).toString(),
          completionDate: new Date(),
          submissionId: 1,
        },
        {
          confirmationNumber: Math.floor(Math.random() * 100000).toString(),
          completionDate: new Date(),
          submissionId: 3,
        },
        {
          confirmationNumber: Math.floor(Math.random() * 100000).toString(),
          completionDate: new Date(),
          submissionId: 5,
        },
        {
          confirmationNumber: Math.floor(Math.random() * 100000).toString(),
          completionDate: new Date(),
          submissionId: 7,
        },
      ],
      { timestamps: true }
    ),
};
