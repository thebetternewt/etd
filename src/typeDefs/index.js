const root = require('./root');
const user = require('./user');
const submission = require('./submission');
const college = require('./college');
const department = require('./department');
const degree = require('./degree');
const surveyOfEarnedDoctorate = require('./surveyOfEarnedDoctorate');
const committeeMember = require('./committeeMember');
const academicYear = require('./academicYear');
const semester = require('./semester');
const message = require('./message');
const submissionReview = require('./submissionReview');

module.exports = [
  root,
  user,
  submission,
  college,
  department,
  degree,
  surveyOfEarnedDoctorate,
  committeeMember,
  academicYear,
  semester,
  message,
  submissionReview,
];
