module.exports = (sequelize, DataTypes) => {
  const SubmissionReview = sequelize.define(
    'SubmissionReview',
    {
      comments: {
        type: DataTypes.TEXT,
      },
      submissionId: {
        allowNull: false,
        type: DataTypes.INTEGER,
        references: {
          model: 'Submissions',
          key: 'id',
        },
      },
      reviewerId: {
        type: DataTypes.INTEGER,
        references: {
          model: 'Users',
          key: 'id',
        },
      },
      reviewedOn: {
        type: DataTypes.DATE,
        validate: {
          isDate: true,
        },
      },
      status: {
        allowNull: false,
        type: DataTypes.STRING,
        defaultValue: 'PENDING',
        validate: {
          isIn: [['PENDING', 'ASSIGNED', 'COMPLETED']],
        },
      },
    },
    {}
  );
  SubmissionReview.associate = function(models) {
    this.belongsTo(models.Submission);
    this.belongsTo(models.User, { foreignKey: 'reviewerId' });
  };
  return SubmissionReview;
};
