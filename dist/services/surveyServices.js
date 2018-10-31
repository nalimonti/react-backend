'use strict';

var knex = require('../knex/knex.js');

var SurveyServices = {
    getSurveys: getSurveys
};

function getSurveys() {
    return knex.select().from('surveys');
}

module.exports = SurveyServices;