module.exports = (sequelize, DataTypes) => {
  const College = sequelize.define(
    'College',
    {
      name: {
        allowNull: false,
        type: DataTypes.STRING,
        unique: true,
        validate: {
          notEmpty: true,
        },
      },
    },
    {}
  );

  College.associate = function(models) {
    this.hasMany(models.Department);
  };

  return College;
};
