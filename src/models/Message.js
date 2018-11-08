module.exports = (sequelize, DataTypes) => {
  const Message = sequelize.define(
    'Message',
    {
      content: {
        allowNull: false,
        type: DataTypes.STRING,
        validate: {
          len: {
            args: [[1, 200]],
            msg: 'Length must be between 1 and 200 characters.',
          },
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
      read: {
        allowNull: false,
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
    },
    {}
  );
  Message.associate = function(models) {
    this.belongsTo(models.Submission);
  };
  return Message;
};
