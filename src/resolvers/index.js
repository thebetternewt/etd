import { PubSub } from 'apollo-server-express';

import user from './user';
import submission from './submission';
import college from './college';
import department from './department';
import degree from './degree';
import surveyOfEarnedDoctorate from './surveyOfEarnedDoctorate';
import committeeMember from './committeeMember';
import academicYear from './academicYear';
import semester from './semester';
import message from './message';
import submissionReview from './submissionReview';

export const pubsub = new PubSub();

export default [
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
