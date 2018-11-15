module.exports = (sequelize, DataTypes) => {
  const Submission = sequelize.define(
    'Submission',
    {
      authorFirstName: {
        allowNull: false,
        type: DataTypes.STRING,
        validate: {
          notEmpty: true,
        },
      },
      authorMiddleNames: DataTypes.STRING,
      authorLastName: {
        allowNull: false,
        type: DataTypes.STRING,
        validate: {
          notEmpty: true,
        },
      },
      authorEmail: {
        allowNull: false,
        type: DataTypes.STRING,
        validate: {
          isEmail: true,
        },
      },
      showEmail: {
        allowNull: false,
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      type: {
        allowNull: false,
        type: DataTypes.STRING,
        validate: {
          isIn: [['THESIS', 'DISSERTATION']],
        },
      },
      title: {
        allowNull: false,
        type: DataTypes.STRING,
        validate: {
          notEmpty: true,
        },
      },
      keywords: {
        allowNull: false,
        type: DataTypes.STRING,
        validate: {
          notEmpty: true,
        },
      },
      abstract: {
        allowNull: false,
        type: DataTypes.TEXT,
        validate: {
          notEmpty: true,
        },
      },
      copyrightAgree: {
        allowNull: false,
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      availability: {
        allowNull: false,
        type: DataTypes.STRING,
        validate: {
          isIn: [['MSU_ONLY', 'PATENT', 'WORLDWIDE']],
        },
      },
      restrictionYears: {
        allowNull: false,
        type: DataTypes.INTEGER,
        defaultValue: 1,
      },
      defenseDate: {
        type: DataTypes.DATE,
        validate: {
          isDate: true,
        },
      },
      degreeId: {
        allowNull: false,
        type: DataTypes.INTEGER,
        references: {
          model: 'Degrees',
          key: 'id',
        },
      },
      readyForFinal: {
        allowNull: false,
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      submittedToUmi: {
        allowNull: false,
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      approved: {
        allowNull: false,
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      approvalDate: {
        type: DataTypes.DATE,
        validate: {
          isDate: true,
        },
      },
      userId: {
        allowNull: false,
        type: DataTypes.INTEGER,
        references: {
          model: 'Users',
          key: 'id',
        },
      },
      departmentId: {
        allowNull: false,
        type: DataTypes.INTEGER,
        references: {
          model: 'Departments',
          key: 'id',
        },
      },
      semesterId: {
        allowNull: false,
        type: DataTypes.INTEGER,
        references: {
          model: 'Semesters',
          key: 'id',
        },
      },
    },
    {}
  );
  Submission.associate = function(models) {
    this.belongsTo(models.User);
    this.belongsTo(models.Degree);
    this.belongsTo(models.Department);
    this.belongsTo(models.Semester);
    this.hasOne(models.SurveyOfEarnedDoctorate);
    this.hasMany(models.CommitteeMember);
    this.hasMany(models.Message);
    this.hasMany(models.SubmissionReview, { as: 'Reviews' });
  };
  return Submission;
};
