
var express         = require('express'),
    _               = require('lodash'),
    db              = require('../models'),
    WalletDao       = require('../dao/wallet-dao');

var app = module.exports = express.Router();

//get wallets from user
app.get('/api/wallet/:userId', function(req, res) {
    db.user.findOne({
        where: {
            id : req.params.userId
        }
    }).then(function(user) {
        if (user) {
            WalletDao().getWalletsByUser(user).then(function(wallets){
                res.status(200).send(wallets);
            });
        }
    });
});

//create a new wallet to user
app.post('/api/wallet', function(req, res) {
    if (!req.body.userId) {
      return res.status(400).send("Please reload the page");
    } else if (!req.body.description) {
      return res.status(400).send("Please fill the description");
    } else {
        //transforma em obj
        var wallet = _.pick(req.body, 'description');
        //busca usuario
        db.user.findOne({
            where: {
                id : req.body.userId
            }
        }).then(function(user) {
            if (user) {
                //cria wallet
                var walletDb = db.wallet.create(wallet).then(function(result){
                    result.setUser(user).then(function(){
                        //retornar todos os wallets do usuario
                        WalletDao().getWalletsByUser(user).then(function(wallets){
                            console.log('here', wallets);
                            res.status(200).send(wallets);
                        });
                    });
                });
            }
        });
    }
});