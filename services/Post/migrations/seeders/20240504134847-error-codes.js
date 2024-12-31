const fs = require('fs');
const path = require('path');


const errorCodes = require('../data/errorCodes');


module.exports = {
  async up(queryInterface) {
    return queryInterface.bulkInsert(
      'error_codes',
      errorCodes
    );
  },

  async down(queryInterface) {
    return queryInterface.bulkDelete('error_codes', null, {});
  },
};
