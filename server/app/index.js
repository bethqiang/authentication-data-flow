'use strict';

require('dotenv').config();

const app = require('express')();
const passport = require('passport');
const path = require('path');

const User = require('../api/users/user.model');

app.use(require('./logging.middleware'));
app.use(require('./request-state.middleware'));
app.use(require('./statics.middleware'));
app.use(require('./session.middleware'));

// Integrate passport into middleware
// Relies on existing session architecture, so needs to come after express session middleware
app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  User.findById(id)
  .then(user => {
    console.log(user);
    done(null, user);
  })
  .catch(done);
});

app.use('/api', require('../api/api.router'));
app.use('/auth', require('../auth'));

var validFrontendRoutes = ['/', '/stories', '/users', '/stories/:id', '/users/:id', '/signup', '/login'];
var indexPath = path.join(__dirname, '..', '..', 'browser', 'index.html');
validFrontendRoutes.forEach(function (stateRoute) {
  app.get(stateRoute, function (req, res) {
    res.sendFile(indexPath);
  });
});

app.use(require('./error.middleware'));

module.exports = app;
