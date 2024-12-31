const mockData = require('../data/postData');


module.exports = {
  async up(queryInterface) {
    return queryInterface.bulkInsert(
      'posts',
      mockData.posts
    );
  },

  async down(queryInterface) {
    return queryInterface.bulkDelete('posts', null, {});
  },
};
