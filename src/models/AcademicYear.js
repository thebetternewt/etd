module.exports = (sequelize, DataTypes) => {
  const AcademicYear = sequelize.define(
    'AcademicYear',
    {
      name: {
        allowNull: false,
        type: DataTypes.STRING,
        validate: {
          notEmpty: true,
        },
      },
    },
    {}
  );
  AcademicYear.associate = function(models) {
    this.hasMany(models.Semester);
  };
  return AcademicYear;
};
