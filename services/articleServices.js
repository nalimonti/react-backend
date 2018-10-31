const knex = require('../knex/knex.js');

let ArticleServices = {
    createArticle,
    getArticles,
    deleteArticle,
    updateArticle
};

function createArticle(article) {
    const { title, content } = article;
    return knex('articles').insert({ title, content })
}

function getArticles() {
    return knex('articles').select()
}

function deleteArticle(id) {
    return knex('articles').where({ id }).delete()
}

function updateArticle(article) {
    const { title, content, id } = article;
    return knex('articles').where({ id }).update({ title, content })
}

module.exports = ArticleServices;