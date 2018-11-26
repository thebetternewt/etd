module.exports = {
  up: (queryInterface, Sequelize) =>
    queryInterface.createTable('Submissions', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      authorFirstName: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      authorMiddleNames: Sequelize.STRING,
      authorLastName: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      authorEmail: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      showEmail: {
        allowNull: false,
        type: Sequelize.BOOLEAN,
        defaultValue: false,
      },
      type: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      title: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      keywords: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      abstract: {
        allowNull: false,
        type: Sequelize.TEXT,
      },
      copyrightAgree: {
        allowNull: false,
        type: Sequelize.BOOLEAN,
        defaultValue: false,
      },
      availability: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      restrictionYears: {
        allowNull: false,
        type: Sequelize.INTEGER,
        defaultValue: 1,
      },
      defenseDate: Sequelize.DATE,
      documentPath: Sequelize.STRING,
      rightsFormPath: Sequelize.STRING,
      readyForFinal: {
        allowNull: false,
        type: Sequelize.BOOLEAN,
        defaultValue: false,
      },
      submittedToUmi: {
        allowNull: false,
        type: Sequelize.BOOLEAN,
        defaultValue: false,
      },
      approved: {
        allowNull: false,
        type: Sequelize.BOOLEAN,
        defaultValue: false,
      },
      approvalDate: Sequelize.DATE,
      userId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'Users',
          key: 'id',
        },
      },
      degreeId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'Degrees',
          key: 'id',
        },
      },
      departmentId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'Departments',
          key: 'id',
        },
      },
      semesterId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'Semesters',
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
  down: (queryInterface, Sequelize) => queryInterface.dropTable('Submissions'),
};
