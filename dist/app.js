'use strict';

var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var knex = require('./knex/knex.js');
var cors = require('cors');
var jwt = require('jsonwebtoken');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var articlesRouter = require('./routes/articles');

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors());

app.use(function (req, res, next) {
    console.log('auth check');
    console.log(req.headers);
    var token = req.headers['authorization'];
    console.log('token: ' + token);

    if (!token) {
        console.log('no token found');
        return next();
    }

    token = token.replace('Bearer', '').trim();
    console.log(token);

    jwt.verify(token, 'secretkey', function (err, user) {
        if (err) {
            console.log('error');
            console.log(err);
        } else {
            console.log('success');
            console.log(user);
            req.user = user;
            next();
        }
    });
});

app.all('*', function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', "Content-Type, Access-Control-Allow-Headers, X-Auth-Key, X-Requested-With");
    res.setHeader('Access-Control-Allow-Credentials', true);

    // instruct client to no cache these results
    res.setHeader('cache-control', 'private, no-store, no-cache, max-age=0');

    next();
});

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/articles', articlesRouter);

app.use(function (err, req, res, next) {
    console.log('in error handler');
    console.log(err);
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: err
    });
});

module.exports = app;