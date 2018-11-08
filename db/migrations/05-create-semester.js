module.exports = {
  up: (queryInterface, Sequelize) =>
    queryInterface.createTable('Semesters', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      name: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      initialDeadlineNoEnrollment: {
        type: Sequelize.DATE,
      },
      approvalDeadlineNoEnrollement: {
        type: Sequelize.DATE,
      },
      initialDeadlineWithEnrollment: {
        type: Sequelize.DATE,
      },
      approvalDeadlineWithEnrollment: {
        type: Sequelize.DATE,
      },
      academicYearId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'AcademicYears',
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
  down: (queryInterface, Sequelize) => queryInterface.dropTable('Semesters'),
};
