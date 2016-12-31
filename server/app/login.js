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
      req.session.userId = user.id;
      res.sendStatus(200);
    }
  })
  .catch(next);
});

module.exports = router;
