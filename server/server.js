'use strict'

const express = require('express');
const morgan = require('morgan');
const dao = require('./dao');

const app = express();
const port = 3001;

//set-up the middleware
app.use(morgan('dev'));
app.use(express.json());

/*** API ***/
// GET /api/articles
app.get('/api/articles', async (req, res) => {
  try {
    const articles = await dao.listArticles();
    if (articles.err)
      res.status(404).json(articles)
    else
      res.json(articles);
  } catch (err) {
    res.status(500).end();
  }
});


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})