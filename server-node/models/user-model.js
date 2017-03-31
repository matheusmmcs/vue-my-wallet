
var validator = require('validator');

module.exports = function(sequelize, Sequelize) {
	var User = sequelize.define('user', {
			username: { 
                type: Sequelize.STRING
            },
			password: { 
                type: Sequelize.STRING
            },
			deleted: {
				type: Sequelize.BOOLEAN,
				defaultValue: false
			}
	  	}, {
	    associate: function(models) {
	   		//Action.hasMany(models.Task)
			User.hasMany(models.wallet, { foreignKey: 'userId'} );
	    }
	});

  	return User;
}