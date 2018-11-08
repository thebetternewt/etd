const bcryptjs = require('bcryptjs');

module.exports = {
  up: (queryInterface, Sequelize) =>
    queryInterface.bulkInsert(
      'Users',
      [
        {
          netId: 'cre48',
          idNumber: '913312844',
          firstName: 'Christopher',
          middleNames: 'Richard',
          lastName: 'Eady',
          email: 'chris@test.com',
          password: bcryptjs.hashSync('123456'),
          admin: true,
        },
        {
          netId: 'duk9581',
          idNumber: '575635038',
          firstName: 'Christiana',
          middleNames: 'Prowse',
          lastName: 'Tottman',
          email: 'ctottman0@newsvine.com',
          password: bcryptjs.hashSync('123456'),
          admin: false,
        },
        {
          netId: 'vab8847',
          idNumber: '025104325',
          firstName: 'Gweneth',
          middleNames: 'Fessby',
          lastName: 'Job',
          email: 'gjob0@thetimes.co.uk',
          password: bcryptjs.hashSync('123456'),
          admin: false,
        },
        {
          netId: 'dmk8690',
          idNumber: '749006837',
          firstName: 'Riobard',
          middleNames: 'Tour',
          lastName: 'Scholtz',
          email: 'rscholtz1@aboutads.info',
          password: bcryptjs.hashSync('123456'),
          admin: false,
        },
        {
          netId: 'pvl2289',
          idNumber: '793594544',
          firstName: 'Starlene',
          middleNames: 'Ghiron',
          lastName: 'Callar',
          email: 'scallar2@amazonaws.com',
          password: bcryptjs.hashSync('123456'),
          admin: false,
        },
      ],
      { timestamps: true }
    ),

  // down: (queryInterface, Sequelize) => {
  //   /*
  //     Add reverting commands here.
  //     Return a promise to correctly handle asynchronicity.

  //     Example:
  //     return queryInterface.bulkDelete('People', null, {});
  //   */
  // },
};
