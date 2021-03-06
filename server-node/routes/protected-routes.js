var express = require('express'),
    jwt     = require('express-jwt'),
    config  = require('../config'),
    quoter  = require('../quotes/quoter');

var app = module.exports = express.Router();

var jwtCheck = jwt({
  secret: config.secret
});

app.use('/api/protected', jwtCheck);

app.get('/api/protected/random-quote', function(req, res) {
  console.log(req.body);
  res.status(200).send(quoter.getRandomOne());
});
