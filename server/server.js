'use strict'

const express = require('express');
const morgan = require('morgan');
const dao = require('./dao'); //module for accessing db

const app = express();
const port = 3001;

//set-up the middleware
app.use(morgan('dev'));

/*** API ***/
// GET /api/articles
app.get('/api/articles', async (req, res) => {
    const articles = await dao.listArticles();
    console.log(articles);
    res.json(articles)
});