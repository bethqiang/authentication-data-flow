const router = require('express').Router();

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
      req.logIn(user, function(err) {
        if (err) return next(err);
        res.json(user);
      });
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
  .spread(user => {
    req.logIn(user, function(err) {
      if (err) return next(err);
      res.json(user);
    });
  })
  .catch(next);
});

router.get('/logout', function(req, res, next) {
  req.logOut();
  res.sendStatus(204);
});

router.get('/me', function(req, res, next) {
  if (req.user) {
    res.json(req.user);
  } else {
    res.sendStatus(401);
  }
});

router.use('/google', require('./google'));

module.exports = router;
