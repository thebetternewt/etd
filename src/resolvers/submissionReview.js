import { SubmissionReview } from '../models';

export default {
  SubmissionStatusType: {
    PENDING: 'PENDING',
    ASSIGNED: 'ASSIGNED',
    CHANGES_REQUIRED: 'CHANGES_REQUIRED',
    APPROVED: 'APPROVED',
  },

  SubmissionReview: {
    submission: review => review.getSubmission(),
    submittedOn: review => review.createdAt,
  },
  Query: {
    submissionReview: (root, { id }) => SubmissionReview.findByPk(id),
    submissionReviews: (root, { submissionId }) => {
      const searchParams = {};

      if (submissionId) {
        searchParams.submissionId = submissionId;
      }
      return SubmissionReview.findAll({
        where: searchParams,
        order: [['updatedAt', 'DESC']],
      });
    },
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
