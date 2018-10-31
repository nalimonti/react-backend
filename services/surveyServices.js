const knex = require('../knex/knex.js');

let SurveyServices = {
    getSurveys
};

function getSurveys() {
    return knex.select().from('surveys');
}

module.exports = SurveyServices;