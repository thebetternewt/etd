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
    reviewer: review => review.getReviewer(),
  },
  Query: {
    submissionReview: (root, { id }) => SubmissionReview.findByPk(id),
    submissionReviews: (root, { submissionId, reviewerId }, { user }) => {
      const searchParams = {};

      console.log('reviewerId', reviewerId);

      if (!user || !user.admin) {
        return [];
      }

      if (submissionId) {
        searchParams.submissionId = submissionId;
      }

      if (reviewerId || reviewerId === null) {
        searchParams.reviewerId = reviewerId;
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
      const review = await SubmissionReview.findByPk(id);
      console.log('reviewId', review.id);
      return review.update(args);
    },
  },
};
