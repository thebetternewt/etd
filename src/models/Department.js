module.exports = (sequelize, DataTypes) => {
  const Department = sequelize.define(
    'Department',
    {
      name: {
        allowNull: false,
        type: DataTypes.STRING,
        unique: true,
        validate: {
          notEmpty: true,
        },
      },
      collegeId: {
        allowNull: false,
        type: DataTypes.INTEGER,
        references: {
          model: 'Colleges',
          key: 'id',
        },
      },
    },
    {}
  );

  Department.associate = function(models) {
    this.hasMany(models.Submission);
    this.belongsTo(models.College);
  };

  return Department;
};
