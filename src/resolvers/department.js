import { Department } from '../models';

export default {
  Department: {
    college: dept => dept.getCollege(),
    submissions: dept => dept.getSubmissions(),
  },
  Query: {
    department: (root, { id }) => Department.findByPk(id),
    departments: (root, { collegeId }) => {
      const searchParams = {};

      if (collegeId) {
        searchParams.collegeId = collegeId;
      }

      return Department.findAll({ where: searchParams });
    },
  },
  Mutation: {
    addDepartment: async (root, args) => Department.create(args),
    updateDepartment: async (root, { id, ...args }) => {
      const department = await Department.findByPk(id);
      return department.update(args);
    },
  },
};
