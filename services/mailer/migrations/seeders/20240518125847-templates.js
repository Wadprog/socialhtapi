const templates = require('../data/templates');

module.exports = {
  async up(queryInterface) {
    return queryInterface.bulkInsert('templates', templates);
  },

  async down(queryInterface) {
    return queryInterface.bulkDelete('templates', null, {});
  },
};
