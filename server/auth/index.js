const router = require('express').Router();
const passport = require('passport');

const User = require('../api/users/user.model');

router.post('/login', function(req, res, next) {
  User.findOne({
    where: {
      email: req.body.email,
      password: req.body.password
    }
  })
  .then(user => {
    if (!user) {
      res.sendStatus(401);
    } else {
      req.session.userId = user.id;
      res.sendStatus(200);
    }
  })
  .catch(next);
});

router.post('/signup', function(req, res, next) {
  User.findOrCreate({
    where: {
      email: req.body.email
    },
    defaults: {
      password: req.body.password
    }
  })
  .then(result => {
    const [user] = result;
    if (!user) {
      res.sendStatus(401);
    } else {
      req.session.userId = user.id;
      res.sendStatus(200);
    }
  })
  .catch(next);
});

router.get('/logout', function(req, res, next) {
  if (req.session) {
    req.session.userId = null;
    res.sendStatus(204);
  }
});

router.get('/me', function(req, res, next) {
  if (req.session.userId) {
    User.findById(req.session.userId)
    .then(user => {
      res.json(user);
    });
  } else {
    res.sendStatus(401);
  }
});

// Google authentication and login
router.get('/google', passport.authenticate('google', { scope: 'email' }));

// Handle the callback after Google has authenticated the user
router.get('/google/callback',
  passport.authenticate('google', {
    successRedirect: '/',
    failureRedirect: '/login'
  })
);

module.exports = router;
