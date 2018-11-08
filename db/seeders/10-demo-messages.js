module.exports = {
  up: (queryInterface, Sequelize) =>
    queryInterface.bulkInsert(
      'Messages',
      [
        {
          content:
            'Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.',
          submissionId: 5,
          read: false,
        },
        {
          content: 'Curabitur at ipsum ac tellus semper interdum.',
          submissionId: 4,
          read: true,
        },
        {
          content: 'Praesent blandit.',
          submissionId: 8,
          read: true,
        },
        {
          content:
            'Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Duis faucibus accumsan odio.',
          submissionId: 4,
          read: true,
        },
        {
          content: 'Duis aliquam convallis nunc.',
          submissionId: 5,
          read: false,
        },
        {
          content: 'Suspendisse potenti.',
          submissionId: 3,
          read: true,
        },
        {
          content: 'Integer tincidunt ante vel ipsum.',
          submissionId: 1,
          read: false,
        },
        {
          content: 'Aliquam quis turpis eget elit sodales scelerisque.',
          submissionId: 6,
          read: false,
        },
        {
          content: 'Pellentesque at nulla.',
          submissionId: 6,
          read: false,
        },
        {
          content: 'Duis aliquam convallis nunc.',
          submissionId: 5,
          read: true,
        },
        {
          content: 'Vestibulum ac est lacinia nisi venenatis tristique.',
          submissionId: 3,
          read: false,
        },
        {
          content:
            'Nam ultrices, libero non mattis pulvinar, nulla pede ullamcorper augue, a suscipit nulla elit ac nulla.',
          submissionId: 5,
          read: true,
        },
        {
          content: 'Integer ac neque.',
          submissionId: 3,
          read: true,
        },
        {
          content: 'Nullam molestie nibh in lectus.',
          submissionId: 6,
          read: false,
        },
        {
          content: 'In quis justo.',
          submissionId: 3,
          read: true,
        },
        {
          content: 'Mauris sit amet eros.',
          submissionId: 8,
          read: false,
        },
        {
          content: 'Phasellus sit amet erat.',
          submissionId: 2,
          read: true,
        },
        {
          content:
            'Donec diam neque, vestibulum eget, vulputate ut, ultrices vel, augue.',
          submissionId: 7,
          read: true,
        },
        {
          content: 'Sed sagittis.',
          submissionId: 8,
          read: false,
        },
        {
          content: 'Cras non velit nec nisi vulputate nonummy.',
          submissionId: 4,
          read: true,
        },
        {
          content: 'Quisque id justo sit amet sapien dignissim vestibulum.',
          submissionId: 2,
          read: false,
        },
        {
          content: 'Etiam vel augue.',
          submissionId: 4,
          read: true,
        },
        {
          content:
            'Morbi vestibulum, velit id pretium iaculis, diam erat fermentum justo, nec condimentum neque sapien placerat ante.',
          submissionId: 6,
          read: false,
        },
        {
          content: 'Pellentesque ultrices mattis odio.',
          submissionId: 3,
          read: false,
        },
        {
          content: 'Nulla tellus.',
          submissionId: 8,
          read: false,
        },
        {
          content:
            'Maecenas tristique, est et tempus semper, est quam pharetra magna, ac consequat metus sapien ut nunc.',
          submissionId: 5,
          read: false,
        },
        {
          content: 'Nulla ut erat id mauris vulputate elementum.',
          submissionId: 2,
          read: false,
        },
        {
          content: 'Vivamus tortor.',
          submissionId: 1,
          read: false,
        },
        {
          content:
            'Integer aliquet, massa id lobortis convallis, tortor risus dapibus augue, vel accumsan tellus nisi eu orci.',
          submissionId: 4,
          read: true,
        },
        {
          content:
            'Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Duis faucibus accumsan odio.',
          submissionId: 6,
          read: true,
        },
      ],
      { timestamps: true }
    ),
};
