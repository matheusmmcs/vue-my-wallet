
var _       = require('lodash'),
    db      = require('../models');

module.exports = function() {
	var WalletDao = {
        getWalletsByUser: function(user){
            return new Promise(function(resolve, reject) {
                user.getWallets().then(function(wallets){
                    //if (err) return reject(err);
                    resolve(wallets.map(function(wallet){ return wallet.toJSON() }));
                });
            });
        }
    }

  	return WalletDao;
}