var express = require('express'),
    _       = require('lodash'),
    config  = require('../config'),
    jwt     = require('jsonwebtoken'),
    db      = require('../models')

var app = module.exports = express.Router();


function createToken(user) {
  return jwt.sign(_.omit(user, 'password'), config.secret, { expiresIn: 60*30 }); //30 minutos
}

function infoUser(user) {
  return {
    id: user.get('id'),
    username: user.username
  }
}

//auxiliar function to help on search of user
function getUserScheme(req) {
  var username;
  var type;
  var userSearch = {};

  // The POST contains a username and not an email
  if(req.body.username) {
    username = req.body.username;
    type = 'username';
    userSearch = { username: username };
  }
  // The POST contains an email and not an username
  else if(req.body.email) {
    username = req.body.email;
    type = 'email';
    userSearch = { email: username };
  }

  return {
    username: username,
    type: type,
    userSearch: userSearch
  }
}


//create user
app.post('/users', function(req, res) {
  var userScheme = getUserScheme(req); 

  if (!userScheme.username || !req.body.password) {
    return res.status(400).send("You must send the username and the password");
  }

  //searh this user
  db.user.findOne({
    where: userScheme.userSearch
  }).then(function(hasUser) {

    if (hasUser) {
      return res.status(400).send("A user with that username already exists");
    } else {
      //username and password
      var profile = _.pick(req.body, userScheme.type, 'password');
      
      //save on database
      db.user.create(profile).then(function(result){
        res.status(201).send({
          id_token: createToken(profile),
          user: infoUser(result)
        });
      });
    }
    
  });

});


//create a session
app.post('/sessions/create', function(req, res) {
  var userScheme = getUserScheme(req);

  if (!userScheme.username || !req.body.password) {
    return res.status(400).send("You must send the username and the password");
  }

  //busca pelo usuario de acordo com o tipo de campo passado (email, username)
  db.user.findOne({
    where: userScheme.userSearch
  }).then(function(user) {
    if (user == null) {
      return res.status(401).send({message:"The username or password don't match", user: user});
    }
    if (user.password !== req.body.password) {
      return res.status(401).send("The username or password don't match");
    }

    //salvar uma nova carteira para o usuario
    // var wallet = db.wallet.build({
    //   description: 'test'
    // });
    // wallet.setUser(user);
    // user.getWallets().then(function(e){
    //   console.log(e);
    // });
    
    res.status(201).send({
      id_token: createToken(user),
      user: infoUser(user)
    });
  });
});