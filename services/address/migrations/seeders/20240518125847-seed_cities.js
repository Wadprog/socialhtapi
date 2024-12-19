const data = require('../data/world');


module.exports = {
    async up(queryInterface) {
        return queryInterface.bulkInsert('cities', data.cities);
    },

    async down(queryInterface) {
        return queryInterface.bulkDelete('cities', null, {});
    },
};
