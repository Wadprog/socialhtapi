const path = require('path');
const fs = require('fs');

const query = fs.readFileSync(
  path.resolve(
    __dirname,
    './queries',
    'tr_sync_community_participant_counts.sql'
  ),
  'utf-8'
);

module.exports = {
  async up(queryInterface) {
    await queryInterface.sequelize.query(query);
  },
  async down(queryInterface) {
    await queryInterface.sequelize.query(
      'DROP TRIGGER IF EXISTS tr_sync_community_participant_counts'
    );
  },
};