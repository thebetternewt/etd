import { SubmissionReview } from '../models';

export default {
  SubmissionStatusType: {
    PENDING: 'PENDING',
    ASSIGNED: 'ASSIGNED',
    COMPLETE: 'COMPLETE',
  },

  SubmissionReview: {
    submission: review => review.getSubmission(),
    submittedOn: review => review.createdAt,
  },
  Query: {
    submissionReview: (root, { id }) => SubmissionReview.findByPk(id),
    submissionReviews: () => SubmissionReview.findAll(),
  },
  Mutation: {
    addSubmissionReview: (root, args) =>
      SubmissionReview.create({
        ...args,
        status: 'PENDING',
      }),

    updateSubmissionReview: async (root, { id, ...args }) => {
      const sed = await SubmissionReview.findByPk(id);
      return sed.update(args);
    },
  },
};
