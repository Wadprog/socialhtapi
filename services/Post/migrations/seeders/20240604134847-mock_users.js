const mockData = require('../data/postData');

module.exports = {
  async up(queryInterface) {
    return queryInterface.bulkInsert(
      'users',
      mockData.users
    );
  },

  async down(queryInterface) {
    return queryInterface.bulkDelete('users', null, {});
  },
};
