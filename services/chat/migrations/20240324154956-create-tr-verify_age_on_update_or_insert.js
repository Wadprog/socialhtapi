const path = require('path');
const fs = require('fs');

const query = fs.readFileSync(
  path.resolve(__dirname, './queries', 'tr_verify_age_on_insert_or_update.sql'),
  'utf-8'
);
module.exports = {
  async up(queryInterface) {
    await queryInterface.sequelize.query(query);
  },
  async down(queryInterface) {
    await queryInterface.sequelize.query(`
    DROP TRIGGER IF EXISTS tr_verify_age_on_insert_or_update;`);
  },
};