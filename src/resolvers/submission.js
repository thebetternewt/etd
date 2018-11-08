import { Submission } from '../models';

export default {
  SubmissionType: {
    THESIS: 'THESIS',
    DISSERTATION: 'DISSERTATION',
  },

  AvailabilityType: {
    MSU_ONLY: 'MSU_ONLY',
    PATENT: 'PATENT',
    WORLDWIDE: 'WORLDWIDE',
  },

  Submission: {
    user: submission => submission.getUser(),
    degree: submission => submission.getDegree(),
    department: submission => submission.getDepartment(),
    surveyOfEarnedDoctorate: submission =>
      submission.getSurveyOfEarnedDoctorate(),
    semester: submission => submission.getSemester(),
    messages: submission => submission.getMessages(),
    reviews: submission => submission.getReviews(),
  },
  Query: {
    submission: (root, { id }) => Submission.findByPk(id),
    submissions: () => Submission.findAll(),
  },
  Mutation: {
    addSubmission: (root, args) => Submission.create(args),
    updateSubmission: async (root, { id, ...args }) => {
      const submission = await Submission.findByPk(id);
      return submission.update(args);
    },
  },
};
