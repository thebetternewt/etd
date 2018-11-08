module.exports = (sequelize, DataTypes) => {
  const Semester = sequelize.define(
    'Semester',
    {
      name: {
        allowNull: false,
        type: DataTypes.STRING,
        validate: {
          notEmpty: true,
        },
      },
      initialDeadlineNoEnrollment: {
        type: DataTypes.DATE,
        validate: {
          isDate: true,
        },
      },
      approvalDeadlineNoEnrollement: {
        type: DataTypes.DATE,
        validate: {
          isDate: true,
        },
      },
      initialDeadlineWithEnrollment: DataTypes.DATE,
      approvalDeadlineWithEnrollment: {
        type: DataTypes.DATE,
        validate: {
          isDate: true,
        },
      },
      academicYearId: {
        allowNull: false,
        type: DataTypes.INTEGER,
        references: {
          model: 'AcademicYears',
          key: 'id',
        },
      },
    },
    {}
  );
  Semester.associate = function(models) {
    this.belongsTo(models.AcademicYear);
    this.hasMany(models.Submission);
  };
  return Semester;
};
