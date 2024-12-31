const mockData = require('../data/postData');


module.exports = {
  async up(queryInterface) {
    return queryInterface.bulkInsert(
      'medias',
      mockData.medias
    );
  },

  async down(queryInterface) {
    return queryInterface.bulkDelete('medias', null, {});
  },
};
