/* eslint-disable camelcase */
/* eslint-disable import/no-extraneous-dependencies */

const roles = [
  { id:1,name: 'super_admin', role_access_level: 0, description: 'Super Admins have full access to all resources' },
  { id:2,name: 'admin', role_access_level: 1 , description: 'Admins have full access to all resources' },
  { id:3,name: 'moderator', role_access_level: 2, description: 'Moderators have access to most resources' },
  { id:4,role_access_level: 3, name: 'member', description: 'Members have access to some resources' },
];
module.exports = {
  async up(queryInterface) {
    await queryInterface.bulkDelete('roles', null, {});
    return queryInterface.bulkInsert(
      'roles',
      roles.map((role) => ({
        ...role,
        created_at: new Date(),
      }))
    );
  },

  async down(queryInterface) {
    return queryInterface.bulkDelete('roles', null, {});
  },
};
