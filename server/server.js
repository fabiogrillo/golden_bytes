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

// POST /api/articles
app.post('/api/articles', isLoggedIn, [
  check('usr_id').isInt({ min: 1, max: 10 }),
  check('content').custom((value) => {
    // check delta format
    if (!value.ops || !Array.isArray(value.ops)) {
      throw new Error('content must be a delta object');
    }
    return true;
  }),
  check('date').matches(/^[0-9]{8}$/).withMessage('Date format must be "yyyymmdd"'),
  check('tags').custom((value) => {
    // check tags is a list of strings
    if (!Array.isArray(value) || value.some(tag => typeof tag !== 'string')) {
      throw new Error('Tags must be a string array');
    }
    if (value.length > 5) {
      throw new Error('not more than 5 tags');
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