import bcryptjs from 'bcryptjs';

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    'User',
    {
      netId: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          notEmpty: true,
        },
      },
      idNumber: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          notEmpty: true,
        },
      },
      firstName: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: true,
        },
      },
      middleNames: {
        type: DataTypes.STRING,
        validate: {
          notEmpty: true,
        },
      },
      lastName: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: true,
        },
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          isEmail: true,
        },
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: true,
        },
      },
      admin: {
        allowNull: false,
        defaultValue: false,
        type: DataTypes.BOOLEAN,
      },
      agent: {
        allowNull: false,
        defaultValue: false,
        type: DataTypes.BOOLEAN,
      },
      active: {
        allowNull: false,
        defaultValue: true,
        type: DataTypes.BOOLEAN,
      },
    },
    {
      hooks: {
        afterValidate: async user => {
          try {
            user.password = await bcryptjs.hash(user.password, 10);
          } catch (err) {
            console.error(err);
          }
        },
      },
    }
  );

  User.associate = function(models) {
    this.hasMany(models.Submission);
    this.hasMany(models.SubmissionReview, {
      as: 'Reviews',
      foreignKey: 'reviewerId',
    });
  };

  // Validate password authentication with bcrypt
  User.prototype.isValidPassword = async function(password) {
    const user = this;
    const compare = await bcryptjs.compare(password, user.password);
    return compare;
  };

  return User;
};
