const data = require('../data/world');


module.exports = {
    async up(queryInterface) {
        return queryInterface.bulkInsert('states', data.states);
    },

    async down(queryInterface) {
        return queryInterface.bulkDelete('states', null, {});
    },
};
