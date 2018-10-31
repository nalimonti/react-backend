'use strict';

var knex = require('../knex/knex.js');

var ArticleServices = {
    createArticle: createArticle,
    getArticles: getArticles,
    deleteArticle: deleteArticle,
    updateArticle: updateArticle
};

function createArticle(article) {
    var title = article.title,
        content = article.content;

    return knex('articles').insert({ title: title, content: content });
}

function getArticles() {
    return knex('articles').select();
}

function deleteArticle(id) {
    return knex('articles').where({ id: id }).delete();
}

function updateArticle(article) {
    var title = article.title,
        content = article.content,
        id = article.id;

    return knex('articles').where({ id: id }).update({ title: title, content: content });
}

module.exports = ArticleServices;