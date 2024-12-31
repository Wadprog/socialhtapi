const data = require('../data/world');


module.exports = {
    async up(queryInterface) {
        return queryInterface.bulkInsert('countries', data.countries);
    },

    async down(queryInterface) {
        return queryInterface.bulkDelete('templates', null, {});
    },
};
