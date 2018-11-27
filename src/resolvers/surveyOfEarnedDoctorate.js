const { SurveyOfEarnedDoctorate } = require('../models');

module.exports = {
  SurveyOfEarnedDoctorate: {
    submission: sed => sed.getSubmission(),
  },
  Query: {
    surveyOfEarnedDoctorate: (root, { id }) =>
      SurveyOfEarnedDoctorate.findByPk(id),
    surveysOfEarnedDoctorate: () => SurveyOfEarnedDoctorate.findAll(),
  },
  Mutation: {
    addSurveyOfEarnedDoctorate: (root, args) =>
      SurveyOfEarnedDoctorate.create(args),
    updateSurveyOfEarnedDoctorate: async (root, { id, ...args }) => {
      const sed = await SurveyOfEarnedDoctorate.findByPk(id);
      return sed.update(args);
    },
  },
};
