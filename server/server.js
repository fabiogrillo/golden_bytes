'use strict'

const express = require('express');
const morgan = require('morgan');

const app = express();
const port = 3001;

//set-up the middleware
app.use(morgan('dev'));

/*** API ***/
// GET /api/articles
app.get('/api/articles', (req, res) => {
    res.send('Tutto in bolla!');
});


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})