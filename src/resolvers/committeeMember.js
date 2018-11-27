const { CommitteeMember } = require('../models');

module.exports = {
  CommitteeMember: {
    submission: member => member.getSubmission(),
  },
  Query: {
    committeeMember: (root, { id }) => CommitteeMember.findByPk(id),
    committeeMembers: () => CommitteeMember.findAll(),
  },
  Mutation: {
    addCommitteeMember: (root, args) => CommitteeMember.create(args),
    updateCommitteeMember: async (root, { id, ...args }) => {
      const member = await CommitteeMember.findByPk(id);
      return member.update(args);
    },
  },
};
