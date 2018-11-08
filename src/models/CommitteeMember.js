module.exports = (sequelize, DataTypes) => {
  const CommitteeMember = sequelize.define(
    'CommitteeMember',
    {
      name: {
        allowNull: false,
        type: DataTypes.STRING,
        validate: {
          notEmpty: true,
        },
      },
      title: {
        type: DataTypes.STRING,
        validate: {
          notEmpty: true,
        },
      },
      email: {
        allowNull: false,
        type: DataTypes.STRING,
        validate: {
          isEmail: true,
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
    {}
  );
  CommitteeMember.associate = function(models) {
    this.belongsTo(models.Submission);
  };
  return CommitteeMember;
};
