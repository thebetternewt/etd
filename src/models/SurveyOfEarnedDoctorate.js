module.exports = (sequelize, DataTypes) => {
  const SurveyOfEarnedDoctorate = sequelize.define(
    'SurveyOfEarnedDoctorate',
    {
      confirmationNumber: {
        allowNull: false,
        type: DataTypes.STRING,
        validate: {
          notEmpty: true,
        },
      },
      completionDate: {
        allowNull: false,
        type: DataTypes.DATE,
        validate: {
          isDate: true,
        },
      },
      submissionId: {
        allowNull: false,
        type: DataTypes.INTEGER,
        references: {
          model: 'Submissions',
          key: 'id',
        },
      },
    },
    {
      tableName: 'SurveysOfEarnedDoctorate',
    }
  );

  SurveyOfEarnedDoctorate.associate = function(models) {
    this.belongsTo(models.Submission);
  };

  return SurveyOfEarnedDoctorate;
};
