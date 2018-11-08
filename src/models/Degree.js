module.exports = (sequelize, DataTypes) => {
  const Degree = sequelize.define(
    'Degree',
    {
      name: {
        allowNull: false,
        type: DataTypes.STRING,
        validate: {
          notEmpty: true,
        },
      },
      shortName: {
        allowNull: false,
        type: DataTypes.STRING,
        validate: {
          notEmpty: true,
        },
      },
    },
    {}
  );
  Degree.associate = function(models) {
    this.hasMany(models.Submission);
  };
  return Degree;
};
