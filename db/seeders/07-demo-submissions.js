module.exports = {
  up: (queryInterface, Sequelize) =>
    queryInterface.bulkInsert(
      'Submissions',
      [
        {
          authorFirstName: 'Christopher',
          authorMiddleNames: 'Richard',
          authorLastName: 'Eady',
          authorEmail: 'chris@test.com',
          showEmail: true,
          type: 'DISSERTATION',
          title: 'Cras in purus eu magna vulputate luctus.',
          keywords: 'forestry',
          abstract:
            'In sagittis dui vel nisl. Duis ac nibh. Fusce lacus purus, aliquet at, feugiat non, pretium quis, lectus.\n\nSuspendisse potenti. In eleifend quam a odio. In hac habitasse platea dictumst.\n\nMaecenas ut massa quis augue luctus tincidunt. Nulla mollis molestie lorem. Quisque ut erat.',
          copyrightAgree: true,
          availability: 'WORLDWIDE',
          restrictionYears: 2,
          userId: 1,
          degreeId: 1,
          departmentId: 1,
          semesterId: 1,
          readyForFinal: false,
          submittedToUmi: false,
          approved: false,
        },
        {
          authorFirstName: 'Bear',
          authorMiddleNames: 'Duferie',
          authorLastName: 'Leahy',
          authorEmail: 'bleahy0@independent.co.uk',
          showEmail: true,
          type: 'THESIS',
          title: 'Fusce posuere felis sed lacus.',
          keywords: 'immune system',
          abstract:
            'Sed ante. Vivamus tortor. Duis mattis egestas metus.\n\nAenean fermentum. Donec ut mauris eget massa tempor convallis. Nulla neque libero, convallis eget, eleifend luctus, ultricies eu, nibh.',
          copyrightAgree: true,
          availability: 'WORLDWIDE',
          restrictionYears: 2,
          userId: 3,
          degreeId: 3,
          departmentId: 2,
          semesterId: 2,
          readyForFinal: false,
          submittedToUmi: false,
          approved: false,
        },
        {
          authorFirstName: 'Charisse',
          authorMiddleNames: 'McGuiney',
          authorLastName: 'Wortman',
          authorEmail: 'cwortman1@foxnews.com',
          showEmail: true,
          type: 'DISSERTATION',
          title: 'Etiam justo.',
          keywords: 'forestry',
          abstract:
            'Vestibulum quam sapien, varius ut, blandit non, interdum in, ante. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Duis faucibus accumsan odio. Curabitur convallis.\n\nDuis consequat dui nec nisi volutpat eleifend. Donec ut dolor. Morbi vel lectus in quam fringilla rhoncus.',
          copyrightAgree: true,
          availability: 'WORLDWIDE',
          restrictionYears: 2,
          userId: 1,
          degreeId: 2,
          departmentId: 2,
          semesterId: 2,
          readyForFinal: false,
          submittedToUmi: false,
          approved: false,
        },
        {
          authorFirstName: 'Em',
          authorMiddleNames: 'Decreuze',
          authorLastName: 'Delafoy',
          authorEmail: 'edelafoy2@geocities.jp',
          showEmail: true,
          type: 'THESIS',
          title: 'Integer non velit.',
          keywords: 'fire ants',
          abstract:
            'Suspendisse potenti. In eleifend quam a odio. In hac habitasse platea dictumst.\n\nMaecenas ut massa quis augue luctus tincidunt. Nulla mollis molestie lorem. Quisque ut erat.\n\nCurabitur gravida nisi at nibh. In hac habitasse platea dictumst. Aliquam augue quam, sollicitudin vitae, consectetuer eget, rutrum at, lorem.',
          copyrightAgree: true,
          availability: 'MSU_ONLY',
          restrictionYears: 2,
          userId: 1,
          degreeId: 2,
          departmentId: 2,
          semesterId: 2,
          readyForFinal: false,
          submittedToUmi: false,
          approved: false,
        },
        {
          authorFirstName: 'Hynda',
          authorMiddleNames: 'Goggin',
          authorLastName: 'Treverton',
          authorEmail: 'htreverton3@narod.ru',
          showEmail: false,
          type: 'DISSERTATION',
          title: 'Vivamus vestibulum sagittis sapien.',
          keywords: 'genetics',
          abstract:
            'Phasellus in felis. Donec semper sapien a libero. Nam dui.\n\nProin leo odio, porttitor id, consequat in, consequat ut, nulla. Sed accumsan felis. Ut at dolor quis odio consequat varius.',
          copyrightAgree: false,
          availability: 'MSU_ONLY',
          restrictionYears: 3,
          userId: 4,
          degreeId: 2,
          departmentId: 3,
          semesterId: 1,
          readyForFinal: false,
          submittedToUmi: false,
          approved: false,
        },
        {
          authorFirstName: 'Abran',
          authorMiddleNames: 'Macy',
          authorLastName: 'Parsonage',
          authorEmail: 'aparsonage4@dedecms.com',
          showEmail: true,
          type: 'THESIS',
          title:
            'Nulla neque libero, convallis eget, eleifend luctus, ultricies eu, nibh.',
          keywords: 'fire ants',
          abstract:
            'Praesent id massa id nisl venenatis lacinia. Aenean sit amet justo. Morbi ut odio.\n\nCras mi pede, malesuada in, imperdiet et, commodo vulputate, justo. In blandit ultrices enim. Lorem ipsum dolor sit amet, consectetuer adipiscing elit.\n\nProin interdum mauris non ligula pellentesque ultrices. Phasellus id sapien in sapien iaculis congue. Vivamus metus arcu, adipiscing molestie, hendrerit at, vulputate vitae, nisl.',
          copyrightAgree: false,
          availability: 'PATENT',
          restrictionYears: 3,
          userId: 3,
          degreeId: 2,
          departmentId: 3,
          semesterId: 2,
          readyForFinal: false,
          submittedToUmi: false,
          approved: false,
        },
        {
          authorFirstName: 'Thom',
          authorMiddleNames: 'Tetlow',
          authorLastName: 'Putterill',
          authorEmail: 'tputterill5@cornell.edu',
          showEmail: true,
          type: 'DISSERTATION',
          title: 'Nulla justo.',
          keywords: 'emotion',
          abstract:
            'Phasellus in felis. Donec semper sapien a libero. Nam dui.\n\nProin leo odio, porttitor id, consequat in, consequat ut, nulla. Sed accumsan felis. Ut at dolor quis odio consequat varius.\n\nInteger ac leo. Pellentesque ultrices mattis odio. Donec vitae nisi.',
          copyrightAgree: false,
          availability: 'PATENT',
          restrictionYears: 1,
          userId: 4,
          degreeId: 4,
          departmentId: 5,
          semesterId: 2,
          readyForFinal: false,
          submittedToUmi: false,
          approved: false,
        },
        {
          authorFirstName: 'Orelia',
          authorMiddleNames: 'Wilstead',
          authorLastName: 'Coleiro',
          authorEmail: 'ocoleiro6@xrea.com',
          showEmail: true,
          type: 'THESIS',
          title: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit.',
          keywords: 'immune system',
          abstract:
            'Cras mi pede, malesuada in, imperdiet et, commodo vulputate, justo. In blandit ultrices enim. Lorem ipsum dolor sit amet, consectetuer adipiscing elit.\n\nProin interdum mauris non ligula pellentesque ultrices. Phasellus id sapien in sapien iaculis congue. Vivamus metus arcu, adipiscing molestie, hendrerit at, vulputate vitae, nisl.\n\nAenean lectus. Pellentesque eget nunc. Donec quis orci eget orci vehicula condimentum.',
          copyrightAgree: false,
          availability: 'MSU_ONLY',
          restrictionYears: 3,
          userId: 3,
          degreeId: 1,
          departmentId: 5,
          semesterId: 2,
          readyForFinal: false,
          submittedToUmi: false,
          approved: false,
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
