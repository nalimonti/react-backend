'use strict';

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var express = require('express');
var router = express.Router();
var articleServices = require('../services/articleServices');

router.get('/', getArticles);
router.post('/', createArticle);
router.delete('/:id', deleteArticle);
router.put('/:id', updateArticle);

function createArticle(req, res) {
    var article = req.body.article;

    articleServices.createArticle(article).then(function (data) {
        var _data = _slicedToArray(data, 1),
            id = _data[0];

        res.status(200).json({ error: false, message: 'Article saved!', id: id });
    });
}

function getArticles(req, res) {
    articleServices.getArticles().then(function (data) {
        console.log(data);
        res.status(200).json({ error: false, articles: data });
        // return res.status(500).json({error: true, message: 'Unable to retrieve articles.'})
    });
}

function deleteArticle(req, res) {
    console.log(req.params);
    var id = req.params.id;

    articleServices.deleteArticle(id).then(function (data) {
        res.status(200).json({ error: false, message: 'Article deleted!' });
    });
}

function updateArticle(req, res) {
    console.log(req.body);
    var article = req.body.article;

    articleServices.updateArticle(article).then(function (data) {
        console.log(data);
        res.status(200).json({ error: false, message: 'Article updated!' });
    });
}

module.exports = router;