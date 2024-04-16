const express = require('express');
const morgan = require('morgan');

const articlesDao = require('./articles-dao');
const usersDao = require('./users-dao');
const { check, validationResult } = require('express-validator');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const session = require('express-session');

passport.use(new LocalStrategy(
  function (username, password, done) {
    usersDao.getUser(username, password).then((user) => {
      if (!user)
        return done(null, false, { message: 'Incorrect username and/or password.' });

      return done(null, user);
    })
  }
));

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  usersDao.getUserById(id)
    .then((user) => {
      done(null, user); // this will be available in req.user
    }).catch((err) => {
      done(err, null);
    });
});

// init express
const app = new express();
const port = 3001;

app.use(morgan('dev'));
app.use(express.json());

const isLoggedIn = (req, res, next) => {
  if (req.isAuthenticated())
    return next();

  return res.status(401).json({ error: 'not authenticated' });
}

app.use(session({
  secret: 'secret sentence not to be shared',
  resave: false,
  saveUninitialized: false
}));

// then, init passport
app.use(passport.initialize());
app.use(passport.session());

/*** API ***/
// GET /api/articles
app.get('/api/articles', async (req, res) => {
  try {
    const articles = await articlesDao.listArticles();
    if (articles.err)
      res.status(404).json(articles)
    else
      res.json(articles);
  } catch (err) {
    res.status(500).end();
  }
});

// GET /api/tags
app.get('/api/tags', async (req, res) => {
  try {
    const tags = await articlesDao.listTags();
    if (tags.err)
      res.status(404).json(tags)
    else
      res.json(tags);
  } catch (err) {
    res.status(500).end();
  }
});

// GET /api/users/:id/articles
app.get('/api/users/:id/articles', isLoggedIn,
  [check('id').isInt({ min: 1, max: 5 })],
  async (req, res) => {
    try {
      const myArticles = await articlesDao.getMyArticles(req.user.id);
      if (myArticles.err)
        res.status(404).json(myArticles)
      else
        res.json(myArticles);
    } catch (err) {
      res.status(500).end();
    };
  });

// GET /api/articles/:art_id
app.get('/api/articles/:art_id', [check('art_id').isInt({ min: 1, max: 500 })],
  async (req, res) => {
    try {
      const myArticle = await articlesDao.getArticleById(req.params.art_id);
      if (myArticle.err)
        res.status(404).json(myArticle)
      else
        res.json(myArticle);
    } catch (err) {
      res.status(500).end();
    };
  });


// DELETE /api/users/:usr_id/articles/:art_id
app.delete('/api/users/:usr_id/articles/:art_id', isLoggedIn,
  [check('usr_id').isInt({ min: 1, max: 10 }), check('art_id').isInt({ min: 1})],
  async (req, res) => {
    try {
      const result = await articlesDao.deleteUserArticle(req.params.usr_id, req.params.art_id);
      if (result.err)
        res.status(404).json(result)
      else
        res.json({ message: "Article deleted succesfully." });
    } catch (err) {
      res.status(500).end();
    };
  });

// POST /api/users/:usr_id/articles
app.post('/api/users/:usr_id/articles', isLoggedIn, [
  check('usr_id').isInt({ min: 1, max: 10 }),
  // add validation on content
  check('date').matches(/^[0-9]{8}$/).withMessage('Date format must be "yyyymmdd"'),
  check('tags').custom((value) => {
    // check tags is a single string
    if (typeof value !== 'string') {
      throw new Error('Tags must be a single string');
    }
    if (value.length > 50) {
      throw new Error('Tags must not exceed 50 characters');
    }
    return true;
  }),

  check('description').isLength({ min: 20, max: 500 })
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }
  try {
    await articlesDao.createArticle(req.user.id, req.body.content, req.body.date, req.body.tags, req.body.description);
    res.status(201).end();
  } catch (err) {
    res.status(500).json({ error: `Server error during the creation of article...` });
  }
});

// PUT /api/users/:usr_id/articles/:art_id
app.put('/api/users/:usr_id/articles/:art_id', isLoggedIn, [
  check('usr_id').isInt({ min: 1, max: 10 }),
  check('art_id').isInt({ min: 1 }),
  // add validation on content
  check('date').matches(/^[0-9]{8}$/).withMessage('Date format must be "yyyymmdd"'),
  check('tags').custom((value) => {
    // check tags is a single string
    if (typeof value !== 'string') {
      throw new Error('Tags must be a single string');
    }
    if (value.length > 50) {
      throw new Error('Tags must not exceed 50 characters');
    }
    return true;
  }),
  check('description').isLength({ min: 20, max: 500 })
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }
  try {
    await articlesDao.updateArticle(req.params.art_id, req.user.id, req.body.content, req.body.date, req.body.tags, req.body.description);
    res.status(200).end();
  } catch (err) {
    res.status(500).json({ error: `Server error during the update of the article...` });
  }
});


/*** Users APIs ***/

/* login */
app.post('/api/sessions', function (req, res, next) {
  passport.authenticate('local', (err, user, info) => {
    if (err) return next(err);
    if (!user) {
      return res.status(401).json(info);
    }
    req.login(user, (err) => {
      if (err) return next(err);

      return res.json(req.user);
    });
  })(req, res, next);
});

/* logout */
app.delete('/api/sessions/current', (req, res) => {
  req.logout(() => {
    res.end();
  });
});


/* check whether the user is logged in or not */
app.get('/api/sessions/current', (req, res) => {
  if (req.isAuthenticated()) {
    res.status(200).json(req.user);
  } else res.status(401).json({ error: 'Unauthenticated user!' });
});

/* Activate the server */
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})