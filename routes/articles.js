'use strict';
const express = require('express');
const router = express.Router();
const articleServices = require('../services/articleServices');

router.get('/', getArticles);
router.post('/', createArticle);
router.delete('/:id', deleteArticle);
router.put('/:id', updateArticle);

function createArticle(req, res) {
    const { article } = req.body;
    articleServices.createArticle(article).then(data => {
        const [ id ] = data;
        res.status(200).json({error: false, message: 'Article saved!', id })
    })
}

function getArticles(req, res) {
    articleServices.getArticles().then(data => {
        console.log(data);
        res.status(200).json({error: false, articles: data})
        // return res.status(500).json({error: true, message: 'Unable to retrieve articles.'})
    })
}

function deleteArticle(req, res) {
    console.log(req.params);
    const { id } = req.params;
    articleServices.deleteArticle(id).then(data => {
        res.status(200).json({error: false, message: 'Article deleted!'});
    })
}

function updateArticle(req, res) {
    console.log(req.body);
    const { article } = req.body;
    articleServices.updateArticle(article).then(data => {
        console.log(data);
        res.status(200).json({error: false, message: 'Article updated!'});
    })
}

module.exports = router;