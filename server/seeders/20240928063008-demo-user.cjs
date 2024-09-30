'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    // Add seed commands here.
    await queryInterface.bulkInsert('users', [{
      username: 'demoUser',
      password: 'demoPassword', // Consider hashing passwords in a real application
      created_at: new Date(),
      updated_at: new Date(),
    }], {});
  },

  async down (queryInterface, Sequelize) {
    // Commands to revert the seed
    await queryInterface.bulkDelete('users', null, {});
  }
};
