module.exports = {
  up: (queryInterface, Sequelize) =>
    queryInterface.createTable('SurveysOfEarnedDoctorate', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      confirmationNumber: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      completionDate: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      submissionId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'Submissions',
          key: 'id',
        },
      },
      createdAt: {
        allowNull: false,
        defaultValue: new Date(),
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        defaultValue: new Date(),
        type: Sequelize.DATE,
      },
    }),
  down: (queryInterface, Sequelize) =>
    queryInterface.dropTable('SurveysOfEarnedDoctorate'),
};
