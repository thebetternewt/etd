const { Submission } = require('../models');

module.exports = {
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
    submissions: (root, { userId }, { user }) => {
      const searchParams = {};

      // If user not admin, restrict query to own submissions
      if (!user.admin) {
        searchParams.userId = user.id;
      }

      // If user admin, then allow for specific user submission query
      if (user.admin && userId) {
        searchParams.userId = userId;
      }
      return Submission.findAll({
        where: searchParams,
        order: [['updatedAt', 'DESC']],
      });
    },
  },
  Mutation: {
    addSubmission: async (root, args, { user }) =>
      Submission.create({ ...args, userId: user.id }),
    // await SubmissionReview.create({ submissionId: submission.id });
    // const newMessage = await Message.create({
    //   submissionId: submission.id,
    //   recipientId: user.id,
    //   content: `Submission #${submission.id} has been received.`,
    // });

    // pubsub.publish('NEW_MESSAGE', { newMessage });

    updateSubmission: async (root, { id, ...args }) => {
      const submission = await Submission.findByPk(id);
      return submission.update(args);
    },
  },
};
