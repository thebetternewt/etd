module.exports = {
  up: (queryInterface, Sequelize) =>
    queryInterface.createTable('Departments', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      name: {
        allowNull: false,
        type: Sequelize.STRING,
        unique: true,
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
      collegeId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Colleges',
          key: 'id',
        },
        onUpdate: 'cascade',
        onDelete: 'cascade',
      },
    }),
  down: (queryInterface, Sequelize) => queryInterface.dropTable('Departments'),
};
