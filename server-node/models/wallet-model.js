
module.exports = function(sequelize, Sequelize) {
	var Wallet = sequelize.define('wallet', {
			description: {
                type: Sequelize.STRING
            },
            deleted: {
				type: Sequelize.BOOLEAN,
				defaultValue: false
			}
	  	}, {
	    associate: function(models) {
	   		Wallet.belongsTo(models.user, {foreignKey: 'userId'})
	    }
	});

  	return Wallet;
}