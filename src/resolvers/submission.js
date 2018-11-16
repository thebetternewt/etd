import { PubSub, withFilter } from 'apollo-server-express';
import { Submission, SubmissionReview, Message } from '../models';

const pubsub = new PubSub();

const SUBMISSION_ADDED = 'SUBMISSION_ADDED';

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
    submissions: (root, { userId }, { user }) => {
      const searchParams = {};

      searchParams.userId = user.id;

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
    addSubmission: async (root, args, { user }) => {
      const submission = await Submission.create({ ...args, userId: user.id });
      await SubmissionReview.create({ submissionId: submission.id });
      const newMessage = await Message.create({
        submissionId: submission.id,
        recipientId: user.id,
        content: `Submission #${submission.id} has been received.`,
      });

      pubsub.publish(SUBMISSION_ADDED, { submissionAdded: newMessage });

      return submission;
    },
    updateSubmission: async (root, { id, ...args }) => {
      const submission = await Submission.findByPk(id);
      return submission.update(args);
    },
  },

  Subscription: {
    submissionAdded: {
      subscribe: withFilter(
        () => pubsub.asyncIterator([SUBMISSION_ADDED]),
        (payload, variables) => {
          console.log('payload:', payload.submissionAdded.recipientId);
          console.log('variables:', variables);
          return (
            payload.submissionAdded.recipientId.toString() ===
            variables.recipientId
          );
        }
      ),
    },
  },
};
