const mockdata = require('../data/postData');


module.exports = {
  async up(queryInterface) {
    return queryInterface.bulkInsert(
      'post_medias',
      mockdata.post_medias
    );
  },

  async down(queryInterface) {
    return queryInterface.bulkDelete('post_medias', null, {});
  },
};
