'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */

    const classrooms = await queryInterface.sequelize.query(
      `SELECT id from Classrooms;`
    );

    const classroomsRows = classrooms[0];

    return queryInterface.bulkInsert('Users', [
      {
        firstName: 'Ayo',
        lastName: 'Wale',
        email: 'ayo@wale.com',
        createdAt: new Date(),
        updatedAt: new Date(),
        classroomId: classroomsRows[0].id
      },
      {
        firstName: 'Mike',
        lastName: 'John',
        email: 'mike@john.com',
        createdAt: new Date(),
        updatedAt: new Date(),
        classroomId: classroomsRows[0].id
      },
      {
        firstName: 'Chike',
        lastName: 'Musa',
        email: 'chike@musa.com',
        classroomId: null,
        createdAt: new Date(),
        updatedAt: new Date(),
        classroomId: classroomsRows[1].id
      },
      {
        firstName: 'Chiola',
        lastName: 'Tope',
        email: 'chioma@tope.com',
        classroomId: null,
        createdAt: new Date(),
        updatedAt: new Date()
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    return queryInterface.bulkDelete('Users', null, {});
  }
};
