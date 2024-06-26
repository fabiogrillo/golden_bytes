const express = require('express');
const morgan = require('morgan');

const articlesDao = require('./articles-dao');
const goalsDao = require('./goals-dao');
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

// GET /api/goals
app.get('/api/goals', async (req, res) => {
  try {
    const goals = await goalsDao.listGoals();
    if (goals.err)
      res.status(404).json(goals)
    else
      res.json(goals);
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

// GET api/goals/:goal_id
app.get('/api/goals/:goal_id', isLoggedIn, [check('goal_id').isInt({ min: 1, max: 100 })],
  async (req, res) => {
    try {
      const myGoal = await goalsDao.getGoalById(req.params.goal_id);
      if (myGoal.err)
        res.status(404).json(myGoal);
      else
        res.json(myGoal);
    } catch (err) {
      res.status(500).end();
    };
  });

// DELETE /api/users/:usr_id/articles/:art_id
app.delete('/api/users/:usr_id/articles/:art_id', isLoggedIn,
  [check('usr_id').isInt({ min: 1, max: 10 }), check('art_id').isInt({ min: 1 })],
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

// DELETE /api/goals/:goal_id
app.delete('/api/goals/:goal_id', isLoggedIn, async (req, res) => {
  try {
    const result = await goalsDao.deleteGoal(req.params.goal_id);
    if (result.err)
      res.status(404).json(result);
    else
      res.json({ message: "Goal deleted succesfully." });
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

// POST /api/goals
app.post('/api/goals', isLoggedIn, [
  check('description').isLength({ min: 10, max: 100 }),
  check('total_steps').isInt({ min: 1, max: 20 }),
  check('current_step').isInt({ min: 0, max: 20 }).custom((value, { req }) => {
    if (value > req.body.total_steps) {
      throw new Error('Current step cannot be greater than total steps!');
    }
    return true;
  }),
  check('start_date').matches(/^\d{8}$/).custom((value) => {
    const startDate = new Date(value.slice(0, 4), parseInt(value.slice(4, 6)) - 1, value.slice(6, 8));
    const januaryFirst2000 = new Date('2000-01-01');
    if (startDate < januaryFirst2000) {
      throw new Error('Start date must be after or equal to January 1, 2000');
    }
    return true;
  }),
  check('additional_info').optional().isLength({ max: 300 })
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }
  try {
    await goalsDao.addGoal(req.body.description, req.body.total_steps, req.body.current_step, req.body.start_date, req.body.additional_info);
    res.status(201).end();
  } catch (err) {
    res.status(500).json({ error: `Server error during the creation of goal...` });
  }
});

// POST /api/tags
app.post('/api/tags', isLoggedIn, [
  check('tag_name').isLength({ min: 3, max: 20 }),
  check('tag_name').isString()
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }
  try {
    await articlesDao.createTag(req.body.tag_name);
    res.status(201).end();
  } catch (err) {
    res.status(500).json({ error: `Server error during tag creation... ` })
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

// PUT /api/goals/:goal_id
app.put('/api/goals/:goal_id', isLoggedIn, [
  check('goal_id').isInt({ min: 1, max: 100 })
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }

  const { description, total_steps, current_step, start_date, additional_info } = req.body;
  const goal_id = req.params.goal_id;

  try {
    const rowsAffected = await goalsDao.updateGoal(goal_id, description, total_steps, current_step, start_date, additional_info);
    if (rowsAffected > 0) {
      res.status(200).json({ message: "Goal updated successfully" });
    } else {
      res.status(404).json({ error: "Goal not found" });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error during the update of the article" });
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