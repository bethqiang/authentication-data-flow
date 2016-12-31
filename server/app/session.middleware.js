const app = require('express')();
const session = require('express-session');

app.use(session({
  secret: 'woo-authentication',
  resave: false,
  saveUnitialized: false
}));

app.use('/api', function(req, res, next) {
  if (!req.session.counter) req.session.counter = 0;
  console.log('counter', ++req.session.counter);
  next();
});

app.use(function(req, res, next) {
  console.log('session', req.session);
  next();
});

module.exports = app;
